import {
  useState,
  useContext,
} from "react";

import { useNavigate } from
  "react-router-dom";

import { loginUser } from
  "../../services/authService";

import { AuthContext } from
  "../../context/AuthContext";

import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
  useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const data =
        await loginUser(form);

      login(data);

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };
 

  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;