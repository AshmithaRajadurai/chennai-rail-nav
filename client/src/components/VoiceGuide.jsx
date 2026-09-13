import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Square, Headphones, AlertCircle } from 'lucide-react';
import { t, generateRouteInstructions } from '../utils/translations';

export default function VoiceGuide({
  instructions = [],
  instructionsTa = [],
  pathNodes = [],
  activeStepIndex = -1,
  onActiveStepChange,
  isHighContrast = false,
  isLargeText = false,
  language = 'en',
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState([]);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);
  const stepIndexRef = useRef(0);
  const timeoutRef = useRef(null);

  const localizedFromNodes = pathNodes && pathNodes.length > 0
    ? generateRouteInstructions(pathNodes, language)
    : [];

  const activeInstructions = localizedFromNodes.length > 0
    ? localizedFromNodes
    : (language === 'ta' && instructionsTa && instructionsTa.length > 0 ? instructionsTa : instructions);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isMuted) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isMuted]);

  useEffect(() => {
    stopGuidance();
  }, [instructions, instructionsTa, pathNodes, language]);

  useEffect(() => {
    return () => {
      stopGuidance();
    };
  }, []);

  const stopGuidance = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
    stepIndexRef.current = 0;
    if (onActiveStepChange) {
      onActiveStepChange(-1);
    }
  };

  const speakStep = (index) => {
    if (!isPlayingRef.current || index >= activeInstructions.length) {
      stopGuidance();
      return;
    }

    stepIndexRef.current = index;
    if (onActiveStepChange) {
      onActiveStepChange(index);
    }

    if (isMutedRef.current) {
      timeoutRef.current = setTimeout(() => {
        if (isPlayingRef.current) {
          speakStep(index + 1);
        }
      }, 3500);
      return;
    }

    const rawText = activeInstructions[index];

    // Language configuration for speech synthesis
    const VOICE_CONFIGS = {
      en: {
        locale: 'en-IN',
        prefix: `Step ${index + 1}: `,
        rate: 0.92,
        findVoice: (voices) =>
          voices.find((v) => v.lang === 'en-IN' || v.lang.startsWith('en-') || v.name.toLowerCase().includes('india')),
      },
      ta: {
        locale: 'ta-IN',
        prefix: `படி ${index + 1}... `,
        rate: 0.88,
        findVoice: (voices) => {
          // Priority 1: Google தமிழ் / natural Google Tamil voice
          const googleTamil = voices.find(
            (v) =>
              (v.name.includes('Google') && (v.name.includes('தமிழ்') || v.name.toLowerCase().includes('tamil'))) ||
              (v.name.includes('தமிழ்') && v.name.includes('Google'))
          );
          if (googleTamil) return googleTamil;

          // Priority 2: Microsoft Tamil (Valluvar / Pallavi)
          const msTamil = voices.find(
            (v) =>
              v.name.includes('Microsoft') &&
              (v.name.toLowerCase().includes('tamil') ||
               v.name.includes('Valluvar') ||
               v.name.includes('Pallavi'))
          );
          if (msTamil) return msTamil;

          // Priority 3: Any voice matching ta-IN or Tamil name
          return voices.find(
            (v) =>
              v.lang === 'ta-IN' ||
              v.lang.startsWith('ta') ||
              v.name.toLowerCase().includes('tamil') ||
              v.name.includes('தமிழ்')
          ) || null;
        },
      },
      te: {
        locale: 'te-IN',
        prefix: `దశ ${index + 1}: `,
        rate: 0.88,
        findVoice: (voices) =>
          voices.find((v) => v.lang === 'te-IN' || v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu')),
      },
      kn: {
        locale: 'kn-IN',
        prefix: `ಹಂತ ${index + 1}: `,
        rate: 0.88,
        findVoice: (voices) =>
          voices.find((v) => v.lang === 'kn-IN' || v.lang.startsWith('kn') || v.name.toLowerCase().includes('kannada')),
      },
      ml: {
        locale: 'ml-IN',
        prefix: `ഘട്ടം ${index + 1}: `,
        rate: 0.88,
        findVoice: (voices) =>
          voices.find((v) => v.lang === 'ml-IN' || v.lang.startsWith('ml') || v.name.toLowerCase().includes('malayalam')),
      },
      hi: {
        locale: 'hi-IN',
        prefix: `चरण ${index + 1}: `,
        rate: 0.90,
        findVoice: (voices) =>
          voices.find((v) => v.lang === 'hi' || v.lang.includes('hi-IN') || v.name.toLowerCase().includes('hindi')),
      },
    };

    const cfg = VOICE_CONFIGS[language] || VOICE_CONFIGS.en;
    const speechText = `${cfg.prefix}${rawText}`;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = cfg.locale;
    utterance.rate = cfg.rate;
    utterance.pitch = 1.0;

    const matchedVoice = cfg.findVoice(availableVoices);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (isPlayingRef.current) {
        const pauseDelay = language === 'ta' ? 900 : 700;
        timeoutRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            speakStep(index + 1);
          }
        }, pauseDelay);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis error:', e);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const startGuidance = () => {
    if (!activeInstructions || activeInstructions.length === 0) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsPlaying(true);
    isPlayingRef.current = true;
    speakStep(0);
  };

  if (!isSupported) {
    return (
      <div
        className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
          isHighContrast
            ? 'bg-black border-white text-yellow-400'
            : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}
      >
        <AlertCircle className="h-4 w-4" />
        <span>{t('audioNotSupported', language)}</span>
      </div>
    );
  }

  if (!activeInstructions || activeInstructions.length === 0) {
    return null;
  }

  return (
    <div
      className={`rounded-2xl border p-4 transition-all shadow-sm ${
        isHighContrast
          ? 'bg-black border-white text-yellow-400'
          : isPlaying
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-slate-800'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Audio Status Indicator */}
        <div className="flex items-center space-x-3">
          <div
            className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${
              isHighContrast
                ? 'bg-yellow-400 text-black font-bold'
                : isPlaying
                ? 'bg-blue-600 text-white shadow-md animate-pulse'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Headphones className="h-5 w-5" />
          </div>
          <div>
            <h4
              className={`font-bold flex items-center gap-2 ${
                isLargeText ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
              }`}
            >
              {t('voiceGuideTitle', language)}
              {isPlaying && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isHighContrast
                      ? 'bg-yellow-400 text-black'
                      : 'bg-blue-600 text-white animate-pulse'
                  }`}
                >
                  {t('speakingStep', language)} {stepIndexRef.current + 1} {t('of', language)} {activeInstructions.length}
                </span>
              )}
            </h4>
            <p
              className={`mt-0.5 leading-snug ${
                isHighContrast ? 'text-yellow-200' : 'text-slate-500'
              } ${isLargeText ? 'text-xs' : 'text-[11px]'}`}
            >
              {isPlaying
                ? t('voiceGuideActiveDesc', language)
                : t('voiceGuideInactiveDesc', language)}
            </p>
          </div>
        </div>

        {/* Right: Audio Action Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {isPlaying && (
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? t('unmute', language) : t('mute', language)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isHighContrast
                  ? 'border-white text-yellow-400 hover:bg-yellow-400 hover:text-black'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          )}

          {isPlaying ? (
            <button
              type="button"
              onClick={stopGuidance}
              className={`px-3.5 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-colors cursor-pointer text-xs ${
                isHighContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
              }`}
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              <span>{t('stopAudioGuidance', language)}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={startGuidance}
              className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs ${
                isHighContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } ${isLargeText ? 'text-sm' : 'text-xs'}`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{t('startAudioGuidance', language)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
