import React from 'react'

const Cart = () => {
    return (
        <>
            <div className='min-h-dvh h-auto w-full relative flex flex-col'>
                <div className="w-full h-64 bg-[url('./assets/blog-cover.jpg')] absolute bg-no-repeat bg-cover bg-center -z-10">
                    <div className='absolute h-full w-full top-0 bg-black opacity-70'></div>
                </div>
                <div className="text-white text-7xl h-64 flex justify-center items-center">
                    <h1 className="font-Mogra">Cart</h1>
                </div>
                <div className='flex w-[75%] self-center justify-center py-10'>
                    <div id='cart-items' className='w-1/2'>
                        <div id='cart-items-header' className='flex justify-between items-center'>
                            <p className='font-medium w-48 text-start px-2'>ORDERED ITEMS</p>
                            <p className='font-medium w-32 text-center px-2'>PRICE</p>
                            <p className='font-medium w-36 text-center px-2'>QUANTITY</p>
                            <p className='font-medium w-28 text-center px-2'>TOTAL</p>
                            <p className='font-medium w-12 text-center px-2'></p>
                        </div>
                        <div id='cart-items-units' className='mt-5 text-sm flex flex-col gap-y-4'>
                            <div className='flex justify-between items-center'>
                                <p className='w-48 text-start px-2'>Spicy Chicken Burger</p>
                                <p className='w-32 text-center px-2'>9.99</p>
                                <p className='w-36 text-center px-2 select-none'>
                                    <span className='px-1 border border-red-500 mx-2 hover:bg-red-500 hover:text-white cursor-pointer duration-100 ease-linear'>-</span>1<span className='px-1 border border-red-500 mx-2 hover:bg-red-500 hover:text-white cursor-pointer duration-100 ease-linear'>+</span>
                                </p>
                                <p className='w-28 text-center px-2'>9.99</p>
                                <p className='w-12 text-center px-2'><i className="fa-regular fa-trash-can hover:text-red-500 duration-100 ease-linear cursor-pointer"></i></p>
                            </div>
                        </div>
                    </div>
                    <div className='h-auto w-0.5 mx-2 bg-red-500'></div>
                    <div className='w-1/2 flex flex-col gap-y-3'>
                        <h1 className='text-3xl'>DELIVERY CHARGES</h1>
                        <p className='text-gray-700 font-light'>Free Delivery</p>
                        <span className='w-4/6 p-3 border border-red-500 text-center font-medium select-none'>TOTAL CHARGES</span>
                        <div className='flex items-center justify-between w-4/6 mt-10 font-medium'>
                            <p>SUBTOTAL</p>
                            <p className='text-gray-500'>$<span>27.97</span></p>
                        </div>
                        <div className='flex items-center justify-between w-4/6 font-medium'>
                            <p>TOTAL<span>(10% TAX)</span></p>
                            <p className='text-red-500'>$<span>30.77</span></p>
                        </div>
                        <div className='w-4/6 mt-8'>
                            <button className='w-full border border-red-500 hover:bg-red-500 hover:text-white font-medium py-3 bg-white text-black duration-150 ease-linear'>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
