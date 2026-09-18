import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ProfileDropDown from "../profile/ProfileDropDown";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import hamburgerIcon from '../../assets/menu.png'

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const { getTotalCartItems } = useCart();
    const { isLoggedIn, user } = useUser();

    const handleProfileDropDown = () => {
        setProfileDropDown((prevState) => !prevState)
    }

    useEffect(() => {
    }, [isLoggedIn])

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
        <div className={`w-full bg-white ${isScrolled ? 'h-16' : 'h-28'} border-b-4 border-red-500 flex justify-center sticky top-0 z-40`}>
            <div className='flex justify-between w-[75%] max-xl:w-full max-xl:justify-evenly max-md:justify-around'>
                <div id="logo" className='flex items-center justify-center select-none '>
                    <Link to="/" className='font-Mogra text-logo text-red-600 cursor-pointer'>WEEWOO!</Link>
                </div>
                <div id="navigate" className='flex justify-center items-center'>
                    <ul className='flex items-center justify-center gap-x-16 max-lg:gap-x-7 max-md:hidden'>
                        <li><Link to="/" className='text-slate-800 font-medium text-base py-2 px-5 hover:text-red-600 ease-linear duration-150'>HOME</Link></li>
                        <li><Link to="/explore" className='text-slate-800 font-medium text-base py-2 px-5 hover:text-red-600 ease-linear duration-150'>EXPLORE</Link></li>
                        <li><Link to="/blog" className='text-slate-800 font-medium text-base py-2 px-5 hover:text-red-600 ease-linear duration-150'>BLOG</Link></li>
                        <li><Link to="/help" className='text-slate-800 font-medium text-base py-2 px-5 hover:text-red-600 ease-linear duration-150'>HELP</Link></li>
                    </ul>
                </div>
                <div id="users-tab" className='flex justify-center items-center w-auto'>
                    <ul className='flex items-center justify-center gap-x-3'>
                        <li className="relative">
                            <Link to="/cart" className='text-lg text-slate-800 hover:text-red-500 flex justify-center items-center p-1'>
                                <i className="hover:scale-105 ease-linear duration-75 fa-solid fa-cart-shopping"></i>
                            </Link>
                            <span className={`absolute text-[0.8rem] font-semibold bg-red-500 px-1 border border-red-500 rounded-full -top-4 left-1.5 text-white`}>{getTotalCartItems()}</span>
                        </li>
                        <li className='text-lg text-slate-800 relative select-none'>
                            <i className="hover:scale-105 ease-linear duration-75 fa-regular fa-user cursor-pointer hover:text-red-600" onClick={handleProfileDropDown}></i>
                            {isLoggedIn && <span className="text-sm ml-2 font-medium max-xl:hidden">Hi, {user.name}</span>}

                            <div
                                className={`${profileDropDown ? 'flex' : 'hidden'} flex-col absolute min-w-52 h-auto bg-white border-2 border-white shadow-xl top-10 -right-5 z-10`}
                                onMouseLeave={handleProfileDropDown}>
                                <ProfileDropDown />
                            </div>
                        </li>
                        <li className='text-lg text-slate-800 relative select-none max-md:flex hidden p-1 cursor-pointer'>
                            <img src={hamburgerIcon} alt="hamburger icon" className="size-7" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
