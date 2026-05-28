import {
  useContext,
} from "react";

import {
  CartContext,
} from "../../context/CartContext";

import "./ProductCard.css";

import { toast } from "react-toastify";

const ProductCard = ({
  product,
}) => {

  const { addToCart } =
    useContext(CartContext);

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-card-content">

        <h3>
          {product.name}
        </h3>

        <p>
          {product.description}
        </p>

        <h2>
          ${product.price}
        </h2>

        <button
          onClick={() => {
            addToCart(product);
            toast.success(
              "Added to cart!"
            );
          }}
        >
          Add To Cart
        </button>

      </div>

    </div >
  );
};

export default ProductCard;