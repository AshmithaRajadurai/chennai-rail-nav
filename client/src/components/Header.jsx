import React, { useState } from 'react';
import { 
  Train, 
  MapPin, 
  Accessibility, 
  Building2, 
  ChevronDown, 
  Eye, 
  Type, 
  SlidersHorizontal, 
  Globe 
} from 'lucide-react';
import { t, LANGUAGES } from '../utils/translations';
import { getStationDisplayName } from '../utils/landmarkTranslations';

const CHENNAI_STATIONS = ['MAS', 'MS', 'TBM'];

export default function Header({
  stations,
  currentStationId,
  onSelectStation,
  loadingStation,
  isHighContrast,
  onToggleHighContrast,
  isLargeText,
  onToggleLargeText,
  language = 'en',
  onSelectLanguage,
}) {
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const activeLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header
      className={`border-b sticky top-0 z-30 shadow-lg transition-colors ${
        isHighContrast
          ? 'bg-black text-yellow-400 border-white'
          : 'bg-slate-900 text-white border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3 gap-3">
          {/* Logo & App Title */}
          <div className="flex items-center space-x-3">
            <div
              className={`p-2.5 rounded-xl shadow-md flex items-center justify-center ring-2 ${
                isHighContrast
                  ? 'bg-yellow-400 text-black ring-white font-bold'
                  : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-yellow-400 ring-blue-500/20'
              }`}
            >
              <Train className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1
                  className={`font-bold tracking-tight ${
                    isLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                  } ${isHighContrast ? 'text-yellow-400' : 'text-slate-50'}`}
                >
                  {t('appTitle', language)}
                </h1>
                <span
                  className={`hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isHighContrast
                      ? 'bg-black text-yellow-300 border-yellow-400'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}
                >
                  {t('divyangjanTag', language)}
                </span>
              </div>
              <p
                className={`text-xs font-medium ${
                  isHighContrast ? 'text-yellow-200' : 'text-slate-400'
                }`}
              >
                {t('appSubtitle', language)}
              </p>
            </div>
          </div>

          {/* Station Quick-Switch Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CHENNAI_STATIONS.map((stnId) => {
              const isSelected = currentStationId === stnId;
              const localizedName = getStationDisplayName(stnId, language);
              return (
                <button
                  key={stnId}
                  type="button"
                  onClick={() => onSelectStation(stnId)}
                  className={`px-3 py-1.5 rounded-xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black border-white font-bold'
                        : 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : isHighContrast
                      ? 'bg-black text-yellow-300 border-yellow-400/60 hover:border-yellow-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span className={`font-semibold ${isLargeText ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                    {localizedName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: 5-Language Switcher + Facility Control + Accessibility */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 5-Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isHighContrast
                    ? 'border-white bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black'
                    : 'border-blue-500/40 bg-blue-600/20 hover:bg-blue-600/30 text-blue-100'
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-yellow-400" />
                <span>{activeLangObj.native}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {showLangDropdown && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-2xl border shadow-2xl p-1.5 z-50 ${
                    isHighContrast
                      ? 'bg-black border-white text-yellow-400'
                      : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1 border-b border-slate-800 mb-1">
                    Select Language / மொழி
                  </div>
                  {LANGUAGES.map((langItem) => (
                    <button
                      key={langItem.code}
                      type="button"
                      onClick={() => {
                        onSelectLanguage(langItem.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        language === langItem.code
                          ? isHighContrast
                            ? 'bg-yellow-400 text-black font-bold'
                            : 'bg-blue-600 text-white'
                          : isHighContrast
                          ? 'hover:bg-yellow-400 hover:text-black'
                          : 'hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <span>{langItem.native}</span>
                      <span className="text-[10px] opacity-70">({langItem.label})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessibility Options Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAccessMenu(!showAccessMenu)}
                className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isHighContrast
                    ? 'border-white bg-yellow-400 text-black'
                    : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>{t('accessibilityOptions', language)}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {showAccessMenu && (
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-3 space-y-3 z-50 ${
                    isHighContrast
                      ? 'bg-black border-white text-yellow-400'
                      : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  <div className="text-xs font-bold border-b border-slate-700 pb-2 flex items-center justify-between">
                    <span>{t('wcagDisplayModes', language)}</span>
                    <span className="text-[10px] text-emerald-400">AAA</span>
                  </div>

                  <label className="flex items-center justify-between cursor-pointer text-xs">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-yellow-400" />
                      <span>{t('highContrast', language)}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={isHighContrast}
                      onChange={(e) => onToggleHighContrast(e.target.checked)}
                      className="rounded accent-yellow-400 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-xs">
                    <span className="flex items-center gap-2">
                      <Type className="h-4 w-4 text-blue-400" />
                      <span>{t('largeText', language)}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={isLargeText}
                      onChange={(e) => onToggleLargeText(e.target.checked)}
                      className="rounded accent-blue-500 cursor-pointer"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
