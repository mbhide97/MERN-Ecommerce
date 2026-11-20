 



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import {
//   FaEye,
//   FaEyeSlash,
//   FaGoogle,
//   FaGithub,
//   FaEnvelope,
//   FaLock,
// } from "react-icons/fa";

// import API from "../../api/axios";

// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (!email.trim() || !password.trim()) {
//       setError("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await API.post("/auth/login", {
//         email: email.trim(),
//         password: password,
//       });

//       console.log("Login Response:", response.data);

//       // Save JWT Token
//       if (response.data.token) {
//         localStorage.setItem(
//           "token",
//           response.data.token
//         );
//       }

//       // Save User
//       if (response.data.user) {
//         localStorage.setItem(
//           "user",
//           JSON.stringify(response.data.user)
//         );
//       } else {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             email: email.trim(),
//           })
//         );
//       }

//       alert("Login Successful ✅");

//       navigate("/");

//     } catch (error) {
//       console.error("Login Error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Invalid email or password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="login-page">

//       <div className="login-card">

//         {/* LEFT SIDE */}
//         <div className="login-left">

//           <h1>
//             Welcome Back 👋
//           </h1>

//           <p>
//             Login to your ShopSphere account
//             and continue shopping.
//           </p>

//           <img
//             src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600"
//             alt="login"
//           />

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="login-right">

//           <h2>
//             Login
//           </h2>

//           <form onSubmit={handleLogin}>

//             {/* EMAIL */}
//             <div className="input-box">

//               <FaEnvelope />

//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) =>
//                   setEmail(e.target.value)
//                 }
//               />

//             </div>

//             {/* PASSWORD */}
//             <div className="input-box">

//               <FaLock />

//               <input
//                 type={
//                   showPassword
//                     ? "text"
//                     : "password"
//                 }
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) =>
//                   setPassword(e.target.value)
//                 }
//               />

//               <span
//                 onClick={() =>
//                   setShowPassword(
//                     !showPassword
//                   )
//                 }
//                 style={{
//                   cursor: "pointer",
//                 }}
//               >
//                 {showPassword ? (
//                   <FaEyeSlash />
//                 ) : (
//                   <FaEye />
//                 )}
//               </span>

//             </div>

//             {/* ERROR */}
//             {error && (
//               <p className="error">
//                 {error}
//               </p>
//             )}

//             {/* OPTIONS */}
//             <div className="login-options">

//               <label>
//                 <input type="checkbox" />
//                 Remember Me
//               </label>

//               <Link to="/forgot-password">
//                 Forgot Password?
//               </Link>

//             </div>

//             {/* LOGIN BUTTON */}
//             <button
//               type="submit"
//               className="login-btn"
//               disabled={loading}
//             >
//               {loading
//                 ? "Logging In..."
//                 : "Login"}
//             </button>

//           </form>

//           {/* DIVIDER */}
//           <div className="divider">
//             OR
//           </div>

//           {/* GOOGLE */}
//           <button
//             type="button"
//             className="google-btn"
//           >
//             <FaGoogle />
//             Continue with Google
//           </button>

//           {/* GITHUB */}
//           <button
//             type="button"
//             className="github-btn"
//           >
//             <FaGithub />
//             Continue with GitHub
//           </button>

//           {/* SIGNUP */}
//           <p className="signup-text">

//             Don't have an account?

//             <Link to="/signup">
//               {" "}Sign Up
//             </Link>

//           </p>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import { GoogleLogin } from "@react-oauth/google";

import API from "../../api/axios";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= NORMAL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email: email.trim(),
        password: password,
      });

      console.log("Login Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      alert("Login Successful ✅");

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setError("");
      setLoading(true);

      const response = await API.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      console.log("Google Login Response:", response.data);

      if (response.data.token) {
        localStorage.setItem(
          "token",
          response.data.token
        );
      }

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      alert("Google Login Successful ✅");

      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Google Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">

      <div className="login-card">

        {/* LEFT SIDE */}
        <div className="login-left">

          <h1>
            Welcome Back 👋
          </h1>

          <p>
            Login to your ShopSphere account
            and continue shopping.
          </p>

          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600"
            alt="login"
          />

        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">

          <h2>
            Login
          </h2>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="input-box">

              <FaEnvelope />

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* PASSWORD */}
            <div className="input-box">

              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <span
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

            </div>

            {/* ERROR */}
            {error && (
              <p className="error">
                {error}
              </p>
            )}

            {/* OPTIONS */}
            <div className="login-options">

              <label>
                <input type="checkbox" />
                Remember Me
              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* GOOGLE LOGIN */}
          <div className="google-login-wrapper">

            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setError("Google Login Failed");
              }}
              useOneTap={false}
            />

          </div>

          {/* SIGNUP */}
          <p className="signup-text">

            Don't have an account?

            <Link to="/signup">
              {" "}Sign Up
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}

export default Login;