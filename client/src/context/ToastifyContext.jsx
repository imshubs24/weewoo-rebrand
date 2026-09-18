import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a new context
const ToastifyContext = createContext();

export const useToastify = () => {
    return useContext(ToastifyContext);
};

export const ToastifyProvider = ({ children }) => {

    const notify = (message, condition) => {
        const toastStyle = {
            background: condition === 'success' ? '#4CAF50' : '#F44336',
            color: '#fff'
        }
        toast.info(message, {
            style: toastStyle
        });
    };

    return (
        <ToastifyContext.Provider value={{ notify }}>
            {children}
        </ToastifyContext.Provider>
    );
};

