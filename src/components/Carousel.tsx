"use client"

import { CarouselProps } from '@/lib/definitions/frontEndDefinitions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 3000); 

      return () => clearInterval(interval);
  }, [images.length]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative  bg-gray-50 dark:bg-gray-600 rounded-lg w-full  ">
            <div className="overflow-hidden relative bg-white dark:bg-gray-700">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-full h-auto">
                            <Image src={image} alt={`Image ${index}`} width={350} height={100} className=" w-60 sm:w-80 h-auto mx-auto object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;

