import React from 'react';
import { 
  Navigation, 
  MapPin, 
  Accessibility, 
  ArrowUpDown, 
  Clock, 
  RotateCcw, 
  Footprints, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { t } from '../utils/translations';
import { getNodeDisplayName } from '../utils/landmarkTranslations';

export default function NavigationControls({
  nodes = [],
  startNodeId,
  endNodeId,
  requireAccessible,
  onChangeStart,
  onChangeEnd,
  onToggleAccessible,
  onFindRoute,
  onSwapPoints,
  onResetRoute,
  loadingRoute,
  routeStats,
  errorMessage,
  isHighContrast = false,
  isLargeText = false,
  language = 'en',
  mapSelectionMode = null,
  onToggleMapSelectionMode,
}) {
  const estimatedTimeMinutes = routeStats?.totalDistance
    ? Math.max(1, Math.round((routeStats.totalDistance / 65) * 10) / 10)
    : null;

  const sortedNodes = [...nodes].sort((a, b) => {
    const nameA = getNodeDisplayName(a, language);
    const nameB = getNodeDisplayName(b, language);
    return nameA.localeCompare(nameB);
  });

  const getFloorName = (floor) => {
    if (floor === 'Ground') return t('ground', language);
    if (floor === 'Level 1') return t('level1', language);
    if (floor === 'Subway') return t('subway', language);
    return floor;
  };

  return (
    <div
      className={`rounded-2xl border p-5 space-y-5 shadow-sm transition-colors ${
        isHighContrast
          ? 'bg-black border-white text-yellow-400'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      <div
        className={`flex items-center justify-between border-b pb-3.5 ${
          isHighContrast ? 'border-white' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Navigation
            className={`h-5 w-5 ${
              isHighContrast ? 'text-yellow-400' : 'text-blue-600'
            }`}
          />
          <h2
            className={`font-bold tracking-tight ${
              isLargeText ? 'text-lg sm:text-xl' : 'text-base'
            }`}
          >
            {t('routePlannerTitle', language)}
          </h2>
        </div>
        {routeStats && (
          <button
            type="button"
            onClick={onResetRoute}
            className={`text-xs flex items-center gap-1 font-medium transition-colors cursor-pointer ${
              isHighContrast
                ? 'text-yellow-300 hover:text-yellow-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <RotateCcw className="h-3 w-3" />
            {t('reset', language)}
          </button>
        )}
      </div>

      {/* Origin & Destination Selectors */}
      <div className="space-y-3 relative">
        {/* Start Location */}
        <div>
          <label
            className={`block font-semibold mb-1 flex items-center justify-between ${
              isHighContrast ? 'text-yellow-300' : 'text-slate-600'
            } ${isLargeText ? 'text-sm' : 'text-xs'}`}
          >
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full inline-block ${
                  isHighContrast ? 'bg-yellow-400' : 'bg-blue-600'
                }`}
              ></span>
              {t('startLocation', language)}
            </span>
            <button
              type="button"
              onClick={() => onToggleMapSelectionMode && onToggleMapSelectionMode(mapSelectionMode === 'start' ? null : 'start')}
              className={`inline-flex items-center gap-1 font-semibold transition-all cursor-pointer rounded-md px-1.5 py-0.5 border ${
                mapSelectionMode === 'start'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs animate-pulse'
                  : isHighContrast
                  ? 'border-yellow-400/40 text-yellow-300 hover:bg-yellow-400 hover:text-black'
                  : 'border-blue-200 bg-blue-50/80 text-blue-700 hover:bg-blue-100 hover:text-blue-900'
              } ${isLargeText ? 'text-xs' : 'text-[10px]'}`}
            >
              <MapPin className="w-2.5 h-2.5" />
              <span>
                {mapSelectionMode === 'start'
                  ? t('clickNodeOnMap', language)
                  : t('orClickOnMap', language)}
              </span>
            </button>
          </label>
          <div className="relative">
            <select
              value={startNodeId || ''}
              onChange={(e) => onChangeStart(e.target.value)}
              className={`w-full rounded-xl px-3.5 py-3 min-h-[46px] font-medium transition-all outline-none border ${
                isHighContrast
                  ? 'bg-black border-white text-yellow-400 focus:ring-2 focus:ring-yellow-400'
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white'
              } ${isLargeText ? 'text-base' : 'text-sm'}`}
            >
              <option value="" className={isHighContrast ? 'bg-black text-yellow-400' : ''}>
                {t('selectStartPoint', language)}
              </option>
              {sortedNodes.map((n) => {
                const displayName = getNodeDisplayName(n, language);
                const floorDisplay = getFloorName(n.floor);
                return (
                  <option
                    key={n.nodeId}
                    value={n.nodeId}
                    className={isHighContrast ? 'bg-black text-yellow-400' : ''}
                  >
                    {displayName} ({floorDisplay})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-end pr-2 -my-1">
          <button
            type="button"
            onClick={onSwapPoints}
            disabled={!startNodeId && !endNodeId}
            title={t('swapPoints', language)}
            className={`p-2 rounded-full border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs min-w-[36px] min-h-[36px] flex items-center justify-center ${
              isHighContrast
                ? 'border-white bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black'
                : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>

        {/* Destination Location */}
        <div>
          <label
            className={`block font-semibold mb-1 flex items-center justify-between ${
              isHighContrast ? 'text-yellow-300' : 'text-slate-600'
            } ${isLargeText ? 'text-sm' : 'text-xs'}`}
          >
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full inline-block ${
                  isHighContrast ? 'bg-white' : 'bg-emerald-600'
                }`}
              ></span>
              {t('destination', language)}
            </span>
            <button
              type="button"
              onClick={() => onToggleMapSelectionMode && onToggleMapSelectionMode(mapSelectionMode === 'destination' ? null : 'destination')}
              className={`inline-flex items-center gap-1 font-semibold transition-all cursor-pointer rounded-md px-1.5 py-0.5 border ${
                mapSelectionMode === 'destination'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs animate-pulse'
                  : isHighContrast
                  ? 'border-yellow-400/40 text-yellow-300 hover:bg-yellow-400 hover:text-black'
                  : 'border-emerald-200 bg-emerald-50/80 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900'
              } ${isLargeText ? 'text-xs' : 'text-[10px]'}`}
            >
              <MapPin className="w-2.5 h-2.5" />
              <span>
                {mapSelectionMode === 'destination'
                  ? t('clickNodeOnMap', language)
                  : t('orClickOnMap', language)}
              </span>
            </button>
          </label>
          <div className="relative">
            <select
              value={endNodeId || ''}
              onChange={(e) => onChangeEnd(e.target.value)}
              className={`w-full rounded-xl px-3.5 py-3 min-h-[46px] font-medium transition-all outline-none border ${
                isHighContrast
                  ? 'bg-black border-white text-yellow-400 focus:ring-2 focus:ring-yellow-400'
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white'
              } ${isLargeText ? 'text-base' : 'text-sm'}`}
            >
              <option value="" className={isHighContrast ? 'bg-black text-yellow-400' : ''}>
                {t('selectEndPoint', language)}
              </option>
              {sortedNodes.map((n) => {
                const displayName = getNodeDisplayName(n, language);
                const floorDisplay = getFloorName(n.floor);
                return (
                  <option
                    key={n.nodeId}
                    value={n.nodeId}
                    className={isHighContrast ? 'bg-black text-yellow-400' : ''}
                  >
                    {displayName} ({floorDisplay})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Accessible / Step-Free Mode Toggle Switch */}
      <div
        className={`p-3.5 rounded-xl border transition-colors ${
          isHighContrast
            ? 'border-white bg-black'
            : 'border-emerald-200/80 bg-emerald-50/60'
        }`}
      >
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-start space-x-2.5 pr-2">
            <div
              className={`p-2 rounded-lg mt-0.5 ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : requireAccessible
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-200 text-emerald-800'
              }`}
            >
              <Accessibility className="h-5 w-5" />
            </div>
            <div>
              <div
                className={`font-bold flex items-center gap-1.5 ${
                  isHighContrast ? 'text-yellow-400' : 'text-slate-800'
                } ${isLargeText ? 'text-sm' : 'text-xs'}`}
              >
                {t('stepFreeMode', language)}
                {requireAccessible && (
                  <span
                    className={`font-semibold px-1.5 py-0.5 rounded-full ${
                      isHighContrast
                        ? 'bg-white text-black text-[10px]'
                        : 'bg-emerald-600 text-white text-[10px]'
                    }`}
                  >
                    {t('activeBadge', language)}
                  </span>
                )}
              </div>
              <p
                className={`mt-0.5 leading-snug ${
                  isHighContrast ? 'text-yellow-200' : 'text-slate-500'
                } ${isLargeText ? 'text-xs' : 'text-[11px]'}`}
              >
                {t('stepFreeDesc', language)}
              </p>
            </div>
          </div>

          <div className="relative inline-flex items-center shrink-0">
            <input
              type="checkbox"
              checked={requireAccessible}
              onChange={(e) => onToggleAccessible(e.target.checked)}
              className="sr-only peer"
              id="accessible-toggle"
            />
            <div
              className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full ${
                isHighContrast
                  ? 'bg-black border-2 border-white peer-checked:bg-yellow-400 peer-checked:after:bg-black'
                  : 'bg-slate-300 after:border-slate-300 after:border peer-checked:bg-emerald-600'
              }`}
            ></div>
          </div>
        </label>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-start space-x-2 ${
            isHighContrast
              ? 'bg-black border-yellow-400 text-yellow-400'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}
        >
          <AlertTriangle
            className={`h-4 w-4 shrink-0 mt-0.5 ${
              isHighContrast ? 'text-yellow-400' : 'text-amber-600'
            }`}
          />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Find Route Button */}
      <button
        type="button"
        onClick={onFindRoute}
        disabled={loadingRoute || !startNodeId || !endNodeId || startNodeId === endNodeId}
        className={`w-full py-3.5 min-h-[48px] rounded-xl font-bold tracking-wide flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer ${
          isHighContrast
            ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-white'
            : requireAccessible
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
        } disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${
          isLargeText ? 'text-base' : 'text-sm'
        }`}
      >
        {loadingRoute ? (
          <>
            <div
              className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                isHighContrast ? 'border-black' : 'border-white'
              }`}
            ></div>
            <span>{t('calculatingPath', language)}</span>
          </>
        ) : (
          <>
            <Navigation className="h-4 w-4" />
            <span>{requireAccessible ? t('findAccessibleRoute', language) : t('findRoute', language)}</span>
          </>
        )}
      </button>

      {/* Route Stats Chip */}
      {routeStats && (
        <div
          className={`pt-2 border-t ${
            isHighContrast ? 'border-white' : 'border-slate-100'
          }`}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <div
              className={`rounded-xl p-3 flex items-center space-x-2.5 border ${
                isHighContrast
                  ? 'bg-black border-white'
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  isHighContrast
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                <Footprints className="h-4 w-4" />
              </div>
              <div>
                <span
                  className={`block uppercase font-semibold ${
                    isHighContrast ? 'text-yellow-300' : 'text-slate-400'
                  } ${isLargeText ? 'text-xs' : 'text-[10px]'}`}
                >
                  {t('totalDistance', language)}
                </span>
                <span
                  className={`font-bold ${
                    isHighContrast ? 'text-yellow-400' : 'text-slate-800'
                  } ${isLargeText ? 'text-base' : 'text-sm'}`}
                >
                  {routeStats.totalDistance} {t('meters', language)}
                </span>
              </div>
            </div>

            <div
              className={`rounded-xl p-3 flex items-center space-x-2.5 border ${
                isHighContrast
                  ? 'bg-black border-white'
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  isHighContrast
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <span
                  className={`block uppercase font-semibold ${
                    isHighContrast ? 'text-yellow-300' : 'text-slate-400'
                  } ${isLargeText ? 'text-xs' : 'text-[10px]'}`}
                >
                  {t('estWalkTime', language)}
                </span>
                <span
                  className={`font-bold ${
                    isHighContrast ? 'text-yellow-400' : 'text-slate-800'
                  } ${isLargeText ? 'text-base' : 'text-sm'}`}
                >
                  ~{estimatedTimeMinutes} {t('minutes', language)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
