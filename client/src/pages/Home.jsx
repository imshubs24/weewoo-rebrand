import { useEffect } from 'react'
import AboutUs from '../components/home/AboutUs'
import DownloadApp from '../components/home/DownloadApp'
import HeroSection from '../components/home/HeroSection'
import Trending from '../components/home/Trending'

const Home = () => {

    // scroll windows to top whenver switched to new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className='h-auto w-full flex flex-col items-center'>
            {/* Hero Section Component */}
            <HeroSection />

            {/* Trending Component */}
            {/* <Trending /> */}

            {/* About Us Component */}
            <AboutUs />
            {/* Download App Component */}
            <DownloadApp />
        </div>
    )
}

export default Home
