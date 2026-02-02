import React, { useState } from 'react';

const Button = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  // Contenus avec images
  const contents = [
    {
      title: "ESP32",
      text: "The ESP32 is a powerful and versatile microcontroller with built-in Wi-Fi and Bluetooth capabilities, making it ideal for IoT and wireless communication projects. Its low cost, energy efficiency, and dual-core processor have made it a favorite among developers for applications ranging from smart devices to automation systems.",
      image: "/assets/esp32.jpg",
      buttonText: "Next"
    },
    {
      title: "Arduino",
      text: "Arduino is an open-source electronics platform that simplifies the creation of interactive projects by integrating hardware and software. It's widely used by hobbyists and professionals alike to build embedded systems ranging from robots to smart home devices.",
      image: "/assets/arduino.jpg",
      buttonText: "Next"
    },
    {
      title: "Sound Sensor:",
      text: "Sound sensors, such as the KY-038, are used to detect noise or sound levels in the environment. They can be connected to microcontrollers like Arduino for interactive projects, such as lights activated by clapping.",
      image:  "/assets/cds.jpg",
      buttonText: "Next"
    },
    {
      title: "Color Sensor",
      text: "Color sensors, like the TCS230, measure light spectrums to identify colors. They are often used in industrial and robotic applications for object recognition.",
      image:  "/assets/cdc.jpg",
      buttonText: "Next" 
    },
    {
      title: "Raspberry Pi",
      text: "The Raspberry Pi is a versatile microcomputer perfect for projects ranging from programming to smart home automation. It’s ideal for learning coding and developing IoT devices.",
      image:  "/assets/raspberry.jpg",
      buttonText: "Next" 
    },
    {
      title: "RC Motors",
      text: "RC (remote-controlled) motors are used in models such as cars, planes, and boats. They come in brushed and brushless versions, suitable for different applications.",
      image:  "/assets/rc.jpg",
      buttonText: "Close" 
    },
  ];

  const openModal = () => {
    setCurrentContentIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextContent = () => {
    if (currentContentIndex === contents.length - 1) {
      closeModal();
    } else {
      setCurrentContentIndex(prevIndex => prevIndex + 1);
    }
  };

  const currentContent = contents[currentContentIndex];

  return (
    <>
      {/* Bouton principal */}
      <div className="absolute bottom-5 right-5 sm:bottom-5 sm:right-6 md:bottom-4 md:right-6 flex items-center justify-center group">
        <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
        <button
          onClick={openModal}
          className="relative inline-flex items-center justify-center text-sm sm:text-base md:text-lg rounded-xl bg-gray-900 px-6 py-2 sm:px-8 sm:py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
        >
          Explore More
          <svg
            aria-hidden="true"
            viewBox="0 0 10 10"
            height={12}
            width={12}
            fill="none"
            className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
          >
            <path d="M0 5h7" className="transition opacity-0 group-hover:opacity-100" />
            <path d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
          </svg>
        </button>
      </div>

      {/* Modale */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay - clicable pour fermer */}
          <div 
            className="absolute inset-0 bg-opacity-70 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Contenu de la modale */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg mx-auto">
            {/* Layout flexible pour différents écrans */}
            <div className="flex flex-col md:flex-row">
              {/* Image - adaptative selon l'écran */}
              <div className="w-full h-56 md:h-1/2 md:w-1/2 overflow-hidden relative flex-shrink-0">
                <div className="h-56 md:h-1/2">
                  <img 
                    src={currentContent.image} 
                    alt={currentContent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Contenu texte et boutons */}
              <div className="w-full md:w-1/2 flex flex-col">
                {/* Titre et texte */}
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{currentContent.title}</h3>
                  <p className="text-gray-700">{currentContent.text}</p>
                </div>

                {/* Boutons - toujours en bas */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex space-x-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2 px-4 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  
                  <button
                    onClick={showNextContent}
                    className="flex-1 py-2 px-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    {currentContent.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Button;