"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Controls, Edge, MarkerType, Node } from "reactflow";
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import "reactflow/dist/style.css";

const API_URL = "http://127.0.0.1:8000/api/exhaust-data";
const FILTER_KEYS = ["all", "device", "location", "network", "ad_identifiers", "biometrics"] as const;
type CategoryKey = "app_events" | "sdk_telemetry" | "location_matrices" | "ad_request_sequences";
type FilterKey = (typeof FILTER_KEYS)[number];

type ExhaustRecord = {
  field_id: string;
  field_name: string;
  category: CategoryKey;
  source_type: string;
  destination_partner: string;
  display_category: FilterKey;
  authenticity: string;
  authenticity_style: string;
  normalized_category: CategoryKey;
};

type BackendRecord = Omit<ExhaustRecord, "normalized_category" | "authenticity" | "authenticity_style">;

type PayloadItem = {
  field_id?: string;
  id?: string;
  field_name?: string;
  data_field?: string;
  category?: string;
  data_category?: string;
  source_type?: string;
  ingestion_protocol?: string;
  destination_partner?: string;
  data_partner_recipient?: string;
  display_category?: FilterKey;
};

type GraphNodeData = {
  label: string;
  partner?: boolean;
};

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  app_events: "App Events",
  sdk_telemetry: "SDK Telemetry",
  location_matrices: "Location Matrices",
  ad_request_sequences: "Ad Request Sequences",
};

const FILTER_LABELS: Record<FilterKey, string> = {
  all: "All Fields",
  device: "Device",
  location: "Location",
  network: "Network",
  ad_identifiers: "Ad Identifiers",
  biometrics: "Biometrics",
};

const AUTHENTICITY_LABELS: Record<CategoryKey, string> = {
  app_events: "Synthetic App Event",
  sdk_telemetry: "Synthetic SDK Telemetry",
  location_matrices: "Ingested GDELT Open-Telemetry",
  ad_request_sequences: "Ingested CFPB Privacy Schema",
};

const AUTHENTICITY_STYLES: Record<CategoryKey, string> = {
  app_events: "bg-sky-500/10 text-sky-200 border-sky-600",
  sdk_telemetry: "bg-violet-500/10 text-violet-200 border-violet-600",
  location_matrices: "bg-emerald-500/10 text-emerald-200 border-emerald-600",
  ad_request_sequences: "bg-amber-500/10 text-amber-200 border-amber-600",
};

const PARTNER_NAMES = [
  "TradeDesk SSP",
  "LiveRamp Identity Graph",
  "GDELT OpenStream",
  "CFPB Privacy Sentinel",
  "Meta Network",
];

const CATEGORY_ACCENT: Record<CategoryKey, string> = {
  app_events: "bg-emerald-500/15 text-emerald-200 border-emerald-700",
  sdk_telemetry: "bg-sky-500/15 text-sky-200 border-sky-700",
  location_matrices: "bg-violet-500/15 text-violet-200 border-violet-700",
  ad_request_sequences: "bg-orange-500/15 text-orange-200 border-orange-700",
};

const CENTRAL_NODE: Node<GraphNodeData> = {
  id: "user_tap",
  type: "input",
  data: { label: "📱 User Tap App Event" },
  position: { x: 320, y: 220 },
  style: {
    background: "#dc2626",
    color: "#ffffff",
    border: "2px solid #991b1b",
    borderRadius: "22px",
    padding: 18,
    fontWeight: 700,
    boxShadow: "0 0 30px rgba(220, 38, 38, 0.45)",
  },
};

const baseNodeStyle = {
  background: "#0f172a",
  color: "#f8fafc",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: 14,
};

