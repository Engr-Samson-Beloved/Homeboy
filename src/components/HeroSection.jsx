import React, { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import Beatsales from './Beatsales'; // Assuming this is in the same directory

const beats = [
  {
    id: 1,
    name: "Trap Beats Vol.1",
    genre: "Trap",
    price: 29.99,
    preview: "/beats/trap1.mp3",
    thumbnail: "/api/placeholder/400/400"
  },
  {
    id: 2,
    name: "Hip Hop Instrumental",
    genre: "Hip Hop",
    price: 34.99,
    preview: "/beats/hiphop1.mp3",
    thumbnail: "/api/placeholder/400/400"
  },
  {
    id: 3,
    name: "R&B Smooth Vibes",
    genre: "R&B",
    price: 39.99,
    preview: "/beats/rnb1.mp3",
    thumbnail: "/api/placeholder/400/400"
  }
];

const HeroSection = ({ isDarkMode }) => {
  const [showBeatsales, setShowBeatsales] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState(null);

  if (showBeatsales) {
    return <Beatsales 
      isDarkMode={isDarkMode} 
      onClose={() => setShowBeatsales(false)} 
    />;
  }

  return (
    <div className={`
      min-h-screen flex flex-col justify-center 
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'}
      text-center py-16
    `}>
      <div className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="max-w-3xl mx-auto">
          <h1 className={`
            text-4xl md:text-6xl font-bold mb-6
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            Professional Beats That Elevate Your Music
          </h1>
          
          <p className={`
            text-xl mb-8
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Discover unique, high-quality beats across multiple genres. Crafted with precision and passion.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            <button 
              onClick={() => setShowBeatsales(true)}
              className={`
                flex items-center px-6 py-3 rounded-lg 
                ${isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'}
                transition-colors duration-300 transform hover:scale-105
              `}
            >
              Get Access <ArrowRight className="ml-2" />
            </button>
            
            <button className={`
              flex items-center px-6 py-3 rounded-lg border
              ${isDarkMode 
                ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
              transition-colors duration-300 transform hover:scale-105
            `}>
              Listen Samples
            </button>
          </div>
        </div>

        {/* Beat Preview Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className={`
            text-2xl font-semibold mb-6
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            Featured Beats
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {beats.map((beat) => (
              <div 
                key={beat.id}
                className={`
                  rounded-lg overflow-hidden shadow-lg
                  ${isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200'}
                  transform transition-all duration-300 hover:scale-105
                `}
              >
                <img 
                  src={beat.thumbnail} 
                  alt={beat.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className={`
                    text-lg font-bold mb-2
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}>
                    {beat.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className={`
                      text-sm
                      ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {beat.genre} | ${beat.price}
                    </span>
                    <button className={`
                      flex items-center
                      ${isDarkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-500'}
                    `}>
                      Preview <Play size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;