import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useUser } from "../../context/UserContext";

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
                                <i className="fa-regular fa-user w-4"></i>
                                My Profile
                            </Link>
                        </li>

                        <li>
                            <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-red-500 transition-colors">
                                <i className="fa-solid fa-bag-shopping w-4"></i>
                                My Orders
                            </Link>
                        </li>

                        <li className="my-1 border-t border-slate-100"></li>
                    </>
                )}

                <li>
                    {!isLoggedIn ? (
                        <button type="button" onClick={openModal} className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 hover:text-red-500 transition-colors">
                            <i className="fa-solid fa-right-to-bracket w-4"></i>
                            Login / Signup
                        </button>
                    ) : (
                        <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <i className="fa-solid fa-right-from-bracket w-4"></i>
                            Logout
                        </button>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropDown;