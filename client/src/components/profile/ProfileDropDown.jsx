import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useUser } from "../../context/UserContext";
import { UserRound, ShoppingBag, LogIn, LogOut } from "lucide-react";

const ProfileDropDown = () => {
    const { isLoggedIn, logout } = useUser();
    const { openModal } = useModal();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className="w-full bg-white">
            <ul className="flex flex-col py-2 text-sm">
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-red-500 transition-colors">
                                <UserRound size={16} />
                                My Profile
                            </Link>
                        </li>

                        <li>
                            <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-red-500 transition-colors">
                                <ShoppingBag size={16} />
                                My Orders
                            </Link>
                        </li>

                        <li className="my-1 border-t border-slate-100"></li>
                    </>
                )}

                <li>
                    {!isLoggedIn ? (
                        <button type="button" onClick={openModal} className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 hover:text-red-500 transition-colors">
                            <LogIn size={16} />
                            Login / Signup
                        </button>
                    ) : (
                        <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <LogOut size={16} />
                            Logout
                        </button>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropDown;