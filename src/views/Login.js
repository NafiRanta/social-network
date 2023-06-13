import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/Modal/RegisterModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [valid, setValid] = useState({ email: true, password: true });
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    console.log("open modal");
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
 
  const validLoginForm = () => {
    // Check if email is empty
    if (email.trim() === '') {
      console.log('Email is required');
      document.getElementById("loginUsernameErrMsg").innerHTML = 'Email is required';
      return false;
    }
  
    // Check if the email is in the correct format
    if (!validateEmail(email)) {
      console.log('Invalid email format');
      document.getElementById("loginUsernameErrMsg").innerHTML = 'Invalid email format';
      return false;
    }
  
    // Check if the password is empty
    if (password.trim() === '') {
      console.log('Password is required');
      document.getElementById("loginUsernameErrMsg").innerHTML = 'Password is required';
      return false;
    }
  
    // Check if the password is in the correct format
    if (!validatePassword(password)) {
      console.log('Invalid password format');
      document.getElementById("loginUsernameErrMsg").innerHTML = 'Invalid password format';
      return false;
    }
    // All validations passed
    return true;
  };
  
  const validateEmail = (email) => {
    // Regular expression for email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    // Check if password is at least 5 characters long
    if (password.length < 5) {
      return false;
    }
  
    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Check if password contains at least one digit
    if (!/\d/.test(password)) {
      return false;
    }
  
    // Check if password contains at least one special character
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }
  
    // Password format is valid
    return true;
  };
  
  const handleLogin = async () => {
    if (!validLoginForm()) {
      return;
    }
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
        window.location.reload();
      } else {
        // show error message from response
        // document.getElementById("loginUsernameErrMsg").innerHTML = "Incorrect username or password";
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
            <div className="form__input-error-message" id="loginUsernameErrMsg"></div>
            <input
            data-testid="loginEmail"
              type="email"
              className="form-control my-3"
              placeholder="Email address or phone number"
              value={email}
              name="email"
              onChange={handleInputChange}
            />
            {/* {!valid.username && <div>Username is invalid</div>} */}
            <div className="form__input-error-message" id="loginPasswordErrMsg"></div>
            <input
            data-testid="loginPassword"
              type="password"
              className="form-control my-3"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleInputChange}
            />
            {/* {!valid.password && <div>Password must be at least 5 characters</div>} */}
            <button className="btn btn-primary w-100 my-3" onClick={handleLogin}>
              Log In
            </button>
            <a
              href="#"
              className="text-decoration-none text-center"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              <p>Not a user? Register</p>
            </a>
            <RegisterModal openModal={openModal} />
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
