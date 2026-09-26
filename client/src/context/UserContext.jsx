import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
        } catch (error) {
            console.error('Error while logout:', error);
        } finally {
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const getCurrentUser = async () => {
        setLoading(true);
        setServerError(false);

        try {
            const response = await api.get('/api/auth/me');

            setUser(response.data);
            setIsLoggedIn(true);
        } catch (error) {
            if (!error.response) {
                setServerError(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        const handleAuthLogout = () => {
            setUser(null);
            setIsLoggedIn(false);
        };

        window.addEventListener("auth:logout", handleAuthLogout);

        return () => {
            window.removeEventListener("auth:logout", handleAuthLogout);
        };
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn,
                loading,
                login,
                logout,
                serverError,
                getCurrentUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
