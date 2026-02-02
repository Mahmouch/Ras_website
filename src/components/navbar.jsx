import React, { useState } from 'react';
import logo_ras from '/assets/logo_ras.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 ">
      <div className="w-full h-12 bg-gradient-to-r from-[#8f3a44] to-[#643c69] text-white text-sm px-4 flex justify-center items-center p-4 shadow-lg">
        <div className='flex gap-6'>
            <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" class="hover:underline">IEEE.org</a>
            <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" class="hover:underline">IEEE Xplore</a>
            <a href="https://ieee-collabratec.ieee.org/" target="_blank" rel="noopener noreferrer" class="hover:underline">IEEE.org</a>
            <a href="https://www.ieee.org/profile/public/createwebaccount/showCreateAccount.html?url=https%3A%2F%2Fwww.ieee.org%2F&ShowMGAMarkeatbilityOptIn=true" target="_blank" rel="noopener noreferrer" class="hover:underline">Join IEEE</a>


        </div>
        </div>
        <nav className='w-full bg-gradient-to-r from-[#862633] to-[#5F2167] p-4 shadow-lg'>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src={logo_ras} className="w-60" alt="Logo" />
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a
              href="#home"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-white hover:text-purple-200 transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a href="#team" className="text-white hover:text-purple-200 transition-colors"
            >
              Team
            </a>
          </li>
          <li>
            <a
              href="#activities"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Activities
            </a>
          </li>

            <li>
              <a
                href="#simulation-iot"
                className="block text-white hover:text-purple-200 transition-colors"
              >
                Simulation
            </a>
            </li>
            <li>
            <a
              href="#contact"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Contact
            </a>
          </li>
         
        </ul>
      </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gradient-to-r from-[#8f3a44] to-[#643c69] bg-opacity-90 rounded-lg p-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <a
                href="#home"
                className="block text-white hover:text-purple-200 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block text-white hover:text-purple-200 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="block text-white hover:text-purple-200 transition-colors"
              >
                 Activities
              </a>
            </li>
            <li>
              <a
                href="#simulation-iot"
                className="block text-white hover:text-purple-200 transition-colors"
              >
                Simulation
            </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block text-white hover:text-purple-200 transition-colors"
              >
                Contact
            </a>
            </li>
            
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;