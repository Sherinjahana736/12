(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/data exhause demooo/data exhause demooo/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/data exhause demooo/data exhause demooo/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__ = __turbopack_context__.i("[project]/Desktop/data exhause demooo/data exhause demooo/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript) <export ReactFlow as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/data exhause demooo/data exhause demooo/node_modules/@reactflow/background/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/data exhause demooo/data exhause demooo/node_modules/@reactflow/controls/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/data exhause demooo/data exhause demooo/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// ─── Types ──────────────────────────────────────────────────────────────────
// Relative URL — Next.js rewrites proxy this to the backend service
// Works in local dev (→ localhost:8000) AND in Docker (→ backend:8000)
const API_URL = "/api/exhaust-data";
const CATEGORY_KEYS = [
    "device",
    "location",
    "network",
    "ad_identifiers",
    "biometrics"
];
// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORY_LABELS = {
    device: "Device",
    location: "Location",
    network: "Network",
    ad_identifiers: "Ad Identifiers",
    biometrics: "Biometrics"
};
const CATEGORY_ACCENT = {
    device: "bg-emerald-500/15 text-emerald-200 border-emerald-700",
    location: "bg-sky-500/15 text-sky-200 border-sky-700",
    network: "bg-violet-500/15 text-violet-200 border-violet-700",
    ad_identifiers: "bg-orange-500/15 text-orange-200 border-orange-700",
    biometrics: "bg-rose-500/15 text-rose-200 border-rose-700"
};
const CENTRAL_NODE = {
    id: "user_tap",
    type: "input",
    data: {
        label: "📱 User Tap App Event"
    },
    position: {
        x: 320,
        y: 220
    },
    style: {
        background: "linear-gradient(135deg, #7c3aed 0%, #4f1bad 100%)",
        color: "#ffffff",
        border: "2px solid #8b5cf6",
        borderRadius: "20px",
        padding: "16px 20px",
        fontWeight: 700,
        fontSize: "13px",
        boxShadow: "0 0 40px rgba(124,58,237,0.55), 0 0 80px rgba(124,58,237,0.2)"
    }
};
const baseNodeStyle = {
    background: "#0d0b1a",
    color: "#e8e4f8",
    border: "1px solid #2a2650",
    borderRadius: "16px",
    padding: 14,
    fontSize: "12px"
};
// ─── Data Normalization ───────────────────────────────────────────────────────
const normalizeCategory = (category)=>{
    const n = (category ?? "device").toLowerCase();
    if (n.includes("device")) return "device";
    if (n.includes("location")) return "location";
    if (n.includes("network")) return "network";
    if (n.includes("ad") || n.includes("identifier")) return "ad_identifiers";
    if (n.includes("biometric")) return "biometrics";
    return "device";
};
const normalizeRecord = (item, index, usedFallback = false)=>{
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
        authenticity: usedFallback || String(source_type).toLowerCase().includes("synthetic") ? "synthetic" : "unknown"
    };
};
const fallbackRecords = Array.from({
    length: 55
}, (_, index)=>{
    const templates = [
        {
            field_name: "IMEI Number",
            category: "device",
            source_type: "SDK_BACKGROUND_PING",
            destination_partner: "TradeDesk SSP"
        },
        {
            field_name: "Battery Level & Temperature",
            category: "device",
            source_type: "OS_PROPERTY_POLL",
            destination_partner: "LiveRamp Identity Graph"
        },
        {
            field_name: "GPS Latitude/Longitude",
            category: "location",
            source_type: "CORE_LOCATION_SDK",
            destination_partner: "GDELT OpenStream"
        },
        {
            field_name: "WiFi BSSID & Signal Strength",
            category: "location",
            source_type: "NETWORK_SCAN",
            destination_partner: "CFPB Feed"
        },
        {
            field_name: "Carrier Name & IP Address",
            category: "network",
            source_type: "SOCKET_PROBE",
            destination_partner: "TradeDesk SSP"
        },
        {
            field_name: "IDFA / GAID Token",
            category: "ad_identifiers",
            source_type: "AD_REQUEST_SEQUENCE",
            destination_partner: "LiveRamp Identity Graph"
        },
        {
            field_name: "Touch Pressure & Surface Area",
            category: "biometrics",
            source_type: "UI_EVENT_LOOP",
            destination_partner: "GDELT OpenStream"
        },
        {
            field_name: "Foreground App Session",
            category: "ad_identifiers",
            source_type: "USER_INTERACTION_LOG",
            destination_partner: "CFPB Feed"
        }
    ];
    const template = templates[index % templates.length];
    return {
        field_id: `EXH-${index + 1}`,
        field_name: `${template.field_name} [${index + 1}]`,
        category: template.category,
        source_type: template.source_type,
        destination_partner: template.destination_partner,
        normalized_category: normalizeCategory(template.category)
    };
});
// ─── Graph Builders ───────────────────────────────────────────────────────────
const buildPartnerNodes = (partners)=>{
    const radius = 190;
    return partners.map((partner, index)=>{
        const angle = Math.PI * 2 * index / Math.max(partners.length, 1);
        const x = 320 + Math.cos(angle) * radius;
        const y = 240 + Math.sin(angle) * radius;
        return {
            id: `partner_${index}`,
            data: {
                label: `🔗 ${partner}`
            },
            position: {
                x,
                y
            },
            style: {
                ...baseNodeStyle,
                width: 200,
                textAlign: "center",
                background: "#110f20",
                cursor: "pointer"
            }
        };
    });
};
const buildPartnerEdges = (partners, animated)=>partners.map((_, index)=>({
            id: `edge_${index}`,
            source: "user_tap",
            target: `partner_${index}`,
            animated,
            style: {
                stroke: "#8b5cf6",
                strokeWidth: animated ? 3 : 2,
                opacity: animated ? 0.92 : 0.55,
                strokeDasharray: animated ? "10 6" : undefined
            },
            markerEnd: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkerType"].ArrowClosed,
                color: "#8b5cf6"
            }
        }));
