import "./OTPVerification.css";

import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";

function OTPVerification() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  /* ==========================
      OTP INPUT
  ========================== */

  const handleChange = (value, index) => {

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {

      inputRefs.current[index + 1].focus();

    }

  };

  /* ==========================
      BACKSPACE
  ========================== */

  const handleKeyDown = (e, index) => {

    if (

      e.key === "Backspace" &&

      !otp[index] &&

      index > 0

    ) {

      inputRefs.current[index - 1].focus();

    }

  };

  /* ==========================
      VERIFY OTP
  ========================== */

  const verifyOTP = () => {

    setError("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {

      setError("Please Enter 6 Digit OTP");

      return;

    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      navigate("/reset-password");

    }, 1500);

  };

  return (

    <section className="otp-page">

      <div className="otp-card">

        <FaShieldAlt className="otp-icon" />

        <h1>OTP Verification</h1>

        <p>

          Enter the 6-digit OTP sent to

          <br />

          <strong>{email}</strong>

        </p>
                {/* ==========================
              OTP BOXES
        ========================== */}

        <div className="otp-inputs">

          {otp.map((digit, index) => (

            <input

              key={index}

              type="text"

              maxLength="1"

              value={digit}

              ref={(el) =>
                (inputRefs.current[index] = el)
              }

              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }

              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }

            />

          ))}

        </div>

        {/* ==========================
              ERROR
        ========================== */}

        {error && (

          <p className="otp-error">

            {error}

          </p>

        )}

        {/* ==========================
              VERIFY BUTTON
        ========================== */}

        <button

          className="verify-btn"

          onClick={verifyOTP}

          disabled={loading}

        >

          {loading

            ? "Verifying..."

            : "Verify OTP"}

        </button>

        {/* ==========================
              RESEND OTP
        ========================== */}

        <div className="resend-box">

          <p>

            Didn't receive OTP?

          </p>

          <button

            type="button"

            className="resend-btn"

            onClick={() => {

              alert("OTP Sent Again ✅");

            }}

          >

            Resend OTP

          </button>

        </div>

        {/* ==========================
              BACK BUTTON
        ========================== */}

        <button

          className="back-btn"

          onClick={() => navigate("/forgot-password")}

        >

          <FaArrowLeft />

          Back

        </button>
              </div>

    </section>

  );

}

export default OTPVerification;