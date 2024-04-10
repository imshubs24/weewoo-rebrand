import image from '../../assets/home-assets/about-us-delivery.png'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <>
            <div className='flex items-center justify-start gap-x-36 w-[75%] h-[40vh] border-black'>
                <div id='about-us-image' className='w-1/2 flex items-center justify-center'>
                    <img src={image} alt="about-is-image" className='w-[80%] drop-shadow-home-about-us' />
                </div>
                <div id='about-us-text' className='w-1/2 flex flex-col items-start gap-y-5'>
                    <p className='font-medium text-2xl font-Mogra text-red-500'>A Few Words About Our Delivery Service</p>
                    <h1 className='text-7xl font-medium'>ABOUT US</h1>
                    <p className='text-gray-700 font-light'>Indulge in swift, savory delights with <span>WeeWoo</span>. We're here to deliver culinary excellence, swiftly and affordably, straight to your door.</p>
                    <p className='text-gray-700 text-lg flex gap-x-2 items-center justify-center'>Want to know more? About Us
                        <span className='text-red-500 text-[1.2rem]'>
                            <Link>
                                <i className="fa-solid fa-arrow-right py-1 px-5 border border-red-500 rounded-full hover:text-white hover:bg-red-500 hover:border-red-500 cursor-pointer duration-100 ease-linear"></i>
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default AboutUs
