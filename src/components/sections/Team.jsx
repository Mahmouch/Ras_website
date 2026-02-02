import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamMemberCard from '../carte';
import adam from '/assets/adam.png';
import amina from '/assets/amina.png';
import haitham from '/assets/haitham.png';
import hamdi from "/src/assets/pic/hamdi.png";
import RAS from '/assets/logo_ras.png';
import mahmoud from '/assets/RAS.png';
import ahlem from "../../assets/pic/ahlem.png";
import SplitText1 from '../texte.jsx/gsap1';
import ameni from '../../assets/pic/ameni.png';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

// 🎯 Team data organized by mandate year
const teamData = {
  2026: [
    {
      name: "Chair",
      position: "Chair",
      imageSrc: RAS, // Placeholder - remplacer par la vraie image
      socialLinks: {
        linkedin: "#",
        facebook: "#",
        instagram: "#"
      }
    },
    {
      name: "Vice Chair",
      position: "Vice Chair",
      imageSrc: RAS,
      socialLinks: {
        linkedin: "#",
        facebook: "#",
        instagram: "#"
      }
    },
    {
      name: "Secretary",
      position: "Secretary",
      imageSrc: RAS,
      socialLinks: {
        linkedin: "#",
        facebook: "#",
        instagram: "#"
      }
    },
    {
      name: "Treasurer",
      position: "Treasurer",
      imageSrc: RAS,
      socialLinks: {
        linkedin: "#",
        facebook: "#",
        instagram: "#"
      }
    },
    {
      name: "WebMaster",
      position: "WebMaster",
      imageSrc: RAS,
      socialLinks: {
        linkedin: "#",
        facebook: "#",
        instagram: "#"
      }
    },
    {
      name: "Dr Ilhem Kallel",
      position: "Advisor",
      imageSrc: ahlem,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/ilhem-kallel-78699b36/",
        facebook: "https://www.facebook.com/ikallel",
        instagram: "https://www.instagram.com/ilhem_kallel/",
      }
    }
  ],
  2025: [
    {
      name: "Ameni Selmi",
      position: "Chair",
      imageSrc: ameni,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/ameni-selmi-a53820230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        facebook: "https://www.facebook.com/ameni.as.selmi",
        instagram: "https://www.instagram.com/ameniselmi__?igsh=eXZ2Mmh6YmExeWV6"
      }
    },
    {
      name: "Adam Walha",
      position: "Vice Chair",
      imageSrc: adam,
      socialLinks: {
        linkedin: "#",
        facebook: "https://www.facebook.com/adam.walha.2025",
        instagram: "https://www.instagram.com/adamwalha2/"
      }
    },
    {
      name: "Amina Yaich",
      position: "Secretary",
      imageSrc: amina,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/amina-yaich/",
        facebook: "https://www.facebook.com/amina.yaich.391",
        instagram: "https://www.instagram.com/amina.yaich/"
      }
    },
    {
      name: "Haythem Ben Slima",
      position: "Treasurer",
      imageSrc: haitham,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/haythem-benslima/",
        facebook: "https://www.facebook.com/haythem.ben.slima",
        instagram: "https://www.instagram.com/haythembenslima/"
      }
    },
    {
      name: "Hamdi Jerbi",
      position: "Media Manager",
      imageSrc: hamdi,
      socialLinks: {
        linkedin: "#",
        facebook: "https://www.facebook.com/search/top?q=hamdi%20jerbi",
        instagram: "https://www.instagram.com/hamdijerbi73/"
      }
    },
    {
      name: "Chaari Mahmoud",
      position: "WebMaster",
      imageSrc: mahmoud,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/mahmoud-chaari/",
        facebook: "https://www.facebook.com/sami.chaari1/", 
        instagram: "https://www.instagram.com/chaari.mahmoud"
      }
    },
    {
      name: "Dr Ilhem Kallel",
      position: "Advisor",
      imageSrc: ahlem,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/ilhem-kallel-78699b36/",
        facebook: "https://www.facebook.com/ikallel",
        instagram: "https://www.instagram.com/ilhem_kallel/",
      }
    }
  ]
};

