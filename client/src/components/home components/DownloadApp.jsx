import React from 'react'
import playstore from '../../assets/home-assets/playstore.png'
import appstore from '../../assets/home-assets/appstore.svg'

const DownloadApp = () => {
    return (
        <>
            <div className='h-36 w-[75%] flex items-center justify-center px-10 max-xl:w-[90%] max-md:my-5 max-md:h-auto max-md:flex-col max-xl:px-0 max-md:gap-y-5 max-md:w-[90%]'>
                <h1 className='text-[1.8rem] w-1/2 max-md:w-9/12 max-sm:text-2xl'>For better experience, download the WeeWoo app now</h1>
                <div className='w-1/2 flex justify-center items-center gap-x-4 max-md:w-9/12 max-md:justify-between max-sm:flex-col max-sm:gap-y-3'>
                    <img src={playstore} alt="playstore.png" className='w-56 cursor-pointer' />
                    <img src={appstore} alt="appstore.png" className='w-56 cursor-pointer' />
                </div>
            </div>
        </>
    )
}

export default DownloadApp
    