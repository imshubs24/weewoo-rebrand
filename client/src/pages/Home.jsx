import AboutUs from '../components/home components/AboutUs'
import DownloadApp from '../components/home components/DownloadApp'
import HeroSection from '../components/home components/HeroSection'
import Trending from '../components/home components/Trending'

const Home = () => {
    return (
        <div className='h-auto w-full flex flex-col items-center'>
            {/* Hero Section Component */}
            <HeroSection />

            {/* Trending Component */}
            <Trending />

            {/* About Us Component */}
            <AboutUs />
            {/* Download App Component */}
            <DownloadApp />
        </div>
    )
}

export default Home
