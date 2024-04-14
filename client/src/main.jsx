import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ModalProvider } from './hooks/ModalContext.jsx'
import { CartProvider } from './hooks/CartContext.jsx'
import { UserProvider } from './hooks/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>,
)
