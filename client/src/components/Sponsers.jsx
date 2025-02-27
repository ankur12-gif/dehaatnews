import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useGetAllSponsorsQuery } from "../redux/api/sponsorsApi";

const Sponsers = () => {
    const { data } = useGetAllSponsorsQuery();
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Update slides when data is fetched
    useEffect(() => {
        if (data?.sponsors) {
            const imageUrls = data.sponsors.map((sponsor) => ({
                url: sponsor.photos[0]?.url || "", // Handle case where photos might be missing
            }));
            setSlides(imageUrls);
        }
    }, [data]);

    // Auto-slide every 2 seconds
    useEffect(() => {
        const interval = setTimeout(() => {
            nextSlide();
        }, 2000);
        return () => clearTimeout(interval); // Cleanup timeout on component unmount
    }, [currentIndex, slides]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * slides.length);
        setCurrentIndex(randomIndex);
    };

    return (
        <div className="w-full md:w-1/2 h-auto flex justify-center items-center py-4 mx-auto mt-16 md:mt-4">
            {/* Added mt-16 for small screens and md:mt-4 for larger screens */}
            <div className="relative w-full md:w-1/2 h-[50vh] md:h-[40vh] bg-gray-600 rounded-xl p-2 shadow-lg">
                {/* Slide */}
                {slides.length > 0 && (
                    <div
                        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                    ></div>
                )}

                {/* Left Arrow */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 left-2 text-lg p-1 bg-black/40 text-white rounded-full cursor-pointer"
                    onClick={prevSlide}
                >
                    <BsChevronCompactLeft size={20} />
                </div>

                {/* Right Arrow */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-lg p-1 bg-black/40 text-white rounded-full cursor-pointer"
                    onClick={nextSlide}
                >
                    <BsChevronCompactRight size={20} />
                </div>

                {/* Dots */}
                <div className="flex justify-center py-2">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className="text-2xl cursor-pointer"
                        >
                            <RxDotFilled
                                className={currentIndex === index ? "text-white" : "text-gray-400"}
                                size={14}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sponsers;