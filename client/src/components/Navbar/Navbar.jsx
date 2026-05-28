
import {
  Link,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../../context/AuthContext";

import {
  CartContext,
} from "../../context/CartContext";

import "./Navbar.css";

const Navbar = () => {

  const {
    user,
    logout,
  } = useContext(AuthContext);

  const {
    cartItems,
  } = useContext(CartContext);

  return (
    <nav className="navbar">

      <Link to="/">
        <h2>PagoClick</h2>
      </Link>

      <div className="navbar-links">

        <Link to="/cart">
          Cart ({cartItems.length})
        </Link>

        <Link to="/orders">
          My Orders
        </Link>
        {
          user?.role === "admin" && (

            <Link to="/admin/orders">
              Admin Orders
            </Link>
          )
        }

        {
          user ? (
            <>
              {
                user.role === "admin" && (
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                )
              }

              <span>
                {user.name}
              </span>

              <button onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )
        }

      </div>

    </nav>
  );
};

export default Navbar;