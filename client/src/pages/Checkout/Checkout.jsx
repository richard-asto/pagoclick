import { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createOrder, createPaymentIntent } from "../../services/paymentService";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { total, clearCart } = useContext(CartContext);

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const initialized = useRef(false);

  const initializePayment = async () => {
    try {
      const order = await createOrder(total);
      const secret = await createPaymentIntent(total, order.id);
      setClientSecret(secret);
    } catch (error) {
      setErrorMsg("Could not initialize payment. Please try again.");
    }
  };

  useEffect(() => {
  let cancelled = false;

  const init = async () => {
    try {
      const order = await createOrder(total);
      if (cancelled) return; // si se desmontó, no continuar
      const secret = await createPaymentIntent(total, order.id);
      if (cancelled) return;
      setClientSecret(secret);
    } catch (error) {
      if (!cancelled) {
        setErrorMsg("Could not initialize payment. Please try again.");
      }
    }
  };

  init();

  return () => {
    cancelled = true; // cleanup — cancela si StrictMode desmonta
  };
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setErrorMsg("");

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    setLoading(false);

    if (result.error) {
      setErrorMsg("Payment failed. Please check your card details.");
    } else {
      clearCart();
      navigate("/success");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Checkout</h1>

      <CardElement options={{ hidePostalCode: true }} />

      {errorMsg && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={loading || !stripe || !clientSecret}>
        {loading ? "Processing..." : `Pay $${total}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <div className="auth-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;