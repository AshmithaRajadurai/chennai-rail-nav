import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import NavigationControls from './components/NavigationControls';
import StationMap from './components/StationMap';
import DirectionsList from './components/DirectionsList';
import VoiceGuide from './components/VoiceGuide';
import LanguageModal from './components/LanguageModal';
import { 
  fetchStations, 
  fetchStationDetails, 
  calculateRoute 
} from './services/api';
import { 
  AlertCircle, 
  Accessibility, 
  Info, 
  AlertTriangle 
} from 'lucide-react';
import { t } from './utils/translations';

export default function App() {
  // Language & Internationalization State
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('railnav_lang') || 'en';
  });
  const [showLanguageModal, setShowLanguageModal] = useState(() => {
    return !localStorage.getItem('railnav_lang');
  });

  // Station State
  const [stations, setStations] = useState([]);
  const [currentStationId, setCurrentStationId] = useState('MAS');
  const [stationData, setStationData] = useState({ station: null, nodes: [], edges: [] });
  const [loadingStation, setLoadingStation] = useState(false);

  // Route Planning State
  const [startNodeId, setStartNodeId] = useState('MAS_MAIN_GATE');
  const [endNodeId, setEndNodeId] = useState('MAS_P2');
  const [requireAccessible, setRequireAccessible] = useState(false);
  const [routeResult, setRouteResult] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mapSelectionMode, setMapSelectionMode] = useState(null); // null | 'start' | 'destination'

  // Assistive / Accessibility State
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [activeSpokenStep, setActiveSpokenStep] = useState(-1);
  const [maintenanceAlert, setMaintenanceAlert] = useState(null);

  // Language Selection Handlers
  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('railnav_lang', lang);
    setShowLanguageModal(false);
  };

  const handleToggleLanguage = () => {
    const nextLang = language === 'en' ? 'ta' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('railnav_lang', nextLang);
  };

  // Initial load: Fetch stations list
  useEffect(() => {
    async function loadStations() {
      try {
        const data = await fetchStations();
        setStations(data);
      } catch (err) {
        console.error('Failed to load stations:', err);
        const errorMessages = {
          en: 'Unable to connect to backend server. Ensure server is running on port 5000.',
          ta: 'சேவையகத்துடன் இணைக்க முடியவில்லை. தயவுசெய்து backend இயங்குகிறதா என சரிபார்க்கவும்.',
          te: 'సర్వర్‌తో కనెక్ట్ కాలేకపోయాము. బ్యాకెండ్ రన్ అవుతుందో లేదో తనిఖీ చేయండి.',
          kn: 'ಸರ್ವರ್ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಬ್ಯಾಕೆಂಡ್ ಚಾಲನೆಯಲ್ಲಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.',
          ml: 'സെർവറുമായി ബന്ധപ്പെടാൻ കഴിഞ്ഞില്ല. സെർവർ പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.',
          hi: 'सर्वर से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि बैकएंड पोर्ट 5000 पर चालू है।',
        };
        setErrorMessage(errorMessages[language] || errorMessages.en);
      }
    }
    loadStations();
  }, [language]);

  // Fetch Station Details whenever currentStationId changes
  useEffect(() => {
    async function loadStationDetails() {
      if (!currentStationId) return;
      setLoadingStation(true);
      setErrorMessage(null);
      setRouteResult(null);
      setMaintenanceAlert(null);
      setActiveSpokenStep(-1);

      try {
        const details = await fetchStationDetails(currentStationId);
        setStationData(details);

        if (details.nodes && details.nodes.length > 0) {
          const gates = details.nodes.filter((n) => n.type === 'gate');
          const platforms = details.nodes.filter((n) => n.type === 'platform');

          const defaultStart = gates.length > 0 ? gates[0].nodeId : details.nodes[0].nodeId;
          const defaultEnd = platforms.length > 0 ? platforms[0].nodeId : details.nodes[details.nodes.length - 1].nodeId;

          setStartNodeId(defaultStart);
          setEndNodeId(defaultEnd);
        }
      } catch (err) {
        console.error('Failed to load station details:', err);
        setErrorMessage(`Failed to load details for station '${currentStationId}'.`);
      } finally {
        setLoadingStation(false);
      }
    }

    loadStationDetails();
  }, [currentStationId]);

  // Route calculation function
  const handleCalculateRoute = useCallback(
    async (accessibleOverride) => {
      const isAccessible = typeof accessibleOverride === 'boolean' ? accessibleOverride : requireAccessible;

      if (!currentStationId || !startNodeId || !endNodeId) {
        setErrorMessage(t('selectBothPoints', language));
        return;
      }

      if (startNodeId === endNodeId) {
        setErrorMessage(t('cannotBeIdentical', language));
        return;
      }

      setLoadingRoute(true);
      setErrorMessage(null);

      try {
        const data = await calculateRoute({
          stationId: currentStationId,
          startNodeId,
          endNodeId,
          requireAccessible: isAccessible,
        });
        setRouteResult(data);
      } catch (err) {
        console.error('Routing calculation error:', err);
        const serverMsg = language === 'ta' && err.response?.data?.messageTa
          ? err.response.data.messageTa
          : err.response?.data?.message || t('noRouteSelected', language);
        setErrorMessage(serverMsg);
        setRouteResult(null);
      } finally {
        setLoadingRoute(false);
      }
    },
    [currentStationId, startNodeId, endNodeId, requireAccessible, language]
  );

  // Auto-calculate route on initial station load once nodes are ready
  useEffect(() => {
    if (stationData.nodes.length > 0 && startNodeId && endNodeId) {
      handleCalculateRoute(requireAccessible);
    }
  }, [stationData.nodes, currentStationId]);

  // Handle toggling accessible mode: immediately recalculate live
  const handleToggleAccessible = (val) => {
    setRequireAccessible(val);
    if (startNodeId && endNodeId && startNodeId !== endNodeId) {
      handleCalculateRoute(val);
    }
  };

  // Swap start and end points
  const handleSwapPoints = () => {
    const temp = startNodeId;
    setStartNodeId(endNodeId);
    setEndNodeId(temp);
    setActiveSpokenStep(-1);
    if (temp && endNodeId) {
      setLoadingRoute(true);
      calculateRoute({
        stationId: currentStationId,
        startNodeId: endNodeId,
        endNodeId: temp,
        requireAccessible,
      })
        .then((res) => setRouteResult(res))
        .catch((err) => {
          setErrorMessage(language === 'ta' && err.response?.data?.messageTa ? err.response.data.messageTa : 'Could not find route.');
          setRouteResult(null);
        })
        .finally(() => setLoadingRoute(false));
    }
  };

  // Reset route
  const handleResetRoute = () => {
    setRouteResult(null);
    setErrorMessage(null);
    setActiveSpokenStep(-1);
    setMaintenanceAlert(null);
  };

  // Set Start location explicitly (from map click, dropdown, or card)
  const handleSetStartNode = (nodeId) => {
    setActiveSpokenStep(-1);
    setStartNodeId(nodeId);
    setMapSelectionMode(null);
    if (endNodeId && nodeId !== endNodeId) {
      setLoadingRoute(true);
      calculateRoute({
        stationId: currentStationId,
        startNodeId: nodeId,
        endNodeId,
        requireAccessible,
      })
        .then((res) => setRouteResult(res))
        .catch((err) => {
          setErrorMessage(language === 'ta' && err.response?.data?.messageTa ? err.response.data.messageTa : 'Route calculation failed.');
          setRouteResult(null);
        })
        .finally(() => setLoadingRoute(false));
    }
  };

  // Set Destination location explicitly (from map click, dropdown, or card)
  const handleSetEndNode = (nodeId) => {
    setActiveSpokenStep(-1);
    setEndNodeId(nodeId);
    setMapSelectionMode(null);
    if (startNodeId && nodeId !== startNodeId) {
      setLoadingRoute(true);
      calculateRoute({
        stationId: currentStationId,
        startNodeId,
        endNodeId: nodeId,
        requireAccessible,
      })
        .then((res) => setRouteResult(res))
        .catch((err) => {
          setErrorMessage(language === 'ta' && err.response?.data?.messageTa ? err.response.data.messageTa : 'Route calculation failed.');
          setRouteResult(null);
        })
        .finally(() => setLoadingRoute(false));
    }
  };

  // Click on map node handler
  const handleNodeClick = (node) => {
    setActiveSpokenStep(-1);
    if (mapSelectionMode === 'start') {
      handleSetStartNode(node.nodeId);
    } else if (mapSelectionMode === 'destination') {
      handleSetEndNode(node.nodeId);
    } else {
      // Default: if start not set, set start; else set destination
      if (!startNodeId) {
        handleSetStartNode(node.nodeId);
      } else {
        handleSetEndNode(node.nodeId);
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isHighContrast ? 'bg-black text-yellow-400' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* First-visit Language Selection Modal */}
      <LanguageModal
        isOpen={showLanguageModal}
        onSelectLanguage={handleSelectLanguage}
        isHighContrast={isHighContrast}
      />

      {/* Top Header */}
      <Header
        stations={stations}
        currentStationId={currentStationId}
        onSelectStation={(stnId) => setCurrentStationId(stnId)}
        loadingStation={loadingStation}
        isHighContrast={isHighContrast}
        onToggleHighContrast={(val) => setIsHighContrast(val)}
        isLargeText={isLargeText}
        onToggleLargeText={(val) => setIsLargeText(val)}
        language={language}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Maintenance Outage Alert Banner */}
        {maintenanceAlert && (
          <div
            className={`p-4 rounded-2xl border shadow-sm flex items-start justify-between gap-3 animate-fade-in ${
              isHighContrast
                ? 'bg-black border-yellow-400 text-yellow-400'
                : maintenanceAlert.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : maintenanceAlert.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-xl mt-0.5 ${
                  isHighContrast
                    ? 'bg-yellow-400 text-black font-bold'
                    : maintenanceAlert.type === 'error'
                    ? 'bg-rose-200 text-rose-800'
                    : maintenanceAlert.type === 'success'
                    ? 'bg-emerald-200 text-emerald-800'
                    : 'bg-amber-200 text-amber-800'
                }`}
              >
                <Wrench className="h-4 w-4" />
              </div>
              <div>
                <h4
                  className={`font-bold ${
                    isLargeText ? 'text-base' : 'text-sm'
                  }`}
                >
                  {t('disruptionDetected', language)}
                </h4>
                <p
                  className={`mt-0.5 ${
                    isLargeText ? 'text-sm' : 'text-xs'
                  } opacity-90`}
                >
                  {maintenanceAlert.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => setMaintenanceAlert(null)}
              className="text-xs font-bold px-2 py-1 rounded-md border border-current hover:opacity-80 cursor-pointer shrink-0"
            >
              {t('dismiss', language)}
            </button>
          </div>
        )}

        {/* Error notification banner if any */}
        {errorMessage && !loadingRoute && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm shadow-xs ${
              isHighContrast
                ? 'bg-black border-yellow-400 text-yellow-400'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <AlertCircle
                className={`h-4 w-4 shrink-0 ${
                  isHighContrast ? 'text-yellow-400' : 'text-amber-600'
                }`}
              />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-bold ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Route Controls & Voice & Directions */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <NavigationControls
              nodes={stationData.nodes}
              startNodeId={startNodeId}
              endNodeId={endNodeId}
              requireAccessible={requireAccessible}
              onChangeStart={handleSetStartNode}
              onChangeEnd={handleSetEndNode}
              onToggleAccessible={handleToggleAccessible}
              onFindRoute={() => handleCalculateRoute(requireAccessible)}
              onSwapPoints={handleSwapPoints}
              onResetRoute={handleResetRoute}
              loadingRoute={loadingRoute}
              routeStats={
                routeResult
                  ? {
                      totalDistance: routeResult.totalDistance,
                      instructionsCount: routeResult.instructions?.length || 0,
                    }
                  : null
              }
              errorMessage={null}
              isHighContrast={isHighContrast}
              isLargeText={isLargeText}
              language={language}
              mapSelectionMode={mapSelectionMode}
              onToggleMapSelectionMode={(mode) => setMapSelectionMode(mode)}
            />

            {/* Voice Audio Guidance Component */}
            {routeResult?.instructions?.length > 0 && (
              <VoiceGuide
                instructions={routeResult.instructions}
                instructionsTa={routeResult.instructionsTa}
                pathNodes={routeResult.pathNodes}
                activeStepIndex={activeSpokenStep}
                onActiveStepChange={(idx) => setActiveSpokenStep(idx)}
                isHighContrast={isHighContrast}
                isLargeText={isLargeText}
                language={language}
              />
            )}

            {/* Turn-by-Turn Directions */}
            <DirectionsList
              instructions={routeResult?.instructions}
              instructionsTa={routeResult?.instructionsTa}
              pathNodes={routeResult?.pathNodes}
              totalDistance={routeResult?.totalDistance}
              requireAccessible={requireAccessible}
              activeStepIndex={activeSpokenStep}
              isHighContrast={isHighContrast}
              isLargeText={isLargeText}
              language={language}
            />
          </div>

          {/* Right Column: Interactive Map Canvas */}
          <div className="lg:col-span-8 space-y-3 order-1 lg:order-2 h-full">
            <div className="h-[580px] sm:h-[640px]">
              <StationMap
                station={stationData.station}
                nodes={stationData.nodes}
                edges={stationData.edges}
                pathNodes={routeResult?.pathNodes || []}
                requireAccessible={requireAccessible}
                startNodeId={startNodeId}
                endNodeId={endNodeId}
                onNodeClick={handleNodeClick}
                onSetStartNode={handleSetStartNode}
                onSetEndNode={handleSetEndNode}
                mapSelectionMode={mapSelectionMode}
                onCancelMapSelectionMode={() => setMapSelectionMode(null)}
                isHighContrast={isHighContrast}
                isLargeText={isLargeText}
                language={language}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-4 text-center text-xs transition-colors ${
          isHighContrast
            ? 'bg-black border-white text-yellow-400'
            : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 {t('footerTitle', language)}</span>
          <span className={isHighContrast ? 'text-yellow-200' : 'text-slate-400'}>
            {t('footerSubtitle', language)}
          </span>
        </div>
      </footer>
    </div>
  );
}
