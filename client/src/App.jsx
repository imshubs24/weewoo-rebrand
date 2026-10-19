import React, { Suspense } from 'react';
import './App.css';
import UserLoginModal from './components/auth/UserLoginModal';
import { useModal } from './context/ModalContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from './components/common/Spinner';
import CustomerLayout from "./components/common/CustomerLayout";
import { ToastContainer } from "react-toastify";

import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Explore = React.lazy(() => import('./pages/Explore'));
const Help = React.lazy(() => import('./pages/Help'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Profile = React.lazy(() => import('./pages/Profile'));
const MyOrders = React.lazy(() => import('./pages/MyOrders'));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminOrders = React.lazy(() => import("./pages/admin/AdminOrders"));
const AdminFood = React.lazy(() => import("./pages/admin/AdminFood"));
const AdminCategories = React.lazy(() => import("./pages/admin/AdminCategories"));
const OrderDetails = React.lazy(() => import('./pages/OrderDetails'));

const App = () => {
  const { isModalOpen } = useModal();

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen flex flex-col relative">
        {isModalOpen && <UserLoginModal />}
        <Routes>
          <Route path="/" element={
            <CustomerLayout>
              <Suspense fallback={<Spinner />}>
                <Home />
              </Suspense>
            </CustomerLayout>
          } />

          <Route path="/explore" element={
            <CustomerLayout>
              <Suspense fallback={<Spinner />}>
                <Explore />
              </Suspense>
            </CustomerLayout>
          } />

          <Route path="/blog" element={
            <CustomerLayout>
              <Suspense fallback={<Spinner />}>
                <Blog />
              </Suspense>
            </CustomerLayout>
          } />

          <Route path="/help" element={
            <CustomerLayout>
              <Suspense fallback={<Spinner />}>
                <Help />
              </Suspense>
            </CustomerLayout>
          } />

          <Route path="/cart" element={
            <CustomerLayout>
              <Suspense fallback={<Spinner />}>
                <Cart />
              </Suspense>
            </CustomerLayout>
          } />

          <Route path="/profile" element={
            <CustomerLayout>
              <Suspense fallback={<Spinner />}>
                <Profile />
              </Suspense>
            </CustomerLayout>
          } />

          <Route path="/orders" element={
            <CustomerLayout>
              <Suspense fallback={<Spinner />}>
                <MyOrders />
              </Suspense>
            </CustomerLayout>
          } />

          <Route path="/orders/:id" element={
            <CustomerLayout>
              <Suspense fallback={<Spinner />}>
                <OrderDetails />
              </Suspense>
            </CustomerLayout>
          } />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Suspense fallback={<Spinner />}>
                    <AdminDashboard />
                  </Suspense>
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Suspense fallback={<Spinner />}>
                    <AdminOrders />
                  </Suspense>
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/food"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Suspense fallback={<Spinner />}>
                    <AdminFood />
                  </Suspense>
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Suspense fallback={<Spinner />}>
                    <AdminCategories />
                  </Suspense>
                </AdminLayout>
              </AdminRoute>
            }
          />
        </Routes>
        <ToastContainer position="bottom-center" autoClose={3000} theme="colored" />
      </div>
    </BrowserRouter>
  );
};

export default App;
