import React from 'react';
import { 
  FaMusic, 
  FaInstagram, 
  FaTwitter, 
  FaFacebook, 
  FaYoutube 
} from 'react-icons/fa'; // Import icons from react-icons

const Footer = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaInstagram, 
      href: 'https://instagram.com', 
      color: 'text-pink-500 hover:text-pink-600' 
    },
    { 
      icon: FaTwitter, 
      href: 'https://twitter.com', 
      color: 'text-blue-400 hover:text-blue-500' 
    },
    { 
      icon: FaFacebook, 
      href: 'https://facebook.com', 
      color: 'text-blue-600 hover:text-blue-700' 
    },
    { 
      icon: FaYoutube, 
      href: 'https://youtube.com', 
      color: 'text-red-500 hover:text-red-600' 
    }
  ];

  return (
    <footer className={` 
      ${isDarkMode 
        ? 'bg-gray-800 text-gray-300' 
        : 'bg-gray-100 text-gray-800'
      } 
      py-12 transition-colors duration-300
    `}>
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <FaMusic 
              size={32} 
              className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} 
            />
            <span className="text-2xl font-bold">Adam's Beats</span>
          </div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Creating unique beats and instrumentals that inspire musicians worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            {['Home', 'Beats', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={` 
                  block 
                  ${isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-black'
                  } 
                  transition-colors duration-200
                `}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <nav className="space-y-2">
            {['Privacy Policy', 'Terms of Service', 'Licensing'].map((link) => (
              <a
                key={link}
                href="#"
                className={` 
                  block 
                  ${isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-black'
                  } 
                  transition-colors duration-200
                `}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-bold mb-4">Connect</h4>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href, color }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${color} transition-colors duration-200`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={` 
        mt-8 pt-4 text-center border-t 
        ${isDarkMode 
          ? 'border-gray-700 text-gray-500' 
          : 'border-gray-300 text-gray-600'
        }
      `}>
        © {currentYear} Adam's Beats. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
