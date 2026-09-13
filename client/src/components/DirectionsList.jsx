import React from 'react';
import { 
  Footprints, 
  Accessibility, 
  CheckCircle2, 
  MapPin, 
  Compass, 
  ArrowRight, 
  ArrowUpRight, 
  TrendingUp, 
  Layers, 
  Volume2 
} from 'lucide-react';
import { t, generateRouteInstructions } from '../utils/translations';

function getStepIcon(instruction) {
  const lower = instruction.toLowerCase();
  if (
    lower.startsWith('start') ||
    lower.includes('தொடங்க') ||
    lower.includes('புறப்பட') ||
    lower.includes('கவனத்திற்கு') ||
    lower.includes('ప్రారంభ') ||
    lower.includes('ಪ್ರಾರಂಭಿ') ||
    lower.includes('ആരംഭിക്കുക') ||
    lower.includes('शुरुआत')
  ) {
    return <Compass className="h-4 w-4 text-blue-600" />;
  }
  if (
    lower.startsWith('arrive') ||
    lower.includes('சென்றடைந்தீர்கள்') ||
    lower.includes('சேர்ந்து') ||
    lower.includes('அடைந்துவிட்டீர்கள்') ||
    lower.includes('வாழ்த்துகள்') ||
    lower.includes('చేరుకున్నారు') ||
    lower.includes('ತಲುಪಿದ್ದೀರಿ') ||
    lower.includes('എത്തിക്കഴിഞ്ഞു') ||
    lower.includes('पहुँच गए')
  ) {
    return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
  }
  if (
    lower.includes('elevator') ||
    lower.includes('lift') ||
    lower.includes('மின்தூக்கி') ||
    lower.includes('லிஃப்ட்') ||
    lower.includes('லிப்ட்') ||
    lower.includes('లిఫ్ట్') ||
    lower.includes('ಲಿಫ್ಟ್') ||
    lower.includes('ലിഫ്റ്റ്') ||
    lower.includes('लिफ्ट')
  ) {
    return <Accessibility className="h-4 w-4 text-emerald-600" />;
  }
  if (
    lower.includes('ramp') ||
    lower.includes('சாய்வுதளம்') ||
    lower.includes('சாய்வுதள') ||
    lower.includes('ரேம்ப்') ||
    lower.includes('ర్యాంప్') ||
    lower.includes('ರಾಂಪ್') ||
    lower.includes('റാംപ്') ||
    lower.includes('रैंप')
  ) {
    return <TrendingUp className="h-4 w-4 text-teal-600" />;
  }
  if (
    lower.includes('stairs') ||
    lower.includes('escalator') ||
    lower.includes('படிகள்') ||
    lower.includes('படிக்கட்டுகள்') ||
    lower.includes('நடைமேம்பாலம்') ||
    lower.includes('சுரங்கப்பாதை') ||
    lower.includes('மெట్లు') ||
    lower.includes('ಮೆಟ್ಟಿಲುಗಳು') ||
    lower.includes('പടികൾ') ||
    lower.includes('सीढ़')
  ) {
    return <Footprints className="h-4 w-4 text-amber-600" />;
  }
  return <ArrowRight className="h-4 w-4 text-slate-500" />;
}

