import {
  useState,
} from "react";

import Navbar from
  "../../components/Navbar/Navbar";

import {
  createProduct,
} from "../../services/productService";

import { toast } from "react-toastify";

const Dashboard = () => {

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createProduct(form);

      toast.success("Product created");

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (
    <div>

      <Navbar />

      <div className="auth-container">

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <h1>
            Product Management
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
          />

          <button type="submit">
            Create Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default Dashboard;