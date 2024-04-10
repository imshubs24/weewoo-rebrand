import React from 'react'
import playstore from '../../assets/home-assets/playstore.png'
import appstore from '../../assets/home-assets/appstore.svg'

const DownloadApp = () => {
    return (
        <>
            <div className='h-36 w-[75%] flex items-center justify-center px-10'>
                <h1 className='text-[1.8rem] w-1/2'>For better experience, download the WeeWoo app now</h1>
                <div className='w-1/2 flex justify-center items-center gap-x-4'>
                    <img src={playstore} alt="playstore.png" className='w-56 cursor-pointer' />
                    <img src={appstore} alt="appstore.png" className='w-56 cursor-pointer' />
                </div>
            </div>
        </>
    )
}

export default DownloadApp
