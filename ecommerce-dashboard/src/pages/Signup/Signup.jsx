import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "./Signup.css";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

 const handleSubmit = (e) => {

  e.preventDefault();

  setError("");

  const {
    name,
    email,
    phone,
    password,
    confirmPassword,
  } = formData;


  /* =========================
        VALIDATION
  ========================= */

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {

    setError("Please fill all fields");

    return;

  }


  if (password !== confirmPassword) {

    setError("Passwords do not match");

    return;

  }


  setLoading(true);


  /* =========================
        SAVE USER
  ========================= */

  const user = {

    name: name.trim(),

    email: email.trim(),

    phone: phone.trim(),

    password: password,

  };


  localStorage.setItem(
    "registeredUser",
    JSON.stringify(user)
  );


  setTimeout(() => {

    setLoading(false);

    alert(
      "Registration Successful 🎉"
    );

    /* Go to Login */

    window.location.href = "/login";

  }, 1500);

};

  return (

    <section className="signup-page">

      <div className="signup-card">

        <div className="signup-left">

          <h1>Create Account 🚀</h1>

          <p>

            Join ShopSphere and enjoy
            amazing shopping experience.

          </p>

        </div>

        <div className="signup-right">

          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-box">

              <FaUser />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            <div className="input-box">

              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            <div className="input-box">

              <FaPhone />

              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            <div className="input-box">

              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <span
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </span>

            </div>

            <div className="input-box">

              <FaLock />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <span
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >

                {showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </span>

            </div>

            {error &&

              <p className="error">

                {error}

              </p>

            }

            <button
              className="signup-btn"
              type="submit"
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>

          <p className="login-link">

            Already have an account?

            <Link to="/login">

              Login

            </Link>

          </p>

        </div>

      </div>

    </section>

  );

}

export default Signup;