import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserLoginModal from './components/UserLoginModal';
import { useModal } from './hooks/ModalContext';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Explore = React.lazy(() => import('./pages/Explore'));
const Help = React.lazy(() => import('./pages/Help'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Profile = React.lazy(() => import('./pages/Profile'));
const MyOrders = React.lazy(() => import('./pages/MyOrders'));
const SuccessfulPayment = React.lazy(() => import('./pages/SuccessfulPayment'));

const App = () => {
  const { isModalOpen } = useModal();

  return (
    <BrowserRouter>
      <div className='w-full min-h-full flex flex-col items-center relative'>
        {isModalOpen && <UserLoginModal />}
        <Navbar />
        <Suspense fallback={
          <div className='flex min-h-60'>
            <div className='self-center w-12 h-12 border-8 border-t-white border-red-500 rounded-full animate-spin'></div>
          </div>
        }>
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
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
