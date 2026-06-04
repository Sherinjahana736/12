"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MarkerType,
  Node,
  NodeMouseHandler,
} from "reactflow";
import "reactflow/dist/style.css";

// ─── Types ──────────────────────────────────────────────────────────────────
// Relative URL — Next.js rewrites proxy this to the backend service
// Works in local dev (→ localhost:8000) AND in Docker (→ backend:8000)
const API_URL = "/api/exhaust-data";
const CATEGORY_KEYS = ["device", "location", "network", "ad_identifiers", "biometrics"] as const;
type CategoryKey = (typeof CATEGORY_KEYS)[number];
type ActiveCategory = CategoryKey | "all";

type ExhaustRecord = {
  field_id: string;
  field_name: string;
  category: string;
  source_type: string;
  destination_partner: string;
  normalized_category: CategoryKey;
  authenticity?: "synthetic" | "native" | "unknown";
};

type PayloadItem = {
  field_id?: string;
  id?: string;
  field_name?: string;
  data_field?: string;
  category?: string;
  source_type?: string;
  ingestion_protocol?: string;
  destination_partner?: string;
  data_partner_recipient?: string;
};

type SelectedNode = {
  id: string;
  label: string;
  isPartner: boolean;
  partner?: string;
  records?: ExhaustRecord[];
};

// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<CategoryKey, string> = {
  device: "Device",
  location: "Location",
  network: "Network",
  ad_identifiers: "Ad Identifiers",
  biometrics: "Biometrics",
};

const CATEGORY_ACCENT: Record<CategoryKey, string> = {
  device: "bg-emerald-500/15 text-emerald-200 border-emerald-700",
  location: "bg-sky-500/15 text-sky-200 border-sky-700",
  network: "bg-violet-500/15 text-violet-200 border-violet-700",
  ad_identifiers: "bg-orange-500/15 text-orange-200 border-orange-700",
  biometrics: "bg-rose-500/15 text-rose-200 border-rose-700",
};

const CENTRAL_NODE: Node<{ label: string }> = {
  id: "user_tap",
  type: "input",
  data: { label: "📱 User Tap App Event" },
  position: { x: 320, y: 220 },
  style: {
    background: "linear-gradient(135deg, #7c3aed 0%, #4f1bad 100%)",
    color: "#ffffff",
    border: "2px solid #8b5cf6",
    borderRadius: "20px",
    padding: "16px 20px",
    fontWeight: 700,
    fontSize: "13px",
    boxShadow: "0 0 40px rgba(124,58,237,0.55), 0 0 80px rgba(124,58,237,0.2)",
  },
};

const baseNodeStyle = {
  background: "#0d0b1a",
  color: "#e8e4f8",
  border: "1px solid #2a2650",
  borderRadius: "16px",
  padding: 14,
  fontSize: "12px",
};

// ─── Data Normalization ───────────────────────────────────────────────────────
const normalizeCategory = (category?: string): CategoryKey => {
  const n = (category ?? "device").toLowerCase();
  if (n.includes("device")) return "device";
  if (n.includes("location")) return "location";
  if (n.includes("network")) return "network";
  if (n.includes("ad") || n.includes("identifier")) return "ad_identifiers";
  if (n.includes("biometric")) return "biometrics";
  return "device";
};

const normalizeRecord = (item: PayloadItem, index: number, usedFallback = false): ExhaustRecord => {
  const category = item.category ?? "device";
  const source_type = item.source_type ?? item.ingestion_protocol ?? "UNKNOWN_PROTOCOL";
  const destination_partner = item.destination_partner ?? item.data_partner_recipient ?? "Unknown Partner";
  return {
    field_id: item.field_id ?? item.id ?? `EXH-${index + 1}`,
    field_name: item.field_name ?? item.data_field ?? `Field ${index + 1}`,
    category,
    source_type,
    destination_partner,
    normalized_category: normalizeCategory(category),
    authenticity: usedFallback || String(source_type).toLowerCase().includes("synthetic") ? "synthetic" : "unknown",
  };
};

