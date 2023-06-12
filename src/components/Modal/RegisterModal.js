import React, { useState, useRef } from "react";
import "./Modal.css";

function RegisterModal({ openModal }) {
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
          body: JSON.stringify(registerData),
        });
        if (response.ok) {
          console.log("Register successful");
        }
      } catch (error) {
        // Handle error
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
          <form id="registerForm">
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
                        <input className="file-upload" type="file" accept="image/*" ref={fileInputRef} onChange={handleFileInputChange} />
                    </div>
                </div> 
              )}
             
            </div>
              <div className="registerForm-group">
                <p className="text-muted text-center">Upload Avatar (optional)</p>
                <input type="text" className="form-control my-3" id="firstname" placeholder="First name" />
                <input type="text" className="form-control my-3" id="lastname" placeholder="Lastname" />
                <input type="email" className="form-control my-3" id="email" placeholder="Email" />
                <input type="password" className="form-control my-3" id="password" placeholder="Password" />
                <span className="text-muted fs-7">Date of birth</span>
                <input type="date" className="form-control my-3" autoFocus id="dob" placeholder="Date of Birth" required />
                <input type="text" className="form-control my-3" autoFocus id="gender" placeholder="Gender" required />
                <input type="text" className="form-control my-3" autoFocus id="nickname" placeholder="Nickname (optional)" />
                <input type="text" className="form-control my-3" autoFocus id="about" placeholder="About me (optional)" />
                <div className="text-center mt-3">
                  <button type="button" className="btn btn-success btn-lg" onClick={HandleRegister} data-bs-dismiss="modal">
                    Sign Up
                  </button>
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
