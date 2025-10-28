import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useModal } from '../hooks/ModalContext'
import { useUser } from '../hooks/UserContext'

const ProfileDropDown = () => {

    const { isLoggedIn, logout } = useUser();
    const { openModal } = useModal();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout first
        logout();

        // Force navigation on the next tick, ensuring the logout state update completes
        setTimeout(() => {
            navigate('/');
        }, 0);
    };

    return (
        <>
            <div className='flex flex-col items-center overflow-x-hidden bg-red-500 w-full'>
                <ul className='text-black text-base flex flex-col items-center w-full text-center'>
                    {
                        isLoggedIn &&
                        <>
                            <li className='py-2 w-full my-2'><Link to="/profile" className='p-2 font-medium hover:text-white duration-150 ease-linear'>My Profile</Link></li>
                            <li className='py-2 w-full my-2'><Link to="/myorders" className='p-2 font-medium hover:text-white duration-150 ease-linear'>My Orders</Link></li>
                        </>
                    }
                    <li className='py-2 w-full my-2'>
                        {
                            !isLoggedIn
                                ? <Link className='px-2 font-medium hover:text-white duration-150 ease-linear' onClick={openModal}>Login/Signup</Link>
                                : <Link className='px-2 font-medium hover:text-white duration-150 ease-linear' onClick={handleLogout} >Logout</Link>
                        }
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ProfileDropDown
