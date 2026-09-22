import { useRef, useState } from 'react'
import { useModal } from '../../context/ModalContext'
import { useUser } from '../../context/UserContext';

import api from "../../services/api"

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
        }

        if (
            !loginWindow &&
            (!formData.name?.trim() ||
                !formData.email?.trim() ||
                !formData.password?.trim())
        ) {
            setError('*All fields are mandatory');
            resetError();
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await api.post("/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            login(response.data.user);

            closeModal();
            setFormData({});
        } catch (error) {
            console.error('Error while login: ', error);
            setError(error.response?.data?.message || 'Login failed');

            resetError();
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await api.post("/api/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            login(response.data.user);
            
            closeModal();
            setFormData({});

        } catch (error) {
            console.error('Error while registration: ', error);
            setError(error.response?.data?.message || 'Registration failed');

            resetError();
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (loginWindow) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeModal}
            ></div>

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                <button
                    type="button"
                    className="absolute top-4 right-5 text-slate-400 hover:text-slate-700 text-2xl transition"
                    onClick={closeModal}
                >
                    &times;
                </button>

                <div className="text-center mb-8">
                    <h1 className="font-Mogra text-4xl text-red-500 select-none">
                        WEEWOO!
                    </h1>

                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                        {loginWindow ? "Welcome Back" : "Create an Account"}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {loginWindow
                            ? "Login to continue ordering your favourite food."
                            : "Create your WeeWoo account and get started."}
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit}
                >
                    {!loginWindow && (
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-slate-700 mb-1.5"
                            >
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                            />
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password || ""}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            loginWindow ? "Login" : "Create Account"
                        )}
                    </button>

                    <div className="text-center text-sm text-slate-500 mt-1">
                        {loginWindow ? (
                            <p>
                                New to WeeWoo?{" "}
                                <span
                                    className="text-red-500 font-medium cursor-pointer hover:text-red-600 transition"
                                    onClick={() => {
                                        setLoginWindow(false);
                                        setError("");
                                        setFormData({});
                                    }}
                                >
                                    Create an account
                                </span>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{" "}
                                <span
                                    className="text-red-500 font-medium cursor-pointer hover:text-red-600 transition"
                                    onClick={() => {
                                        setLoginWindow(true);
                                        setError("");
                                        setFormData({});
                                    }}
                                >
                                    Login here
                                </span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserLoginModal
