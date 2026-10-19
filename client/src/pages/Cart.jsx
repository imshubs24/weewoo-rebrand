import { useEffect, useRef, useState } from "react";
import { useCart } from '../context/CartContext'
import { useModal } from '../context/ModalContext';
import { useToastify } from "../context/ToastifyContext";
import { useUser } from "../context/UserContext";
import api from "../services/api";
import AddressRequiredPopup from "../components/common/AddressRequiredPopup.jsx";
import loadRazorpay from "../utils/loadRazorpay.js";
import { Utensils, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

const Cart = () => {
    const { openModal } = useModal();
    const { cartItems, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCart();
    const { notify } = useToastify();
    const { user, isLoggedIn } = useUser();
    const [showAddressPopup, setShowAddressPopup] = useState(false);

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
        if (!isLoggedIn) {
            openModal();
            return;
        }

        if (
            !user?.address?.street ||
            !user?.address?.city ||
            !user?.address?.state ||
            !user?.address?.pincode
        ) {
            setShowAddressPopup(true);
            return;
        }

        try {
            const items = cartItems.map((item) => ({
                food: item.id,
                quantity: item.quantity,
            }));

            const loaded = await loadRazorpay();

            if (!loaded) {
                notify("Unable to load payment gateway. Please try again.", "error");
                return;
            }

            const response = await api.post("/api/payment/create-order", {
                items,
                deliveryAddress: user.address,
            });

            const { order } = response.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "WeeWoo",
                description: "Food Order",
                order_id: order.razorpayOrderId,

                modal: {
                    ondismiss: () => {
                        notify("Payment cancelled", "error");
                    },
                },

                handler: async (paymentResponse) => {
                    try {
                        await api.post("/api/payment/verify", {
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_signature: paymentResponse.razorpay_signature,
                            items,
                            deliveryAddress: user.address,
                        });

                        clearCart();

                        notify("Payment successful! Order placed.", "success");
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        notify(
                            error.response?.data?.message || "Payment verification failed",
                            "error"
                        );
                    }
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {
            console.error("Failed to create Razorpay order:", error);

            notify(error.response?.data?.message || "Failed to create order", "error");
        }
    };

    // scroll windows to top whenver switched to new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <main className="w-full min-h-screen bg-slate-50">
                <section className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-[url('./assets/blog-cover.webp')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/65"></div>
                    <h1 className="relative z-10 text-5xl sm:text-6xl text-white font-Mogra">Cart</h1>
                </section>

                {cartItems.length !== 0 ? (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Your Cart</p>
                                        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Ordered Items</h2>
                                    </div>
                                    <p className="text-sm text-slate-500">{cartItems.length} items</p>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className={`p-5 sm:p-6 ${index !== cartItems.length - 1 ? "border-b border-slate-200" : ""}`}>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                                                <div className="w-20 h-20 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
                                                    <Utensils size={24} className="text-slate-400" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-slate-900 truncate">{item.name}</h3>
                                                    <p className="mt-1 text-sm text-slate-500">₹{item.price} per item</p>
                                                </div>

                                                <div className="flex items-center justify-between sm:justify-start gap-6">
                                                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                                                        <button type="button" onClick={() => decreaseQuantity(item)} className="w-9 h-9 text-slate-600 hover:bg-red-500 hover:text-white transition-colors">−</button>
                                                        <span className="w-9 text-center text-sm font-medium">{item.quantity}</span>
                                                        <button type="button" onClick={() => increaseQuantity(item)} className="w-9 h-9 text-slate-600 hover:bg-red-500 hover:text-white transition-colors">+</button>
                                                    </div>

                                                    <p className="w-20 text-right font-semibold text-slate-900">₹{(item.quantity * item.price).toFixed(2)}</p>

                                                    <button type="button" onClick={() => removeItem(item)} className="text-slate-400 hover:text-red-500 transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-7 lg:sticky lg:top-24">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Order Summary</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Total Charges</h2>

                                    <div className="mt-7 space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">Subtotal</span>
                                            <span className="font-medium text-slate-900">₹{calculateSubtotal().toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">Delivery</span>
                                            <span className="font-medium text-green-600">Free</span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">GST</span>
                                            <span className="font-medium text-slate-900">5%</span>
                                        </div>
                                    </div>

                                    <div className="my-6 border-t border-slate-200"></div>

                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-slate-900">Total</span>
                                        <span className="text-xl font-semibold text-red-500">₹{calculateTotal().toFixed(2)}</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={makePayment}
                                        className="w-full mt-7 py-3.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors inline-flex items-center justify-center"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight size={14} className="ml-2" />
                                    </button>

                                    <p className="mt-4 text-xs text-center text-slate-400">You will be redirected to secure payment.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="max-w-md mx-auto text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                <ShoppingCart size={24} className="text-slate-300" />
                            </div>
                            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Your cart is empty</h2>
                            <p className="mt-2 text-slate-500">Looks like you haven't added anything to your cart yet.</p>
                        </div>
                    </section>
                )}
            </main>

            {showAddressPopup && (
                <AddressRequiredPopup
                    onClose={() => setShowAddressPopup(false)}
                />
            )}
        </>
    );
}

export default Cart
