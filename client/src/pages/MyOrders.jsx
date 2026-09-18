import { useEffect, useState } from 'react'
import { useModal } from '../context/ModalContext';
import { useUser } from '../context/UserContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
            const response = await fetch(`${API_BASE_URL}/api/order/getorder`, {
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
                    <div className='relative grid w-[80%] p-3 gap-x-14 gap-y-5 place-content-between grid-cols-3 max-2xl:w-full max-xl:gap-x-2 max-lg:grid-cols-2 max-md:grid-cols-1'>
                        {
                            orders.length !== 0 ?
                                orders.map((order) => (
                                    <div className='h-96 md:max-w-[28rem] w-auto overflow-y-auto flex flex-col mb-3 bg-gray-200 p-3 max-md:w-full' key={order._id}>
                                        <p className='p-3 text-center border border-red-500 font-medium'>Order Date: {order.order_date[0]} @ {order.order_date[1]}</p>
                                        {order.order_items &&
                                            order.order_items.map((item) => (
                                                <ul className='flex flex-col border-b border-red-500' key={item.name}>
                                                    <li>Item: <span>{item.name}</span></li>
                                                    <li>Qty: <span>{item.quantity}</span></li>
                                                    <li>Price: <span>Rs. {item.price}</span></li>
                                                </ul>
                                            ))
                                        }

                                        <p className='text-lg font-medium mt-2'>Total: <span className='text-red-500 '>Rs. {order.totalAmount.toFixed(2)}</span></p>
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
