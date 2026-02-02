import { motion } from 'framer-motion';
import { RocketLaunchIcon, UsersIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import React from 'react';

const features = [
  {
    name: 'Innovation',
    description: 'We promote creativity and cutting-edge thinking in the field of robotics and intelligent systems.',
    icon: LightBulbIcon,
  },
  {
    name: 'Community',
    description: 'Join a dynamic network of passionate students and professionals who share a common vision for the future of automation.',
    icon: UsersIcon,
  },
  {
    name: 'Hands-On Projects',
    description: 'Engage in real-world robotics projects and enhance your technical and problem-solving skills.',
    icon: RocketLaunchIcon,
  },
];

export default function About() {
  return (
    <div id="about" className="py-24 sm:py-32 bg-gradient-to-b from-white to-[#862633]/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#5F2167] sm:text-4xl">About Us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
           IEEE RAS ISIMS SB is dedicated to advancing the theory and practice of robotics and automation. Our mission is to inspire and empower the next generation of robotics innovators.
          </p>
        </motion.div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-[#5F2167]">
                  <feature.icon className="h-5 w-5 flex-none text-[#862633]" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-700">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center gap-x-6"
        >
          <a
            href="#contact"
            className="rounded-md bg-[#862633] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#862633]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#862633]"
          >
           Join Our Team
          </a>
          <a
            href="#activities"
            className="text-sm font-semibold leading-6 text-[#5F2167]"
          >
            Discover Our Activities <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
} 