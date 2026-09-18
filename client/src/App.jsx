import React, { Suspense } from 'react';
import './App.css';
import UserLoginModal from './components/auth/UserLoginModal';
import { useModal } from './context/ModalContext';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Spinner from './components/common/Spinner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Explore = React.lazy(() => import('./pages/Explore'));
const Help = React.lazy(() => import('./pages/Help'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Profile = React.lazy(() => import('./pages/Profile'));
const MyOrders = React.lazy(() => import('./pages/MyOrders'));
const PaymentStatus = React.lazy(() => import('./pages/PaymentStatus'));

const App = () => {
  const { isModalOpen } = useModal();

  return (
    <BrowserRouter>
      <div className='w-full min-h-full flex flex-col items-center relative'>
        {isModalOpen && <UserLoginModal />}
        <Navbar />
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          } />
          <Route path="/explore" element={
            <Suspense fallback={<Spinner />}>
              <Explore />
            </Suspense>
          } />
          <Route path="/blog" element={<Suspense fallback={<Spinner />}>
            <Blog />
          </Suspense>
          } />
          <Route path="/help" element={
            <Suspense fallback={<Spinner />}>
              <Help />
            </Suspense>
          } />
          <Route path="/cart" element={
            <Suspense fallback={<Spinner />}>
              <Cart />
            </Suspense>
          } />
          <Route path="/profile" element={
            <Suspense fallback={<Spinner />}>
              <Profile />
            </Suspense>
          } />
          <Route path="/myorders" element={
            <Suspense fallback={<Spinner />}>
              <MyOrders />
            </Suspense>
          } />
          <Route path="/paymentstatus" element={
            <Suspense fallback={<Spinner />}>
              <PaymentStatus />
            </Suspense>
          } />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
