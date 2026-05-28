
import {
  useEffect,
  useState,
} from "react";

import Navbar from
  "../../components/Navbar/Navbar";

import ProductCard from
  "../../components/ProductCard/ProductCard";

import {
  getProducts,
} from "../../services/productService";

const Home = () => {

  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts = async () => {

    try {

      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>

      <Navbar />

      <div className="products-grid">

        {
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        }

      </div>

    </div>
  );
};

export default Home;