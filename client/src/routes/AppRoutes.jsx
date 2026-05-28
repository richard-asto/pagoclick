import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useContext,
} from "react";

import Orders from
  "../pages/Orders/Orders";

import AdminOrders from
  "../pages/AdminOrders/AdminOrders";

import {
  AuthContext,
} from "../context/AuthContext";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Success from "../pages/Success/Success";

import ProtectedRoute from
  "../components/ProtectedRoute/ProtectedRoute";

import AdminRoute from
  "../components/ProtectedRoute/AdminRoute";

const AppRoutes = () => {

  const { user } =
    useContext(AuthContext);

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <AdminRoute user={user}>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute user={user}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute user={user}>
              <Success />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute user={user}>
              <AdminOrders />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;