 

import React, { useState } from "react";
import api from "../api/axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate=useNavigate()

  let SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await api.post("auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

     
      alert("Login successfully...");
      

      console.log("token : ", response.data.token);
      console.log("user: ", response.data.user);


       if(response.data.user.role === 'admin'){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }


    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Login failed..."
      );
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1 className="login-title">
          Login
        </h1>

        <form
          className="login-form"
          onSubmit={SubmitHandler}
        >

          <label>Email</label>

          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;

