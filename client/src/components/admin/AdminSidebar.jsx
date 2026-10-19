import { NavLink } from "react-router-dom";
import { ChartPie, ShoppingBag, Utensils, Layers } from "lucide-react";

const links = [
    { name: "Dashboard", path: "/admin", Icon: ChartPie },
    { name: "Orders", path: "/admin/orders", Icon: ShoppingBag },
    { name: "Food", path: "/admin/food", Icon: Utensils },
    { name: "Categories", path: "/admin/categories", Icon: Layers },
];

const AdminSidebar = () => {
    return (
        <aside className="hidden md:block w-60 min-h-[calc(100vh-4rem)] bg-white border-r border-slate-200 p-4">
            <div className="flex flex-col gap-2">
                {links.map(({ name, path, Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === "/admin"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive
                                ? "bg-red-50 text-red-500"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`
                        }
                    >
                        <Icon size={18} className="w-5 shrink-0" />
                        {name}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default AdminSidebar;
