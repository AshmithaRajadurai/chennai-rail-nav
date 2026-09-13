import React from 'react';
import { Languages, Globe, ArrowRight } from 'lucide-react';
import { LANGUAGES } from '../utils/translations';

const LANGUAGE_CARDS = [
  {
    code: 'en',
    title: 'English',
    nativeTitle: 'English',
    buttonText: 'Continue in English',
    description: 'Indoor navigation, audio guide, and accessibility tools in English.',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    code: 'ta',
    title: 'Tamil',
    nativeTitle: 'தமிழ்',
    buttonText: 'தமிழில் தொடரவும்',
    description: 'ரயில் நிலைய வழிகாட்டி, குரல் வழிநடத்துதல் மற்றும் வீல்சேர் பாதை.',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    code: 'te',
    title: 'Telugu',
    nativeTitle: 'తెలుగు',
    buttonText: 'తెలుగులో కొనసాగించండి',
    description: 'స్టేషన్ నావిగేషన్, వాయిస్ గైడ్ మరియు వీల్ చైర్ మార్గదర్శకం.',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  {
    code: 'kn',
    title: 'Kannada',
    nativeTitle: 'ಕನ್ನಡ',
    buttonText: 'ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಿರಿ',
    description: 'ನಿಲ್ದಾಣ ಸಂಚಾರ, ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ವೀಲ್ಚೇರ್ ಮಾರ್ಗ.',
    badgeColor: 'bg-red-100 text-red-800',
  },
  {
    code: 'ml',
    title: 'Malayalam',
    nativeTitle: 'മലയാളം',
    buttonText: 'മലയാളത്തിൽ തുടരുക',
    description: 'സ്റ്റേഷൻ നാവിഗേഷൻ, വോയ്സ് ഗൈഡ്, വീൽചെയർ സൗഹൃദ വഴി.',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    code: 'hi',
    title: 'Hindi',
    nativeTitle: 'हिंदी',
    buttonText: 'हिंदी में जारी रखें',
    description: 'स्टेशन नेविगेशन, बोलकर रास्ता एवं व्हीलचेयर सुलभ मार्ग।',
    badgeColor: 'bg-orange-100 text-orange-800',
  },
];

export default function LanguageModal({ isOpen, onSelectLanguage, isHighContrast = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 text-center my-6 ${
          isHighContrast
            ? 'bg-black border-white text-yellow-400'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header Icon & Title */}
        <div className="space-y-3">
          <div
            className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg ${
              isHighContrast
                ? 'bg-yellow-400 text-black font-bold'
                : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
            }`}
          >
            <Languages className="h-8 w-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Chennai RailNav • சென்னை • చెన్నై • ಚೆನ್ನೈ • ചെന്നൈ • चेन्नई
          </h2>
          <p
            className={`text-xs sm:text-sm font-medium ${
              isHighContrast ? 'text-yellow-200' : 'text-slate-500'
            }`}
          >
            Choose your preferred language / ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ
          </p>
        </div>

        {/* 5 Language Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
          {LANGUAGE_CARDS.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => onSelectLanguage(item.code)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group text-left ${
                isHighContrast
                  ? 'border-white bg-black hover:bg-yellow-400 hover:text-black hover:border-white'
                  : 'border-slate-200 hover:border-blue-500 hover:shadow-md bg-slate-50/70 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.nativeTitle}
                  </span>
                  <Globe className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-1">
                  {item.buttonText}
                </h3>
                <p
                  className={`text-[11px] leading-relaxed ${
                    isHighContrast ? 'text-current opacity-80' : 'text-slate-500'
                  }`}
                >
                  {item.description}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>{item.nativeTitle}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>

        <p
          className={`text-[11px] ${
            isHighContrast ? 'text-yellow-400/80' : 'text-slate-400'
          }`}
        >
          You can change the language anytime from the top bar • மொழியை எப்போது வேண்டுமானாலும் மாற்றிக்கொள்ளலாம்.
        </p>
      </div>
    </div>
  );
}
