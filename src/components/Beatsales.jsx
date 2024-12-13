import React, { useState } from 'react';
import { Search, ShoppingCart, Filter } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

const beatCategories = [
  "Trap", 
  "Hip Hop", 
  "R&B", 
  "Pop", 
  "Electronic", 
  "Lo-Fi", 
  "Rock", 
  "Alternative"
];

const initialBeats = [
  {
    id: 1,
    name: "Trap Beats Vol.1",
    genre: "Trap",
    category: "Aggressive",
    price: 29.99,
    preview: "/beats/trap1.mp3",
    thumbnail: "/placeholder.svg?height=400&width=400",
    isLicensed: false
  },
  {
    id: 2,
    name: "Hip Hop Instrumental",
    genre: "Hip Hop", 
    category: "Classic",
    price: 34.99,
    preview: "/beats/hiphop1.mp3",
    thumbnail: "/placeholder.svg?height=400&width=400",
    isLicensed: false
  },
  {
    id: 3,
    name: "R&B Smooth Vibes",
    genre: "R&B",
    category: "Melodic",
    price: 39.99,
    preview: "/beats/rnb1.mp3",
    thumbnail: "/placeholder.svg?height=400&width=400",
    isLicensed: false
  },
  {
    id: 4,
    name: "Lo-Fi Chill Beat",
    genre: "Lo-Fi",
    category: "Relaxed",
    price: 24.99,
    preview: "/beats/lofi1.mp3",
    thumbnail: "/placeholder.svg?height=400&width=400",
    isLicensed: false
  },
  {
    id: 5,
    name: "Electronic Dance Wave",
    genre: "Electronic",
    category: "High Energy",
    price: 44.99,
    preview: "/beats/electronic1.mp3",
    thumbnail: "/placeholder.svg?height=400&width=400",
    isLicensed: false
  }
];

const Beatsales = ({ isDarkMode, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [allBeats, setAllBeats] = useState(initialBeats);

  const filteredBeats = allBeats.filter(beat => 
    beat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === '' || beat.genre === selectedGenre) &&
    (selectedCategory === '' || beat.category === selectedCategory)
  );

  const addToCart = (beat) => {
    const existingItem = cart.find(item => item.id === beat.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === beat.id 
          ? {...item, quantity: item.quantity + 1, isLicensed: true} 
          : item
      ));
    } else {
      setCart([...cart, {...beat, quantity: 1, isLicensed: true}]);
    }
    
    setAllBeats(allBeats.map(item => 
      item.id === beat.id ? {...item, isLicensed: true} : item
    ));
  };

  return (
    <div className={`
      min-h-screen p-8
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' 
        : 'bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900'}
    `}>
      {/* Header with Close Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Beat Marketplace</h1>
        <button 
          onClick={onClose}
          className={`
            px-4 py-2 rounded-lg
            ${isDarkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
          `}
        >
          Close
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex space-x-4">
        <div className="flex-grow relative">
          <input 
            type="text" 
            placeholder="Search beats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full px-4 py-2 rounded-lg
              ${isDarkMode 
                ? 'bg-gray-800 text-white border border-gray-700' 
                : 'bg-white text-gray-900 border border-gray-300'}
            `}
          />
          <Search 
            className={`
              absolute right-3 top-3
              ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
            `} 
          />
        </div>

        {/* Genre Filter */}
        <select 
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={`
            px-4 py-2 rounded-lg
            ${isDarkMode 
              ? 'bg-gray-800 text-white border border-gray-700' 
              : 'bg-white text-gray-900 border border-gray-300'}
          `}
        >
          <option value="">All Genres</option>
          {[...new Set(allBeats.map(beat => beat.genre))].map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        {/* Category Filter */}
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`
            px-4 py-2 rounded-lg
            ${isDarkMode 
              ? 'bg-gray-800 text-white border border-gray-700' 
              : 'bg-white text-gray-900 border border-gray-300'}
          `}
        >
          <option value="">All Categories</option>
          {[...new Set(allBeats.map(beat => beat.category))].map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Beats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {filteredBeats.map((beat) => (
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
              <div className="flex justify-between items-center mb-2">
                <AudioPlayer 
                  preview={beat.preview} 
                  isDarkMode={isDarkMode} 
                  isLicensed={beat.isLicensed} 
                />
                <span className="font-semibold">${beat.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`
                  text-sm
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {beat.genre} | {beat.category}
                </span>
                <button 
                  onClick={() => addToCart(beat)}
                  className={`
                    flex items-center px-3 py-1 rounded-full
                    ${isDarkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'}
                  `}
                >
                  <ShoppingCart size={16} className="mr-1" /> Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className={`
          fixed bottom-0 left-0 right-0 p-4
          ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
          shadow-2xl
        `}>
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h3 className="font-bold">Your Cart</h3>
              {cart.map(item => (
                <span key={item.id} className="mr-2">
                  {item.name} (x{item.quantity})
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">
                Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </span>
              <button 
                className={`
                  px-4 py-2 rounded-lg
                  ${isDarkMode 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-green-500 text-white hover:bg-green-600'}
                `}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Beatsales;

