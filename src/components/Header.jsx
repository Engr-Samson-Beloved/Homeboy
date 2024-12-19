import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Music, 
  ShoppingCart, 
  User 
} from 'lucide-react';

const Header = ({ toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Beats', to: '/beatsales' },
    { name: 'About', to: '/Intro' },
    { name: 'Contact', to: '/Contact' }
  ];

  return (
    <header className={`
      ${isDarkMode 
        ? 'bg-gray-900/80 text-white backdrop-blur-md' 
        : 'bg-white/80 text-black backdrop-blur-md'}
      fixed top-0 left-0 w-full z-50 shadow-lg transition-colors duration-300
    `}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Music 
            size={32} 
            className={`
              ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}
            `} 
          />
          <span className="text-2xl font-bold">Adam's Beats</span>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`
              ${isDarkMode 
                ? 'text-white hover:bg-gray-700' 
                : 'text-black hover:bg-gray-200'}
              p-2 rounded-full transition-colors duration-300
            `}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className={`
            md:hidden absolute top-full left-0 w-full 
            ${isDarkMode 
              ? 'bg-gray-800/95 text-white' 
              : 'bg-white/95 text-black'}
            shadow-lg rounded-b-xl overflow-hidden
            transition-all duration-300 ease-in-out
          `}>
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block py-2 px-3 rounded-lg
                    ${isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-200' 
                      : 'hover:bg-gray-100 text-gray-800'}
                    transition-colors duration-200
                  `}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-600/30">
                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className={`
                    flex items-center space-x-2 p-2 rounded-full
                    ${isDarkMode 
                      ? 'bg-gray-700 text-yellow-400' 
                      : 'bg-gray-200 text-gray-800'}
                    transition-colors duration-300
                  `}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                {/* Mobile Cart and Profile */}
                <div className="flex space-x-4">
                  <button className={`
                    ${isDarkMode 
                      ? 'text-white hover:text-blue-400' 
                      : 'text-black hover:text-blue-600'}
                  `}>
                    <ShoppingCart size={24} />
                  </button>
                  <button className={`
                    ${isDarkMode 
                      ? 'text-white hover:text-blue-400' 
                      : 'text-black hover:text-blue-600'}
                  `}>
                    <User size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`
                ${isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'}
                transition-colors duration-200
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`
              p-2 rounded-full
              ${isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
              transition-colors duration-300
            `}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Cart and Profile */}
          <button className={`
            ${isDarkMode 
              ? 'text-white hover:text-blue-400' 
              : 'text-black hover:text-blue-600'}
          `}>
            <ShoppingCart size={24} />
          </button>
          <button className={`
            ${isDarkMode 
              ? 'text-white hover:text-blue-400' 
              : 'text-black hover:text-blue-600'}
          `}>
            <User size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;