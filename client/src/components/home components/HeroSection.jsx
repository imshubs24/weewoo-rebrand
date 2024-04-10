import { Link } from "react-router-dom"

const HeroSection = () => {
    return (
        <>
            <div className='h-[85vh] w-full relative text-slate-100 '>
                <div className='h-full w-full absolute -z-10'>
                    <div className={`h-full w-full bg-[url('./assets/home-assets/sample.jpg')] absolute bg-no-repeat bg-cover bg-center`}>
                        <div id='tint' className='absolute h-full w-full top-0 bg-black opacity-50'></div>
                    </div>
                </div>
                <div className="text-white flex items-center justify-center h-full w-3/5">
                    <div className="w-3/5 flex flex-col gap-y-8 items-start justify-center h-full">
                        <p className="text-xl font-medium font-Mogra text-red-500 drop-shadow-hero-section-text">Welcome To Our Food Delivery Service</p>
                        <h1 className="text-7xl font-semibold drop-shadow-hero-section-text">FOOD DELIVERY</h1>
                        <Link
                            to="/explore"
                            className="select-none text-xl font-medium border border-red-500 py-3 px-4 rounded-full hover:ring-4 ring-red-500 ring-offset-2 hover:border-transparent hover:bg-red-500 hover:border-red-500 duration-100 ease-linear hover:drop-shadow-hero-navigate-button">
                            Order Now
                        </Link>
                    </div>
                </div>
                <div id='prev-btn'
                    className='select-none absolute flex justify-center items-center top-1/2 left-0 hover:drop-shadow-hero-navigate-button'>
                    <p className='cursor-pointer text-xl border-2 border-red-500 bg-transparent py-2 px-3 rounded-r-3xl border-l-0 z-10 hover:bg-red-500'>
                        Prev
                    </p>
                </div>
                <div id='next-btn'
                    className='select-none absolute flex justify-center items-center top-1/2 right-0 hover:drop-shadow-hero-navigate-button'>
                    <p className='cursor-pointer text-xl border-2 border-red-500 bg-transparent py-2 px-3 rounded-l-3xl border-r-0 z-10 hover:bg-red-500'>
                        Next
                    </p>
                </div>
            </div>
        </>
    )
}

export default HeroSection
