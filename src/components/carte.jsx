import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TeamMemberCard({
  name,
  position,
  imageSrc,
  socialLinks = {
    linkedin: "#",
    mail: "#",
    facebook: "#",
    instagram: "#",
  },
  scaleOnHover = 1.05,
  rotateAmplitude = 8,
}) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-center p-4  rounded-lg shadow-lg backdrop-blur-md transition-transform duration-300 bg-gradient-to-r from-[#66346d] to-[#e66072]
      w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative [transform-style:preserve-3d] flex flex-col items-center w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={`${name} - ${position}`}
          className="object-cover rounded-full w-full h-full border-4 border-white shadow-lg"
        />
      </motion.div>

      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-white sm:text-2xl">{name}</h3>
        <p className="text-sm text-white uppercase tracking-wider mt-1 sm:text-base">{position}</p>
      </div>

      <div className="flex justify-center space-x-3 mt-3">
        <a href={socialLinks.linkedin} className="text-white hover:text-blue-700 transition-colors">
          <FaLinkedin className="text-lg sm:text-xl" />
        </a>
        <a href={socialLinks.facebook} className="text-white hover:text-blue-600 transition-colors">
          <FaFacebook className="text-lg sm:text-xl" />
        </a>
        <a href={socialLinks.instagram} className="text-white hover:text-pink-600 transition-colors">
          <FaInstagram className="text-lg sm:text-xl" />
        </a>
      </div>
    </div>
  );
}
