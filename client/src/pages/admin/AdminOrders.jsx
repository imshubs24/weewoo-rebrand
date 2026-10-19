import { useEffect, useState } from "react";
import api from "../../services/api";
import { useToastify } from "../../context/ToastifyContext";
import { X } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { notify } = useToastify();

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/order/admin");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/api/order/status/${orderId}`, {
        orderStatus: status,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: status }
            : order
        )
      );

      notify(`Order status updated successfully`, "success");
    } catch (error) {
      console.error("Failed to update order status:", error);

      notify(error.response?.data?.message || "Failed to update order status", "error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Orders</h1>
          <p className="mt-1 text-slate-500">Manage customer orders.</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <p className="text-slate-500">No orders found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Order ID</p>
                    <p className="font-medium text-slate-900">{order._id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="font-semibold text-slate-900">₹{order.totalAmount.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Payment</p>
                    <p className="font-medium text-slate-900 capitalize">{order.paymentStatus}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Status</p>

                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-red-500"
                    >
                      <option value="placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                  >
                    View Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Order Details</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedOrder._id}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 text-xl"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-slate-500">Customer</p>
                <p className="font-medium text-slate-900">{selectedOrder.user?.name}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900">{selectedOrder.user?.email}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium text-slate-900">{selectedOrder.user?.phone || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Payment</p>
                <p className="font-medium text-slate-900 capitalize">{selectedOrder.paymentStatus}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Order Status</p>
                <p className="font-medium text-slate-900 capitalize">
                  {selectedOrder.orderStatus?.replaceAll("_", " ")}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Total</p>
                <p className="font-semibold text-slate-900">₹{selectedOrder.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-5">
              <h3 className="font-semibold text-slate-900 mb-4">Items</h3>

              <div className="flex flex-col gap-3">
                {selectedOrder.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border border-slate-200 rounded-lg p-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{item.food?.name}</p>
                      <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                    </div>

                    <p className="font-medium text-slate-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 mt-5 pt-5">
              <h3 className="font-semibold text-slate-900 mb-2">Delivery Address</h3>
              <div className="text-sm text-slate-600">
                <p>{selectedOrder.deliveryAddress?.street}</p>
                <p>
                  {selectedOrder.deliveryAddress?.city},{" "}
                  {selectedOrder.deliveryAddress?.state} -{" "}
                  {selectedOrder.deliveryAddress?.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default AdminOrders;