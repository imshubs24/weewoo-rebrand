import { useEffect } from "react";
import AboutUs from "../components/home/AboutUs";
import DownloadApp from "../components/home/DownloadApp";
import HeroSection from "../components/home/HeroSection";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="w-full">
            <HeroSection />

            <AboutUs />

            <DownloadApp />
        </main>
    );
};

export default Home;