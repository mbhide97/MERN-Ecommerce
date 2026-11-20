import "./ForgotPassword.css";

import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import {
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    if (!email) {

      setError("Please Enter Email Address");

      return;

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      setError("Please Enter Valid Email");

      return;

    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      alert("OTP Sent Successfully 📩");

      navigate("/verify-otp", {

        state: {

          email,

        },

      });

    }, 1500);

  };

  return (

    <section className="forgot-page">

      <div className="forgot-card">

        <div className="forgot-top">

          <h1>

            Forgot Password?

          </h1>

          <p>

            Don't worry! Enter your registered email
            address and we'll send you an OTP to reset
            your password.

          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <FaEnvelope className="icon" />

            <input

              type="email"

              placeholder="Enter Email Address"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
              }

            />

          </div>

          {error && (

            <p className="error">

              {error}

            </p>

          )}
                    <button
            type="submit"
            className="forgot-btn"
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>

        </form>

        {/* Back to Login */}

        <div className="back-login">

          <Link to="/login">

            <FaArrowLeft />

            Back to Login

          </Link>

        </div>

      </div>

    </section>

  );

}

export default ForgotPassword;