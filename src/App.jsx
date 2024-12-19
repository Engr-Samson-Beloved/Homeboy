import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { PhoneIcon as WhatsApp } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import IntroTransition from './components/IntroTransition';
import Beatsales from './components/Beatsales';
import ContactSection from './components/Contact';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleIntroComplete = () => {
    setIsIntroComplete(true);
  };

  return (
    <Router>
      <div className={`
        ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}
        min-h-screen transition-colors duration-300
      `}>
        {/* Intro Transition */}
        {!isIntroComplete && (
          <IntroTransition 
            isDarkMode={isDarkMode}
            onIntroComplete={handleIntroComplete}
          />
        )}

        {/* Main App Content */}
        {isIntroComplete && (
          <>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<HeroSection isDarkMode={isDarkMode} />} />
                <Route path="/beatsales" element={<Beatsales isDarkMode={isDarkMode} />} />
                <Route path="/Intro" element={<IntroTransition isDarkMode={isDarkMode} />} />
                <Route path="/Contact" element={<ContactSection isDarkMode={isDarkMode} />} />
                {/* Add other routes here as needed */}
              </Routes>
            </main>
            
            <Footer isDarkMode={isDarkMode} />
            
            {/* WhatsApp Negotiation Floating Icon */}
            {/* <div className="fixed bottom-4 left-4 animate-bounce z-50">
              <a 
                href="https://wa.me/+YOUR_PHONE_NUMBER" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <WhatsApp 
                  size={64} 
                  className={`
                    ${isDarkMode 
                      ? 'text-green-400 hover:text-green-300' 
                      : 'text-green-600 hover:text-green-500'}
                  `}
                />
              </a>
            </div> */}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;

