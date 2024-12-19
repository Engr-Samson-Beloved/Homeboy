import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ArrowRight } from 'lucide-react';
import { useSpring, animated, config } from '@react-spring/web';
import Beatsales from './Beatsales';

const beats = [
  {
    id: 1,
    name: "Trap Beats Vol.1",
    genre: "Trap",
    price: 29.99,
    preview: "/Kwaya Beat.mp3",
    thumbnail: "/1.jpg"
  },
  {
    id: 2,
    name: "Hip Hop Instrumental",
    genre: "Hip Hop",
    price: 34.99,
    preview: "/rrr.mp3",
    thumbnail: "/1.jpg"
  },
  {
    id: 3,
    name: "R&B Smooth Vibes",
    genre: "R&B",
    price: 39.99,
    preview: "/Drill Beat.mp3",
    thumbnail: "/adam.jpg"
  }
];

const HeroSection = ({ isDarkMode }) => {
  const [showBeatsales, setShowBeatsales] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (beats.length > 0) {
      setSelectedBeat(beats[0]);
      audioRef.current.src = beats[0].preview;
      audioRef.current.load();
      audioRef.current.oncanplaythrough = () => {
        audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        setIsPlaying(true);
      };
    }

    return () => {
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (selectedBeat) {
      audioRef.current.src = selectedBeat.preview;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback prevented:", e));
      }
    }
  }, [selectedBeat]);

  const togglePlay = (beat) => {
    if (selectedBeat && selectedBeat.id === beat.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log("Playback prevented:", e));
        setIsPlaying(true);
      }
    } else {
      setSelectedBeat(beat);
      setIsPlaying(true);
    }
  };

  // Animations
  const fadeIn = useSpring({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0px)' : 'translateY(50px)',
    config: config.molasses,
  });

  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 300,
    config: config.molasses,
  });

  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 600,
    config: config.molasses,
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 900,
    config: config.wobbly,
  });

  const beatCardAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 1200,
    config: config.gentle,
  });

  if (showBeatsales) {
    return <Beatsales 
      isDarkMode={isDarkMode} 
      onClose={() => setShowBeatsales(false)} 
    />;
  }

  return (
    <animated.div style={fadeIn} className={`
      min-h-screen flex flex-col justify-center 
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'}
      text-center py-16
    `}>
      <div className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="max-w-3xl mx-auto">
          <animated.h1 style={titleAnimation} className={`
            text-4xl md:text-6xl font-bold mb-6
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            Professional Beats That Elevate Your Music
          </animated.h1>
          
          <animated.p style={subtitleAnimation} className={`
            text-xl mb-8
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Discover unique, high-quality beats across multiple genres. Crafted with precision and passion.
          </animated.p>

          {/* CTA Buttons */}
          <animated.div style={buttonAnimation} className="flex justify-center space-x-4 mb-12">
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
          </animated.div>
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
            {beats.map((beat, index) => (
              <animated.div 
                key={beat.id}
                style={{
                  ...beatCardAnimation,
                  delay: 1200 + index * 200,
                }}
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
                    <button 
                      onClick={() => togglePlay(beat)}
                      className={`
                        flex items-center
                        ${isDarkMode 
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-blue-600 hover:text-blue-500'}
                      `}
                    >
                      {selectedBeat && selectedBeat.id === beat.id && isPlaying ? (
                        <>
                          Pause <Pause size={16} className="ml-1" />
                        </>
                      ) : (
                        <>
                          Preview <Play size={16} className="ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default HeroSection;