const fallbackRecords: ExhaustRecord[] = Array.from({ length: 55 }, (_, index) => {
  const templates = [
    { field_name: "IMEI Number", category: "device", source_type: "SDK_BACKGROUND_PING", destination_partner: "TradeDesk SSP" },
    { field_name: "Battery Level & Temperature", category: "device", source_type: "OS_PROPERTY_POLL", destination_partner: "LiveRamp Identity Graph" },
    { field_name: "GPS Latitude/Longitude", category: "location", source_type: "CORE_LOCATION_SDK", destination_partner: "GDELT OpenStream" },
    { field_name: "WiFi BSSID & Signal Strength", category: "location", source_type: "NETWORK_SCAN", destination_partner: "CFPB Feed" },
    { field_name: "Carrier Name & IP Address", category: "network", source_type: "SOCKET_PROBE", destination_partner: "TradeDesk SSP" },
    { field_name: "IDFA / GAID Token", category: "ad_identifiers", source_type: "AD_REQUEST_SEQUENCE", destination_partner: "LiveRamp Identity Graph" },
    { field_name: "Touch Pressure & Surface Area", category: "biometrics", source_type: "UI_EVENT_LOOP", destination_partner: "GDELT OpenStream" },
    { field_name: "Foreground App Session", category: "ad_identifiers", source_type: "USER_INTERACTION_LOG", destination_partner: "CFPB Feed" },
  ];
  const template = templates[index % templates.length];
  return {
    field_id: `EXH-${index + 1}`,
    field_name: `${template.field_name} [${index + 1}]`,
    category: template.category,
    source_type: template.source_type,
    destination_partner: template.destination_partner,
    normalized_category: normalizeCategory(template.category),
  };
});

// ─── Graph Builders ───────────────────────────────────────────────────────────
const buildPartnerNodes = (partners: string[]): Node[] => {
  const radius = 190;
  return partners.map((partner, index) => {
    const angle = (Math.PI * 2 * index) / Math.max(partners.length, 1);
    const x = 320 + Math.cos(angle) * radius;
    const y = 240 + Math.sin(angle) * radius;
    return {
      id: `partner_${index}`,
      data: { label: `🔗 ${partner}` },
      position: { x, y },
      style: {
        ...baseNodeStyle,
        width: 200,
        textAlign: "center" as const,
        background: "#110f20",
        cursor: "pointer",
      },
    };
  });
};

const buildPartnerEdges = (partners: string[], animated: boolean): Edge[] =>
  partners.map((_, index) => ({
    id: `edge_${index}`,
    source: "user_tap",
    target: `partner_${index}`,
    animated,
    style: {
      stroke: "#8b5cf6",
      strokeWidth: animated ? 3 : 2,
      opacity: animated ? 0.92 : 0.55,
      strokeDasharray: animated ? "10 6" : undefined,
    },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
  }));

const deriveGraph = (records: ExhaustRecord[], animated: boolean) => {
  const partners = Array.from(new Set(records.map((r) => r.destination_partner)));
  return {
    nodes: [CENTRAL_NODE, ...buildPartnerNodes(partners)],
    edges: buildPartnerEdges(partners, animated),
    partners,
  };
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Minimalist close button */
const CloseBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    id="close-panel-btn"
    onClick={onClick}
    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2650] bg-[#0d0b1a] text-slate-400 transition hover:border-violet-500/40 hover:text-violet-300"
    aria-label="Close intelligence panel"
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  </button>
);

