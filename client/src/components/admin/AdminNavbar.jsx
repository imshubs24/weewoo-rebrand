import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <h1 className="font-Mogra text-2xl text-red-500 select-none">
                WEEWOO!
            </h1>

            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500">Admin</p>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;