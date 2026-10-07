import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import sample from "../../assets/home-assets/sample.webp";
import sample2 from "../../assets/home-assets/sample2.webp";
import sample3 from "../../assets/home-assets/sample3.webp";
import sample4 from "../../assets/home-assets/sample4.webp";
import sample5 from "../../assets/home-assets/sample5.webp";

const images = [sample, sample2, sample3, sample4, sample5];

const HeroSection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef(null);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);

    return (
        <section className="relative w-full h-[calc(100vh-4rem)] min-h-[600px] max-h-[800px] overflow-hidden">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-full flex items-center">
                    <div className="max-w-2xl text-white">

                        <p className="text-sm sm:text-base font-medium uppercase tracking-[0.2em] text-red-400 mb-4">
                            Fresh food. Delivered fast.
                        </p>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
                            Delicious food,
                            <br />
                            <span className="text-red-500">
                                delivered to you.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-200 leading-relaxed">
                            Order your favorite meals from WeeWoo and enjoy
                            delicious food delivered straight to your doorstep.
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <Link
                                to="/explore"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors duration-200"
                            >
                                Explore Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Previous / Next */}
            <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm hover:bg-white hover:text-slate-900 transition hidden md:flex items-center justify-center"
                aria-label="Previous image"
            >
                <i className="fa-solid fa-chevron-left text-sm"></i>
            </button>

            <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm hover:bg-white hover:text-slate-900 transition hidden md:flex items-center justify-center"
                aria-label="Next image"
            >
                <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? "w-7 bg-red-500" : "w-2 bg-white/60 hover:bg-white"}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;