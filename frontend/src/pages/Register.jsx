 

import React, { useState } from "react";
import api from "../api/axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate=useNavigate()

  let RegisterHandler = async (e) => {
    e.preventDefault();

    try {

      let response = await api.post("auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Register successfully...");
        navigate('/login')
      console.log("token : ", response.data.token);
      console.log("user: ", response.data.user);

     

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed..."
      );
    }
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <h1 className="register-title">
          Register Form
        </h1>

        <form
          className="register-form"
          onSubmit={RegisterHandler}
        >

          <label>Name</label>

          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            className="register-button"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;