/** Intel Panel — slides in from right */
const IntelligencePanel = ({
  open,
  selected,
  onClose,
  activeCategory,
  setActiveCategory,
  visibleCount,
  isReplaying,
  status,
  filteredRecords,
  emittedCount,
  onTrigger,
}: {
  open: boolean;
  selected: SelectedNode | null;
  onClose: () => void;
  activeCategory: ActiveCategory;
  setActiveCategory: (c: ActiveCategory) => void;
  visibleCount: number;
  isReplaying: boolean;
  status: string;
  filteredRecords: ExhaustRecord[];
  emittedCount: number;
  onTrigger: () => void;
}) => (
  <div className={`intelligence-panel ${open ? "open" : ""}`}>
    {/* Backdrop blur edge */}
    <div className="h-full border-l border-[#1e1b33] bg-[#0d0b1a]/95 backdrop-blur-2xl flex flex-col shadow-[−8px_0_60px_rgba(124,58,237,0.18)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e1b33] px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-violet-400">Intelligence Panel</p>
          <h2 className="mt-1 text-base font-semibold text-slate-100">
            {selected ? (selected.isPartner ? `🔗 ${selected.partner}` : "📱 Central Tap Event") : "System Overview"}
          </h2>
        </div>
        <CloseBtn onClick={onClose} />
      </div>

      {/* Body */}
      <div className="panel-scroll flex-1 px-6 py-5 space-y-6">

        {/* Trigger */}
        <div className="space-y-3">
          <button
            id="trigger-tap-btn"
            onClick={onTrigger}
            disabled={isReplaying}
            className={`w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition ${
              isReplaying
                ? "cursor-not-allowed bg-[#1a1730] text-slate-500"
                : "bg-violet-600 text-white shadow-lg shadow-violet-600/25 hover:bg-violet-500"
            }`}
          >
            {isReplaying ? "⚡ Streaming telemetry..." : "⚡ Trigger Single Tap Event"}
          </button>

          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full bg-[#1e1b33]">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-150"
              style={{ width: `${(emittedCount / 55) * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">{emittedCount}/55 fields emitted</p>
        </div>

        {/* Status */}
        <div className="rounded-xl border border-[#1e1b33] bg-[#110f20] p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-violet-400/70 mb-2">Status</p>
          <p className="text-sm text-slate-300 leading-relaxed">{status}</p>
        </div>

        {/* Selected node detail */}
        {selected && selected.isPartner && selected.records && (
          <div className="rounded-xl border border-[#2a2650] bg-[#110f20] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-violet-400/70 mb-3">Partner Intel</p>
            <p className="font-semibold text-slate-100 mb-1">{selected.partner}</p>
            <p className="text-xs text-slate-500 mb-3">{selected.records.length} fields routed to this partner</p>
            <div className="space-y-2 max-h-48 overflow-y-auto panel-scroll">
              {selected.records.map((r) => (
                <div key={r.field_id} className="flex items-center justify-between gap-2 rounded-lg border border-[#1e1b33] bg-[#0d0b1a] px-3 py-2">
                  <span className="text-xs font-mono text-violet-300">{r.field_id}</span>
                  <span className="text-xs text-slate-400 truncate flex-1 mx-2">{r.field_name}</span>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase ${CATEGORY_ACCENT[r.normalized_category]}`}>
                    {CATEGORY_LABELS[r.normalized_category]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="rounded-xl border border-[#1e1b33] bg-[#110f20] p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-violet-400/70 mb-3">Filter Fields</p>
          <div className="flex flex-wrap gap-2">
            {(["all", ...CATEGORY_KEYS] as ActiveCategory[]).map((cat) => (
              <button
                key={String(cat)}
                id={`filter-${cat}`}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                  activeCategory === cat
                    ? "border-violet-400 bg-violet-500/15 text-violet-200"
                    : "border-[#1e1b33] bg-[#0d0b1a] text-slate-400 hover:border-[#2a2650]"
                }`}
              >
                {cat === "all" ? "All Fields" : CATEGORY_LABELS[cat as CategoryKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Data table */}
        <div className="rounded-xl border border-[#1e1b33] bg-[#110f20] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1e1b33]">
            <p className="text-xs uppercase tracking-[0.22em] text-violet-400/70">
              Emitted Fields — {filteredRecords.length} shown
            </p>
          </div>
          <div className="panel-scroll max-h-96">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="sticky top-0 bg-[#0d0b1a] border-b border-[#1e1b33]">
                <tr>
                  <th className="px-4 py-2.5 uppercase tracking-[0.2em] text-slate-500">ID</th>
                  <th className="px-4 py-2.5 uppercase tracking-[0.2em] text-slate-500">Field</th>
                  <th className="px-4 py-2.5 uppercase tracking-[0.2em] text-slate-500">Category</th>
                  <th className="px-4 py-2.5 uppercase tracking-[0.2em] text-slate-500">Partner</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, index) => {
                  const revealed = index < visibleCount;
                  return (
                    <tr
                      key={record.field_id}
                      className={`border-b border-[#1a1730] transition ${
                        revealed ? "text-slate-200 row-revealed" : "text-slate-600"
                      }`}
                    >
                      <td className="px-4 py-2.5 font-mono text-violet-300">{record.field_id}</td>
                      <td className="px-4 py-2.5 max-w-[100px] truncate">{record.field_name}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] uppercase ${CATEGORY_ACCENT[record.normalized_category]}`}>
                          {CATEGORY_LABELS[record.normalized_category]}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-400 max-w-[80px] truncate">{record.destination_partner}</td>
                    </tr>
                  );
                })}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-600">
                      Trigger a tap to stream records
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
);

