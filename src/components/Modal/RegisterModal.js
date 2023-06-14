import React, { useState, useRef } from "react";
import "./Modal.css";

function RegisterModal({ openModal }) {
  //use setStates for the form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
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

    // 
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "firstName") {
        setFirstName(value);
      } else if (name === "lastName") {
        setLastName(value);
      } else if (name === "nickname") {
        setNickname(value);
      } else if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      } else if (name === "dob") {
        setDob(value);
      } else if (name === "about"){
        setAbout(value);
      } else if (name === "gender"){
        setGender(value);
      }
    }
    // const validRegisterForm = () => {}

    const HandleRegister = async (event) => {
      event.preventDefault();
      console.log("Register");
      //need to validate data before sending it
      try {
        const response = await fetch("http://localhost:8080/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({firstName, lastName, email, password, dob, gender, nickname, about, profilePicture}),
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
                        <input 
                          className="file-upload" 
                          type="file" 
                          accept="image/*" 
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
                <input 
                  className="form-control my-3" 
                  data-testid="firstname" 
                  name="firstName"
                  placeholder="First name" 
                  type="text"
                  required
                  onChange={handleInputChange}
                  />
                <input 
                  className="form-control my-3" 
                  data-testid="lastname" 
                  name="lastName"
                  placeholder="Lastname" 
                  type="text" 
                  required
                  onChange={handleInputChange}
                  />
                <input 
                  className="form-control my-3" 
                  data-testid="email" 
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  onChange={handleInputChange}
                  />
                <input 
                  className="form-control my-3" 
                  data-testid="password" 
                  name="password"
                  placeholder="Password" 
                  type="password" 
                  required
                  onChange={handleInputChange}
                  />
                <span className="text-muted fs-7">Date of birth</span>
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
                <input 
                  autoFocus 
                  className="form-control my-3" 
                  data-testid="nickname" 
                  name="nickname"
                  placeholder="Nickname (optional)" 
                  type="text" 
                  onChange={handleInputChange}
                  />
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
                  onClick={HandleRegister}
                  data-bs-dismiss="modal"
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
