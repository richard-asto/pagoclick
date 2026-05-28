

import {
  Link,
} from "react-router-dom";

const Success = () => {

  return (
    <div className="auth-container">

      <h1>
        Payment Successful 🎉
      </h1>

      <br />

      <Link to="/">

        <button className="checkout-btn">
          Back Home
        </button>

      </Link>

    </div>
  );
};

export default Success;