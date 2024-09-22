"use client"
import Image from 'next/image';
import React, { useState } from 'react';

type CarouselProps = {
    images: string[];
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative  bg-gray-50 w-full  ">
            <div className="overflow-hidden relative bg-white rounded-xl">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-full h-auto">
                            <Image src={image} alt={`Image ${index}`} width={350} height={100} className=" w-60 sm:w-80 h-auto mx-auto object-cover" />
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2  text-2xl  font-bold text-black p-2 rounded-md"
            >
                &lt;
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-l text-2xl font-bold text-black p-2 rounded-md"
            >
                &gt;
            </button>
        </div>
    );
};

export default Carousel;
