import React, { useEffect } from 'react'
import { useCart } from '../hooks/CartContext'

const SuccessfulPayment = () => {

    const { cartItems, clearCart } = useCart();


    const totalAmount = () => {
        let subtotal = 0;
        for (const item of cartItems) {
            subtotal += item.quantity * item.price
        };
        const taxRate = 0.05; // 5% tax
        const taxAmount = subtotal * taxRate;
        return subtotal + taxAmount;
    }

    const handleOrderSave = async () => {
        try {
            const email = localStorage.getItem('email');
            const authtoken = localStorage.getItem('authtoken');

            const body = { email, order_data: cartItems, order_date: new Date().toDateString(), totalAmount: totalAmount() }

            const response = await fetch('http://127.0.0.1:4000/api/order/neworder', {
                method: 'POST',
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${authtoken}` },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return;
            }

            const data = await response.json();

            if (!response.error) {
                console.log(data);
                clearCart();
            } else {
                // Handle login failure based on the API response
                console.error('Login failed:', data.error);
            };
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        if (cartItems.length !== 0) {
            handleOrderSave();
        }
    }, [cartItems])

    return (
        <>
            <div className='w-1/2 h-[50rem] border border-black p-10'>
            </div>
        </>
    )
}

export default SuccessfulPayment