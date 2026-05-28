
import {
    useContext,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import Navbar from
    "../../components/Navbar/Navbar";

import {
    CartContext,
} from "../../context/CartContext";

const Cart = () => {

    const navigate = useNavigate();

    const {
        cartItems,
        removeFromCart,
        total,
    } = useContext(CartContext);

    /*
    |--------------------------------------------------------------------------
    | EMPTY CART
    |--------------------------------------------------------------------------
    */

    if (cartItems.length === 0) {

        return (
            <div>

                <Navbar />

                <div className="auth-container">

                    <h1>
                        Your cart is empty
                    </h1>

                </div>

            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | NORMAL CART
    |--------------------------------------------------------------------------
    */

    return (
        <div>

            <Navbar />

            <div className="cart-container">

                <h1>
                    Shopping Cart
                </h1>

                {
                    cartItems.map((item) => (

                        <div
                            className="cart-item"
                            key={item.id}
                        >

                            <h3>
                                {item.name}
                            </h3>

                            <p>
                                ${item.price}
                            </p>

                            <button
                                onClick={() =>
                                    removeFromCart(
                                        item.id
                                    )
                                }
                            >
                                Remove
                            </button>

                        </div>

                    ))
                }

                <h2>
                    Total: ${total}
                </h2>

                <button
                    className="checkout-btn"
                    onClick={() =>
                        navigate("/checkout")
                    }
                >
                    Proceed toCheckout
                </button>

            </div>

        </div>
    );
};

export default Cart;