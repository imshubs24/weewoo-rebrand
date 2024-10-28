import React, { useEffect, useState } from 'react'
import { useCart } from '../hooks/CartContext'
import { loadStripe } from '@stripe/stripe-js';
import { useModal } from '../hooks/ModalContext';
import { useUser } from '../hooks/UserContext';

const Cart = () => {

    const { openModal } = useModal();
    const { isLoggedIn } = useUser();
    const { cartItems, removeItem, increaseQuantity, decreaseQuantity } = useCart();

    const calculateSubtotal = () => {
        let subtotal = 0;
        for (const item of cartItems) {
            subtotal += item.quantity * item.price
        };
        return subtotal;
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const taxRate = 0.05; // 5% tax
        const taxAmount = subtotal * taxRate;
        return subtotal + taxAmount;
    };

    const makePayment = async () => {
        try {
            if (!isLoggedIn) {
                openModal();
                return;
            }

            const authtoken = localStorage.getItem('authtoken');

            const body = { cartItems };

            const response = await fetch('http://127.0.0.1:4000/api/payment/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authtoken}` },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                console.log(response);
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return;
            }

            const { url } = await response.json();

            // Update the new window's location to the Stripe checkout URL
            window.location.href = url;

        } catch (error) {
            console.error('Error: ', error);
        }
    };

    // scroll windows to top whenver switched to new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <div className='min-h-dvh h-auto w-full relative flex flex-col'>
                <div className="w-full h-64 bg-[url('./assets/blog-cover.jpg')] absolute bg-no-repeat bg-cover bg-center -z-10">
                    <div className='absolute h-full w-full top-0 bg-black opacity-70'></div>
                </div>
                <div className="text-white text-7xl h-64 flex justify-center items-center">
                    <h1 className="font-Mogra">Cart</h1>
                </div>
                {
                    cartItems.length !== 0
                        ? <div className='flex w-[75%] self-center justify-center py-10'>
                            <div className='w-1/2'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-medium w-48 text-start px-2'>ORDERED ITEMS</p>
                                    <p className='font-medium w-32 text-center px-2'>PRICE</p>
                                    <p className='font-medium w-36 text-center px-2'>QUANTITY</p>
                                    <p className='font-medium w-28 text-center px-2'>TOTAL</p>
                                    <p className='font-medium w-12 text-center px-2'></p>
                                </div>
                                {
                                    cartItems.map((item, index) => (
                                        <div className='mt-5 text-sm flex flex-col gap-y-4' key={index}>
                                            <div className='flex justify-between items-center'>
                                                <p className='w-48 text-start px-2'>{item.name}</p>
                                                <p className='w-32 text-center px-2'><span>&#x20B9;</span> {item.price}</p>
                                                <p className='w-36 text-center px-2 select-none'>
                                                    <span className='px-1 border border-red-500 mx-2 hover:bg-red-500 hover:text-white cursor-pointer duration-100 ease-linear' onClick={() => decreaseQuantity(item)}>-</span>{item.quantity}<span className='px-1 border border-red-500 mx-2 hover:bg-red-500 hover:text-white cursor-pointer duration-100 ease-linear' onClick={() => increaseQuantity(item)}>+</span>
                                                </p>
                                                <p className='w-28 text-center px-2'><span>&#x20B9;</span> {item.quantity * item.price}</p>
                                                <p className='w-12 text-center px-2'><i className="fa-regular fa-trash-can hover:text-red-500 duration-100 ease-linear cursor-pointer" onClick={() => removeItem(item)}></i></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='h-auto w-0.5 mx-2 bg-red-500'></div>
                            <div className='w-1/2 flex flex-col gap-y-3'>
                                <h1 className='text-3xl'>DELIVERY CHARGES</h1>
                                <p className='text-gray-700 font-light'>Free Delivery</p>
                                <span className='w-4/6 p-3 border border-red-500 text-center font-medium select-none'>TOTAL CHARGES</span>
                                <div className='flex items-center justify-between w-4/6 mt-10 font-medium'>
                                    <p>SUBTOTAL</p>
                                    <p className='text-gray-500'>&#x20B9; <span>{calculateSubtotal().toFixed(2)}</span></p>
                                </div>
                                <div className='flex items-center justify-between w-4/6 font-medium'>
                                    <p>TOTAL<span>(5% GST)</span></p>
                                    <p className='text-red-500'>&#x20B9; <span>{calculateTotal().toFixed(2)}</span></p>
                                </div>
                                <div className='w-4/6 mt-8'>
                                    <button className='w-full border border-red-500 hover:bg-red-500 hover:text-white font-medium py-3 bg-white text-black duration-150 ease-linear' onClick={makePayment}>PROCEED TO CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                        : <div className='flex justify-center items-center text-3xl p-10'>NO ITEMS IN THE CART</div>
                }
            </div>
        </>
    )
}

export default Cart
