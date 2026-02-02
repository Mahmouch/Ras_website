import React, { useState, useEffect, Suspense } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));
import Navbar from '../navbar';
import Button from '../button';
import SplashScreen from './splash';

function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}

export default function Robot() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main id="home" className="min-w-screen min-h-screen  bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar />

      {/* Desktop Layout */}
      {isLargeScreen ? (
        <div className="relative w-full min-h-screen flex items-center justify-between px-8 lg:px-16 xl:px-24 pt-20 pb-10">

          {/* Contenu texte à gauche */}
          <div className="z-10 max-w-xl lg:max-w-2xl space-y-6 text-left">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-900">
              Robotics and Automation Society <br />
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                ISIMS Student Branch
              </span>
              <br />

            </h1>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed max-w-lg">
              Pioneering the future of robotics and automation—IEEE RAS ISIMS SB is committed to fostering innovation, technical excellence, and collaboration. Join our vibrant community to explore advanced robotics, hands-on projects, and transformative research that shape tomorrow's intelligent systems.
            </p>
          </div>

          {/* Modèle 3D à droite avec bouton pour cacher watermark */}
          <div className="w-full lg:w-1/2 xl:w-2/5 h-[500px] lg:h-[600px] xl:h-[700px] relative">
            <Suspense fallback={<LoadingSpinner />}>
              <Spline
                scene="https://prod.spline.design/K8GeMQ0vY22vfQ8p/scene.splinecode"
                className="absolute top-0 left-0 w-full h-full"
              />
            </Suspense>
          </div>
          {/* Bouton positionné pour cacher le watermark Spline */}
          <div className="absolute bottom-10 right-10 w-[200px] h-[500px] sm:w-[300px] sm:h-[600px] md:w-[300px] md:h-[200px] lg:w-[300px] lg:h-[165px] xl:w-[300px] xl:h-[700px] 2xl:w-[220px] 2xl:h-[75px] bg-transparen">
            <Button />

          </div>
        </div>
      ) : (
        /* Mobile Layout - Texte au-dessus de Spline */
        <div className="relative w-full min-h-screen flex flex-col px-6 pt-20 pb-10">

          {/* Contenu texte au-dessus */}
          <div className="z-10 text-center space-y-4 mb-8 mt-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-900">
              Welcome To Our <br />
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                Big Family
              </span>
              <br />
              <span className="text-blue-500 text-xl sm:text-2xl md:text-3xl">
                IEEE RAS ISIMS SB
              </span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Empowering innovation and driving digital success—IEEE SMC ISIMS SB is dedicated to advancing
              technology, collaboration, and professional growth. Join us in shaping the future through
              cutting-edge projects, research, and community engagement.
            </p>
          </div>

          {/* Modèle 3D en bas avec bouton pour cacher watermark */}
          <div className="flex-1 w-full relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
            <Suspense fallback={<LoadingSpinner />}>
              <Spline
                scene="https://prod.spline.design/K8GeMQ0vY22vfQ8p/scene.splinecode"
                className="absolute top-0 left-0 w-full h-full"
              />
            </Suspense>
            {/* Bouton positionné pour cacher le watermark Spline sur mobile */}
            <div className="absolute bottom-0 right-0 w-[200px] h-[500px] sm:w-[300px] sm:h-[600px] md:w-[300px] md:h-[200px] lg:w-[300px] lg:h-[165px] xl:w-[300px] xl:h-[700px] 2xl:w-[220px] 2xl:h-[75px] bg-transparent">
              <Button />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}