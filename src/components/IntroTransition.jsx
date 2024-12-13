import React, { useState, useEffect } from 'react';
import { Album, Music, Play, Headphones } from 'lucide-react';

const IntroTransition = ({ isDarkMode, onIntroComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      
      // Trigger the completion after fade-out animation
      const completionTimer = setTimeout(() => {
        onIntroComplete();
      }, 1000); // Match this with CSS transition duration

      return () => clearTimeout(completionTimer);
    }, 10000); // 5 seconds display time

    return () => clearTimeout(timer);
  }, [onIntroComplete]);

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center 
      transition-all duration-1000 ease-in-out
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}
      ${fadeOut ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}
    `}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center w-full">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Personal Introduction */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Album size={48} className="text-blue-500" />
              <h1 className="text-4xl font-bold text-white">Adam's Beat Lab</h1>
            </div>
            
            <h2 className="text-3xl font-semibold text-gray-200">
              Professional Music Producer & FL Studio Maestro
            </h2>
            
            <p className="text-gray-400 leading-relaxed">
              With over a decade of experience in music production, I specialize in crafting unique, high-quality beats across multiple genres. My journey with FL Studio has been transformative, allowing me to push the boundaries of sound design and musical creativity.
            </p>
            
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                <Music size={24} className="text-green-500" />
                <span>10+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                <Headphones size={24} className="text-blue-500" />
                <span>Multi-Genre Expertise</span>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center">
                <Play size={24} className="mr-2" /> Listen to Beats
              </button>
              <button className="border border-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Contact Me
              </button>
            </div>
          </div>
          
          {/* Right Side - Producer Image/Visual */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-900 to-gray-800 rounded-full flex justify-center items-center">
              <img 
                src="/placeholder.svg?height=400&width=400" 
                alt="Adam - Music Producer" 
                className="w-80 h-80 rounded-full object-cover border-4 border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroTransition;