export default function Team() {
  const [selectedYear, setSelectedYear] = useState(2025);

  const years = [2026, 2025];
  const currentTeam = teamData[selectedYear] || [];

  return (
    <div className="w-full" id='team'>
      <div className="relative overflow-hidden">
        {/* Background clair avec subtle gradient - couleurs IEEE RAS */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50/20"></div>
        
        {/* Motifs géométriques IEEE RAS - Robotique et circuits */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* IEEE RAS Robotics circuits pattern */}
            <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="ras-circuit" x="0" y="0" width="250" height="250" patternUnits="userSpaceOnUse">
                  {/* Main circuit lines */}
                  <path d="M0 125h250M125 0v250M75 75h100M75 175h100M75 75v100M175 75v100" 
                        stroke="#5F2167" strokeWidth="2" fill="none"/>
                  
                  {/* Robot joints/connections */}
                  <circle cx="75" cy="75" r="4" fill="#862633"/>
                  <circle cx="175" cy="75" r="4" fill="#862633"/>
                  <circle cx="75" cy="175" r="4" fill="#862633"/>
                  <circle cx="175" cy="175" r="4" fill="#862633"/>
                  <circle cx="125" cy="125" r="6" fill="#5F2167"/>
                  
                  {/* Gear/mechanical elements */}
                  <g transform="translate(50, 50)">
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#862633" strokeWidth="1"/>
                    <path d="M-10,-10 L10,10 M-10,10 L10,-10" stroke="#862633" strokeWidth="1"/>
                  </g>
                  
                  <g transform="translate(200, 200)">
                    <circle cx="0" cy="0" r="12" fill="none" stroke="#5F2167" strokeWidth="1"/>
                    <path d="M-8,-8 L8,8 M-8,8 L8,-8" stroke="#5F2167" strokeWidth="1"/>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ras-circuit)"/>
            </svg>
          </div>
        </div>
        
        {/* Éléments décoratifs IEEE RAS - Robotique */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Robot arm inspired elements */}
          <div className="absolute top-20 left-10 w-8 h-8 border-2 border-purple-700/20 rounded-full animate-pulse">
            <div className="absolute inset-1 bg-purple-700/10 rounded-full"></div>
          </div>
          
          <div className="absolute top-40 right-20 w-12 h-12 border-2 border-red-800/20 animate-bounce" style={{animationDelay: '1s'}}>
            <div className="absolute inset-2 border border-red-800/20 transform rotate-45"></div>
          </div>
          
          <div className="absolute bottom-40 left-20 w-6 h-6 border-2 border-purple-700/20 animate-pulse" style={{animationDelay: '2s'}}>
            <div className="absolute inset-1 bg-gradient-to-br from-purple-700/10 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-20 right-40 w-10 h-10 border-2 border-red-800/20 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}>
            <div className="absolute inset-2 border border-red-800/20 rounded-full"></div>
          </div>
          
          {/* IEEE RAS Gears and mechanical elements */}
          <div className="absolute top-32 right-10">
            <svg width="60" height="60" viewBox="0 0 60 60" className="animate-spin" style={{animationDuration: '20s'}}>
              <circle cx="30" cy="30" r="20" fill="none" stroke="#862633" strokeWidth="2" opacity="0.2"/>
              <circle cx="30" cy="30" r="12" fill="none" stroke="#5F2167" strokeWidth="1" opacity="0.3"/>
              <path d="M20,20 L40,40 M20,40 L40,20" stroke="#862633" strokeWidth="1" opacity="0.2"/>
              <circle cx="30" cy="30" r="3" fill="#5F2167" opacity="0.4"/>
            </svg>
          </div>
          
          <div className="absolute bottom-32 left-40">
            <svg width="40" height="40" viewBox="0 0 40 40" className="animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}>
              <polygon points="20,5 35,15 35,25 20,35 5,25 5,15" 
                       fill="none" stroke="#862633" strokeWidth="2" opacity="0.2"/>
              <circle cx="20" cy="20" r="6" fill="none" stroke="#5F2167" strokeWidth="1" opacity="0.3"/>
              <circle cx="20" cy="20" r="2" fill="#5F2167" opacity="0.4"/>
            </svg>
          </div>
          
          {/* Additional IEEE elements */}
          <div className="absolute top-1/2 left-5">
            <svg width="30" height="30" viewBox="0 0 30 30" className="animate-pulse" style={{animationDuration: '3s'}}>
              <rect x="5" y="5" width="20" height="20" fill="none" stroke="#862633" strokeWidth="1" opacity="0.3"/>
              <circle cx="15" cy="15" r="8" fill="none" stroke="#5F2167" strokeWidth="1" opacity="0.2"/>
              <circle cx="15" cy="15" r="2" fill="#5F2167" opacity="0.4"/>
            </svg>
          </div>
          
          <div className="absolute top-3/4 right-5">
            <svg width="35" height="35" viewBox="0 0 35 35" className="animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}>
              <path d="M17.5,5 L30,12.5 L30,22.5 L17.5,30 L5,22.5 L5,12.5 Z" 
                    fill="none" stroke="#862633" strokeWidth="1" opacity="0.3"/>
              <circle cx="17.5" cy="17.5" r="5" fill="none" stroke="#5F2167" strokeWidth="1" opacity="0.2"/>
              <path d="M12.5,12.5 L22.5,22.5 M12.5,22.5 L22.5,12.5" stroke="#5F2167" strokeWidth="1" opacity="0.3"/>
            </svg>
          </div>
        </div>
        
        {/* Overlay subtil pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-blue-50/10"></div>
        
        {/* Contenu principal */}
        <div className="relative z-10 py-16 px-6 md:px-12 lg:px-16">
          <div className="flex justify-center items-center px-4 mt-8">
            <SplitText1
              text="Meet Our Team"
              className="font-title font-extrabold tracking-tight text-center 
                   text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                   text-[#5F2167] drop-shadow-2xl" 
              delay={260}
              duration={2}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>

          {/* 🎯 Year Selector Tabs */}
          <div className="flex justify-center items-center gap-4 mt-12 mb-8">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`
                  px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300
                  ${selectedYear === year
                    ? 'bg-gradient-to-r from-[#5F2167] to-[#862633] text-white shadow-lg scale-105'
                    : 'bg-white/80 text-[#5F2167] border-2 border-[#5F2167]/30 hover:border-[#5F2167] hover:shadow-md'
                  }
                `}
                whileHover={{ scale: selectedYear === year ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {year}
              </motion.button>
            ))}
          </div>

          {/* 🎯 Team Display with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex items-center min-h-screen flex-col"
            >
              {/* Pour 2026: Tous les membres en grid 3 par ligne */}
              {selectedYear === 2026 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {currentTeam.map((member, index) => (
                    <motion.div
                      key={`${selectedYear}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-transparent rounded-xl blur-xl transform -rotate-1"></div>
                      <TeamMemberCard
                        name={member.name}
                        position={member.position}
                        imageSrc={member.imageSrc}
                        socialLinks={member.socialLinks}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Pour 2025: Premier membre centré (Chair) + autres en grid */
                <>
                  {currentTeam.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="mb-12 flex justify-center"
                    >
                      <TeamMemberCard
                        name={currentTeam[0].name}
                        position={currentTeam[0].position}
                        imageSrc={currentTeam[0].imageSrc}
                        socialLinks={currentTeam[0].socialLinks}
                      />
                    </motion.div>
                  )}

                  {/* Les autres membres en grid 3 par ligne */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {currentTeam.slice(1).map((member, index) => (
                      <motion.div
                        key={`${selectedYear}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-transparent rounded-xl blur-xl transform -rotate-1"></div>
                        <TeamMemberCard
                          name={member.name}
                          position={member.position}
                          imageSrc={member.imageSrc}
                          socialLinks={member.socialLinks}
                        />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {/* Message si pas de données */}
              {currentTeam.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-2xl text-gray-500">
                    Team data for {selectedYear} coming soon...
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <hr className="border-gray-200/50" />
    </div>
  );
}