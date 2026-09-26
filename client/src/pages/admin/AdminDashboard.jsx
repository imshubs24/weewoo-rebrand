import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardStats = async () => {
        try {
            const response = await api.get("/api/admin/dashboard");

            setStats(response.data.stats);
            setRecentOrders(response.data.recentOrders);
        } catch (error) {
            console.error("Failed to fetch dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></span>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
                <p className="mt-1 text-slate-500">Welcome back, Admin.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">Total Orders</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">{stats?.totalOrders ?? 0}</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">Total Revenue</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">₹{stats?.totalRevenue.toFixed(2) ?? 0}</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">Total Users</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">{stats?.totalUsers ?? 0}</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">Total Food Items</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">{stats?.totalFoodItems ?? 0}</p>
                </div>
            </div>
            <div className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
                    <p className="text-sm text-slate-500 mt-1">Latest customer orders.</p>
                </div>

                {recentOrders.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-slate-500">No orders found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 text-left">
                                    <th className="px-5 py-3 font-medium text-slate-500">Order</th>
                                    <th className="px-5 py-3 font-medium text-slate-500">Customer</th>
                                    <th className="px-5 py-3 font-medium text-slate-500">Amount</th>
                                    <th className="px-5 py-3 font-medium text-slate-500">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order._id} className="border-b border-slate-100 last:border-0">
                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            #{order._id.slice(-6)}
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {order.user?.name || "Unknown"}
                                        </td>

                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            ₹{order.totalAmount.toFixed(2)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="capitalize text-slate-600">
                                                {order.orderStatus.replaceAll("_", " ")}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;