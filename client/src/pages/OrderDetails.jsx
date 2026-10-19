import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { Receipt, CircleCheck, CookingPot, Bike, House, X } from "lucide-react";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const response = await api.get(`/api/order/${id}`);
            setOrder(response.data.order);
        } catch (error) {
            console.error("Failed to fetch order:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
                <h2 className="text-2xl font-semibold text-slate-900">Order not found</h2>
                <button
                    type="button"
                    onClick={() => navigate("/orders")}
                    className="mt-5 px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                >
                    Back to Orders
                </button>
            </main>
        );
    }

    const orderStatuses = [
        { value: "placed", label: "Placed", Icon: Receipt },
        { value: "confirmed", label: "Confirmed", Icon: CircleCheck },
        { value: "preparing", label: "Preparing", Icon: CookingPot },
        { value: "out_for_delivery", label: "Out for Delivery", Icon: Bike },
        { value: "delivered", label: "Delivered", Icon: House },
    ];

    const currentStatusIndex = orderStatuses.findIndex(
        (status) => status.value === order.orderStatus
    );

    const handleCancelOrder = async () => {
        const confirmed = window.confirm("Are you sure you want to cancel this order?");

        if (!confirmed) return;

        try {
            const response = await api.put(`/api/order/cancel/${order._id}`);

            setOrder(response.data.order);
        } catch (error) {
            console.error("Failed to cancel order:", error);
        }
    };

    return (
        <main className="w-full min-h-screen bg-slate-50">
            <section className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-[url('./assets/blog-cover.webp')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/65"></div>
                <h1 className="relative z-10 text-5xl sm:text-6xl text-white font-Mogra">Order Details</h1>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <button
                    type="button"
                    onClick={() => navigate("/orders")}
                    className="mb-6 text-sm font-medium text-slate-600 hover:text-red-500 transition"
                >
                    ← Back to Orders
                </button>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 sm:p-8 border-b border-slate-100">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-400">Order ID</p>
                                <p className="mt-1 text-sm font-medium text-slate-800 break-all">{order._id}</p>

                                <p className="text-xs uppercase tracking-wider text-slate-400 mt-4">Order Date</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">
                                    {new Date(order.createdAt).toLocaleDateString()} @ {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </div>

                            <span className="shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                                <Receipt size={18} />
                            </span>
                        </div>
                    </div>

                    <div className="border-b border-slate-100 p-6 sm:p-8">
                        <h2 className="text-lg font-semibold text-slate-900">Order Status</h2>

                        {order.orderStatus === "cancelled" ? (
                            <div className="mt-5 flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 p-4">
                                <span className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                                    <X size={18} />
                                </span>

                                <div>
                                    <p className="font-medium text-red-600">Order Cancelled</p>
                                    <p className="text-sm text-red-500 mt-1">This order has been cancelled.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6">
                                <div className="flex items-start">
                                    {orderStatuses.map((status, index) => {
                                        const isCompleted = index <= currentStatusIndex;
                                        const isLast = index === orderStatuses.length - 1;

                                        return (
                                            <div key={status.value} className="flex-1 flex items-start">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted ? "bg-red-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                                                        <status.Icon size={14} />
                                                    </div>

                                                    <p className={`mt-2 text-xs sm:text-sm text-center ${isCompleted ? "text-slate-800 font-medium" : "text-slate-400"}`}>
                                                        {status.label}
                                                    </p>
                                                </div>

                                                {!isLast && (
                                                    <div className={`h-1 flex-1 mt-5 mx-2 rounded-full ${index < currentStatusIndex ? "bg-red-500" : "bg-slate-100"}`}></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 sm:p-8">
                        <h2 className="text-lg font-semibold text-slate-900">Items</h2>

                        <div className="mt-5 space-y-4">
                            {order.items?.map((item) => (
                                <div key={item._id} className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                                    <div>
                                        <p className="font-medium text-slate-800">{item.food?.name}</p>
                                        <p className="mt-1 text-sm text-slate-500">Qty: {item.quantity}</p>
                                    </div>

                                    <p className="font-medium text-slate-700">₹{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-100 p-6 sm:p-8">
                        <h2 className="text-lg font-semibold text-slate-900">Delivery Address</h2>

                        <div className="mt-4 text-sm text-slate-600 space-y-1">
                            <p>{order.deliveryAddress?.street}</p>
                            <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
                            <p>{order.deliveryAddress?.pincode}</p>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 p-6 sm:p-8">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-500">Payment</span>
                            <span className="font-medium text-green-600 capitalize">{order.paymentStatus}</span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-slate-500">Order Status</span>
                            <span className="font-medium text-slate-800 capitalize">{order.orderStatus?.replaceAll("_", " ")}</span>
                        </div>

                        <div className="mt-5 pt-5 border-t border-slate-200 flex items-center justify-between">
                            <span className="font-medium text-slate-600">Total</span>
                            <span className="text-xl font-semibold text-red-500">₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                        {(order.orderStatus === "placed" || order.orderStatus === "confirmed") && (
                            <div className="mt-6 pt-5 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={handleCancelOrder}
                                    className="w-full py-2.5 rounded-lg border border-red-500 text-red-500 font-medium hover:bg-red-50 transition"
                                >
                                    Cancel Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default OrderDetails;