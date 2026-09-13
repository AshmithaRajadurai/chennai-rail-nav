import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  MapPin, 
  Navigation, 
  Info, 
  Accessibility, 
  Sparkles, 
  AlertTriangle 
} from 'lucide-react';
import { t } from '../utils/translations';
import { getNodeDisplayName } from '../utils/landmarkTranslations';

const NODE_COLORS = {
  gate: { bg: '#2563EB', ring: '#93C5FD' },
  platform: { bg: '#EA580C', ring: '#FDBA74' },
  lift: { bg: '#059669', ring: '#6EE7B7' },
  stairs: { bg: '#DC2626', ring: '#FCA5A5' },
  ramp: { bg: '#10B981', ring: '#A7F3D0' },
  restroom: { bg: '#7C3AED', ring: '#C4B5FD' },
  helpdesk: { bg: '#0891B2', ring: '#67E8F9' },
  subway: { bg: '#0284C7', ring: '#7DD3FC' },
  fob: { bg: '#4F46E5', ring: '#A5B4FC' },
  hall: { bg: '#475569', ring: '#CBD5E1' },
};

const LEGEND_LABELS = {
  gate: { en: 'Gate', ta: 'நுழைவு', te: 'గేట్', kn: 'ಗೇಟ್', ml: 'ഗേറ്റ്', hi: 'प्रवेश द्वार' },
  platform: { en: 'Platform', ta: 'பிளாட்பாரம்', te: 'ప్లాట్‌ఫారం', kn: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್', ml: 'പ്ലാറ്റ്‌ഫോം', hi: 'प्लेटफॉर्म' },
  lift: { en: 'Lift', ta: 'லிஃப்ட்', te: 'లిఫ్ట్', kn: 'ಲಿಫ್ಟ್', ml: 'ലിഫ്റ്റ്', hi: 'लिफ्ट' },
  stairs: { en: 'Stairs', ta: 'படிக்கட்டு', te: 'మెట్లు', kn: 'ಮೆಟ್ಟಿಲುಗಳು', ml: 'പടികൾ', hi: 'सीढ़ियाँ' },
  ramp: { en: 'Ramp', ta: 'ரேம்ப்', te: 'ర్యాంప్', kn: 'ರಾಂಪ್', ml: 'റാംപ്', hi: 'रैंप' },
  restroom: { en: 'Restroom', ta: 'கழிப்பறை', te: 'టాయిలెట్', kn: 'ಶೌಚಾಲಯ', ml: 'ടോയ്ലറ്റ്', hi: 'शौचालय' },
};

export default function StationMap({
  station,
  nodes = [],
  edges = [],
  pathNodes = [],
  requireAccessible = false,
  startNodeId,
  endNodeId,
  onNodeClick,
  isHighContrast = false,
  isLargeText = false,
  language = 'en',
}) {
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [hoveredNode, setHoveredNode] = useState(null);

  const floors = ['all', ...new Set(nodes.map((n) => n.floor))];

  const filteredNodes = selectedFloor === 'all' 
    ? nodes 
    : nodes.filter((n) => n.floor === selectedFloor);

  const routePoints = pathNodes.map((n) => `${n.x},${n.y}`).join(' ');
  const pathNodeIds = new Set(pathNodes.map((n) => n.nodeId));

  const routeColor = isHighContrast 
    ? '#FACC15' 
    : requireAccessible 
    ? '#10B981' 
    : '#2563EB';

  const glowColor = isHighContrast
    ? 'rgba(250, 204, 21, 0.6)'
    : requireAccessible
    ? 'rgba(16, 185, 129, 0.4)'
    : 'rgba(37, 99, 235, 0.4)';

  const nodeCoords = new Map();
  nodes.forEach((n) => nodeCoords.set(n.nodeId, { x: n.x, y: n.y, floor: n.floor }));

  const filteredEdges = edges.filter((e) => {
    if (selectedFloor === 'all') return true;
    const from = nodeCoords.get(e.fromNode);
    const to = nodeCoords.get(e.toNode);
    return from && to && (from.floor === selectedFloor || to.floor === selectedFloor);
  });

  const getFloorDisplayName = (f) => {
    if (f === 'all') return t('allDecks', language);
    if (f === 'Ground') return t('ground', language);
    if (f === 'Level 1') return t('level1', language);
    if (f === 'Subway') return t('subway', language);
    return f;
  };

  return (
    <div
      className={`rounded-2xl border shadow-sm overflow-hidden flex flex-col h-full transition-colors ${
        isHighContrast
          ? 'bg-black border-white text-yellow-400'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Map Control Bar */}
      <div
        className={`p-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${
          isHighContrast
            ? 'border-white bg-black'
            : 'border-slate-100 bg-slate-50/70'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Layers
            className={`h-4 w-4 ${
              isHighContrast ? 'text-yellow-400' : 'text-slate-500'
            }`}
          />
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isHighContrast ? 'text-yellow-300' : 'text-slate-600'
            }`}
          >
            {t('floorDeck', language)}
          </span>
          <div
            className={`inline-flex rounded-lg p-0.5 text-xs font-semibold border ${
              isHighContrast
                ? 'bg-black border-white'
                : 'bg-slate-200/80 border-transparent'
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
                      : 'bg-white text-slate-900 shadow-xs'
                    : isHighContrast
                    ? 'text-yellow-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {getFloorDisplayName(f)}
              </button>
            ))}
          </div>
        </div>

        {/* Route Status Tag */}
        {pathNodes.length > 0 && (
          <div
            className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full border shadow-xs ${
              isHighContrast
                ? 'border-yellow-400 bg-black text-yellow-400'
                : requireAccessible
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-blue-200 bg-blue-50 text-blue-800'
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
      </div>

      {/* SVG Canvas Area */}
      <div
        className={`relative flex-1 p-2 sm:p-4 overflow-hidden flex items-center justify-center min-h-[460px] ${
          isHighContrast ? 'bg-black' : 'bg-slate-950'
        }`}
      >
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${isHighContrast ? '#facc15' : '#64748b'} 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <svg
          viewBox="0 0 800 600"
          className="w-full h-full max-h-[620px] select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={glowColor} />
            </filter>
          </defs>

          {/* Station Building Outline */}
          <rect
            x="40"
            y="40"
            width="720"
            height="520"
            rx="24"
            fill={isHighContrast ? '#050505' : '#0F172A'}
            stroke={isHighContrast ? '#FFFFFF' : '#1E293B'}
            strokeWidth={isHighContrast ? '3' : '2'}
          />

          {/* Zone Dividers */}
          <rect
            x="70"
            y="70"
            width="220"
            height="460"
            rx="16"
            fill={isHighContrast ? '#111111' : '#1E293B'}
            fillOpacity="0.4"
            stroke={isHighContrast ? '#FFFFFF' : '#334155'}
            strokeDasharray="4 4"
          />
          <text
            x="85"
            y="100"
            fill={isHighContrast ? '#FACC15' : '#64748B'}
            fontSize="11"
            fontWeight="700"
            letterSpacing="1"
          >
            {t('entrancePrsHall', language)}
          </text>

          <rect
            x="320"
            y="70"
            width="210"
            height="460"
            rx="16"
            fill={isHighContrast ? '#111111' : '#1E293B'}
            fillOpacity="0.4"
            stroke={isHighContrast ? '#FFFFFF' : '#334155'}
            strokeDasharray="4 4"
          />
          <text
            x="335"
            y="100"
            fill={isHighContrast ? '#FACC15' : '#64748B'}
            fontSize="11"
            fontWeight="700"
            letterSpacing="1"
          >
            {t('centralFobSubway', language)}
          </text>

          <rect
            x="560"
            y="70"
            width="170"
            height="460"
            rx="16"
            fill={isHighContrast ? '#111111' : '#1E293B'}
            fillOpacity="0.4"
            stroke={isHighContrast ? '#FFFFFF' : '#334155'}
            strokeDasharray="4 4"
          />
          <text
            x="575"
            y="100"
            fill={isHighContrast ? '#FACC15' : '#64748B'}
            fontSize="11"
            fontWeight="700"
            letterSpacing="1"
          >
            {t('platformDecks', language)}
          </text>

          {/* Station Edges */}
          <g id="station-edges">
            {filteredEdges.map((edge) => {
              const from = nodeCoords.get(edge.fromNode);
              const to = nodeCoords.get(edge.toNode);
              if (!from || !to) return null;

              const isOut = edge.isOperational === false;

              return (
                <g key={`${edge.stationId}_${edge.fromNode}_${edge.toNode}`}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isOut ? '#EF4444' : isHighContrast ? '#71717A' : '#334155'}
                    strokeWidth={isOut ? 3.5 : 2.5}
                    strokeDasharray={isOut ? '6 4' : edge.hasStairs ? '3 3' : 'none'}
                    strokeOpacity={isOut ? 1 : 0.6}
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

          {/* Active Route Polyline */}
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
                className="animate-route-flow"
              />
            </g>
          )}

          {/* Interactive Station Nodes */}
          <g id="station-nodes">
            {filteredNodes.map((node) => {
              const colorInfo = NODE_COLORS[node.type] || NODE_COLORS.hall;
              const isStart = node.nodeId === startNodeId;
              const isEnd = node.nodeId === endNodeId;
              const isOnPath = pathNodeIds.has(node.nodeId);
              const isHovered = hoveredNode?.nodeId === node.nodeId;

              const nodeBg = isHighContrast
                ? isStart
                  ? '#3B82F6'
                  : isEnd
                  ? '#10B981'
                  : isOnPath
                  ? '#FACC15'
                  : '#FFFFFF'
                : colorInfo.bg;

              const displayName = getNodeDisplayName(node, language);

              return (
                <g
                  key={node.nodeId}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => onNodeClick(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  {isStart && (
                    <circle
                      r="22"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3.5"
                      className="animate-ping opacity-80"
                    />
                  )}

                  {isEnd && (
                    <circle
                      r="22"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      className="animate-ping opacity-80"
                    />
                  )}

                  <circle
                    r={isStart || isEnd ? 16 : isOnPath ? 14 : isHovered ? 14 : 11}
                    fill={nodeBg}
                    stroke={
                      isHighContrast
                        ? '#000000'
                        : isStart
                        ? '#60A5FA'
                        : isEnd
                        ? '#34D399'
                        : isOnPath
                        ? '#FFFFFF'
                        : colorInfo.ring
                    }
                    strokeWidth={isStart || isEnd || isOnPath ? 3 : 1.5}
                  />

                  {node.isAccessible && (
                    <circle
                      cx="8"
                      cy="-8"
                      r="4.5"
                      fill="#10B981"
                      stroke={isHighContrast ? '#FFFFFF' : '#0F172A'}
                      strokeWidth="1.5"
                    />
                  )}

                  <text
                    y={node.y > 320 ? 25 : -18}
                    textAnchor="middle"
                    fill={
                      isHighContrast
                        ? isOnPath
                          ? '#FACC15'
                          : '#FFFFFF'
                        : isOnPath
                        ? '#FFFFFF'
                        : '#94A3B8'
                    }
                    fontSize={isLargeText ? (isOnPath ? '13' : '12') : isOnPath ? '11' : '10'}
                    fontWeight={isOnPath || isStart || isEnd ? '800' : '600'}
                    className="pointer-events-none drop-shadow-md"
                  >
                    {displayName.length > 25 ? `${displayName.substring(0, 23)}...` : displayName}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hovered Node Tooltip */}
        {hoveredNode && (
          <div
            className={`absolute top-4 right-4 text-xs p-3 rounded-xl border shadow-2xl max-w-xs pointer-events-none z-10 space-y-1 ${
              isHighContrast
                ? 'bg-black border-white text-yellow-400'
                : 'bg-slate-900/95 backdrop-blur-md border-slate-700 text-white'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor:
                    NODE_COLORS[hoveredNode.type]?.bg || '#94A3B8',
                }}
              ></span>
              {getNodeDisplayName(hoveredNode, language)}
            </div>
            <div className={isHighContrast ? 'text-yellow-200' : 'text-slate-400'}>
              {t('deck', language)}:{' '}
              <span className="font-semibold">{getFloorDisplayName(hoveredNode.floor)}</span> • {t('type', language)}:{' '}
              <span className="capitalize font-semibold">{hoveredNode.type}</span>
            </div>
            <div
              className={`text-[10px] pt-0.5 font-medium ${
                isHighContrast ? 'text-yellow-300' : 'text-blue-400'
              }`}
            >
              {t('clickToSetPrompt', language)}
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div
        className={`p-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
          isHighContrast
            ? 'border-white bg-black text-yellow-400'
            : 'border-slate-800 bg-slate-900 text-slate-400'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          {Object.entries(LEGEND_LABELS).map(([key, labels]) => (
            <div key={key} className="flex items-center space-x-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-xs"
                style={{ backgroundColor: NODE_COLORS[key]?.bg || '#94A3B8' }}
              ></span>
              <span className={`text-[11px] ${isHighContrast ? 'text-white' : 'text-slate-300'}`}>
                {labels[language] || labels.en}
              </span>
            </div>
          ))}
        </div>
        <div
          className={`flex items-center space-x-1 text-[11px] ${
            isHighContrast ? 'text-yellow-400 font-bold' : 'text-emerald-400'
          }`}
        >
          <Accessibility className="h-3.5 w-3.5" />
          <span>{t('stepFreeCertified', language)}</span>
        </div>
      </div>
    </div>
  );
}
