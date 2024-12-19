import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Instagram, 
  Twitter, 
  Facebook, 
  Music 
} from 'lucide-react';

const ContactSection = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'adam@beatsproduction.com',
      link: 'mailto:adam@beatsproduction.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 234 567 890',
      link: 'tel:+1234567890'
    },
    {
      icon: MapPin,
      title: 'Studio Location',
      content: 'Los Angeles, CA',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: Instagram, link: '#', label: 'Instagram' },
    { icon: Twitter, link: '#', label: 'Twitter' },
    { icon: Facebook, link: '#', label: 'Facebook' },
    { icon: Music, link: '#', label: 'SoundCloud' }
  ];

  return (
    <section id="contact" className={`
      py-20 px-4 
      ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}
      transition-colors duration-300
    `}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`
            text-4xl font-bold mb-4
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            Let's Create Together
          </h2>
          <p className={`
            text-lg
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
          `}>
            Ready to take your music to the next level? Get in touch!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className={`
                    flex items-center p-4 rounded-lg
                    ${isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-100'}
                    transition-colors duration-300 shadow-lg
                  `}
                >
                  <item.icon className={`
                    w-6 h-6 mr-4
                    ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                  `} />
                  <div>
                    <h3 className={`
                      font-semibold
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}
                    `}>
                      {item.title}
                    </h3>
                    <p className={`
                      ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {item.content}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`
                text-xl font-semibold mb-4
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`
                      p-3 rounded-full
                      ${isDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-blue-400' 
                        : 'bg-white hover:bg-gray-100 text-blue-600'}
                      transition-colors duration-300 shadow-lg
                    `}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`
            p-6 rounded-lg shadow-lg
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          `}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name"
                  className={`
                    block mb-2 font-medium
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`
                    w-full px-4 py-2 rounded-lg
                    ${isDarkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-900 border-gray-300'}
                    border focus:ring-2 focus:ring-blue-500 outline-none
                    transition-colors duration-300
                  `}
                />
              </div>

              <div>
                <label 
                  htmlFor="email"
                  className={`
                    block mb-2 font-medium
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`
                    w-full px-4 py-2 rounded-lg
                    ${isDarkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-900 border-gray-300'}
                    border focus:ring-2 focus:ring-blue-500 outline-none
                    transition-colors duration-300
                  `}
                />
              </div>

              <div>
                <label 
                  htmlFor="subject"
                  className={`
                    block mb-2 font-medium
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`
                    w-full px-4 py-2 rounded-lg
                    ${isDarkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-900 border-gray-300'}
                    border focus:ring-2 focus:ring-blue-500 outline-none
                    transition-colors duration-300
                  `}
                />
              </div>

              <div>
                <label 
                  htmlFor="message"
                  className={`
                    block mb-2 font-medium
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className={`
                    w-full px-4 py-2 rounded-lg
                    ${isDarkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-900 border-gray-300'}
                    border focus:ring-2 focus:ring-blue-500 outline-none
                    transition-colors duration-300
                  `}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-3 px-6 rounded-lg
                  flex items-center justify-center
                  ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'}
                  text-white font-medium
                  transition-colors duration-300
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;