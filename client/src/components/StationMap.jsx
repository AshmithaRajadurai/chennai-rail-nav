import React, { useState, useRef } from 'react';
import { 
  Layers, 
  Eye, 
  MapPin, 
  Navigation, 
  Info, 
  Accessibility, 
  Sparkles, 
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { t } from '../utils/translations';
import { getNodeDisplayName, getNodeShortLabel } from '../utils/landmarkTranslations';

const NODE_COLORS = {
  gate: { bg: '#2563EB', ring: '#93C5FD', labelBg: '#1E3A8A' },
  platform: { bg: '#EA580C', ring: '#FDBA74', labelBg: '#7C2D12' },
  lift: { bg: '#059669', ring: '#6EE7B7', labelBg: '#064E3B' },
  stairs: { bg: '#DC2626', ring: '#FCA5A5', labelBg: '#7F1D1D' },
  ramp: { bg: '#10B981', ring: '#A7F3D0', labelBg: '#064E3B' },
  restroom: { bg: '#7C3AED', ring: '#C4B5FD', labelBg: '#4C1D95' },
  helpdesk: { bg: '#0891B2', ring: '#67E8F9', labelBg: '#164E63' },
  subway: { bg: '#0284C7', ring: '#7DD3FC', labelBg: '#0C4A6E' },
  fob: { bg: '#4F46E5', ring: '#A5B4FC', labelBg: '#312E81' },
  hall: { bg: '#475569', ring: '#CBD5E1', labelBg: '#1E293B' },
};

const LEGEND_LABELS = {
  gate: { en: 'Gate', ta: 'நுழைவு', te: 'గేట్', kn: 'ಗೇಟ್', ml: 'ഗേറ്റ്', hi: 'प्रवेश द्वार' },
  platform: { en: 'Platform', ta: 'பிளாட்பாரம்', te: 'ప్లాట్‌ఫారం', kn: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್', ml: 'പ്ലാറ്റ്‌ഫോം', hi: 'प्लेटफॉर्म' },
  lift: { en: 'Lift', ta: 'லிஃப்ட்', te: 'లిఫ్ట్', kn: 'ಲಿಫ್ಟ್', ml: 'ലിഫ്റ്റ്', hi: 'लिफ्ट' },
  stairs: { en: 'Stairs', ta: 'படிக்கட்டு', te: 'మెట్లు', kn: 'ಮೆಟ್ಟಿಲುಗಳು', ml: 'പടികൾ', hi: 'सीढ़ियाँ' },
  ramp: { en: 'Ramp', ta: 'ரேம்ப்', te: 'ర్యాంప్', kn: 'ರಾಂಪ್', ml: 'റാംപ്', hi: 'रैंप' },
  restroom: { en: 'Restroom', ta: 'கழிப்பறை', te: 'టాయిలెట్', kn: 'ಶೌಚಾಲಯ', ml: 'ടോय്ലറ്റ്', hi: 'शौचालय' },
};

/**
 * Custom collision-free label placements.
 * Alternating vertical placements prevent horizontal label overlap.
 */
const NODE_LABEL_OFFSETS = {
  // Station 1: MAS (Chennai Central)
  MAS_MAIN_GATE: { dy: -26 },
  MAS_MMC_GATE: { dy: 28 },
  MAS_CONCOURSE: { dy: -28 },
  MAS_DIVYANG: { dx: -55, dy: 16 },
  MAS_FOB_LIFT_MAIN: { dy: -26 },
  MAS_FOB_STAIRS_MAIN: { dy: 28 },
  MAS_FOB_DECK: { dx: 15, dy: -26 },
  MAS_P1: { dy: 30 },
  MAS_P2: { dy: -26 },
  MAS_P2_LIFT: { dy: -26 },
  MAS_P3_4: { dy: 30 },
  MAS_P5_6: { dy: -26 },
  MAS_P7_8: { dy: 30 },
  MAS_P9_12: { dy: -26 },

  // Station 2: MS (Chennai Egmore)
  MS_GATE_1: { dy: -26 },
  MS_DIVYANG_DESK: { dy: 30 },
  MS_MAIN_HALL: { dy: -26 },
  MS_P1: { dy: 30 },
  MS_P2_3: { dy: -26 },
  MS_P4_5: { dy: 30 },
  MS_P6_7: { dy: -26 },
  MS_P8_9: { dy: 30 },
  MS_P10_11: { dy: -26 },
  MS_GATE_2: { dy: 28 },
  MS_SUB_TUNNEL_A: { dy: -26 },
  MS_SUB_RAMP_P1: { dy: -26 },
  MS_SUB_STAIR_P1: { dy: 28 },
  MS_SUB_RAMP_P4: { dy: -26 },
  MS_SUB_STAIR_P4: { dy: 28 },

  // Station 3: TBM (Tambaram)
  TBM_WEST_GATE: { dx: -20, dy: -26 },
  TBM_EAST_GATE: { dx: 20, dy: -26 },
  TBM_WEST_RAMP: { dy: -24 },
  TBM_WEST_STAIRS: { dy: 28 },
  TBM_RESTROOM: { dy: -24 },
  TBM_FOB_1: { dy: -26 },
  TBM_FOB_2: { dy: -26 },
  TBM_FOB_3: { dy: -26 },
  TBM_FOB_4: { dy: -26 },
  TBM_P1_2: { dy: 30 },
  TBM_P3_4: { dy: 30 },
  TBM_P5_6: { dy: 30 },
  TBM_P7_8: { dy: 30 },
  TBM_P1_2_LIFT: { dx: -40, dy: -20 },
  TBM_P3_4_LIFT: { dx: -40, dy: -20 },
  TBM_P5_6_LIFT: { dx: -40, dy: -20 },
  TBM_P7_8_LIFT: { dx: -40, dy: -20 },
  TBM_P1_2_STAIRS: { dx: 40, dy: 20 },
  TBM_P3_4_STAIRS: { dx: 40, dy: 20 },
  TBM_P5_6_STAIRS: { dx: 40, dy: 20 },
  TBM_P7_8_STAIRS: { dx: 40, dy: 20 },
};

function renderNodeIcon(type) {
  switch (type) {
    case 'gate':
      return (
        <path
          d="M-5 6 V-3 A5 5 0 0 1 5 -3 V6 M-2 6 V0 A2 2 0 0 1 2 0 V6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      );
    case 'platform':
      return (
        <g>
          <rect x="-5" y="-6" width="10" height="9" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="1.4" />
          <line x1="-3.5" y1="-2" x2="3.5" y2="-2" stroke="#FFFFFF" strokeWidth="1.1" />
          <circle cx="-2.5" cy="1" r="0.8" fill="#FFFFFF" />
          <circle cx="2.5" cy="1" r="0.8" fill="#FFFFFF" />
          <line x1="-4" y1="3" x2="-6" y2="6" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="4" y1="3" x2="6" y2="6" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      );
    case 'lift':
      return (
        <g>
          <rect x="-6" y="-6" width="12" height="12" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="1.4" />
          <path d="M-4 1 L-2.5 -2 L-1 1" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 -1 L2.5 2 L4 -1" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case 'stairs':
      return (
        <path
          d="M-5 5 h3 v-3 h3 v-3 h4"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'ramp':
      return (
        <path
          d="M-6 5 L5 -1.5 M5 -1.5 H1"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'restroom':
      return (
        <text
          x="0"
          y="3.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="900"
          letterSpacing="0.5"
        >
          WC
        </text>
      );
    case 'helpdesk':
      return (
        <g>
          <circle cx="0" cy="-3.5" r="1.3" fill="#FFFFFF" />
          <line x1="0" y1="-1" x2="0" y2="4.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case 'fob':
      return (
        <path
          d="M-6 3 H6 M-4 3 V-2 H4 V3 M-4 -2 L0 -5 L4 -2"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'hall':
    default:
      return (
        <path
          d="M-5 4 V-1 L0 -4.5 L5 -1 V4 H-5 z M-1.5 4 V1 H1.5 V4"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      );
  }
}

export default function StationMap({
  station,
  nodes = [],
  edges = [],
  pathNodes = [],
  requireAccessible = false,
  startNodeId,
  endNodeId,
  onNodeClick,
  onSetStartNode,
  onSetEndNode,
  mapSelectionMode = null,
  onCancelMapSelectionMode,
  isHighContrast = false,
  isLargeText = false,
  language = 'en',
}) {
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [clickedNode, setClickedNode] = useState(null);

  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const dragDistanceRef = useRef(0);
  const touchStateRef = useRef({
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    initialDistance: 0,
    initialZoom: 1,
  });

  const activeStationId = station?.stationId || nodes[0]?.stationId || 'MAS';

  const floors = ['all', ...new Set(nodes.map((n) => n.floor))];

  const routePoints = pathNodes.map((n) => `${n.x},${n.y}`).join(' ');
  const pathNodeIds = new Set(pathNodes.map((n) => n.nodeId));

  const routeColor = isHighContrast 
    ? '#FACC15' 
    : requireAccessible 
    ? '#10B981' 
    : '#3B82F6';

  const glowColor = isHighContrast
    ? 'rgba(250, 204, 21, 0.65)'
    : requireAccessible
    ? 'rgba(16, 185, 129, 0.5)'
    : 'rgba(59, 130, 246, 0.5)';

  const nodeCoords = new Map();
  nodes.forEach((n) => nodeCoords.set(n.nodeId, { x: n.x, y: n.y, floor: n.floor }));

  const getFloorDisplayName = (f) => {
    if (f === 'all') return t('allDecks', language);
    if (f === 'Ground') return t('ground', language);
    if (f === 'Level 1') return t('level1', language);
    if (f === 'Subway') return t('subway', language);
    return f;
  };

  // Zoom and pan handlers
  const handleZoomIn = () => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => setZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    dragDistanceRef.current = 0;
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    dragDistanceRef.current += Math.abs(e.movementX) + Math.abs(e.movementY);
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  // Mobile Touch pan and pinch-zoom handlers
  const handleTouchStart = (e) => {
    dragDistanceRef.current = 0;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startPanX: pan.x,
        startPanY: pan.y,
        initialDistance: 0,
        initialZoom: zoom,
      };
      setIsPanning(true);
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      touchStateRef.current = {
        ...touchStateRef.current,
        initialDistance: dist,
        initialZoom: zoom,
      };
      setIsPanning(false);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isPanning) {
      const touch = e.touches[0];
      const dx = touch.clientX - touchStateRef.current.startX;
      const dy = touch.clientY - touchStateRef.current.startY;
      dragDistanceRef.current += Math.abs(dx) + Math.abs(dy);
      setPan({
        x: touchStateRef.current.startPanX + dx,
        y: touchStateRef.current.startPanY + dy,
      });
    } else if (e.touches.length === 2 && touchStateRef.current.initialDistance > 0) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const scaleMultiplier = dist / touchStateRef.current.initialDistance;
      const newZoom = Math.min(2.5, Math.max(0.75, +(touchStateRef.current.initialZoom * scaleMultiplier).toFixed(2)));
      dragDistanceRef.current = 25; // prevent treating pinch-zoom as a tap
      setZoom(newZoom);
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsPanning(false);
      touchStateRef.current.initialDistance = 0;
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStateRef.current.startX = touch.clientX;
      touchStateRef.current.startY = touch.clientY;
      touchStateRef.current.startPanX = pan.x;
      touchStateRef.current.startPanY = pan.y;
      setIsPanning(true);
    }
  };

  // Unified node selection handler for circle click or label pill click
  const handleNodeSelect = (node) => {
    // If user dragged more than 6px, treat as pan, not click
    if (dragDistanceRef.current > 6) return;

    if (mapSelectionMode === 'start') {
      if (onSetStartNode) onSetStartNode(node.nodeId);
      if (onCancelMapSelectionMode) onCancelMapSelectionMode();
      setClickedNode(null);
      return;
    }

    if (mapSelectionMode === 'destination') {
      if (onSetEndNode) onSetEndNode(node.nodeId);
      if (onCancelMapSelectionMode) onCancelMapSelectionMode();
      setClickedNode(null);
      return;
    }

    setClickedNode(node);
    if (onNodeClick) onNodeClick(node);
  };

  return (
    <div
      className={`rounded-2xl border shadow-sm overflow-hidden flex flex-col h-full transition-colors relative ${
        isHighContrast
          ? 'bg-black border-white text-yellow-400'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}
    >
      {/* Active Map Selection Mode Banner */}
      {mapSelectionMode && (
        <div
          className={`absolute top-14 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-2xl border flex items-center justify-between gap-2 max-w-[92vw] w-max animate-bounce ${
            mapSelectionMode === 'start'
              ? 'bg-blue-600 border-blue-400 text-white ring-4 ring-blue-500/30'
              : 'bg-emerald-600 border-emerald-400 text-white ring-4 ring-emerald-500/30'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin shrink-0" />
          <span className="text-[11px] sm:text-xs font-bold leading-tight">
            {mapSelectionMode === 'start'
              ? t('selectStartPrompt', language)
              : t('selectDestPrompt', language)}
          </span>
          <button
            type="button"
            onClick={onCancelMapSelectionMode}
            className="ml-2 bg-black/40 hover:bg-black/60 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Map Control Bar */}
      <div
        className={`p-3 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
          isHighContrast
            ? 'border-white bg-black'
            : 'border-slate-800/80 bg-slate-950/80 backdrop-blur-md'
        }`}
      >
        {/* Floor / Deck Switcher */}
        <div className="flex items-center space-x-2">
          <Layers
            className={`h-4 w-4 ${
              isHighContrast ? 'text-yellow-400' : 'text-slate-400'
            }`}
          />
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isHighContrast ? 'text-yellow-300' : 'text-slate-400'
            }`}
          >
            {t('floorDeck', language)}
          </span>
          <div
            className={`inline-flex rounded-lg p-0.5 text-xs font-semibold border ${
              isHighContrast
                ? 'bg-black border-white'
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            {floors.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFloor(f)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  selectedFloor === f
                    ? isHighContrast
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'bg-blue-600 text-white shadow-xs'
                    : isHighContrast
                    ? 'text-yellow-300 hover:text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {getFloorDisplayName(f)}
              </button>
            ))}
          </div>
        </div>

        {/* Route Status Tag & Zoom Controls */}
        <div className="flex items-center space-x-2">
          {pathNodes.length > 0 && (
            <div
              className={`flex items-center space-x-2 text-xs font-bold px-3 py-1 rounded-full border shadow-xs ${
                isHighContrast
                  ? 'border-yellow-400 bg-black text-yellow-400'
                  : requireAccessible
                  ? 'border-emerald-500/40 bg-emerald-950/70 text-emerald-300'
                  : 'border-blue-500/40 bg-blue-950/70 text-blue-300'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: routeColor }}
              ></span>
              <span>
                {requireAccessible
                  ? t('accessibleRouteBadge', language)
                  : t('standardRouteBadge', language)}
              </span>
            </div>
          )}

          {/* Quick Zoom Buttons */}
          <div
            className={`flex items-center rounded-lg border overflow-hidden p-0.5 ${
              isHighContrast
                ? 'border-white bg-black'
                : 'border-slate-800 bg-slate-800/80 text-slate-300'
            }`}
          >
            <button
              onClick={handleZoomIn}
              title={t('zoomIn', language)}
              className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-300 hover:text-white cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              title={t('zoomOut', language)}
              className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-300 hover:text-white cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title={t('resetZoom', language)}
              className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-300 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div
        className={`relative flex-1 overflow-hidden flex items-center justify-center min-h-[360px] sm:min-h-[460px] ${
          isHighContrast ? 'bg-black' : 'bg-slate-950'
        }`}
      >
        {/* Subtle Map Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${isHighContrast ? '#facc15' : '#475569'} 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <svg
          viewBox="0 0 800 600"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{ touchAction: 'none' }}
          className={`w-full h-full select-none ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={glowColor} />
            </filter>
            <marker
              id="routeArrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill={routeColor} />
            </marker>
          </defs>

          {/* Interactive Zoom/Pan Transform Container */}
          <g 
            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
            transformOrigin="400 300"
            className="transition-transform duration-75 ease-out"
          >
            {/* Outer Station Boundary */}
            <rect
              x="30"
              y="30"
              width="740"
              height="540"
              rx="24"
              fill={isHighContrast ? '#050505' : '#0B1120'}
              stroke={isHighContrast ? '#FFFFFF' : '#1E293B'}
              strokeWidth={isHighContrast ? '2.5' : '1.5'}
            />

            {/* Station Architecture Schematics */}
            {activeStationId === 'MAS' && (
              <g id="mas-architecture">
                <rect
                  x="50"
                  y="60"
                  width="260"
                  height="480"
                  rx="16"
                  fill={isHighContrast ? '#111111' : '#1E293B'}
                  fillOpacity="0.3"
                  stroke={isHighContrast ? '#FFFFFF' : '#334155'}
                  strokeDasharray="4 4"
                />
                <text
                  x="65"
                  y="90"
                  fill={isHighContrast ? '#FACC15' : '#94A3B8'}
                  fontSize="10.5"
                  fontWeight="800"
                  letterSpacing="1"
                >
                  {t('concourseAndEntry', language)}
                </text>

                <rect
                  x="320"
                  y="280"
                  width="210"
                  height="110"
                  rx="14"
                  fill={isHighContrast ? '#18181B' : '#312E81'}
                  fillOpacity="0.35"
                  stroke={isHighContrast ? '#FACC15' : '#6366F1'}
                  strokeDasharray="4 4"
                />
                <text
                  x="335"
                  y="305"
                  fill={isHighContrast ? '#FACC15' : '#A5B4FC'}
                  fontSize="10"
                  fontWeight="800"
                  letterSpacing="1"
                >
                  {t('fobSkywalk', language)}
                </text>

                <rect
                  x="370"
                  y="340"
                  width="380"
                  height="200"
                  rx="16"
                  fill={isHighContrast ? '#111111' : '#1E293B'}
                  fillOpacity="0.25"
                  stroke={isHighContrast ? '#FFFFFF' : '#334155'}
                  strokeDasharray="4 4"
                />
                <text
                  x="385"
                  y="525"
                  fill={isHighContrast ? '#FACC15' : '#64748B'}
                  fontSize="10"
                  fontWeight="800"
                  letterSpacing="1"
                >
                  {t('tracksAndPlatforms', language)}
                </text>

                <g id="mas-rail-tracks" opacity={isHighContrast ? 0.3 : 0.45}>
                  <line x1="420" y1="476" x2="740" y2="476" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <line x1="420" y1="484" x2="740" y2="484" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <rect x="415" y="473" width="5" height="14" rx="1" fill="#DC2626" />

                  <line x1="500" y1="436" x2="740" y2="436" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <line x1="500" y1="444" x2="740" y2="444" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <rect x="495" y="433" width="5" height="14" rx="1" fill="#DC2626" />

                  <line x1="580" y1="436" x2="740" y2="436" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <line x1="580" y1="444" x2="740" y2="444" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <rect x="575" y="433" width="5" height="14" rx="1" fill="#DC2626" />

                  <line x1="720" y1="376" x2="745" y2="376" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <line x1="720" y1="384" x2="745" y2="384" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <rect x="715" y="373" width="5" height="14" rx="1" fill="#DC2626" />
                </g>
              </g>
            )}

            {activeStationId === 'MS' && (
              <g id="ms-architecture">
                <rect
                  x="50"
                  y="380"
                  width="180"
                  height="160"
                  rx="16"
                  fill={isHighContrast ? '#111111' : '#1E293B'}
                  fillOpacity="0.3"
                  stroke={isHighContrast ? '#FFFFFF' : '#334155'}
                  strokeDasharray="4 4"
                />
                <text
                  x="60"
                  y="405"
                  fill={isHighContrast ? '#FACC15' : '#94A3B8'}
                  fontSize="10"
                  fontWeight="800"
                  letterSpacing="0.8"
                >
                  {t('concourseAndEntry', language)}
                </text>

                <rect
                  x="210"
                  y="320"
                  width="290"
                  height="90"
                  rx="14"
                  fill={isHighContrast ? '#18181B' : '#0C4A6E'}
                  fillOpacity="0.3"
                  stroke={isHighContrast ? '#38BDF8' : '#0284C7'}
                  strokeDasharray="4 4"
                />
                <text
                  x="225"
                  y="342"
                  fill={isHighContrast ? '#38BDF8' : '#7DD3FC'}
                  fontSize="9.5"
                  fontWeight="800"
                  letterSpacing="0.8"
                >
                  {t('subwayPassage', language)}
                </text>

                <rect
                  x="670"
                  y="150"
                  width="90"
                  height="100"
                  rx="14"
                  fill={isHighContrast ? '#111111' : '#1E293B'}
                  fillOpacity="0.3"
                  stroke={isHighContrast ? '#FFFFFF' : '#334155'}
                  strokeDasharray="4 4"
                />

                <g id="ms-tracks" opacity={isHighContrast ? 0.3 : 0.45}>
                  <line x1="230" y1="476" x2="740" y2="476" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <line x1="230" y1="484" x2="740" y2="484" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                </g>
              </g>
            )}

            {activeStationId === 'TBM' && (
              <g id="tbm-architecture">
                <rect
                  x="40"
                  y="140"
                  width="130"
                  height="260"
                  rx="16"
                  fill={isHighContrast ? '#111111' : '#1E293B'}
                  fillOpacity="0.3"
                  stroke={isHighContrast ? '#FFFFFF' : '#334155'}
                  strokeDasharray="4 4"
                />
                <text
                  x="48"
                  y="165"
                  fill={isHighContrast ? '#FACC15' : '#94A3B8'}
                  fontSize="9.5"
                  fontWeight="800"
                  letterSpacing="0.8"
                >
                  WEST BUS STAND
                </text>

                <rect
                  x="690"
                  y="220"
                  width="75"
                  height="160"
                  rx="16"
                  fill={isHighContrast ? '#111111' : '#1E293B'}
                  fillOpacity="0.3"
                  stroke={isHighContrast ? '#FFFFFF' : '#334155'}
                  strokeDasharray="4 4"
                />
                <text
                  x="695"
                  y="245"
                  fill={isHighContrast ? '#FACC15' : '#94A3B8'}
                  fontSize="9"
                  fontWeight="800"
                  letterSpacing="0.8"
                >
                  GST ROAD
                </text>

                <rect
                  x="180"
                  y="265"
                  width="500"
                  height="75"
                  rx="12"
                  fill={isHighContrast ? '#18181B' : '#312E81'}
                  fillOpacity="0.3"
                  stroke={isHighContrast ? '#FACC15' : '#6366F1'}
                  strokeDasharray="4 4"
                />
                <text
                  x="200"
                  y="285"
                  fill={isHighContrast ? '#FACC15' : '#A5B4FC'}
                  fontSize="9.5"
                  fontWeight="800"
                  letterSpacing="0.8"
                >
                  {t('fobSkywalk', language)}
                </text>

                <g id="tbm-tracks" opacity={isHighContrast ? 0.3 : 0.45}>
                  <line x1="190" y1="456" x2="670" y2="456" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                  <line x1="190" y1="464" x2="670" y2="464" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 4" />
                </g>
              </g>
            )}

            {/* Station Edges */}
            <g id="station-edges">
              {edges.map((edge) => {
                const from = nodeCoords.get(edge.fromNode);
                const to = nodeCoords.get(edge.toNode);
                if (!from || !to) return null;

                const isEdgeOnDeck = selectedFloor === 'all' || (from.floor === selectedFloor || to.floor === selectedFloor);
                if (!isEdgeOnDeck && selectedFloor !== 'all') return null;

                const isOut = edge.isOperational === false;
                const isPathEdge = pathNodeIds.has(edge.fromNode) && pathNodeIds.has(edge.toNode);

                return (
                  <g key={`${edge.stationId}_${edge.fromNode}_${edge.toNode}`}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={
                        isOut 
                          ? '#EF4444' 
                          : isHighContrast 
                          ? '#71717A' 
                          : isPathEdge 
                          ? 'rgba(100, 116, 139, 0.4)' 
                          : '#334155'
                      }
                      strokeWidth={isOut ? 3.5 : edge.hasStairs ? 2 : 2.5}
                      strokeDasharray={isOut ? '6 4' : edge.hasStairs ? '3 3' : 'none'}
                      strokeOpacity={isOut ? 1 : isPathEdge ? 0.3 : 0.6}
                    />
                    {isOut && (
                      <circle
                        cx={(from.x + to.x) / 2}
                        cy={(from.y + to.y) / 2}
                        r="6"
                        fill="#EF4444"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* Active Route Polyline Layer */}
            {routePoints && (
              <g id="active-route" filter="url(#routeGlow)">
                <polyline
                  points={routePoints}
                  fill="none"
                  stroke={routeColor}
                  strokeWidth="8"
                  strokeOpacity="0.45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points={routePoints}
                  fill="none"
                  stroke={routeColor}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points={routePoints}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#routeArrow)"
                  className="animate-route-flow"
                />
              </g>
            )}

            {/* Interactive Station Nodes */}
            <g id="station-nodes">
              {nodes.map((node) => {
                const colorInfo = NODE_COLORS[node.type] || NODE_COLORS.hall;
                const isStart = node.nodeId === startNodeId;
                const isEnd = node.nodeId === endNodeId;
                const isOnPath = pathNodeIds.has(node.nodeId);
                const isHovered = hoveredNode?.nodeId === node.nodeId;

                const isDeckMatch = selectedFloor === 'all' || node.floor === selectedFloor;
                const nodeOpacity = isDeckMatch ? (pathNodes.length > 0 && !isOnPath && !isStart && !isEnd ? 0.7 : 1) : 0.15;

                const nodeBg = isHighContrast
                  ? isStart
                    ? '#3B82F6'
                    : isEnd
                    ? '#10B981'
                    : isOnPath
                    ? '#FACC15'
                    : '#27272A'
                  : isStart
                  ? '#2563EB'
                  : isEnd
                  ? '#059669'
                  : isOnPath
                  ? '#D97706'
                  : colorInfo.bg;

                const radius = isStart || isEnd ? 18 : isOnPath || isHovered ? 16 : 14;

                return (
                  <g
                    key={node.nodeId}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeSelect(node);
                    }}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer transition-all duration-200"
                    opacity={nodeOpacity}
                  >
                    {isStart && (
                      <circle
                        r="24"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3.5"
                        className="animate-ping opacity-75"
                      />
                    )}

                    {isEnd && (
                      <circle
                        r="24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3.5"
                        className="animate-ping opacity-75"
                      />
                    )}

                    <circle
                      r={radius}
                      fill={nodeBg}
                      stroke={
                        isHighContrast
                          ? '#FFFFFF'
                          : isStart
                          ? '#93C5FD'
                          : isEnd
                          ? '#6EE7B7'
                          : isOnPath
                          ? '#FDE047'
                          : colorInfo.ring
                      }
                      strokeWidth={isStart || isEnd || isOnPath ? 3 : 1.5}
                      className="shadow-md"
                    />

                    <g transform="scale(0.95)" className="pointer-events-none">
                      {renderNodeIcon(node.type)}
                    </g>

                    {node.isAccessible && (
                      <circle
                        cx="10"
                        cy="-10"
                        r="4.5"
                        fill="#10B981"
                        stroke={isHighContrast ? '#FFFFFF' : '#0F172A'}
                        strokeWidth="1.5"
                      />
                    )}

                    {isStart && (
                      <g transform="translate(0, -36)" className="pointer-events-none drop-shadow-md">
                        <rect
                          x="-36"
                          y="-10"
                          width="72"
                          height="20"
                          rx="10"
                          fill="#2563EB"
                          stroke="#FFFFFF"
                          strokeWidth="1.8"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="9.5"
                          fontWeight="900"
                          letterSpacing="0.6"
                        >
                          📍 {t('startPin', language)}
                        </text>
                      </g>
                    )}

                    {isEnd && (
                      <g transform="translate(0, -36)" className="pointer-events-none drop-shadow-md">
                        <rect
                          x="-48"
                          y="-10"
                          width="96"
                          height="20"
                          rx="10"
                          fill="#059669"
                          stroke="#FFFFFF"
                          strokeWidth="1.8"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="9.5"
                          fontWeight="900"
                          letterSpacing="0.6"
                        >
                          🏁 {t('destPin', language)}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Clickable Non-Overlapping Backdrop Pill Labels Layer */}
            <g id="station-labels">
              {nodes.map((node) => {
                const isStart = node.nodeId === startNodeId;
                const isEnd = node.nodeId === endNodeId;
                const isOnPath = pathNodeIds.has(node.nodeId);
                const isDeckMatch = selectedFloor === 'all' || node.floor === selectedFloor;

                if (!isDeckMatch && selectedFloor !== 'all') return null;

                const labelText = getNodeShortLabel(node, language);

                const offsetConfig = NODE_LABEL_OFFSETS[node.nodeId] || {
                  dy: node.y > 320 ? 30 : -26,
                };

                const lx = node.x + (offsetConfig.dx || 0);
                const ly = node.y + (offsetConfig.dy || 0);

                const pillWidth = Math.max(48, labelText.length * 7.5 + 16);

                return (
                  <g
                    key={`label_${node.nodeId}`}
                    transform={`translate(${lx}, ${ly})`}
                    opacity={pathNodes.length > 0 && !isOnPath && !isStart && !isEnd ? 0.75 : 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeSelect(node);
                    }}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={-pillWidth / 2}
                      y="-10"
                      width={pillWidth}
                      height="20"
                      rx="6"
                      fill={isHighContrast ? '#000000' : 'rgba(15, 23, 42, 0.92)'}
                      stroke={
                        isStart
                          ? '#3B82F6'
                          : isEnd
                          ? '#10B981'
                          : isOnPath
                          ? '#FACC15'
                          : isHighContrast
                          ? '#FFFFFF'
                          : 'rgba(71, 85, 105, 0.5)'
                      }
                      strokeWidth={isOnPath || isStart || isEnd ? 1.8 : 1}
                      className="shadow-sm hover:stroke-blue-400 transition-colors"
                    />

                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={
                        isHighContrast
                          ? '#FFFFFF'
                          : isStart
                          ? '#93C5FD'
                          : isEnd
                          ? '#6EE7B7'
                          : isOnPath
                          ? '#FDE047'
                          : '#F1F5F9'
                      }
                      fontSize={isLargeText ? '11' : '10'}
                      fontWeight={isOnPath || isStart || isEnd ? '800' : '600'}
                      letterSpacing="0.2"
                      className="select-none pointer-events-none"
                    >
                      {labelText}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
        </svg>

        {/* Hovered / Clicked Node Interactive Detail Card with Quick Action Buttons */}
        {(hoveredNode || clickedNode) && (
          <div
            className={`absolute bottom-3 left-3 right-3 sm:bottom-auto sm:top-3 sm:left-auto sm:right-3 text-xs p-3 sm:p-3.5 rounded-xl border shadow-2xl sm:max-w-xs z-20 space-y-2.5 transition-all ${
              isHighContrast
                ? 'bg-black border-white text-yellow-400'
                : 'bg-slate-900/95 backdrop-blur-md border-slate-700 text-white'
            }`}
          >
            {(() => {
              const activeNode = clickedNode || hoveredNode;
              return (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            NODE_COLORS[activeNode.type]?.bg || '#94A3B8',
                        }}
                      ></span>
                      {getNodeDisplayName(activeNode, language)}
                    </div>
                    {clickedNode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setClickedNode(null);
                        }}
                        className="text-slate-400 hover:text-white font-bold px-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className={`space-y-1 text-xs ${isHighContrast ? 'text-yellow-200' : 'text-slate-300'}`}>
                    <div>
                      {t('deck', language)}:{' '}
                      <span className="font-semibold text-white">{getFloorDisplayName(activeNode.floor)}</span>
                      {' • '}
                      {t('type', language)}:{' '}
                      <span className="capitalize font-semibold text-white">{activeNode.type}</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      <Accessibility className={`w-3.5 h-3.5 ${activeNode.isAccessible ? 'text-emerald-400' : 'text-amber-400'}`} />
                      <span className={activeNode.isAccessible ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                        {activeNode.isAccessible ? t('stepFree', language) : t('stairs', language)}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Action Buttons: Set as Start / Set as Destination */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSetStartNode) onSetStartNode(activeNode.nodeId);
                        setClickedNode(null);
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] flex items-center justify-center gap-1 shadow-xs cursor-pointer transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      {t('setAsStart', language)}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onSetEndNode) onSetEndNode(activeNode.nodeId);
                        setClickedNode(null);
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] flex items-center justify-center gap-1 shadow-xs cursor-pointer transition-colors"
                    >
                      <Navigation className="w-3 h-3" />
                      {t('setAsDest', language)}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div
        className={`p-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs shrink-0 ${
          isHighContrast
            ? 'border-white bg-black text-yellow-400'
            : 'border-slate-800 bg-slate-900/90 text-slate-400'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          {Object.entries(LEGEND_LABELS).map(([key, labels]) => (
            <div key={key} className="flex items-center space-x-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-xs shrink-0"
                style={{ backgroundColor: NODE_COLORS[key]?.bg || '#94A3B8' }}
              ></span>
              <span className={`text-[11px] ${isHighContrast ? 'text-white' : 'text-slate-300'}`}>
                {labels[language] || labels.en}
              </span>
            </div>
          ))}
        </div>
        <div
          className={`flex items-center space-x-1 text-[11px] font-semibold ${
            isHighContrast ? 'text-yellow-400' : 'text-emerald-400'
          }`}
        >
          <Accessibility className="h-3.5 w-3.5" />
          <span>{t('stepFreeCertified', language)}</span>
        </div>
      </div>
    </div>
  );
}
