import React, { useState, useEffect } from 'react';

// Circular Text Component
const CircularText = ({ text, color = "#862633", spinDuration = 20, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const textArray = text.split('');
  const angleStep = 360 / textArray.length;
  
  return (
    <div 
      className={`${className} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="w-full h-full relative"
        style={{
          animation: `spin ${isHovered ? spinDuration / 3 : spinDuration}s linear infinite`,
        }}
      >
        {textArray.map((char, index) => (
          <span
            key={index}
            className="absolute text-xs font-bold"
            style={{
              color: color,
              left: '50%',
              top: '50%',
              transform: `
                translate(-50%, -50%) 
                rotate(${index * angleStep}deg) 
                translateY(-60px) 
                rotate(${-index * angleStep}deg)
              `,
              transformOrigin: 'center',
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Enhanced Footer Component
const navigation = {
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Team', href: '#team' },
  ],
  activities: [
    { name: 'Workshops', href: '#activities' },
    { name: 'Events', href: '#activities' },
    { name: 'Projects', href: '#activities' },
    { name: 'Training', href: '#activities' },
  ],
  resources: [
    { name: 'Home', href: '#home' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=100090530634047',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: '#1877f2'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/ieee_ras_chapter_isims_sb/',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: '#E4405F'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/ieee-ras-chapter-isims-student-branch',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: '#0077B5'
    },
  ],
};

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="relative bg-white overflow-hidden">
      {/* IEEE RAS Colors Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50"></div>
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#862633" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className={`mx-auto max-w-7xl px-6 pt-16 pb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Top Section with Logo and Navigation */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Logo and Description */}
            <div className="lg:col-span-1 flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 relative">
                  <CircularText
                    text="IEEE RAS ISIMS SB "
                    color="#862633"
                     onHover="speedUp"
                  spinDuration={20}
                  className="absolute w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">IEEE RAS ISIMS</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Advancing robotics and automation through innovation, research, and collaborative learning.
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Company Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 border-b-2 border-blue-100 pb-2">
                  Organization
                </h3>
                <ul className="space-y-3">
                  {navigation.company.map((item, index) => (
                    <li key={item.name} className={`transition-all duration-500`} style={{ animationDelay: `${index * 100}ms` }}>
                      <a 
                        href={item.href} 
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activities Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-600 border-b-2 border-red-100 pb-2">
                  Activities
                </h3>
                <ul className="space-y-3">
                  {navigation.activities.map((item, index) => (
                    <li key={item.name} className={`transition-all duration-500`} style={{ animationDelay: `${index * 100}ms` }}>
                      <a 
                        href={item.href} 
                        className="text-gray-700 hover:text-red-600 transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-2">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {navigation.resources.map((item, index) => (
                    <li key={item.name} className={`transition-all duration-500`} style={{ animationDelay: `${index * 100}ms` }}>
                      <a 
                        href={item.href} 
                        className="text-gray-700 hover:text-gray-900 transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600 mb-2">
                Visit Our Campus
              </h3>
              <p className="text-gray-600">Higher Institute of Computer Science and Multimedia of Sfax</p>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
                  <iframe
                    title="ISIMS Location"
                    className="w-full h-80 lg:h-96"
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.676221159104!2d10.754659075596052!3d34.83923237287076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d19db21e2b53%3A0x771c533873752407!2sISIMSF!5e0!3m2!1sfr!2stn!4v1749655550712!5m2!1sfr!2stn"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media and Copyright */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-sm">
                  &copy; {new Date().getFullYear()} IEEE RAS ISIMS Student Branch. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Empowering the next generation of robotics engineers
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {navigation.social.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    style={{ 
                      backgroundColor: item.bgColor,
                      animationDelay: `${index * 200}ms` 
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {item.name}
                    </span>
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}