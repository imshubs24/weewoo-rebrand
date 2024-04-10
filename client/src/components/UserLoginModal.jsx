import React, { useState } from 'react'
import { useModal } from '../hooks/ModalContext'
const UserLoginModal = () => {

    const { closeModal } = useModal();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [login, setLogin] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        closeModal();
    }

    return (
        <>
            <div className='fixed h-dvh w-full z-50'>
                <div className='absolute w-full h-full bg-black opacity-90' onClick={closeModal}></div>
                <div className='absolute bg-red-500 min-h-[30rem] h-auto w-[30rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-md shadow-lg shadow-red-800'>
                    <span className='absolute top-4 right-6 font-semibold text-lg select-none cursor-pointer text-white hover:text-black hover:scale-125 duration-150 ease-linear' onClick={closeModal}>X</span>
                    <h1 className='font-Mogra text-logo text-center select-none text-white'>WEEWOO!</h1>
                    <h1 className='text-3xl text-center font-medium mb-5 text-white'>{login ? 'Login' : 'Register'}</h1>
                    <form className='flex flex-col items-center gap-y-8 text-white' onSubmit={handleSubmit}>
                        {
                            !login
                                ? <div className='w-full'>
                                    <input type="text" name="name" id="name"
                                        value={formData.name}
                                        onChange={(e) => handleChange(e)}
                                        placeholder='Name'
                                        className='outline-none border border-black p-2 w-full rounded-md bg-red-500 placeholder:text-slate-300' />
                                </div>
                                : null
                        }

                        <div className='w-full'>
                            <input type="email" name="email" id="email"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                                placeholder='Email'
                                className='outline-none border border-black p-2 w-full rounded-md bg-red-500 placeholder:text-slate-300' />
                        </div>
                        <div className='w-full'>
                            <input type="password" name="password" id="password"
                                value={formData.password}
                                onChange={(e) => handleChange(e)}
                                placeholder='Password'
                                className='outline-none border border-black p-2 w-full rounded-md bg-red-500 placeholder:text-slate-300' />
                        </div>
                        <button type="submit" className='border-2 border-black py-2 px-5 rounded-md hover:bg-black duration-150 ease-linear font-medium'>{login ? 'Login' : 'Register'}</button>
                        <p>New to WeeWoo? Create an <span className='hover:text-black cursor-pointer hover:underline underline-offset-2 duration-150 ease-linear' onClick={() => setLogin(!login)}>account</span> </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserLoginModal
