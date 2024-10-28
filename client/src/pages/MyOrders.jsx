import React, { useEffect, useState } from 'react'
import { useModal } from '../hooks/ModalContext';
import { useUser } from '../hooks/UserContext';

const MyOrders = () => {

    const { openModal } = useModal();
    const { isLoggedIn } = useUser();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {

            if (!isLoggedIn) {
                openModal();
                return;
            }

            const authtoken = localStorage.getItem('authtoken');
            const response = await fetch('http://127.0.0.1:4000/api/order/getorder', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${authtoken}` }
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`)
                return;
            }
            const orders = await response.json();
            console.log(orders.myOrders);
            setOrders(orders.myOrders);
        } catch (error) {
            console.error('Error', error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])


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
                    <div className='relative grid w-[80%] p-3 gap-x-14 gap-y-5 place-content-between grid-cols-3'>
                        {
                            orders.length !== 0 ?
                                orders.map((order) => (
                                    <div className='h-96 w-[28rem] overflow-y-auto flex flex-col mb-3 bg-gray-200 p-3' key={order._id}>
                                        <div className='p-3 text-center border border-red-500 font-medium'>Order Date: {order.order_date}</div>
                                        <div className='flex flex-col border-b border-red-500'>
                                            <p>Name: <span>Mushroom Swiss Burger</span></p>
                                            <p>Qty: <span>1</span></p>
                                            <p>Price: <span>$8.49</span></p>
                                        </div>
                                        <div className='text-lg font-medium text-red-500 mt-2'>Total: <span>$8.49</span></div>
                                    </div>
                                ))
                                : <p className='absolute text-xl -translate-x-1/2 -translate-y-1/2 left-1/2 top-2/3 font-medium underline underline-offset-4'>No Orders Found</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyOrders
