import React, { useState, useRef } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "./Modal.css";

function ChangeProfilePicModal({ closeModal }, props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const [avatar, setProfilePicture] = useState(null);
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

  const handleCancel = () => {
    setProfilePicture(null);
  };

  const handleSaveProfilePicture = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    try {
      const res  = await fetch ("http://localhost:8080/updateavatar", {
        "method": "POST",
        headers: headers,
        body: JSON.stringify({Avatar: avatar}),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: 'SET_USER', payload: data });
        alert("Profile updated");
        window.location.href = `/profile/${props.userDisplayname}`;
      } else {
        console.log("Error updating profile picture");
      }
    }
    catch (err) {
      console.log(err);
    }

  };

  return (
    <div 
      className="modal fade" 
      id="changeProfilePicModal" 
      tabIndex="-1" 
      aria-labelledby="changeProfilePicModalLabel" 
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Change Profile Picture</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <div>
              {avatar && (
                <>
                  <div className="avatar-wrapper">
                    <img className="profile-pic" src={avatar} alt="Profile Picture" />
                  </div>
                </>
              )}
              {!avatar && (
                <div className="avatar-wrapper">
                  <div className="upload-button" onClick={handleUploadButtonClick}>
                    <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                    <input
                      className="file-upload"
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      max-size="1000000"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <div className="row w-100">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    data-bs-dismiss="modal"
                    onClick={handleSaveProfilePicture}
                  >
                    Save
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    data-bs-dismiss="modal"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfilePicModal;
