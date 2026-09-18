import { useEffect, useRef, useState } from 'react';
import success from '../assets/payment-assets/success.png'
import cross from '../assets/payment-assets/cross.png'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PaymentStatus = () => {
    const [message, setMessage] = useState('Processing your payment...');
    const [error, setError] = useState(null);
    const hasRun = useRef(false);
    const navigate = useNavigate();
    const { clearCart } = useCart();

    useEffect(() => {
        // Function to handle payment success
        const handlePaymentStatus = async () => {

            // for dev mode as useEffect runs twice
            if (hasRun.current) return; // Prevent running the function again
            hasRun.current = true; // Set the ref to true to indicate the function has run

            const authtoken = localStorage.getItem('authtoken');

            // Retrieve the session_id from the URL query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const sessionId = urlParams.get('session_id');

            if (sessionId) {
                try {
                    // Call the backend to verify the payment and save the order
                    const response = await fetch(`${API_BASE_URL}/api/payment/payment-success?session_id=${sessionId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authtoken}` }
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log(result);

                        if (result.status === 'success') {
                            clearCart();
                            setMessage('Payment successful! Your order has been saved.');
                            setTimeout(() => {
                                navigate('/')
                            }, 3000);
                        } else {
                            clearCart();
                            setError('Payment was successful, but we encountered an issue saving your order.');
                            setTimeout(() => {
                                navigate('/')
                            }, 3000);
                        }
                    } else {
                        setError('Error processing payment. Please contact support.');
                        setTimeout(() => {
                            navigate('/cart')
                        }, 3000);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setError('Something went wrong while processing your payment.');
                    setTimeout(() => {
                        navigate('/cart')
                    }, 3000);
                }
            } else {
                setError('No session ID found. Unable to verify payment.');
                setTimeout(() => {
                    navigate('/cart')
                }, 3000);
            }
        };

        // Trigger the function on component mount
        handlePaymentStatus();
    }, []);

    return (
        <div className='p-5 text-center min-h-[34rem] h-auto flex justify-center'>
            {error ? (
                <div className='flex flex-col text-red-600 justify-center items-center gap-y-5'>
                    <h2 className='font-bold text-xl'>Payment Error</h2>
                    <img src={cross} alt="x-mark" className='w-28' />
                    <p>{error}</p>
                </div>
            ) : (
                <div className='flex flex-col text-green-600 justify-center items-center gap-y-5'>
                    <h2 className='font-bold text-xl'>Payment Success</h2>
                    <img src={success} alt="tick-mark" className='w-28' />
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentStatus;
