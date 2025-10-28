import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import sample from '../../assets/home-assets/sample.jpg'
import sample2 from '../../assets/home-assets/sample2.jpg'
import sample3 from '../../assets/home-assets/sample3.jpg'
import sample4 from '../../assets/home-assets/sample4.jpg'
import sample5 from '../../assets/home-assets/sample5.jpg'

const images = [sample, sample2, sample3, sample4, sample5];

const HeroSection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef(null); // Use ref to store the interval ID

    // Function to go to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        resetInterval(); // Reset the interval when next is clicked
    };

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        resetInterval(); // Reset the interval when prev is clicked
    };

    // Function to reset the interval
    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current); // Clear the existing interval
        }
        intervalRef.current = setInterval(() => {
            nextImage(); // Automatically switch to the next image
        }, 3000); // Set the interval to 3 seconds
    };

    // Set up the interval when the component mounts
    useEffect(() => {
        resetInterval(); // Start the interval when the component mounts
        return () => clearInterval(intervalRef.current); // Clean up interval on unmount
    }, []);

    return (
        <>
            <div className="h-[85vh] w-full relative text-slate-100">
                <div className="h-full w-full absolute -z-10">
                    <div className={`h-full w-full absolute bg-no-repeat bg-cover bg-center`}
                        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
                        <div id="tint" className="absolute h-full w-full top-0 bg-black opacity-50"></div>
                    </div>
                </div>
                <div className="text-white flex items-center justify-center h-full w-10/12 max-md:w-full">
                    <div className="md:w-3/5 flex flex-col gap-y-8 items-start justify-center h-full">
                        <p className="text-xl font-medium font-Mogra text-red-500 drop-shadow-hero-section-text">
                            Welcome To Our Food Delivery Service
                        </p>
                        <h1 className="text-7xl font-semibold drop-shadow-hero-section-text">
                            FOOD DELIVERY
                        </h1>
                        <Link
                            to="/explore"
                            className="select-none text-xl font-medium border border-red-500 py-3 px-4 rounded-full hover:ring-4 ring-red-500 ring-offset-2 hover:border-transparent hover:bg-red-500 hover:border-red-500 duration-100 ease-linear hover:drop-shadow-hero-navigate-button"
                        >
                            Order Now
                        </Link>
                    </div>
                </div>
                <div
                    id="prev-btn"
                    className="select-none absolute flex justify-center items-center top-1/2 left-0 hover:drop-shadow-hero-navigate-button max-md:hidden"
                    onClick={prevImage}
                >
                    <p className="cursor-pointer text-xl border-2 border-red-500 bg-transparent py-2 px-3 rounded-r-3xl border-l-0 z-10 hover:bg-red-500">
                        Prev
                    </p>
                </div>
                <div
                    id="next-btn"
                    className="select-none absolute flex justify-center items-center top-1/2 right-0 hover:drop-shadow-hero-navigate-button max-md:hidden"
                    onClick={nextImage}
                >
                    <p className="cursor-pointer text-xl border-2 border-red-500 bg-transparent py-2 px-3 rounded-l-3xl border-r-0 z-10 hover:bg-red-500">
                        Next
                    </p>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
