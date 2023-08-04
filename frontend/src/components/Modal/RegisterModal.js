import React, { useState, useRef } from "react";
import "./Modal.css";
import { ValidateEmail, ValidatePassword} from "../../views/Login.js";

function RegisterModal({ openModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [about, setAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef();

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setProfilePicture(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleUploadButtonClick = () => {
      fileInputRef.current && fileInputRef.current.click();
    };
  
    const handleRemoveImage = () => {
      setProfilePicture(null);
    };
    const validateFirstname = (firstname) => {
      const re = /^[a-zA-ZåäöÅÄÖ\-]+$/;
      return re.test(firstname);
    }
    const validateLastname = (lastname) => {
      const re = /^[a-zA-ZåäöÅÄÖ\-]+$/;
      return re.test(lastname);
    }
    const validateDob = (dob) => {
      // 16 years ago
      const legalAgeDob = new Date(new Date().setFullYear(new Date().getFullYear() - 16));
      const date = new Date(dob);
      const re = /^\d{4}-\d{2}-\d{2}$/;
      return re.test(dob) && date < legalAgeDob;
    }
    const validateGender = (gender) => {
      const re = /^[a-zA-ZåäöÅÄÖ\-]+$/;
      return re.test(gender);
    }
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "firstName") {
        // trim
        setFirstName(value.trim());
      } else if (name === "lastName") {
        setLastName(value.trim());
      } else if (name === "email") {
        setEmail(value.trim());
      } else if (name === "password") {
        setPassword(value.trim());
      } else if (name === "dob") {
        setDob(value.trim());
      } else if (name === "gender"){
        setGender(value.trim());
      } else if (name === "nickname") {
        setNickname(value.trim());
      } else if (name === "about"){
        setAbout(value.trim());
      }
    }
    const validRegisterForm = () => {
      let validBool = true;
      if (firstName.trim() === '') {
        document.getElementById("registerFirstnameErrMsg").innerHTML = "Firstname is required";
        validBool = false;
      } else if (!validateFirstname(firstName)) {
        document.getElementById("registerFirstnameErrMsg").innerHTML = "Invalid Firstname format";
        validBool = false;
      } else {
        document.getElementById("registerFirstnameErrMsg").innerHTML = "";
      }
      if (lastName.trim() === '') {
        document.getElementById("registerLastnameErrMsg").innerHTML = "Lastname is required";
        validBool = false;
      } else if (!validateLastname(lastName)) {
        document.getElementById("registerLastnameErrMsg").innerHTML = "Invalid Lastname format";
        validBool = false;
      } else {
        document.getElementById("registerLastnameErrMsg").innerHTML = "";
      }
      if (email.trim() === '') {
        document.getElementById("registerUsernameErrMsg").innerHTML = "Email is required";
        validBool = false;
      } else if (!ValidateEmail(email)) {
        document.getElementById("registerUsernameErrMsg").innerHTML = "Invalid email format";
        validBool = false;
      } else {
        document.getElementById("registerUsernameErrMsg").innerHTML = "";
      }
      if (password.trim() === '') {
        document.getElementById("registerPasswordErrMsg").innerHTML = "Password is required";
        validBool = false;
      } else if (!ValidatePassword(password)) {
        document.getElementById("registerPasswordErrMsg").innerHTML = "Invalid password format";
        validBool = false;
      } else {
        document.getElementById("registerPasswordErrMsg").innerHTML = "";
      }
      if (!dob.trim() === '') {
        document.getElementById("registerDobErrMsg").innerHTML = "Date of birth is required";
        validBool = false;
      } else if (!validateDob(dob)) {
        document.getElementById("registerDobErrMsg").innerHTML = "You have to be at least 16 years old";
        validBool = false;
      } else {
        document.getElementById("registerDobErrMsg").innerHTML = "";
      }
      if (!gender.trim() === '') {
        document.getElementById("registerGenderErrMsg").innerHTML = "Gender is required";
        validBool = false;
      } else if (!validateGender(gender)) {
        document.getElementById("registerGenderErrMsg").innerHTML = "Invalid gender";
        // setValid(valid.gender = false);
        validBool = false;
      } else {
        document.getElementById("registerGenderErrMsg").innerHTML = "";
      }
      // if nickname is longer than 20 characters
      if (nickname.length > 20) {
        document.getElementById("registerNicknameErrMsg").innerHTML = "Nickname is too long";
        validBool = false;
      } else {
        document.getElementById("registerNicknameErrMsg").innerHTML = "";
      }
      // if about is longer than 100 characters
      if (about.length > 100) {
        document.getElementById("registerAboutErrMsg").innerHTML = "Exceeds the limit of 100 characters";
        validBool = false;
      } else {
        document.getElementById("registerAboutErrMsg").innerHTML = "";
      }
      return validBool;
    }
    
    const HandleRegister = async (event) => {
      event.preventDefault();
      if (!validRegisterForm()) {
        console.log("Invalid register form");
        return;
      }
      
      try {
        const response = await fetch("http://localhost:8080/register", {
     
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstName, 
            lastname: lastName, 
            email: email, 
            password: password, 
            dateOfBirth: dob, 
            gender: gender, 
            nickname: nickname, 
            about: about, 
            avatar: profilePicture}),
        });
        if (response.ok) {
          document.getElementById("registerForm").reset();
          alert("Register successful");
           window.location.href = "/login";
        }
        if (response.status === 409) {
          console.log("You already have an account");
          document.getElementById("registerUsernameErrMsg").innerHTML = "You already have an account";
        }
      } catch (error) {
        console.error("Error:", error);
        
      }
    };
  return (
    <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h2 className="modal-title" id="exampleModalLabel">Register</h2>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form id="registerForm" onSubmit={HandleRegister}> 
            <div >
              {profilePicture && (
                <>
                <div className="avatar-wrapper">
                  <img className="profile-pic" src={profilePicture} alt="Profile Picture" />
                </div> 
                <div className="remove-btn text-center">
                    <button type="button" className="btn btn-primary" onClick={handleRemoveImage}>Remove</button>
                </div>
                </>
                
              )}
              {!profilePicture && (
               <div className="avatar-wrapper">
                    <div className="upload-button" onClick={handleUploadButtonClick}>
                        <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                        <input 
                          className="file-upload" 
                          type="file" 
                          // accept jpeg, jpg, png, gif
                          accept=".jpg, .jpeg, .png, .gif"
                          // max file size 1MB
                          max-size="1000000"
                          ref={fileInputRef} 
                          onChange={handleFileInputChange} 
                          name="profilePicture"
                          />
                    </div>
                </div> 
              )}
             
            </div>
              <div className="registerForm-group">
                <p className="text-muted text-center">Upload Avatar (optional)</p>
                <div className="smallLetters">* All fields are required unless specified optional</div>
                <div className="text-danger text-center" id="registerFirstnameErrMsg"></div>
                <input 
                  className="form-control my-3" 
                  data-testid="firstname" 
                  name="firstName"
                  placeholder="First name" 
                  type="text"
                  required
                  onChange={handleInputChange}
                  />
                <div className="text-danger text-center" id="registerLastnameErrMsg"></div>
                <input 
                  className="form-control my-3" 
                  data-testid="lastname" 
                  name="lastName"
                  placeholder="Lastname" 
                  type="text" 
                  required
                  onChange={handleInputChange}
                  />
                <div className="text-danger text-center" id="registerUsernameErrMsg"></div>
                <input 
                  className="form-control my-3" 
                  data-testid="email" 
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  onChange={handleInputChange}
                  />
                <div className="text-danger text-center" id="registerPasswordErrMsg"></div>
                <input 
                  className="form-control my-3" 
                  data-testid="password" 
                  name="password"
                  placeholder="Password" 
                  type="password" 
                  required
                  onChange={handleInputChange}
                  />
                  <div className="smallLetters">* At least 5 characters, containing uppercase, lowercase, number, and special character</div>
                <div className="text-muted fs-7" id="DOB"><h6>Date of birth</h6></div>
                <div className="text-danger text-center" id="registerDobErrMsg"></div>
                <input 
                  autoFocus id="dob" 
                  className="form-control my-3" 
                  data-testid="dob"
                  name="dob"
                  placeholder="Date of Birth" 
                  type="date" 
                  required 
                  onChange={handleInputChange}
                  />
                <div className="text-danger text-center" id="registerGenderErrMsg"></div>
                <input 
                  autoFocus 
                  className="form-control my-3" 
                  data-testid="gender" 
                  name="gender"
                  placeholder="Gender" 
                  type="text" 
                  required 
                  onChange={handleInputChange}
                  />
                <div className="text-danger text-center" id="registerNicknameErrMsg"></div>
                <input 
                  autoFocus 
                  className="form-control my-3" 
                  data-testid="nickname" 
                  name="nickname"
                  placeholder="Nickname (optional)" 
                  type="text" 
                  onChange={handleInputChange}
                  />
                <div className="text-danger text-center" id="registerAboutErrMsg"></div>
                <input 
                  autoFocus 
                  className="form-control my-3" 
                  data-testid="about" 
                  name="about"
                  placeholder="About me (optional)" 
                  type="text" 
                  onChange={handleInputChange}
                  />
                <div className="text-center mt-3">
                <input
                  type="submit"
                  className="btn btn-success btn-lg"
                  value="Sign Up"
                />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;