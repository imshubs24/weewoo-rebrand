import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    const links = [
        { name: "Dashboard", path: "/admin", icon: "fa-chart-pie" },
        { name: "Orders", path: "/admin/orders", icon: "fa-bag-shopping" },
        { name: "Food", path: "/admin/food", icon: "fa-utensils" },
        { name: "Categories", path: "/admin/categories", icon: "fa-layer-group" },
    ];

    return (
        <aside className="hidden md:block w-60 min-h-[calc(100vh-4rem)] bg-white border-r border-slate-200 p-4">
            <div className="flex flex-col gap-2">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === "/admin"}
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive ? "bg-red-50 text-red-500" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                    >
                        <i className={`fa-solid ${link.icon} w-5`}></i>
                        {link.name}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default AdminSidebar;