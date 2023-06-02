import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/Modal/RegisterModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("Login successful");
        const data = await response.json();
        console.log(data);
        // Save session to local storage
        localStorage.setItem("userInfo", JSON.stringify(data));
       //setIsAuthenticated(true);
        window.location.reload()
      } else {
        // Login failed, handle error
        console.log("Login failed");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div className="container mt-5 pt-5 d-flex flex-column flex-lg-row justify-content-evenly">
        <div className="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
          <h1 className="text-primary fw-bold fs-0">ÅlandSocial</h1>
          <p className="w-75 mx-auto fs-4 mx-lg-0">
            ÅlandSocial helps you connect and share with the people in Åland.
          </p>
        </div>
        <div className="login-form">
          <div className="bg-white shadow rounded p-3 input-group-lg">
            <input
              type="email"
              className="form-control my-3"
              placeholder="Email address or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control my-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a>
              <button
                className="btn btn-primary w-100 my-3"
                onClick={handleLogin}
              >
                Log In
              </button>
            </a>
            <a
              href="#"
              className="text-decoration-none text-center"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              <p>Not a user? Register</p>
            </a>
            <RegisterModal />
          </div>
        </div>
      </div>
      <footer className="bg-white p-4 text-muted">
        <div className="container">
          <hr />
          <div className="mt-4 mx-2">
            <p className="fs-7">ÅlandSocial &copy; 2023</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Login;
