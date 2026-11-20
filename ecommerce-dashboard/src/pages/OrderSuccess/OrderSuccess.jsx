import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./OrderSuccess.css";

function OrderSuccess() {

  const navigate = useNavigate();

  return (

    <section className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Order Placed Successfully 🎉</h1>

        <p>

          Thank you for shopping with us.

          <br />

          Your order has been placed successfully.

        </p>

        <h3>
          Order ID :
          <span>
            {" "}
            #SP{Math.floor(Math.random() * 100000)}
          </span>
        </h3>

        <button
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

      </div>

    </section>

  );

}

export default OrderSuccess;