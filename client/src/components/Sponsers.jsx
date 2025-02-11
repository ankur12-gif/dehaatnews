import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Sponsers = () => {
    const slides = [
        { url: "./src/images/ngo1.jpg" },
        { url: "./src/images/ngo2.jpg" },
        { url: "./src/images/ngo3.jpg" },
        { url: "./src/images/ngo4.jpg" },
        { url: "./src/images/ngo5.jpg" },
        { url: "./src/images/ngo6.jpg" },
        { url: "./src/images/ngo7.jpg" },
        { url: "./src/images/ngo8.jpg" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    };

    const nextSlide = () => {
        setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div className="w-full h-screen bg-gray-600 flex justify-center items-center">
            <div className="relative max-w-[1400px] w-3/4 h-[780px] bg-gray-600 rounded-xl p-4 shadow-lg">
                {/* Slide */}
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                    className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                ></div>

                {/* Left Arrow */}
                <div className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl p-2 bg-black/40 text-white rounded-full cursor-pointer">
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>

                {/* Right Arrow */}
                <div className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl p-2 bg-black/40 text-white rounded-full cursor-pointer">
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>

                {/* Dots */}
                <div className="flex justify-center py-4">
                    {slides.map((_slide, index) => (
                        <div key={index} onClick={() => setCurrentIndex(index)} className="text-2xl cursor-pointer">
                            <RxDotFilled className={currentIndex === index ? "text-white" : "text-gray-400"} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sponsers;
