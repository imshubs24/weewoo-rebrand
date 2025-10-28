import React, { useRef, useState } from 'react'
import { useModal } from '../hooks/ModalContext'
import { useUser } from '../hooks/UserContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserLoginModal = () => {
    const { closeModal } = useModal();
    const { login } = useUser();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [loginWindow, setLoginWindow] = useState(true);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    const resetError = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any existing timeout
        }
        timeoutRef.current = setTimeout(() => setError(''), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (loginWindow && (!formData.email || !formData.password)) {
            setError('*All fields are mandatory');
            resetError();
            return false;
        } else if (!loginWindow && !Object.values(formData).every(value => value.trim() !== '')) {
            setError('*All fields are mandatory');
            resetError();
            return false;
        }
        return true;
    };

    const handleLogin = () => {
        if (!validateForm()) return;

        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });

                const data = await response.json();
                console.log(data)

                if (!response.ok) {
                    setError(data.error || 'Login failed');
                    resetError();
                    return;
                }

                // Success actions
                localStorage.setItem('authtoken', data.token);
                localStorage.setItem('email', data.email);
                localStorage.setItem('name', data.name);
                login();
                closeModal();
                setFormData({});
            } catch (error) {
                console.error('Error while login: ', error);
                setError('Network error, please try again.');
                resetError();
            } finally {
                setLoading(false); // Stop loading spinner
            }
        }, 2000);
    };

    const handleRegister = () => {
        if (!validateForm()) return;

        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || 'Registration failed');
                    resetError();
                    return;
                }

                setLoginWindow(true);
                setFormData({});

            } catch (error) {
                console.error('Error while registration: ', error);
                setError('Network error, please try again.');
                resetError();
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginWindow ? handleLogin() : handleRegister();
    };

    return (
        <>
            <div className='fixed h-dvh w-full z-50'>
                <div className='absolute w-full h-full bg-black opacity-90' onClick={closeModal}></div>
                <div className='absolute bg-red-500 min-h-[30rem] h-auto w-[30rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-md shadow-lg shadow-red-800'>
                    <span className='absolute top-4 right-6 font-semibold text-lg select-none cursor-pointer text-white hover:text-black hover:scale-125 duration-150 ease-linear' onClick={closeModal}>X</span>
                    <h1 className='font-Mogra text-logo text-center select-none text-white'>WEEWOO!</h1>
                    <h1 className='text-3xl text-center font-medium mb-4 text-white'>{loginWindow ? 'Login' : 'Register'}</h1>
                    <p className='text-base text-black font-bold mb-2 min-h-8 h-auto'>{error}</p>
                    <form className='flex flex-col items-center gap-y-8 text-white' onSubmit={handleSubmit}>
                        {
                            !loginWindow
                                ? <div className='w-full'>
                                    <input type="text" name="name" id="name"
                                        value={formData.name || ''}
                                        onChange={(e) => handleChange(e)}
                                        placeholder='Name'
                                        className='outline-none border border-white p-2 w-full rounded-md bg-red-500 placeholder:text-slate-300' />
                                </div>
                                : null
                        }
                        <div className='w-full'>
                            <input type="email" name="email" id="email"
                                value={formData.email || ''}
                                onChange={(e) => handleChange(e)}
                                placeholder='Email'
                                className='outline-none border border-white p-2 w-full rounded-md bg-red-500 placeholder:text-slate-300' />
                        </div>
                        <div className='w-full'>
                            <input type="password" name="password" id="password"
                                value={formData.password || ''}
                                onChange={(e) => handleChange(e)}
                                placeholder='Password'
                                className='outline-none border border-white p-2 w-full rounded-md bg-red-500 placeholder:text-slate-300' />
                        </div>
                        <button
                            type="submit"
                            className='border-2 border-white hover:text-black hover:bg-white duration-100 ease-linear py-2 px-5 rounded-md font-medium flex items-center justify-center'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="spinner-border animate-spin w-5 h-5 border-4 border-white border-t-transparent rounded-full" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                loginWindow ? 'Login' : 'Register'
                            )}
                        </button>
                        {
                            loginWindow ?
                                <p>New to WeeWoo? Create an <span className='cursor-pointer hover:font-medium underline underline-offset-2 duration-175 ease-linear'
                                    onClick={() => setLoginWindow(!loginWindow)}>account</span>
                                </p>
                                : <p>Already have an account? Login <span className='cursor-pointer hover:font-medium underline underline-offset-2 duration-75 ease-linear'
                                    onClick={() => setLoginWindow(!loginWindow)}>here</span>
                                </p>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserLoginModal
