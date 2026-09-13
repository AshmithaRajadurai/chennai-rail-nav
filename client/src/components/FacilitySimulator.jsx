import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Accessibility, 
  X, 
  Sliders, 
  Info 
} from 'lucide-react';
import { toggleEdgeStatus } from '../services/api';
import { t } from '../utils/translations';
import { getNodeDisplayName } from '../utils/landmarkTranslations';

export default function FacilitySimulator({
  isOpen,
  onClose,
  stationId,
  edges = [],
  nodes = [],
  onFacilityStatusChanged,
  isHighContrast = false,
  language = 'en',
}) {
  const [updatingEdgeId, setUpdatingEdgeId] = useState(null);

  if (!isOpen) return null;

  // Build node lookup map
  const nodeMap = new Map();
  nodes.forEach((n) => nodeMap.set(n.nodeId, n));

  const seenCorridors = new Set();
  const keyFacilities = [];

  const facilityTypeMap = {
    lift: {
      en: 'Elevator / Lift',
      ta: 'லிஃப்ட் (மின்தூக்கி)',
      te: 'లిఫ్ట్ (ఎలివేటర్)',
      kn: 'ಲಿಫ್ಟ್',
      ml: 'ലിഫ്റ്റ്',
      hi: 'लिफ्ट (एलिवेटर)',
    },
    ramp: {
      en: 'Accessible Incline Ramp',
      ta: 'சாய்வுதளம் (ரேம்ப்)',
      te: 'ర్యాంప్',
      kn: 'ರಾಂಪ್',
      ml: 'റാംപ്',
      hi: 'सुलभ रैंप (Ramp)',
    },
    stairs: {
      en: 'Flight Stairs / Escalator',
      ta: 'படிக்கட்டுகள் / எஸ்கலேட்டர்',
      te: 'మెట్లు / ఎస్కలేటర్',
      kn: 'ಮೆಟ್ಟಿಲುಗಳು / ಎಸ್ಕಲೇಟರ್',
      ml: 'പടികൾ / എസ്കലേറ്റർ',
      hi: 'सीढ़ियाँ / एस्केलेटर',
    },
    path: {
      en: 'Pathway',
      ta: 'நடைபாதை',
      te: 'నడక మార్గం',
      kn: 'ನಡಿಗೆ ಮಾರ್ಗ',
      ml: 'നടപ്പാത',
      hi: 'पैदल मार्ग (Pathway)',
    },
  };

  edges.forEach((edge) => {
    if (!edge.hasElevator && !edge.hasRamp && !edge.hasStairs) return;

    const corridorKey = [edge.fromNode, edge.toNode].sort().join('<->');
    if (seenCorridors.has(corridorKey)) return;
    seenCorridors.add(corridorKey);

    const fromNode = nodeMap.get(edge.fromNode);
    const toNode = nodeMap.get(edge.toNode);

    let typeKey = 'path';
    if (edge.hasElevator) typeKey = 'lift';
    else if (edge.hasRamp) typeKey = 'ramp';
    else if (edge.hasStairs) typeKey = 'stairs';

    const localizedType =
      facilityTypeMap[typeKey][language] || facilityTypeMap[typeKey]['en'];

    const fromName = fromNode
      ? getNodeDisplayName(fromNode, language)
      : edge.fromNode;
    const toName = toNode
      ? getNodeDisplayName(toNode, language)
      : edge.toNode;
    const corridorName = `${fromName} ↔ ${toName}`;

    keyFacilities.push({
      edge,
      name: corridorName,
      type: localizedType,
      isAccessible: !edge.hasStairs,
      isOperational: edge.isOperational !== false,
      fromNode,
      toNode,
    });
  });

  const handleToggle = async (facility) => {
    const targetStatus = !facility.isOperational;
    setUpdatingEdgeId(facility.edge._id);

    try {
      await toggleEdgeStatus({
        edgeId: facility.edge._id,
        isOperational: targetStatus,
      });

      if (onFacilityStatusChanged) {
        onFacilityStatusChanged(facility, targetStatus);
      }
    } catch (err) {
      console.error('Failed to toggle facility edge status:', err);
    } finally {
      setUpdatingEdgeId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
          isHighContrast
            ? 'bg-black border-white text-yellow-400'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isHighContrast
              ? 'border-white bg-black'
              : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-xl flex items-center justify-center ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                {t('facilityControlTitle', language)}
              </h3>
              <p
                className={`text-xs ${
                  isHighContrast ? 'text-yellow-200' : 'text-slate-500'
                }`}
              >
                {t('facilityControlSubtitle', language)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isHighContrast
                ? 'border-white text-yellow-400 hover:bg-yellow-400 hover:text-black'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Instructions Banner */}
        <div
          className={`px-6 py-3 border-b text-xs flex items-start space-x-2.5 ${
            isHighContrast
              ? 'bg-black border-white text-yellow-300'
              : 'bg-blue-50/70 border-blue-100 text-blue-900'
          }`}
        >
          <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <p>{t('facilityControlBanner', language)}</p>
        </div>

        {/* Facility List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {keyFacilities.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No controllable transit infrastructure found for this station.
            </div>
          ) : (
            keyFacilities.map((facility) => {
              const isBusy = updatingEdgeId === facility.edge._id;

              return (
                <div
                  key={facility.edge._id}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    isHighContrast
                      ? 'border-white bg-black'
                      : facility.isOperational
                      ? 'border-slate-200 bg-white hover:border-slate-300'
                      : 'border-rose-200 bg-rose-50/50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm">
                        {facility.name}
                      </span>
                      {facility.isAccessible ? (
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isHighContrast
                              ? 'bg-yellow-400 text-black'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          <Accessibility className="h-3 w-3" />
                          {t('stepFree', language)}
                        </span>
                      ) : (
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isHighContrast
                              ? 'border border-white text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {t('stairs', language)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span
                        className={
                          isHighContrast ? 'text-yellow-200' : 'text-slate-500'
                        }
                      >
                        {t('type', language)}: {facility.type}
                      </span>
                      <span>•</span>
                      <span
                        className={`font-semibold flex items-center gap-1 ${
                          facility.isOperational
                            ? isHighContrast
                              ? 'text-yellow-400'
                              : 'text-emerald-700'
                            : isHighContrast
                            ? 'text-red-400'
                            : 'text-rose-700 font-bold'
                        }`}
                      >
                        {facility.isOperational ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            {t('operational', language)}
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3.5 w-3.5 text-rose-500" />
                            {t('underMaintenance', language)}
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleToggle(facility)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                        facility.isOperational
                          ? isHighContrast
                            ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                            : 'bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-300'
                          : isHighContrast
                          ? 'bg-red-600 text-white hover:bg-red-500'
                          : 'bg-rose-600 hover:bg-emerald-600 text-white'
                      }`}
                    >
                      {isBusy ? (
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      ) : facility.isOperational ? (
                        <>
                          <XCircle className="h-3.5 w-3.5" />
                          <span>{t('simulateOutage', language)}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{t('markRepaired', language)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between text-xs ${
            isHighContrast
              ? 'border-white bg-black'
              : 'border-slate-100 bg-slate-50 text-slate-500'
          }`}
        >
          <span>{t('facilityModalFooter', language)}</span>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg font-bold border transition-colors cursor-pointer ${
              isHighContrast
                ? 'border-white text-yellow-400 hover:bg-yellow-400 hover:text-black'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {t('done', language)}
          </button>
        </div>
      </div>
    </div>
  );
}
