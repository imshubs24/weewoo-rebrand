import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ModalProvider } from './hooks/ModalContext.jsx'
import { CartProvider } from './hooks/CartContext.jsx'
import { UserProvider } from './hooks/UserContext.jsx'
import { ToastifyProvider } from './hooks/ToastifyContext.jsx'

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
