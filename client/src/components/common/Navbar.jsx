import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropDown from "../profile/ProfileDropDown";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import hamburgerIcon from "../../assets/menu.png";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);

    const { getTotalCartItems } = useCart();
    const { isLoggedIn, user } = useUser();

    const handleProfileDropDown = () => {
        setProfileDropDown((prevState) => !prevState);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`w-full bg-white sticky top-0 z-40 border-b border-slate-200 transition-shadow duration-200 ${isScrolled ? "shadow-md" : "shadow-sm"}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="font-Mogra text-2xl sm:text-3xl text-red-600 select-none"
                    >
                        WEEWOO!
                    </Link>

                    {/* Navigation */}
                    <ul className="hidden md:flex items-center gap-8 lg:gap-10">
                        <li>
                            <Link
                                to="/"
                                className="text-sm font-medium text-slate-700 hover:text-red-600 transition-colors"
                            >
                                HOME
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/explore"
                                className="text-sm font-medium text-slate-700 hover:text-red-600 transition-colors"
                            >
                                EXPLORE
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/blog"
                                className="text-sm font-medium text-slate-700 hover:text-red-600 transition-colors"
                            >
                                BLOG
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/help"
                                className="text-sm font-medium text-slate-700 hover:text-red-600 transition-colors"
                            >
                                HELP
                            </Link>
                        </li>
                    </ul>

                    {/* User Actions */}
                    <div className="flex items-center gap-4">

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-2 text-slate-700 hover:text-red-600 transition-colors"
                        >
                            <i className="fa-solid fa-cart-shopping text-lg"></i>

                            <span className="absolute -top-2 -right min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-semibold">
                                {getTotalCartItems()}
                            </span>
                        </Link>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={handleProfileDropDown}
                                className="flex items-center gap-2 p-2 text-slate-700 hover:text-red-600 transition-colors"
                            >
                                <i className="fa-regular fa-user text-lg"></i>

                                {isLoggedIn && user?.name && (
                                    <span className="hidden lg:block text-sm font-medium text-slate-700">
                                        Hi, {user?.name?.split(" ")[0]}
                                    </span>
                                )}
                            </button>

                            {profileDropDown && (
                                <div
                                    className="absolute top-12 right-0 w-52 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
                                    onMouseLeave={() => setProfileDropDown(false)}
                                >
                                    <ProfileDropDown />
                                </div>
                            )}
                        </div>

                        {/* Mobile menu */}
                        <button
                            type="button"
                            className="md:hidden p-2"
                        >
                            <img
                                src={hamburgerIcon}
                                alt="Menu"
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;