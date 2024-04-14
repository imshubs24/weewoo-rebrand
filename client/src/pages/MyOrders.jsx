import React, { useEffect } from 'react'

const MyOrders = () => {

    // scroll windows to top whenver switched to new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <div className='min-h-[90vh] h-auto relative w-full flex flex-col items-center'>
                <div className="w-full h-64 bg-[url('./assets/blog-cover.jpg')] absolute bg-no-repeat bg-cover bg-center -z-10">
                    <div className='absolute h-full w-full top-0 bg-black opacity-70'></div>
                </div>
                <div className="text-white text-7xl h-64 flex justify-center items-center">
                    <h1 className="font-Mogra">My Orders</h1>
                </div>
                <div className='w-full flex justify-center'>
                    <div className='grid w-[80%] p-3 gap-x-14 gap-y-5 place-content-between grid-cols-3'>
                        <div className='h-[30rem] w-[28rem] overflow-y-auto flex flex-col mb-3 bg-gray-200 p-3'>
                            <div className='p-2 text-center text-lg border border-red-500 font-medium'>Order Date: Fri Apr 05 2024</div>
                            <div className='flex flex-col border-b border-red-500'>
                                <p>Name: <span>Mushroom Swiss Burger</span></p>
                                <p>Qty: <span>1</span></p>
                                <p>Price: <span>$8.49</span></p>
                            </div>
                            <div className='text-lg font-medium text-red-500 mt-2'>Total: <span>$8.49</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyOrders
