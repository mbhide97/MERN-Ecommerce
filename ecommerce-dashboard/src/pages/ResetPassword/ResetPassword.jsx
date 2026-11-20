import "./ResetPassword.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

function ResetPassword() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* ==========================
        RESET PASSWORD
  ========================== */

  const handleReset = () => {

    setError("");

    if (!newPassword || !confirmPassword) {

      setError("Please fill all fields");

      return;

    }

    if (newPassword.length < 6) {

      setError("Password must be at least 6 characters");

      return;

    }

    if (newPassword !== confirmPassword) {

      setError("Passwords do not match");

      return;

    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      alert("Password Reset Successfully ✅");

      navigate("/login");

    }, 1500);

  };

  return (

    <section className="reset-page">

      <div className="reset-card">

        <FaCheckCircle className="reset-icon" />

        <h1>Reset Password</h1>

        <p>

          Create a new password for your account.

        </p>
                {/* ==========================
              NEW PASSWORD
        ========================== */}

        <div className="password-box">

          <FaLock className="lock-icon" />

          <input

            type={showPassword ? "text" : "password"}

            placeholder="New Password"

            value={newPassword}

            onChange={(e) =>
              setNewPassword(e.target.value)
            }

          />

          <span
            className="eye-icon"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >

            {showPassword ? (

              <FaEyeSlash />

            ) : (

              <FaEye />

            )}

          </span>

        </div>

        {/* ==========================
            CONFIRM PASSWORD
        ========================== */}

        <div className="password-box">

          <FaLock className="lock-icon" />

          <input

            type={
              showConfirmPassword
                ? "text"
                : "password"
            }

            placeholder="Confirm Password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }

          />

          <span
            className="eye-icon"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >

            {showConfirmPassword ? (

              <FaEyeSlash />

            ) : (

              <FaEye />

            )}

          </span>

        </div>

        {/* ==========================
              ERROR
        ========================== */}

        {error && (

          <p className="reset-error">

            {error}

          </p>

        )}

        {/* ==========================
          RESET BUTTON
        ========================== */}

        <button

          className="reset-btn"

          onClick={handleReset}

          disabled={loading}

        >

          {loading

            ? "Updating Password..."

            : "Reset Password"}

        </button>
              </div>

    </section>

  );

}

export default ResetPassword;