import React from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../hooks/ModalContext'

const ProfileDropDown = () => {

    const { openModal } = useModal();

    return (
        <>
            <div className='flex flex-col items-center overflow-x-hidden bg-red-500 w-full'>
                <ul className='text-black text-base flex flex-col items-center w-full text-center'>
                    <li className='py-2 w-full my-2'><Link to="/profile" className='p-2 font-medium hover:text-white duration-150 ease-linear'>PROFILE</Link></li>
                    <li className='py-2 w-full my-2'><Link to="/myorders" className='p-2 font-medium hover:text-white duration-150 ease-linear'>MY ORDERS</Link></li>
                    <li className='py-2 w-full my-2'><Link className='px-2 font-medium hover:text-white duration-150 ease-linear' onClick={openModal}>LOGIN/SIGNUP</Link></li>
                </ul>
            </div>
        </>
    )
}

export default ProfileDropDown
