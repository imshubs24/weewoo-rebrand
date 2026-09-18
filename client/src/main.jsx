import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ModalProvider } from './context/ModalContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ToastifyProvider } from './context/ToastifyContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <ToastifyProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ToastifyProvider>
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>,
)
