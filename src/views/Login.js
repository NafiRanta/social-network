import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/Modal/RegisterModal";
import { useDispatch } from 'react-redux';
import "./Login.css"

export const ValidateEmail = (email) => {
  // Regular expression for email format validation forbid swedish letters
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const ValidatePassword = (password) => {
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

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState({ email: true, password: true });
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
      setValid({ ...valid, password: true }); // Reset the password validation state
      document.getElementById("loginPasswordErrMsg").innerHTML = ''; // Clear the error message
    }
  };
  
 
  const validLoginForm = () => {
    // Check if email is empty
    if (email.trim() === '') {
      console.log('Email is required');
      document.getElementById("loginUsernameErrMsg").innerHTML = 'Email is required';
      setValid({ ...valid, email: false });
    }
  
    // Check if the email is in the correct format
    if (!ValidateEmail(email)) {
      console.log('Invalid email format');
      document.getElementById("loginUsernameErrMsg").innerHTML = 'Invalid email format';
      setValid({ ...valid, email: false });
    }
  
    // Check if the password is empty
    if (password.trim() === '') {
      console.log('Password is required');
      document.getElementById("loginPasswordErrMsg").innerHTML = 'Password is required';
    setValid({ ...valid, password: false });
    }
  
    // Check if the password is in the correct format
    if (!ValidatePassword(password)) {
      console.log('Invalid password format');
      document.getElementById("loginPasswordErrMsg").innerHTML = 'Invalid password format';
      setValid({ ...valid, password: false });
    }
    // All validations passed
   if (valid.email && valid.password) {
      return true;
    } else {  
      return false;
    }
  };
  
  
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    if (!validLoginForm()) {
      return
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
        const data = await response.json();
        console.log("Login successful");
        // Save session to local storage
        dispatch({ type: 'SET_USER', payload: data });
        //localStorage.setItem("userInfo", JSON.stringify(data));
        
        dispatch({ type: 'SET_AUTH', payload: true });
        //setIsAuthenticated(true);
        window.location.href="/"; 
      } else {
        // show error message from response
          console.log(response)
        if (response.status === 401) {
          document.getElementById("loginUsernameErrMsg").innerHTML = "Incorrect username or password";
        } else {
          document.getElementById("loginUsernameErrMsg").innerHTML = "Something went wrong. Please try again later.";
        }
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
            <form id="loginForm" onSubmit={handleLogin}>
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
              <input
                type="submit"
                className="btn btn-primary w-100 my-3"
                value="Log In"
              />
            </form>

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
