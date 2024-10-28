import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='flex justify-center h-96 border border-black w-full bg-[#02060C] text-gray-500 py-10'>
                <div className='w-[75%] flex justify-evenly'>
                    <div className='flex flex-col items-start select-none'>
                        <p className='font-Mogra text-logo text-red-600'>WEEWOO!</p>
                        <p>Online Food Delivery App</p>
                    </div>
                    <div>
                        <ul className='flex flex-col gap-y-3'>
                            <li className='text-white font-bold'>Company</li>
                            <li className='cursor-pointer hover:text-gray-300'>About</li>
                            <li className='cursor-pointer hover:text-gray-300'>Careers</li>
                            <li className='cursor-pointer hover:text-gray-300'>Team</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-y-8'>
                        <ul className='flex flex-col gap-y-3'>
                            <li className='text-white font-bold'>Contact Us</li>
                            <li className='cursor-pointer hover:text-gray-300'>Help & Support</li>
                            <li className='cursor-pointer hover:text-gray-300'>Partner with us</li>
                            <li className='cursor-pointer hover:text-gray-300'>Ride with us</li>
                        </ul>
                        <ul className='flex flex-col gap-y-3'>
                            <li className='text-white font-bold'>Legal</li>
                            <li className='cursor-pointer hover:text-gray-300'>Terms & Conditions</li>
                            <li className='cursor-pointer hover:text-gray-300'>Cookie Policy</li>
                            <li className='cursor-pointer hover:text-gray-300'>Privacy Policy</li>
                        </ul>
                    </div>
                    <div>
                        <ul className='flex flex-col gap-y-3'>
                            <li className='text-white font-bold'>We deliver to:</li>
                            <li>Pune</li>
                            <li>Mumbai</li>
                            <li>Bangalore</li>
                            <li>Delhi</li>
                            <li>Hyderabad</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
