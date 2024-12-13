import React, { useState, useRef } from 'react';
import { Play, Pause, Download } from 'lucide-react';

const AudioPlayer = ({ preview, isDarkMode, isLicensed }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!isLicensed) {
      alert('Please purchase a license to download this beat.');
    }
    // If licensed, the download would be initiated here
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={togglePlay}
        className={`p-2 rounded-full ${
          isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <button
        onClick={handleDownload}
        className={`p-2 rounded-full ${
          isLicensed
            ? isDarkMode
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-green-500 hover:bg-green-600'
            : isDarkMode
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        <Download size={16} />
      </button>
      <audio ref={audioRef} src={preview} />
    </div>
  );
};

export default AudioPlayer;

