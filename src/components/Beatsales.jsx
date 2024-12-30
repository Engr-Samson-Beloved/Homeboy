import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Filter } from "lucide-react";
//this is the outdated or react spring or you did not install the correct one
// import { useSpring, animated, config } from 'react-spring';

import AudioPlayer from "./AudioPlayer";
//this is the correct one from their docs
import { config, useSpring, animated } from "@react-spring/web";

const beatCategories = [
  "Trap",
  "Hip Hop",
  "R&B",
  "Pop",
  "Electronic",
  "Lo-Fi",
  "Rock",
  "Alternative",
];

const initialBeats = [
  {
    id: 1,
    name: "Drill Beat",
    genre: "Trap",
    category: "Aggressive",
    price: 29.99,
    preview: "/Drill Beat.mp3",
    thumbnail: "/4.png?height=400&width=400",
    isLicensed: true,
  },
  {
    id: 2,
    name: "Hip Hop Instrumental",
    genre: "Hip Hop",
    category: "Classic",
    price: 34.99,
    preview: "/beats/hiphop1.mp3",
    thumbnail: "/4.jpg?height=400&width=400",
    isLicensed: false,
  },
  {
    id: 3,
    name: "R&B Smooth Vibes",
    genre: "R&B",
    category: "Melodic",
    price: 39.99,
    preview: "/beats/rnb1.mp3",
    thumbnail: "/1.jpg?height=400&width=400",
    isLicensed: false,
  },
  {
    id: 4,
    name: "Lo-Fi Chill Beat",
    genre: "Lo-Fi",
    category: "Relaxed",
    price: 24.99,
    preview: "/beats/lofi1.mp3",
    thumbnail: "/5.png?height=400&width=400",
    isLicensed: false,
  },
  {
    id: 5,
    name: "Electronic Dance Wave",
    genre: "Electronic",
    category: "High Energy",
    price: 44.99,
    preview: "/beats/electronic1.mp3",
    thumbnail: "/3.png?height=400&width=400",
    isLicensed: false,
  },
];

const Beatsales = ({ isDarkMode }) => {
  const navigate = useNavigate(); // Add navigation hook

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [allBeats, setAllBeats] = useState(initialBeats);
  const [hoveredBeat, setHoveredBeat] = useState(null);

  // Handle Close with Navigation
  const handleClose = () => {
    navigate("/"); // Navigate back to home page
  };

  // Animated Background
  const backgroundProps = useSpring({
    from: {
      background: isDarkMode
        ? "linear-gradient(135deg, #1e1e1e 0%, #121212 100%)"
        : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    },
    to: {
      background: isDarkMode
        ? "linear-gradient(135deg, #121212 0%, #1e1e1e 100%)"
        : "linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)",
    },
    config: config.gentle,
    loop: { reverse: true },
  });

  // Beat Card Animation
  const getBeatCardProps = (beat) =>
    useSpring({
      from: {
        transform: "scale(0.9)",
        opacity: 0.7,
      },
      to: {
        transform: hoveredBeat === beat.id ? "scale(1.05)" : "scale(1)",
        opacity: hoveredBeat === beat.id ? 1 : 0.9,
      },
      config: config.wobbly,
    });

  // Cart Animation
  const cartProps = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(50px)",
    },
    to: {
      opacity: cart.length > 0 ? 1 : 0,
      transform: cart.length > 0 ? "translateY(0px)" : "translateY(50px)",
    },
    config: config.stiff,
  });

  const filteredBeats = allBeats.filter(
    (beat) =>
      beat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === "" || beat.genre === selectedGenre) &&
      (selectedCategory === "" || beat.category === selectedCategory)
  );

  const addToCart = (beat) => {
    const existingItem = cart.find((item) => item.id === beat.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === beat.id
            ? { ...item, quantity: item.quantity + 1, isLicensed: true }
            : item
        )
      );
    } else {
      setCart([...cart, { ...beat, quantity: 1, isLicensed: true }]);
    }

    setAllBeats(
      allBeats.map((item) =>
        item.id === beat.id ? { ...item, isLicensed: true } : item
      )
    );
  };

  return (
    <animated.div
      style={{
        ...backgroundProps,
        minHeight: "100vh",
        padding: "2rem",
        color: isDarkMode ? "white" : "black",
      }}
      className={`
        ${isDarkMode ? "text-white" : "text-gray-900"}
      `}
    >
      {/* Header with Close Button */}
      <animated.div
        style={useSpring({
          from: { opacity: 0, transform: "translateY(-20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
          config: config.gentle,
        })}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold">Beat Marketplace</h1>
        <button
          onClick={handleClose} // Updated to use handleClose
          className={`
            px-4 py-2 rounded-lg
            ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
        >
          Close
        </button>
      </animated.div>

      {/* Search and Filter Section */}
      <animated.div
        style={useSpring({
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
          config: config.gentle,
          delay: 100,
        })}
        className="mb-8 flex space-x-4"
      >
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search beats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full px-4 py-2 rounded-lg
              ${
                isDarkMode
                  ? "bg-gray-800 text-white border border-gray-700"
                  : "bg-white text-gray-900 border border-gray-300"
              }
            `}
          />
          <Search
            className={`
              absolute right-3 top-3
              ${isDarkMode ? "text-gray-400" : "text-gray-500"}
            `}
          />
        </div>

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={`
            px-4 py-2 rounded-lg
            ${
              isDarkMode
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-white text-gray-900 border border-gray-300"
            }
          `}
        >
          <option value="">All Genres</option>
          {[...new Set(allBeats.map((beat) => beat.genre))].map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`
            px-4 py-2 rounded-lg
            ${
              isDarkMode
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-white text-gray-900 border border-gray-300"
            }
          `}
        >
          <option value="">All Categories</option>
          {[...new Set(allBeats.map((beat) => beat.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </animated.div>

      {/* Beats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {filteredBeats.map((beat) => (
          <animated.div
            key={beat.id}
            style={getBeatCardProps(beat)}
            onMouseEnter={() => setHoveredBeat(beat.id)}
            onMouseLeave={() => setHoveredBeat(null)}
            className={`
              rounded-lg overflow-hidden shadow-xl
              ${
                isDarkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }
            `}
          >
            <img
              src={beat.thumbnail}
              alt={beat.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3
                className={`
                text-lg font-bold mb-2
                ${isDarkMode ? "text-white" : "text-gray-900"}
              `}
              >
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
                <span
                  className={`
                  text-sm
                  ${isDarkMode ? "text-gray-400" : "text-gray-600"}
                `}
                >
                  {beat.genre} | {beat.category}
                </span>
                <button
                  onClick={() => addToCart(beat)}
                  className={`
                    flex items-center px-3 py-1 rounded-full
                    ${
                      isDarkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }
                  `}
                >
                  <ShoppingCart size={16} className="mr-1" /> Buy
                </button>
              </div>
            </div>
          </animated.div>
        ))}
      </div>

      {/* Animated Cart Section */}
      {cart.length > 0 && (
        <animated.div
          style={cartProps}
          className={`
            fixed bottom-0 left-0 right-0 p-4
            ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
            shadow-2xl
          `}
        >
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h3 className="font-bold">Your Cart</h3>
              {cart.map((item) => (
                <span key={item.id} className="mr-2">
                  {item.name} (x{item.quantity})
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">
                Total: $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
              <button
                className={`
                  px-4 py-2 rounded-lg
                  ${
                    isDarkMode
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-500 text-white hover:bg-blue-600"
                  }
                `}
              >
                Checkout
              </button>
            </div>
          </div>
        </animated.div>
      )}
    </animated.div>
  );
};

export default Beatsales;
