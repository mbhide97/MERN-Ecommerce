import React from "react";
// import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {

  let navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));

  let LogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div>

      {/* <Navbar /> */}

      <div className="home-container">

        <h1>Welcome to Your Ecommerce Store</h1>

        {user && (
          <h2>Hello, {user.name}</h2>
        )}

        <button
          className="logout-btn"
          onClick={LogoutHandler}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Home;