import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Activities from './components/sections/Activities';
import Team from './components/sections/Team';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import SplashScreen from './components/sections/splash';
import ChatbotWidget from './components/ChatbotWidget';
import SimulationIoT from './components/sections/woki';
import Admin from './pages/Admin';

function MainLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Timer pour commencer la transition
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Attendre la fin de l'animation de fade out
      setTimeout(() => {
        setShowSplash(false);
      }, 500); // 500ms pour l'animation de fadeOut
    }, 3500); // 3.5 secondes avant de commencer le fade out

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Splash Screen avec transition */}
      {showSplash && (
        <div className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <SplashScreen />
        </div>
      )}

      {/* Application principale */}
      {!showSplash && (
        <div className="animate-fade-in">
          <main>
            <Hero />
            <About />
            <Team />
            <Activities />
            <SimulationIoT />
            <Contact />
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}