const PRESET_RECORDS: BackendRecord[] = [
  { field_id: "A01", field_name: "Touch Pressure", category: "app_events", source_type: "UI_PRESSURE_SENSOR", destination_partner: "CFPB Privacy Sentinel", display_category: "device" },
  { field_id: "A02", field_name: "Tap Duration", category: "app_events", source_type: "UI_TAP_TIMER", destination_partner: "GDELT OpenStream", display_category: "device" },
  { field_id: "A03", field_name: "Scroll Velocity", category: "app_events", source_type: "UI_SCROLL_TRACKER", destination_partner: "CFPB Privacy Sentinel", display_category: "network" },
  { field_id: "A04", field_name: "Swipe Angle", category: "app_events", source_type: "GESTURE_VECTOR", destination_partner: "GDELT OpenStream", display_category: "network" },
  { field_id: "A05", field_name: "Haptic Intensity", category: "app_events", source_type: "FEEDBACK_EMITTER", destination_partner: "Meta Network", display_category: "biometrics" },
  { field_id: "A06", field_name: "Gesture Confidence", category: "app_events", source_type: "MOTION_AI", destination_partner: "CFPB Privacy Sentinel", display_category: "biometrics" },
  { field_id: "A07", field_name: "Idle Touch Count", category: "app_events", source_type: "UI_ACTIVITY_MONITOR", destination_partner: "LiveRamp Identity Graph", display_category: "device" },
  { field_id: "A08", field_name: "Long Press Depth", category: "app_events", source_type: "PRESSURE_DURATION_SDK", destination_partner: "GDELT OpenStream", display_category: "device" },
  { field_id: "A09", field_name: "Session Foreground Time", category: "app_events", source_type: "APP_LIFECYCLE", destination_partner: "LiveRamp Identity Graph", display_category: "device" },
  { field_id: "A10", field_name: "Screen Brightness Level", category: "app_events", source_type: "DISPLAY_STATE", destination_partner: "Meta Network", display_category: "device" },
  { field_id: "A11", field_name: "Keyboard AutoFill Trigger", category: "app_events", source_type: "UI_AUTOFILL_EVENT", destination_partner: "CFPB Privacy Sentinel", display_category: "network" },
  { field_id: "A12", field_name: "Touch Heatmap Zone", category: "app_events", source_type: "TOUCH_HEATMAP_ENGINE", destination_partner: "GDELT OpenStream", display_category: "device" },
  { field_id: "A13", field_name: "App Pause Reason", category: "app_events", source_type: "LIFECYCLE_HOOK", destination_partner: "LiveRamp Identity Graph", display_category: "device" },
  { field_id: "A14", field_name: "Foreground App Switch", category: "app_events", source_type: "FOCUS_CHANGE", destination_partner: "Meta Network", display_category: "device" },

  { field_id: "B01", field_name: "IMEI Leak", category: "sdk_telemetry", source_type: "DEVICE_ID_SDK", destination_partner: "TradeDesk SSP", display_category: "device" },
  { field_id: "B02", field_name: "Battery Level", category: "sdk_telemetry", source_type: "POWER_MONITOR_SDK", destination_partner: "LiveRamp Identity Graph", display_category: "device" },
  { field_id: "B03", field_name: "Storage Capacity", category: "sdk_telemetry", source_type: "DISK_METRICS_SDK", destination_partner: "CFPB Privacy Sentinel", display_category: "device" },
  { field_id: "B04", field_name: "OS Shard", category: "sdk_telemetry", source_type: "OS_FINGERPRINTING", destination_partner: "GDELT OpenStream", display_category: "network" },
  { field_id: "B05", field_name: "Device Model", category: "sdk_telemetry", source_type: "HARDWARE_INVENTORY", destination_partner: "TradeDesk SSP", display_category: "device" },
  { field_id: "B06", field_name: "Firmware Version", category: "sdk_telemetry", source_type: "SYSTEM_AGENT", destination_partner: "LiveRamp Identity Graph", display_category: "device" },
  { field_id: "B07", field_name: "Sensor Sampling Rate", category: "sdk_telemetry", source_type: "SENSOR_ENGINE", destination_partner: "Meta Network", display_category: "device" },
  { field_id: "B08", field_name: "SDK Version", category: "sdk_telemetry", source_type: "SDK_MANAGEMENT", destination_partner: "GDELT OpenStream", display_category: "device" },
  { field_id: "B09", field_name: "Crash Session ID", category: "sdk_telemetry", source_type: "CRASH_REPORTER", destination_partner: "TradeDesk SSP", display_category: "network" },
  { field_id: "B10", field_name: "Memory Snapshot", category: "sdk_telemetry", source_type: "MEMORY_PROFILER", destination_partner: "LiveRamp Identity Graph", display_category: "device" },
  { field_id: "B11", field_name: "Installed Package Hash", category: "sdk_telemetry", source_type: "SOFTWARE_INVENTORY", destination_partner: "CFPB Privacy Sentinel", display_category: "device" },
  { field_id: "B12", field_name: "API Request Signature", category: "sdk_telemetry", source_type: "SDK_PROXY", destination_partner: "GDELT OpenStream", display_category: "network" },
  { field_id: "B13", field_name: "Bluetooth Probe ID", category: "sdk_telemetry", source_type: "RADIO_SCAN_SERVICE", destination_partner: "TradeDesk SSP", display_category: "network" },
  { field_id: "B14", field_name: "Network Stack Fingerprint", category: "sdk_telemetry", source_type: "NETWORK_FINGERPRINT", destination_partner: "LiveRamp Identity Graph", display_category: "network" },

  { field_id: "C01", field_name: "GPS Coordinates", category: "location_matrices", source_type: "CORE_LOCATION_SDK", destination_partner: "GDELT OpenStream", display_category: "location" },
  { field_id: "C02", field_name: "Altitude Mesh", category: "location_matrices", source_type: "BAROMETER_SERVICE", destination_partner: "CFPB Privacy Sentinel", display_category: "location" },
  { field_id: "C03", field_name: "WiFi BSSID Beacons", category: "location_matrices", source_type: "WIFI_SCANNER", destination_partner: "TradeDesk SSP", display_category: "location" },
  { field_id: "C04", field_name: "Cell Tower Triangulation", category: "location_matrices", source_type: "CELL_LOCATOR", destination_partner: "LiveRamp Identity Graph", display_category: "location" },
  { field_id: "C05", field_name: "BLE Beacon IDs", category: "location_matrices", source_type: "BLE_SCAN_AGENT", destination_partner: "GDELT OpenStream", display_category: "location" },
  { field_id: "C06", field_name: "Geofence Entry Point", category: "location_matrices", source_type: "GEOFENCE_ENGINE", destination_partner: "CFPB Privacy Sentinel", display_category: "location" },
  { field_id: "C07", field_name: "Compass Heading", category: "location_matrices", source_type: "MAGNETOMETER", destination_partner: "TradeDesk SSP", display_category: "location" },
  { field_id: "C08", field_name: "Location Blur Radius", category: "location_matrices", source_type: "PRIVACY_PROXY", destination_partner: "LiveRamp Identity Graph", display_category: "location" },
  { field_id: "C09", field_name: "Satellite Count", category: "location_matrices", source_type: "GNSS_MONITOR", destination_partner: "GDELT OpenStream", display_category: "location" },
  { field_id: "C10", field_name: "Horizontal Accuracy", category: "location_matrices", source_type: "GPS_ACCURACY", destination_partner: "CFPB Privacy Sentinel", display_category: "location" },
  { field_id: "C11", field_name: "Location History Delta", category: "location_matrices", source_type: "LOCATION_DIFFS", destination_partner: "TradeDesk SSP", display_category: "location" },
  { field_id: "C12", field_name: "Map Tile Probe", category: "location_matrices", source_type: "MAPS_API_CLIENT", destination_partner: "LiveRamp Identity Graph", display_category: "location" },
  { field_id: "C13", field_name: "Indoor Position Signal", category: "location_matrices", source_type: "INDOOR_NAVIGATION", destination_partner: "GDELT OpenStream", display_category: "location" },
  { field_id: "C14", field_name: "Location Data Hash", category: "location_matrices", source_type: "PRIVACY_HASHER", destination_partner: "CFPB Privacy Sentinel", display_category: "location" },

  { field_id: "D01", field_name: "IDFA Hash", category: "ad_request_sequences", source_type: "AD_ID_SDK", destination_partner: "TradeDesk SSP", display_category: "ad_identifiers" },
  { field_id: "D02", field_name: "GAID Hash", category: "ad_request_sequences", source_type: "AD_ID_SDK", destination_partner: "LiveRamp Identity Graph", display_category: "ad_identifiers" },
  { field_id: "D03", field_name: "Auction ID Key", category: "ad_request_sequences", source_type: "RTB_BID_STREAM", destination_partner: "TradeDesk SSP", display_category: "network" },
  { field_id: "D04", field_name: "Ad Slot Dimensions", category: "ad_request_sequences", source_type: "AD_SLOT_SERVICE", destination_partner: "CFPB Privacy Sentinel", display_category: "network" },
  { field_id: "D05", field_name: "Bid Request Timestamp", category: "ad_request_sequences", source_type: "BID_STREAM_HANDLER", destination_partner: "GDELT OpenStream", display_category: "network" },
  { field_id: "D06", field_name: "Publisher Zone ID", category: "ad_request_sequences", source_type: "PUBLISHER_TAGGER", destination_partner: "TradeDesk SSP", display_category: "network" },
  { field_id: "D07", field_name: "Impression Timecode", category: "ad_request_sequences", source_type: "IMPRESSION_PIXEL", destination_partner: "LiveRamp Identity Graph", display_category: "network" },
  { field_id: "D08", field_name: "Ad Request Latency", category: "ad_request_sequences", source_type: "NETWORK_PROFILER", destination_partner: "CFPB Privacy Sentinel", display_category: "network" },
  { field_id: "D09", field_name: "RTB Bid Token", category: "ad_request_sequences", source_type: "TOKENIZER", destination_partner: "GDELT OpenStream", display_category: "network" },
  { field_id: "D10", field_name: "Cookie Sync Hash", category: "ad_request_sequences", source_type: "SYNC_AGENT", destination_partner: "TradeDesk SSP", display_category: "ad_identifiers" },
  { field_id: "D11", field_name: "Inventory Quality Score", category: "ad_request_sequences", source_type: "QUALITY_SCORER", destination_partner: "LiveRamp Identity Graph", display_category: "network" },
  { field_id: "D12", field_name: "Buyer Segment Tag", category: "ad_request_sequences", source_type: "AUDIENCE_ENGINE", destination_partner: "CFPB Privacy Sentinel", display_category: "network" },
  { field_id: "D13", field_name: "Device Targeting Vector", category: "ad_request_sequences", source_type: "TARGETING_SDK", destination_partner: "Meta Network", display_category: "ad_identifiers" },
];

