"use client"
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
        <div className="relative w-full max-w-lg mx-auto">
            <div className="overflow-hidden relative">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-full">
                            <img src={image} alt={`Image ${index}`} className="w-48 h-auto mx-auto object-cover" />
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-400 hover:bg-blue-700  text-white p-2 rounded-full"
            >
                &lt;
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-400 hover:bg-blue-700 text-white p-2 rounded-full"
            >
                &gt;
            </button>
        </div>
    );
};

export default Carousel;
