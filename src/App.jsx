import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PhoneIcon } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import IntroTransition from './components/IntroTransition';
import Beatsales from './components/Beatsales';
import ContactSection from './components/Contact';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleIntroComplete = () => {
    setIsIntroComplete(true);
  };

  return (
    <Router>
      <div className={`
        ${isDarkMode ? 'dark' : ''}
        min-h-screen transition-colors duration-300
      `}>
        {!isIntroComplete && (
          <IntroTransition 
            isDarkMode={isDarkMode}
            onIntroComplete={handleIntroComplete}
          />
        )}

        {isIntroComplete && (
          <>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<HeroSection isDarkMode={isDarkMode} />} />
                <Route path="/beatsales" element={<Beatsales isDarkMode={isDarkMode} />} />
                <Route path="/intro" element={<IntroTransition isDarkMode={isDarkMode} onIntroComplete={handleIntroComplete} />} />
                <Route path="/contact" element={<ContactSection isDarkMode={isDarkMode} />} />
              </Routes>
            </main>
            
            <Footer isDarkMode={isDarkMode} />
            
           
          </>
        )}
      </div>
    </Router>
  );
}

export default App;

