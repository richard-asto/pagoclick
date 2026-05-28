
import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  CartProvider,
} from "./context/CartContext";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(



    <AuthProvider>

      <CartProvider>

        <App />
        <ToastContainer
          position="top-right"
          autoClose={2500}
        />

      </CartProvider>

    </AuthProvider>

);