const deriveGraph = (records, animated)=>{
    const partners = Array.from(new Set(records.map((r)=>r.destination_partner)));
    return {
        nodes: [
            CENTRAL_NODE,
            ...buildPartnerNodes(partners)
        ],
        edges: buildPartnerEdges(partners, animated),
        partners
    };
};
// ─── Sub-components ───────────────────────────────────────────────────────────
/** Minimalist close button */ const CloseBtn = ({ onClick })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        id: "close-panel-btn",
        onClick: onClick,
        className: "flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2650] bg-[#0d0b1a] text-slate-400 transition hover:border-violet-500/40 hover:text-violet-300",
        "aria-label": "Close intelligence panel",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 14 14",
            fill: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M1 1l12 12M13 1L1 13",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
            lineNumber: 199,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
        lineNumber: 193,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = CloseBtn;
/** Intel Panel — slides in from right */ const IntelligencePanel = ({ open, selected, onClose, activeCategory, setActiveCategory, visibleCount, isReplaying, status, filteredRecords, emittedCount, onTrigger })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `intelligence-panel ${open ? "open" : ""}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full border-l border-[#1e1b33] bg-[#0d0b1a]/95 backdrop-blur-2xl flex flex-col shadow-[−8px_0_60px_rgba(124,58,237,0.18)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-[#1e1b33] px-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs uppercase tracking-[0.26em] text-violet-400",
                                    children: "Intelligence Panel"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-1 text-base font-semibold text-slate-100",
                                    children: selected ? selected.isPartner ? `🔗 ${selected.partner}` : "📱 Central Tap Event" : "System Overview"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                            lineNumber: 236,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseBtn, {
                            onClick: onClose
                        }, void 0, false, {
                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                            lineNumber: 242,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                    lineNumber: 235,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "panel-scroll flex-1 px-6 py-5 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "trigger-tap-btn",
                                    onClick: onTrigger,
                                    disabled: isReplaying,
                                    className: `w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition ${isReplaying ? "cursor-not-allowed bg-[#1a1730] text-slate-500" : "bg-violet-600 text-white shadow-lg shadow-violet-600/25 hover:bg-violet-500"}`,
                                    children: isReplaying ? "⚡ Streaming telemetry..." : "⚡ Trigger Single Tap Event"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-1.5 w-full rounded-full bg-[#1e1b33]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full rounded-full bg-violet-500 transition-all duration-150",
                                        style: {
                                            width: `${emittedCount / 55 * 100}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500",
                                    children: [
                                        emittedCount,
                                        "/55 fields emitted"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                            lineNumber: 249,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-[#1e1b33] bg-[#110f20] p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs uppercase tracking-[0.22em] text-violet-400/70 mb-2",
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-300 leading-relaxed",
                                    children: status
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 276,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                            lineNumber: 274,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        selected && selected.isPartner && selected.records && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-[#2a2650] bg-[#110f20] p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs uppercase tracking-[0.22em] text-violet-400/70 mb-3",
                                    children: "Partner Intel"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-slate-100 mb-1",
                                    children: selected.partner
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 283,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500 mb-3",
                                    children: [
                                        selected.records.length,
                                        " fields routed to this partner"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 max-h-48 overflow-y-auto panel-scroll",
                                    children: selected.records.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-2 rounded-lg border border-[#1e1b33] bg-[#0d0b1a] px-3 py-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-mono text-violet-300",
                                                    children: r.field_id
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-slate-400 truncate flex-1 mx-2",
                                                    children: r.field_name
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase ${CATEGORY_ACCENT[r.normalized_category]}`,
                                                    children: CATEGORY_LABELS[r.normalized_category]
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, r.field_id, true, {
                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-[#1e1b33] bg-[#110f20] p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs uppercase tracking-[0.22em] text-violet-400/70 mb-3",
                                    children: "Filter Fields"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 301,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: [
                                        "all",
                                        ...CATEGORY_KEYS
                                    ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            id: `filter-${cat}`,
                                            type: "button",
                                            onClick: ()=>setActiveCategory(cat),
                                            className: `rounded-xl border px-3 py-1.5 text-xs font-medium transition ${activeCategory === cat ? "border-violet-400 bg-violet-500/15 text-violet-200" : "border-[#1e1b33] bg-[#0d0b1a] text-slate-400 hover:border-[#2a2650]"}`,
                                            children: cat === "all" ? "All Fields" : CATEGORY_LABELS[cat]
                                        }, String(cat), false, {
                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 302,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                            lineNumber: 300,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-[#1e1b33] bg-[#110f20] overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-3 border-b border-[#1e1b33]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.22em] text-violet-400/70",
                                        children: [
                                            "Emitted Fields — ",
                                            filteredRecords.length,
                                            " shown"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                        lineNumber: 324,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "panel-scroll max-h-96",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left text-xs text-slate-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "sticky top-0 bg-[#0d0b1a] border-b border-[#1e1b33]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2.5 uppercase tracking-[0.2em] text-slate-500",
                                                            children: "ID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2.5 uppercase tracking-[0.2em] text-slate-500",
                                                            children: "Field"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2.5 uppercase tracking-[0.2em] text-slate-500",
                                                            children: "Category"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                            lineNumber: 334,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2.5 uppercase tracking-[0.2em] text-slate-500",
                                                            children: "Partner"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: [
                                                    filteredRecords.map((record, index)=>{
                                                        const revealed = index < visibleCount;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: `border-b border-[#1a1730] transition ${revealed ? "text-slate-200 row-revealed" : "text-slate-600"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2.5 font-mono text-violet-300",
                                                                    children: record.field_id
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                                    lineNumber: 348,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2.5 max-w-[100px] truncate",
                                                                    children: record.field_name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                                    lineNumber: 349,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2.5",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `inline-flex rounded-full border px-2 py-0.5 text-[10px] uppercase ${CATEGORY_ACCENT[record.normalized_category]}`,
                                                                        children: CATEGORY_LABELS[record.normalized_category]
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                                        lineNumber: 351,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                                    lineNumber: 350,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2.5 text-slate-400 max-w-[80px] truncate",
                                                                    children: record.destination_partner
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                                    lineNumber: 355,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, record.field_id, true, {
                                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }),
                                                    filteredRecords.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 4,
                                                            className: "px-4 py-8 text-center text-slate-600",
                                                            children: "Trigger a tap to stream records"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                lineNumber: 338,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 328,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                            lineNumber: 322,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                    lineNumber: 246,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
            lineNumber: 233,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
        lineNumber: 231,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = IntelligencePanel;
// ─── Metadata Modal ───────────────────────────────────────────────────────────
const MetaModal = ({ open, onClose })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[60]",
                onClick: onClose,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `meta-modal absolute right-0 top-12 z-[70] w-72 rounded-2xl border border-[#2a2650] bg-[#0d0b1a]/98 backdrop-blur-2xl p-5 shadow-2xl shadow-black/60 ${open ? "open" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.28em] text-violet-400",
                                children: "Developer Signature"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 388,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "close-meta-btn",
                                onClick: onClose,
                                className: "flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:text-slate-300 transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "10",
                                    height: "10",
                                    viewBox: "0 0 10 10",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M1 1l8 8M9 1L1 9",
                                        stroke: "currentColor",
                                        strokeWidth: "1.6",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 389,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                        lineNumber: 387,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaRow, {
                                label: "Architect",
                                value: "jahana sharin"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 400,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaRow, {
                                label: "Batch",
                                value: "Batch 2 Interns"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 401,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaRow, {
                                label: "Rail",
                                value: "Distribution & Demand"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 402,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-[#1e1b33] bg-[#110f20] p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-[0.22em] text-violet-400/70 mb-2",
                                        children: "Stack"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                        lineNumber: 404,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1.5",
                                        children: [
                                            "Next.js 16",
                                            "FastAPI",
                                            "Tailwind CSS v4",
                                            "React Flow"
                                        ].map((tech)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-0.5 text-[11px] text-violet-300",
                                                children: tech
                                            }, tech, false, {
                                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                                lineNumber: 407,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                        lineNumber: 405,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 403,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-2 border-t border-[#1e1b33]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-slate-600",
                                    children: "Real Rails Intelligence Library · CFPB · GDELT"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 413,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                        lineNumber: 399,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                lineNumber: 386,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
_c2 = MetaModal;
const MetaRow = ({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                lineNumber: 423,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-semibold text-slate-200",
                children: value
            }, void 0, false, {
                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                lineNumber: 424,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
        lineNumber: 422,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = MetaRow;
function Home() {
    _s();
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [nodes, setNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        CENTRAL_NODE
    ]);
    const [edges, setEdges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isReplaying, setIsReplaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("A single mobile interaction emits CFPB data points and GDELT-style open telemetry into partner chains.");
    const [panelOpen, setPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedNode, setSelectedNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [metaOpen, setMetaOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [partnerMap, setPartnerMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const emittedCount = visibleCount;
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const filteredRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[filteredRecords]": ()=>{
            if (activeCategory === "all") return records;
            return records.filter({
                "Home.useMemo[filteredRecords]": (r)=>r.normalized_category === activeCategory
            }["Home.useMemo[filteredRecords]"]);
        }
    }["Home.useMemo[filteredRecords]"], [
        records,
        activeCategory
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            return ({
                "Home.useEffect": ()=>{
                    if (intervalRef.current) window.clearInterval(intervalRef.current);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    const handleTrigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleTrigger]": async ()=>{
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            setIsReplaying(true);
            setVisibleCount(0);
            setStatus("Loading 55 mobile exhaust records from the live FastAPI stream...");
            let payloadItems = [];
            let usedFallback = false;
            try {
                const response = await fetch(API_URL, {
                    headers: {
                        "Content-Type": "application/json"
                    }
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
            let parsed = payloadItems.map({
                "Home.useCallback[handleTrigger].parsed": (record, index)=>normalizeRecord(record, index, usedFallback)
            }["Home.useCallback[handleTrigger].parsed"]);
            if (parsed.length < 55) {
                const missing = 55 - parsed.length;
                const fill = fallbackRecords.slice(0, missing).map({
                    "Home.useCallback[handleTrigger].fill": (r, i)=>normalizeRecord(r, parsed.length + i, true)
                }["Home.useCallback[handleTrigger].fill"]);
                parsed = parsed.concat(fill);
            }
            setRecords(parsed);
            const { nodes: initialNodes, edges: initialEdges, partners } = deriveGraph(parsed, true);
            const pMap = {};
            partners.forEach({
                "Home.useCallback[handleTrigger]": (p, i)=>{
                    pMap[i] = p;
                }
            }["Home.useCallback[handleTrigger]"]);
            setPartnerMap(pMap);
            setNodes(initialNodes);
            setEdges(initialEdges);
            setStatus(usedFallback ? "Fallback stream active. Replaying local data." : "Live payload accepted — streaming distribution & demand leak paths...");
            intervalRef.current = window.setInterval({
                "Home.useCallback[handleTrigger]": ()=>{
                    setVisibleCount({
                        "Home.useCallback[handleTrigger]": (current)=>{
                            const next = Math.min(parsed.length, current + 3);
                            const visibleSlice = parsed.slice(0, next);
                            const graph = deriveGraph(visibleSlice, next < parsed.length);
                            setNodes(graph.nodes);
                            setEdges(graph.edges);
                            const pm = {};
                            graph.partners.forEach({
                                "Home.useCallback[handleTrigger]": (p, i)=>{
                                    pm[i] = p;
                                }
                            }["Home.useCallback[handleTrigger]"]);
                            setPartnerMap(pm);
                            if (next === parsed.length) {
                                if (intervalRef.current) window.clearInterval(intervalRef.current);
                                setIsReplaying(false);
                                setStatus("Replay complete — 55 emitted fields landed across CFPB and GDELT partner chains.");
                            }
                            return next;
                        }
                    }["Home.useCallback[handleTrigger]"]);
                }
            }["Home.useCallback[handleTrigger]"], 100);
        }
    }["Home.useCallback[handleTrigger]"], []);
    const handleNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleNodeClick]": (_event, node)=>{
            if (node.id === "user_tap") {
                setSelectedNode({
                    id: "user_tap",
                    label: "User Tap App Event",
                    isPartner: false
                });
            } else if (node.id.startsWith("partner_")) {
                const idx = parseInt(node.id.replace("partner_", ""), 10);
                const partnerName = partnerMap[idx];
                const partnerRecords = records.filter({
                    "Home.useCallback[handleNodeClick].partnerRecords": (r)=>r.destination_partner === partnerName
                }["Home.useCallback[handleNodeClick].partnerRecords"]).slice(0, visibleCount);
                setSelectedNode({
                    id: node.id,
                    label: String(node.data?.label ?? ""),
                    isPartner: true,
                    partner: partnerName,
                    records: partnerRecords
                });
            }
            setPanelOpen(true);
        }
    }["Home.useCallback[handleNodeClick]"], [
        partnerMap,
        records,
        visibleCount
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-screen h-screen overflow-hidden",
        style: {
            background: "var(--dna-bg)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                id: "infocreon-header",
                className: "absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3 border-b border-[#1e1b33] bg-[#07060f]/80 backdrop-blur-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/20 border border-violet-500/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 14 14",
                                    fill: "none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "7",
                                            cy: "7",
                                            r: "6",
                                            stroke: "#8b5cf6",
                                            strokeWidth: "1.5"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                            lineNumber: 556,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "7",
                                            cy: "4.5",
                                            r: "0.8",
                                            fill: "#8b5cf6"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                            lineNumber: 557,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "6.25",
                                            y: "6.5",
                                            width: "1.5",
                                            height: "4",
                                            rx: "0.75",
                                            fill: "#8b5cf6"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 555,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 554,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold tracking-[0.08em] text-slate-100",
                                        children: "INFOCREON"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                        lineNumber: 562,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-[0.25em] text-violet-400/70 leading-none",
                                        children: "Distribution & Demand Rail"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                        lineNumber: 563,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                        lineNumber: 553,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:flex items-center gap-2 rounded-full border border-[#1e1b33] bg-[#110f20] px-4 py-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `h-1.5 w-1.5 rounded-full ${isReplaying ? "bg-violet-400 animate-pulse" : "bg-emerald-400"}`
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 569,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-400 max-w-xs truncate",
                                children: isReplaying ? "Streaming..." : `${emittedCount}/55 fields`
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                        lineNumber: 568,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "info-icon-btn",
                                onClick: ()=>setMetaOpen((v)=>!v),
                                className: "flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2650] bg-[#0d0b1a] text-slate-400 transition hover:border-violet-500/40 hover:text-violet-300",
                                "aria-label": "Developer metadata",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "15",
                                    height: "15",
                                    viewBox: "0 0 15 15",
                                    fill: "none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "7.5",
                                            cy: "7.5",
                                            r: "6.5",
                                            stroke: "currentColor",
                                            strokeWidth: "1.4"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "7.5",
                                            cy: "4.8",
                                            r: "0.9",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                            lineNumber: 583,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "6.7",
                                            y: "6.8",
                                            width: "1.6",
                                            height: "4.2",
                                            rx: "0.8",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                            lineNumber: 584,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                    lineNumber: 581,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 575,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaModal, {
                                open: metaOpen,
                                onClose: ()=>setMetaOpen(false)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 587,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                        lineNumber: 574,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                lineNumber: 548,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pt-[52px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__["default"], {
                        nodes: nodes,
                        edges: edges,
                        onNodeClick: handleNodeClick,
                        fitView: true,
                        className: "bg-transparent",
                        style: {
                            background: "transparent"
                        },
                        nodesDraggable: false,
                        nodesConnectable: false,
                        elementsSelectable: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Background"], {
                                color: "#2a2650",
                                gap: 24,
                                size: 1,
                                style: {
                                    background: "var(--dna-bg)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 605,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"], {
                                showInteractive: false,
                                className: "!border-[#1e1b33] !bg-[#0d0b1a]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 611,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                        lineNumber: 593,
                        columnNumber: 9
                    }, this),
                    !panelOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "trigger-main-btn",
                                onClick: ()=>{
                                    setPanelOpen(true);
                                    handleTrigger();
                                },
                                disabled: isReplaying,
                                className: `rounded-2xl px-8 py-4 text-sm font-bold tracking-wide transition shadow-2xl ${isReplaying ? "cursor-not-allowed bg-[#1a1730] text-slate-500" : "bg-violet-600 text-white shadow-violet-600/40 hover:bg-violet-500 hover:shadow-violet-500/50"}`,
                                children: isReplaying ? "⚡ Streaming telemetry..." : "⚡ Trigger Single Tap Event"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 622,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-600 text-center",
                                children: "Click a graph node or trigger a tap to open the Intelligence Panel"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                                lineNumber: 634,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                        lineNumber: 619,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                lineNumber: 592,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$data__exhause__demooo$2f$data__exhause__demooo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IntelligencePanel, {
                open: panelOpen,
                selected: selectedNode,
                onClose: ()=>{
                    setPanelOpen(false);
                    setSelectedNode(null);
                },
                activeCategory: activeCategory,
                setActiveCategory: setActiveCategory,
                visibleCount: visibleCount,
                isReplaying: isReplaying,
                status: status,
                filteredRecords: filteredRecords,
                emittedCount: emittedCount,
                onTrigger: handleTrigger
            }, void 0, false, {
                fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
                lineNumber: 642,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/data exhause demooo/data exhause demooo/frontend/app/page.tsx",
        lineNumber: 545,
        columnNumber: 5
    }, this);
}
_s(Home, "sGoXdeYXEQlMANOs/nbGlA/xPcM=");
_c4 = Home;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CloseBtn");
__turbopack_context__.k.register(_c1, "IntelligencePanel");
__turbopack_context__.k.register(_c2, "MetaModal");
__turbopack_context__.k.register(_c3, "MetaRow");
__turbopack_context__.k.register(_c4, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_data%20exhause%20demooo_data%20exhause%20demooo_frontend_app_page_tsx_19s--_j._.js.map