export default function DirectionsList({
  instructions = [],
  instructionsTa = [],
  pathNodes = [],
  totalDistance = 0,
  requireAccessible = false,
  activeStepIndex = -1,
  isHighContrast = false,
  isLargeText = false,
  language = 'en',
}) {
  const localizedFromNodes = pathNodes && pathNodes.length > 0
    ? generateRouteInstructions(pathNodes, language)
    : [];

  const activeInstructions = localizedFromNodes.length > 0
    ? localizedFromNodes
    : (language === 'ta' && instructionsTa && instructionsTa.length > 0 ? instructionsTa : instructions);

  if (!activeInstructions || activeInstructions.length === 0) {
    return (
      <div
        className={`rounded-2xl border p-6 text-center shadow-sm transition-colors ${
          isHighContrast
            ? 'bg-black border-white text-yellow-400'
            : 'bg-white border-slate-200 text-slate-700'
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3 ${
            isHighContrast
              ? 'bg-yellow-400 text-black font-bold'
              : 'bg-slate-100 text-slate-400'
          }`}
        >
          <Compass className="h-6 w-6" />
        </div>
        <h3
          className={`font-semibold mb-1 ${
            isLargeText ? 'text-base sm:text-lg' : 'text-sm'
          }`}
        >
          {t('noRouteSelected', language)}
        </h3>
        <p
          className={`leading-relaxed max-w-xs mx-auto ${
            isHighContrast ? 'text-yellow-200' : 'text-slate-500'
          } ${isLargeText ? 'text-sm' : 'text-xs'}`}
        >
          {t('noRouteDesc', language)}
        </p>
      </div>
    );
  }

  const startNode = pathNodes[0];
  const endNode = pathNodes[pathNodes.length - 1];

  const floorKey = endNode?.floor === 'Ground'
    ? 'ground'
    : endNode?.floor === 'Level 1'
    ? 'level1'
    : endNode?.floor === 'Subway'
    ? 'subway'
    : null;
  const targetFloorName = floorKey ? t(floorKey, language) : endNode?.floor || 'Platform';

  return (
    <div
      className={`rounded-2xl border shadow-sm p-5 space-y-4 transition-colors ${
        isHighContrast
          ? 'bg-black border-white text-yellow-400'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Route Header Overview */}
      <div
        className={`border-b pb-3 flex items-start justify-between ${
          isHighContrast ? 'border-white' : 'border-slate-100'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <h3
              className={`font-bold ${
                isLargeText ? 'text-base sm:text-lg' : 'text-sm'
              }`}
            >
              {t('turnByTurnTitle', language)}
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isHighContrast
                  ? 'border-yellow-400 bg-yellow-400 text-black'
                  : requireAccessible
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-blue-100 text-blue-800 border-blue-200'
              }`}
            >
              {requireAccessible ? t('stepFreeTag', language) : t('standardTag', language)}
            </span>
          </div>
          <div
            className={`mt-1 flex items-center gap-1.5 ${
              isHighContrast ? 'text-yellow-300' : 'text-slate-500'
            } ${isLargeText ? 'text-sm' : 'text-xs'}`}
          >
            <span className="font-semibold">{activeInstructions.length - 1} {t('stepsCount', language)}</span>
            <span>•</span>
            <span className="font-semibold">{totalDistance} {t('meters', language)}</span>
          </div>
        </div>

        <div className="text-right text-xs">
          <span
            className={`text-[10px] uppercase font-semibold block ${
              isHighContrast ? 'text-yellow-400/80' : 'text-slate-400'
            }`}
          >
            {t('targetFloor', language)}
          </span>
          <span
            className={`font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 border ${
              isHighContrast
                ? 'border-white bg-black text-yellow-400'
                : 'border-slate-200 bg-slate-100 text-slate-800'
            }`}
          >
            {targetFloorName}
          </span>
        </div>
      </div>

      {/* Step List */}
      <div
        className={`space-y-3 relative before:absolute before:top-3 before:bottom-3 before:left-[17px] before:w-[2px] ${
          isHighContrast ? 'before:bg-yellow-400/40' : 'before:bg-slate-200'
        }`}
      >
        {activeInstructions.map((stepText, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === activeInstructions.length - 1;
          const lower = stepText.toLowerCase();
          const isElevator =
            lower.includes('elevator') ||
            lower.includes('lift') ||
            lower.includes('மின்தூக்கி') ||
            lower.includes('லிஃப்ட்') ||
            lower.includes('లిఫ్ట్') ||
            lower.includes('ಲಿಫ್ಟ್') ||
            lower.includes('ലിഫ്റ്റ്') ||
            lower.includes('लिफ्ट');
          const isRamp =
            lower.includes('ramp') ||
            lower.includes('சாய்வுதளம்') ||
            lower.includes('ரேம்ப்') ||
            lower.includes('ర్యాంప్') ||
            lower.includes('ರಾಂಪ್') ||
            lower.includes('റാംപ്') ||
            lower.includes('रैंप');
          const isSpokenActive = activeStepIndex === idx;

          return (
            <div
              key={idx}
              className={`relative flex items-start space-x-3 text-xs p-2.5 rounded-xl border transition-all ${
                isSpokenActive
                  ? isHighContrast
                    ? 'bg-yellow-400/20 border-yellow-400 ring-2 ring-yellow-400 shadow-md scale-[1.02]'
                    : 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-400/30 shadow-md scale-[1.02]'
                  : isHighContrast
                  ? 'border-white/20 bg-black hover:border-white'
                  : 'border-transparent hover:bg-slate-50'
              }`}
            >
              {/* Step Icon Badge */}
              <div
                className={`relative z-10 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform shadow-xs ${
                  isHighContrast
                    ? isSpokenActive
                      ? 'bg-yellow-400 text-black font-bold border-white animate-bounce'
                      : 'bg-black border-white text-yellow-400'
                    : isFirst
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold'
                    : isLast
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold'
                    : isElevator || isRamp
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {isSpokenActive ? (
                  <Volume2
                    className={`h-4 w-4 animate-pulse ${
                      isHighContrast ? 'text-black' : 'text-blue-600'
                    }`}
                  />
                ) : (
                  getStepIcon(stepText)
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-semibold ${
                      isHighContrast ? 'text-yellow-400' : 'text-slate-400'
                    } ${isLargeText ? 'text-xs' : 'text-[11px]'}`}
                  >
                    {t('step', language)} {idx + 1}
                    {isSpokenActive && (
                      <span className="ml-2 font-bold uppercase tracking-wider animate-pulse">
                        [ {t('nowSpeaking', language)} ]
                      </span>
                    )}
                  </span>
                  {(isElevator || isRamp) && (
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded-sm ${
                        isHighContrast
                          ? 'bg-yellow-400 text-black text-[9px]'
                          : 'bg-emerald-100 text-emerald-700 text-[9px]'
                      }`}
                    >
                      {t('accessibleStep', language)}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-0.5 font-medium leading-snug ${
                    isHighContrast
                      ? isSpokenActive
                        ? 'text-yellow-300 font-bold'
                        : 'text-white'
                      : isFirst || isLast
                      ? 'text-slate-900 font-bold'
                      : 'text-slate-700'
                  } ${isLargeText ? 'text-sm' : 'text-xs'}`}
                >
                  {stepText}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
