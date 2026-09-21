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
        <main className="w-full min-h-screen bg-slate-50">
            <section className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-[url('./assets/blog-cover.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/65"></div>
                <h1 className="relative z-10 text-5xl sm:text-6xl text-white font-Mogra">My Orders</h1>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                {orders.length !== 0 ? (
                    <div>
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Order History</p>
                            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">Your Orders</h2>
                            <p className="mt-2 text-sm text-slate-500">View your previous orders and their details.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {orders.map((order) => (
                                <article key={order._id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                                    <div className="flex items-center justify-between gap-3 px-5 py-4 bg-slate-50 border-b border-slate-200">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-slate-400">Order Date</p>
                                            <p className="mt-1 text-sm font-medium text-slate-800">{order.order_date[0]} @ {order.order_date[1]}</p>
                                        </div>

                                        <span className="w-9 h-9 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                                            <i className="fa-solid fa-receipt text-sm"></i>
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                                            {order.order_items?.map((item) => (
                                                <div key={item.name} className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-slate-800 truncate">{item.name}</p>
                                                        <p className="mt-1 text-xs text-slate-500">Qty: {item.quantity}</p>
                                                    </div>

                                                    <p className="shrink-0 text-sm font-medium text-slate-700">₹{item.price}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                                            <span className="font-medium text-slate-600">Total</span>
                                            <span className="text-lg font-semibold text-red-500">₹{order.totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-md mx-auto py-20 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                            <i className="fa-solid fa-receipt text-2xl text-slate-300"></i>
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold text-slate-900">No orders found</h2>
                        <p className="mt-2 text-slate-500">Your completed orders will appear here.</p>
                    </div>
                )}
            </section>
        </main>
    );
}

export default MyOrders
