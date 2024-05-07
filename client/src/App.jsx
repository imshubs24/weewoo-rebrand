import React from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Explore from './pages/Explore'
import Help from './pages/Help'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Blog from './pages/Blog'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import UserLoginModal from './components/UserLoginModal'
import { useModal } from './hooks/ModalContext'
import SuccessfulPayment from './pages/SuccessfulPayment'

const App = () => {

  const { isModalOpen } = useModal();

  return (
    <BrowserRouter>
      <div className='w-full min-h-full flex flex-col items-center relative'>
        {isModalOpen ? <UserLoginModal /> : null}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help" element={<Help />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/paymentsuccess" element={<SuccessfulPayment />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
