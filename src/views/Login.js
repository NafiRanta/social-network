import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/Modal/RegisterModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState({ username: true, password: true });
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    console.log("open modal");
    setModalOpen(true);
    HandleRegister();
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
    let updatedValid = { ...valid };

    // check if username is empty
    if (email === "") {
      updatedValid = { ...updatedValid, username: false };
    } else {
      // check if usernameemail is valid username or email
      const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
      const usernameRegex = new RegExp(/^[åäöÅÄÖA-Za-z0-9]+$/);
      if (!(usernameRegex.test(email) || emailRegex.test(email))) {
        updatedValid = { ...updatedValid, username: false };
      } else {
        // else username is valid
        updatedValid = { ...updatedValid, username: true };
      }
    }
    // check if password is empty
    if (password === "") {
      updatedValid = { ...updatedValid, password: false };
    } else {
      // check if password is invalid allow åäöÅÄÖ
      const passwordLengthRegex = new RegExp(/^[åäöÅÄÖA-Za-z0-9]{5,}$/);
      if (!passwordLengthRegex.test(password)) {
        updatedValid = { ...updatedValid, password: false };
      } else {
        // else password is valid
        updatedValid = { ...updatedValid, password: true };
      }
    }
    setValid(updatedValid);
    // if all booleans are true, return true else return false
    return updatedValid.username && updatedValid.password;
  };
  const HandleRegister = async () => {
    console.log("Register");
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const dobInput = document.getElementById('dob');
    const genderInput = document.getElementById('gender');
    const nicknameInput = document.getElementById('nickname');
    const aboutInput = document.getElementById('about');

    // Get the values from the form inputs
    
    const registerData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      dob: dobInput.value,
      gender: genderInput.value,
      nickname: nicknameInput.value,
      about: aboutInput.value,
    };
    console.log("registerData", registerData);

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registerData }),
      });
      if (response.ok) {
        console.log("Register successful");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      
    }
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
              type="email"
              className="form-control my-3"
              placeholder="Email address or phone number"
              value={email}
              name="email"
              onChange={handleInputChange}
            />
            {!valid.username && <div>Username is invalid</div>}
            <div className="form__input-error-message" id="loginPasswordErrMsg"></div>
            <input
              type="password"
              className="form-control my-3"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleInputChange}
            />
            {!valid.password && <div>Password must be at least 5 characters</div>}
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
