import { createContext, useState, useContext, useEffect } from 'react';

// Create a new context
const UserContext = createContext();

// Custom hook to access the cart context
export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('authtoken');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
    };

    const getAuthtoken = () => {
        const authToken = localStorage.getItem('authtoken');
        if (authToken === null) {
            return;
        }
        return authToken;
    }

    const getUserEmail = () => {
        const userEmail = localStorage.getItem('email');
        if (userEmail === null) {
            return;
        }
        return userEmail;
    }

    useEffect(() => {
        if (localStorage.getItem('email') && localStorage.getItem('authtoken')) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, login, logout, getAuthtoken, getUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};