import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";
import { useCart } from "../hooks/CartContext";
import { useUser } from "../hooks/UserContext";

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const { getTotalCartItems } = useCart();
    const { isLoggedIn } = useUser();

    const handleProfileDropDown = () => {
        setProfileDropDown((prevState) => !prevState)
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])

    return (
        <div className={`w-full bg-white ${isScrolled ? 'h-16' : 'h-28'} border-b border-black flex justify-center sticky top-0 z-40`}>
            <div className='flex justify-between w-[75%]'>
                <div id="logo" className='flex items-center justify-center select-none '>
                    <Link to="/" className='font-Mogra text-logo text-red-600 cursor-pointer'>WEEWOO!</Link>
                </div>
                <div id="navigate" className='flex justify-center items-center'>
                    <ul className='flex items-center justify-center gap-x-16'>
                        <li><Link to="/" className='text-slate-800 font-medium text-base py-2 px-5 hover:text-red-600 ease-linear duration-150'>HOME</Link></li>
                        <li><Link to="/explore" className='text-slate-800 font-medium text-base py-2 px-5 hover:text-red-600 ease-linear duration-150'>EXPLORE</Link></li>
                        <li><Link to="/blog" className='text-slate-800 font-medium text-base py-2 px-5 hover:text-red-600 ease-linear duration-150'>BLOG</Link></li>
                        <li><Link to="/help" className='text-slate-800 font-medium text-base py-2 px-5 hover:text-red-600 ease-linear duration-150'>HELP</Link></li>
                    </ul>
                </div>
                <div id="users-tab" className='flex justify-center items-center'>
                    <ul className='flex items-center justify-center gap-x-3'>
                        <li className="relative">
                            <Link to="/cart" className='text-xl text-slate-800 hover:text-red-600 flex justify-center items-center'>
                                <i className="hover:scale-105 ease-linear duration-75 fa-solid fa-cart-shopping"></i>
                            </Link>
                            <span className="absolute text-[0.9rem] font-semibold bg-red-500 px-1 border border-red-500 rounded-full -top-5 left-1 text-white">{getTotalCartItems()}</span>
                        </li>
                        <li className='text-xl text-slate-800 relative select-none'>
                            <i className="hover:scale-105 ease-linear duration-75 fa-regular fa-user cursor-pointer hover:text-red-600" onClick={handleProfileDropDown}></i>
                            <div
                                className={`${profileDropDown ? 'flex' : 'hidden'} flex-col absolute min-w-52 h-auto bg-white border-2 border-white shadow-xl top-10 -right-5 z-10`}
                                onMouseLeave={handleProfileDropDown}>
                                <ProfileDropDown />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