const FALLBACK_RECORDS: ExhaustRecord[] = PRESET_RECORDS.map((record, index) => normalizeRecord(record, index));

const normalizeCategory = (category?: string): CategoryKey => {
  const normalized = (category ?? "app_events").toLowerCase();

  if (normalized.includes("event") || normalized.includes("touch") || normalized.includes("app")) return "app_events";
  if (normalized.includes("sdk") || normalized.includes("battery") || normalized.includes("device") || normalized.includes("imei")) return "sdk_telemetry";
  if (normalized.includes("gps") || normalized.includes("location") || normalized.includes("wifi") || normalized.includes("altitude")) return "location_matrices";
  if (normalized.includes("ad") || normalized.includes("auction") || normalized.includes("bid") || normalized.includes("cookie")) return "ad_request_sequences";

  return "app_events";
};

const normalizeFilterCategory = (displayCategory?: FilterKey, category?: CategoryKey): FilterKey => {
  if (displayCategory && displayCategory !== "all") return displayCategory;
  switch (category) {
    case "sdk_telemetry":
      return "device";
    case "location_matrices":
      return "location";
    case "ad_request_sequences":
      return "ad_identifiers";
    default:
      return "device";
  }
};

const normalizeRecord = (item: PayloadItem | BackendRecord, index: number): ExhaustRecord => {
  const categorySource = (() => {
    if ("category" in item && item.category) return item.category;
    if ("data_category" in item && item.data_category) return item.data_category;
    return "app_events";
  })();

  const category = normalizeCategory(categorySource);

  const source_type = (() => {
    if ("source_type" in item && item.source_type) return item.source_type;
    if ("ingestion_protocol" in item && item.ingestion_protocol) return item.ingestion_protocol;
    return "UNKNOWN_INGESTION";
  })();

  const destination_partner = (() => {
    if ("destination_partner" in item && item.destination_partner) return item.destination_partner;
    if ("data_partner_recipient" in item && item.data_partner_recipient) return item.data_partner_recipient;
    return "CFPB Privacy Sentinel";
  })();

  const display_category = ("display_category" in item && item.display_category) ? item.display_category : normalizeFilterCategory(undefined, category);
  const authenticity = AUTHENTICITY_LABELS[category];
  const authenticity_style = AUTHENTICITY_STYLES[category];

  const field_id = ("field_id" in item && item.field_id) ? item.field_id : ("id" in item && item.id ? item.id : `EXH-${index + 1}`);
  const field_name = ("field_name" in item && item.field_name) ? item.field_name : ("data_field" in item && item.data_field ? item.data_field : `Field ${index + 1}`);

  return {
    field_id,
    field_name,
    category,
    source_type,
    destination_partner,
    display_category,
    authenticity,
    authenticity_style,
    normalized_category: category,
  };
};