// ─── Metadata Modal ───────────────────────────────────────────────────────────
const MetaModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <>
    {open && (
      <div
        className="fixed inset-0 z-[60]"
        onClick={onClose}
        aria-hidden="true"
      />
    )}
    <div className={`meta-modal absolute right-0 top-12 z-[70] w-72 rounded-2xl border border-[#2a2650] bg-[#0d0b1a]/98 backdrop-blur-2xl p-5 shadow-2xl shadow-black/60 ${open ? "open" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-[0.28em] text-violet-400">Developer Signature</p>
        <button
          id="close-meta-btn"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:text-slate-300 transition"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        <MetaRow label="Architect" value="jahana sharin" />
        <MetaRow label="Batch" value="Batch 2 Interns" />
        <MetaRow label="Rail" value="Distribution & Demand" />
        <div className="rounded-xl border border-[#1e1b33] bg-[#110f20] p-3">
          <p className="text-[10px] uppercase tracking-[0.22em] text-violet-400/70 mb-2">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {["Next.js 16", "FastAPI", "Tailwind CSS v4", "React Flow"].map((tech) => (
              <span key={tech} className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-0.5 text-[11px] text-violet-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-2 border-t border-[#1e1b33]">
          <p className="text-[10px] text-slate-600">Real Rails Intelligence Library · CFPB · GDELT</p>
        </div>
      </div>
    </div>
  </>
);

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-slate-500">{label}</span>
    <span className="text-xs font-semibold text-slate-200">{value}</span>
  </div>
);

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function Home() {
  const [records, setRecords] = useState<ExhaustRecord[]>([]);
  const [nodes, setNodes] = useState<Node[]>([CENTRAL_NODE]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [status, setStatus] = useState(
    "A single mobile interaction emits CFPB data points and GDELT-style open telemetry into partner chains."
  );
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [metaOpen, setMetaOpen] = useState(false);
  const [partnerMap, setPartnerMap] = useState<Record<number, string>>({});

  const emittedCount = visibleCount;
  const intervalRef = useRef<number | null>(null);

  const filteredRecords = useMemo(() => {
    if (activeCategory === "all") return records;
    return records.filter((r) => r.normalized_category === activeCategory);
  }, [records, activeCategory]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const handleTrigger = useCallback(async () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setIsReplaying(true);
    setVisibleCount(0);
    setStatus("Loading 55 mobile exhaust records from the live FastAPI stream...");

    let payloadItems: PayloadItem[] = [];
    let usedFallback = false;

    try {
      const response = await fetch(API_URL, {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`API responded with status ${response.status}`);
      const payload = await response.json();
      payloadItems = Array.isArray(payload) ? payload : [];
      if (!payloadItems.length) throw new Error("Payload was empty or invalid");
    } catch (error) {
      console.error("Fetch failed, using fallback:", error);
      setStatus("Backend unreachable — replaying built-in 55-field fallback stream.");
      payloadItems = fallbackRecords;
      usedFallback = true;
    }

    let parsed = payloadItems.map((record, index) => normalizeRecord(record, index, usedFallback));
    if (parsed.length < 55) {
      const missing = 55 - parsed.length;
      const fill = fallbackRecords.slice(0, missing).map((r, i) => normalizeRecord(r, parsed.length + i, true));
      parsed = parsed.concat(fill);
    }
    setRecords(parsed);

    const { nodes: initialNodes, edges: initialEdges, partners } = deriveGraph(parsed, true);
    const pMap: Record<number, string> = {};
    partners.forEach((p, i) => { pMap[i] = p; });
    setPartnerMap(pMap);
    setNodes(initialNodes);
    setEdges(initialEdges);
    setStatus(usedFallback ? "Fallback stream active. Replaying local data." : "Live payload accepted — streaming distribution & demand leak paths...");

    intervalRef.current = window.setInterval(() => {
      setVisibleCount((current) => {
        const next = Math.min(parsed.length, current + 3);
        const visibleSlice = parsed.slice(0, next);
        const graph = deriveGraph(visibleSlice, next < parsed.length);
        setNodes(graph.nodes);
        setEdges(graph.edges);
        const pm: Record<number, string> = {};
        graph.partners.forEach((p, i) => { pm[i] = p; });
        setPartnerMap(pm);

        if (next === parsed.length) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          setIsReplaying(false);
          setStatus("Replay complete — 55 emitted fields landed across CFPB and GDELT partner chains.");
        }
        return next;
      });
    }, 100);
  }, []);

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (node.id === "user_tap") {
        setSelectedNode({
          id: "user_tap",
          label: "User Tap App Event",
          isPartner: false,
        });
      } else if (node.id.startsWith("partner_")) {
        const idx = parseInt(node.id.replace("partner_", ""), 10);
        const partnerName = partnerMap[idx];
        const partnerRecords = records.filter((r) => r.destination_partner === partnerName).slice(0, visibleCount);
        setSelectedNode({
          id: node.id,
          label: String(node.data?.label ?? ""),
          isPartner: true,
          partner: partnerName,
          records: partnerRecords,
        });
      }
      setPanelOpen(true);
    },
    [partnerMap, records, visibleCount]
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "var(--dna-bg)" }}>

      {/* ── Infocreon Header ───────────────────────────────────────────────── */}
      <header
        id="infocreon-header"
        className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3 border-b border-[#1e1b33] bg-[#07060f]/80 backdrop-blur-xl"
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/20 border border-violet-500/30">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#8b5cf6" strokeWidth="1.5" />
              <circle cx="7" cy="4.5" r="0.8" fill="#8b5cf6" />
              <rect x="6.25" y="6.5" width="1.5" height="4" rx="0.75" fill="#8b5cf6" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold tracking-[0.08em] text-slate-100">INFOCREON</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-violet-400/70 leading-none">Distribution & Demand Rail</p>
          </div>
        </div>

        {/* Center: Status pill */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#1e1b33] bg-[#110f20] px-4 py-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${isReplaying ? "bg-violet-400 animate-pulse" : "bg-emerald-400"}`} />
          <span className="text-xs text-slate-400 max-w-xs truncate">{isReplaying ? "Streaming..." : `${emittedCount}/55 fields`}</span>
        </div>

        {/* Right: Info icon */}
        <div className="relative">
          <button
            id="info-icon-btn"
            onClick={() => setMetaOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2650] bg-[#0d0b1a] text-slate-400 transition hover:border-violet-500/40 hover:text-violet-300"
            aria-label="Developer metadata"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="7.5" cy="4.8" r="0.9" fill="currentColor" />
              <rect x="6.7" y="6.8" width="1.6" height="4.2" rx="0.8" fill="currentColor" />
            </svg>
          </button>
          <MetaModal open={metaOpen} onClose={() => setMetaOpen(false)} />
        </div>
      </header>

      {/* ── 100% Full-Screen ReactFlow Stage ──────────────────────────────── */}
      <div className="absolute inset-0 pt-[52px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={handleNodeClick}
          fitView
          className="bg-transparent"
          style={{ background: "transparent" }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
        >
          {/* Custom starfield-style background */}
          <Background
            color="#2a2650"
            gap={24}
            size={1}
            style={{ background: "var(--dna-bg)" }}
          />
          <Controls
            showInteractive={false}
            className="!border-[#1e1b33] !bg-[#0d0b1a]"
          />
        </ReactFlow>

        {/* CTA overlay — bottom-left when panel closed */}
        {!panelOpen && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-auto"
          >
            <button
              id="trigger-main-btn"
              onClick={() => { setPanelOpen(true); handleTrigger(); }}
              disabled={isReplaying}
              className={`rounded-2xl px-8 py-4 text-sm font-bold tracking-wide transition shadow-2xl ${
                isReplaying
                  ? "cursor-not-allowed bg-[#1a1730] text-slate-500"
                  : "bg-violet-600 text-white shadow-violet-600/40 hover:bg-violet-500 hover:shadow-violet-500/50"
              }`}
            >
              {isReplaying ? "⚡ Streaming telemetry..." : "⚡ Trigger Single Tap Event"}
            </button>
            <p className="text-xs text-slate-600 text-center">
              Click a graph node or trigger a tap to open the Intelligence Panel
            </p>
          </div>
        )}
      </div>

      {/* ── Intelligence Slide-over Panel ─────────────────────────────────── */}
      <IntelligencePanel
        open={panelOpen}
        selected={selectedNode}
        onClose={() => { setPanelOpen(false); setSelectedNode(null); }}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        visibleCount={visibleCount}
        isReplaying={isReplaying}
        status={status}
        filteredRecords={filteredRecords}
        emittedCount={emittedCount}
        onTrigger={handleTrigger}
      />

    </div>
  );
}
