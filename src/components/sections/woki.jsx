import React, { useState, useRef, useEffect } from 'react';
import wokwiProjects from '../../data/wokwiProjects.json';
import './SimulationIoT.css';

export default function SimulationIoT() {
  // États pour gérer la simulation
  const [selectedProject, setSelectedProject] = useState('blink');
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [autoStart, setAutoStart] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  // Construction de l'URL Wokwi avec paramètres
  const buildWokwiUrl = (projectId, autoStart = true, hideCode = true) => {
    const baseUrl = `https://wokwi.com/projects/${projectId}`;
    const params = new URLSearchParams();
    
    if (autoStart) params.append('start', '1');
    if (hideCode) params.append('hideCode', '1');
    params.append('embed', '1');
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Gestion du démarrage/arrêt de la simulation
  const toggleSimulation = () => {
    if (isSimulationRunning) {
      setIsSimulationRunning(false);
      // Recharger l'iframe pour arrêter la simulation
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }
    } else {
      setIsSimulationRunning(true);
      setIsLoading(true);
      setError(null);
      
      // Simuler un délai de chargement
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  // Gestion du plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Ouvrir le projet dans Wokwi
  const openInWokwi = () => {
    const currentProject = wokwiProjects.find(p => p.id === selectedProject);
    if (currentProject) {
      window.open(`https://wokwi.com/projects/${currentProject.projectId}`, '_blank');
    }
  };

  // Gestion des erreurs de chargement
  const handleIframeError = () => {
    setError('Erreur lors du chargement de la simulation. Vérifiez votre connexion internet.');
    setIsLoading(false);
  };

  // Gestion du changement de projet
  const handleProjectChange = (projectId) => {
    setSelectedProject(projectId);
    setIsSimulationRunning(false);
    setError(null);
  };

  // Effet pour gérer les événements de plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Filtrer les projets par difficulté
  const filteredProjects = selectedDifficulty === 'all' 
    ? wokwiProjects 
    : wokwiProjects.filter(project => project.difficulty === selectedDifficulty);

  const currentProject = wokwiProjects.find(p => p.id === selectedProject);

  // Obtenir les difficultés uniques
  const difficulties = ['all', ...new Set(wokwiProjects.map(p => p.difficulty))];

  return (
    <section id="simulation-iot" className="py-16 bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className=" text-[#5F2167] bg-clip-text">
              Simulation IoT
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore and test IoT projects directly from your browser.
Edit code, run simulations, and discover interactive electronics!
          </p>
        </div>

        {/* Contrôles et sélecteur de projet */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sélecteur de projet */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Choose a project</h3>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All levels' : difficulty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectChange(project.id)}
                    className={`project-card p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedProject === project.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">
                            {project.name.split(' ')[0].charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {project.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`difficulty-badge px-2 py-1 text-xs rounded-full ${
                          project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {project.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">
                          {project.estimatedTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Options et contrôles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Simulation options </h3>
              
              {/* Options de configuration */}
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={autoStart}
                    onChange={(e) => setAutoStart(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Start automatically</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={!showCode}
                    onChange={(e) => setShowCode(!e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Hide code</span>
                </label>
              </div>

              {/* Boutons de contrôle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={toggleSimulation}
                  disabled={isLoading}
                  className={`control-button px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isSimulationRunning
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </div>
                  ) : isSimulationRunning ? (
                    'Stop'
                  ) : (
                    'To start up'
                  )}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="control-button px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  {isFullscreen ? 'Sortir' : 'Plein écran'}
                </button>
              </div>

              <button
                onClick={openInWokwi}
                className="gradient-button w-full px-4 py-2 text-white rounded-lg font-medium transition-all duration-200"
              >
                Open in Wokwi
              </button>
            </div>
          </div>
        </div>

        {/* Zone de simulation */}
        <div 
          ref={containerRef}
          className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-4 z-50 fullscreen-container' : 'relative iframe-container'
          }`}
        >
          {/* En-tête de la simulation */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{currentProject?.name}</h3>
                <p className="text-blue-100 text-sm">{currentProject?.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isSimulationRunning ? 'bg-green-400 simulation-indicator' : 'bg-gray-400'}`}></div>
                <span className="text-sm">
                  {isSimulationRunning ? 'simulation active' : 'Simulation stopped'}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
         
          {/* Zone de l'iframe */}
          <div className="relative" style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '600px' }}>
            {error ? (
              <div className="flex items-center justify-center h-full bg-red-50">
                <div className="text-center p-8 error-message">
                  <svg className="w-16 h-16 text-red-400 mx-auto mb-4 icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Loading error</h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      setIsSimulationRunning(false);
                    }}
                    className="control-button px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : (
      <iframe
                ref={iframeRef}
                src={buildWokwiUrl(currentProject?.projectId, autoStart, !showCode)}
        width="100%"
                height="100%"
                className="border-0"
        allowFullScreen
        loading="lazy"
                title={`Simulation Wokwi - ${currentProject?.name}`}
                onError={handleIframeError}
                onLoad={() => setIsLoading(false)}
              />
            )}

            {/* Overlay de chargement */}
            {isLoading && (
              <div className="loading-overlay absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading simulation...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900">Real-time simulation</h4>
              <p className="text-sm text-gray-600">Test your electronic circuits instantly</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900">Code modifiable</h4>
              <p className="text-sm text-gray-600">Modify Arduino/ESP32 code directly</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900">Ready projects</h4>
              <p className="text-sm text-gray-600">Discover concrete examples of IoT</p>
            </div>
          </div>
        </div>
    </div>
    </section>
  );
}