const createPartnerNodes = (partners: string[]): Node<GraphNodeData>[] => {
  const radius = 210;
  return partners.map((partner) => {
    const index = PARTNER_NAMES.indexOf(partner);
    const angle = (Math.PI * 2 * index) / PARTNER_NAMES.length;
    const x = 320 + Math.cos(angle) * radius;
    const y = 220 + Math.sin(angle) * radius;

    return {
      id: `partner_${index}`,
      data: { label: `🔗 ${partner}`, partner: true },
      position: { x, y },
      style: {
        ...baseNodeStyle,
        width: 195,
        textAlign: "center" as const,
        background: "#111827",
      },
    };
  });
};

const createPartnerEdges = (partners: string[], active: boolean): Edge[] =>
  partners.map((partner) => {
    const index = PARTNER_NAMES.indexOf(partner);
    return {
      id: `edge_${index}`,
      source: "user_tap",
      target: `partner_${index}`,
      animated: active,
      style: {
        stroke: "#f97316",
        strokeWidth: 3,
        strokeDasharray: active ? "12 8" : undefined,
        opacity: active ? 0.96 : 0.7,
      },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
    };
  });

const buildGraph = (records: ExhaustRecord[], active: boolean) => {
  const partners = PARTNER_NAMES.filter((partner) =>
    records.some((record) => record.destination_partner === partner),
  );
  return {
    nodes: [CENTRAL_NODE, ...createPartnerNodes(partners)],
    edges: createPartnerEdges(partners, active),
  };
};

