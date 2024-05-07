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

    useEffect(() => {
        if (localStorage.getItem('email') && localStorage.getItem('authtoken')) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};