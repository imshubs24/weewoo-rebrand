import { createContext, useContext, useEffect, useState } from 'react';
import { useToastify } from './ToastifyContext';

// Create a new context
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => {
    return useContext(CartContext);
};

// Provider component to manage cart state
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { notify } = useToastify();

    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem('cart'));

        if (cartFromStorage) {
            setCartItems(cartFromStorage);
        };
    }, []);

    // Function to add item to cart
    const addToCart = (item) => {
        const existingCart = [...cartItems];
        const itemExists = existingCart.some(cartItem => cartItem.id === item._id);

        if (!itemExists) {
            const updatedCart = [...existingCart, { id: item._id, name: item.name, price: item.price, quantity: 1 }];
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            notify('Item added to the cart', 'success');
        } else {
            notify('Item already in the cart', 'error');
        }
    };

    const removeItem = (item) => {
        const existingCart = [...cartItems];
        const updatedCart = existingCart.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const increaseQuantity = (item) => {
        const existingCart = [...cartItems];
        const updatedCart = existingCart.map(cartItem => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (item) => {
        const existingCart = [...cartItems];
        const updatedCart = existingCart.map(cartItem => {
            if (cartItem.id === item.id) {
                const newQuantity = cartItem.quantity - 1;
                return { ...cartItem, quantity: newQuantity >= 1 ? newQuantity : 1 };
            }
            return cartItem;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Function to get total number of items in cart
    const getTotalCartItems = () => {
        return cartItems.length;
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getTotalCartItems, removeItem, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