const columnHelper = createColumnHelper<ExhaustRecord>();

const tableColumns = [
  columnHelper.accessor("field_id", {
    header: () => "Field ID",
    cell: (info) => <span className="font-semibold text-slate-100">{info.getValue()}</span>,
  }),
  columnHelper.accessor("field_name", {
    header: () => "Data Field",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("authenticity", {
    header: () => "Data Authenticity",
    cell: (info) => {
      const row = info.row.original;
      return (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em] ${row.authenticity_style}`}>
          {info.getValue()}
        </span>
      );
    },
  }),
  columnHelper.accessor("category", {
    header: () => "Vector",
    cell: (info) => (
      <span className={`inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em] ${CATEGORY_ACCENT[info.getValue() as CategoryKey]}`}>
        {CATEGORY_LABELS[info.getValue() as CategoryKey]}
      </span>
    ),
  }),
  columnHelper.accessor("source_type", {
    header: () => "Ingestion Source",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("destination_partner", {
    header: () => "Destination Partner",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];

export default function Home() {
  const [visibleRecords, setVisibleRecords] = useState<ExhaustRecord[]>([]);
  const [nodes, setNodes] = useState<Node<GraphNodeData>[]>([CENTRAL_NODE]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [emittedCount, setEmittedCount] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [status, setStatus] = useState("Ready to stream telemetry across CFPB + GDELT ingestion schemas.");
  const intervalRef = useRef<number | null>(null);

  const filteredRecords = useMemo(
    () =>
      visibleRecords.filter((record) =>
        activeFilter === "all" ? true : record.display_category === activeFilter,
      ),
    [visibleRecords, activeFilter],
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleTrigger = async () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    setIsReplaying(true);
    setEmittedCount(0);
    setVisibleRecords([]);
    setStatus("Fetching 55 telemetry fields from the FastAPI ingestion endpoint...");

    let payload: unknown = [];
    let fallback = false;

    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      payload = await response.json();
      if (!Array.isArray(payload) || payload.length === 0) {
        throw new Error("Invalid payload");
      }
    } catch (error) {
      console.warn("FastAPI request failed, using embedded fallback stream.", error);
      payload = FALLBACK_RECORDS;
      fallback = true;
    }

    const parsedRecords = (payload as PayloadItem[]).map(normalizeRecord);

    setNodes([CENTRAL_NODE]);
    setEdges([]);
    setStatus(fallback ? "FastAPI unreachable; replaying built-in 55-field fallback stream." : "Live payload accepted; streaming telemetry burst now.");

    let current = 0;
    intervalRef.current = window.setInterval(() => {
      current = Math.min(parsedRecords.length, current + 3);
      setVisibleRecords(parsedRecords.slice(0, current));
      setEmittedCount(current);

      const nextGraph = buildGraph(parsedRecords.slice(0, current), current < parsedRecords.length);
      setNodes(nextGraph.nodes);
      setEdges(nextGraph.edges);

      if (current >= parsedRecords.length) {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        setIsReplaying(false);
        setStatus("Replay complete — 55 telemetry fields emitted across CFPB and GDELT partner nodes.");
      }
    }, 100);
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredRecords,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-400 px-6 py-8">
        <header className="rounded-4xl border border-slate-800 bg-slate-900/95 p-10 shadow-[0_25px_120px_-45px_rgba(15,23,42,0.9)]">
          <p className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm uppercase tracking-[0.3em] text-emerald-300">
            intership
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-50 sm:text-6xl">
            INFORCREON
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 font-medium">
            Distribution & Demand Intelligence
          </p>
        </header>

        <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
          <aside className="rounded-[1.75rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/40">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Core Rail</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-100">Distribution & Demand</h2>
                <p className="mt-3 text-slate-400">
                  Live telemetry burst with CFPB / GDELT ingestion context, partner node spawning, and vector-filtered payload replay.
                </p>
              </div>

              <button
                type="button"
                onClick={handleTrigger}
                disabled={isReplaying}
                className={`w-full rounded-3xl px-6 py-4 text-lg font-semibold transition ${
                  isReplaying
                    ? "bg-slate-800 text-slate-400"
                    : "bg-orange-500 text-slate-950 shadow-2xl shadow-orange-500/20 hover:bg-orange-400"
                }`}
              >
                {isReplaying ? "Streaming telemetry burst..." : "Trigger Single Tap Event"}
              </button>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/85 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Status</p>
                    <p className="mt-2 text-base text-slate-100">{status}</p>
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                    {emittedCount}/55 emitted
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/85 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Filters</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {FILTER_KEYS.map((filterKey) => (
                    <button
                      key={filterKey}
                      type="button"
                      onClick={() => setActiveFilter(filterKey)}
                      className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                        activeFilter === filterKey
                          ? "border-orange-400 bg-orange-500/15 text-orange-200"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {FILTER_LABELS[filterKey]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Partner Chain Graph</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-100">Automated Target Node Topology</h2>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-400">
                  {new Set(visibleRecords.map((record) => record.destination_partner)).size} partner nodes
                </div>
              </div>
              <div className="mt-6 h-140 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80">
                <ReactFlow nodes={nodes} edges={edges} fitView>
                  <Background color="#334155" gap={18} size={1} />
                  <Controls showInteractive={false} />
                </ReactFlow>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/40">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Emitted Data Exhaust</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-100">CFPB + GDELT Table Replay</h2>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-400">
                  Showing {FILTER_LABELS[activeFilter]}
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
                <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-300">
                  <thead className="bg-slate-900 text-slate-400">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} className="px-5 py-4 uppercase tracking-[0.22em] text-slate-400">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => {
                      const isRevealed = row.index < emittedCount;
                      return (
                        <tr
                          key={row.id}
                          className={`${isRevealed ? "bg-slate-950/80 text-slate-100" : "bg-slate-900/70 text-slate-500"} border-b border-slate-800 transition`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-5 py-4 align-top">
                              {flexRender(
                                cell.column.columnDef.cell as unknown as (ctx: unknown) => React.ReactNode,
                                cell.getContext(),
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
