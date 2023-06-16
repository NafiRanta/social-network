import React, { useState } from 'react';
import "./Modal.css";
import Avatar from "../Avatar/Avatar";

function UpdateProfileSettingsModal(props) {
 
  // handle updateProfile 
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = document.getElementById("updateProfileForm");
    // get form data
    const data = {
      nickname: formData[0].value,
      aboutMe: formData[1].value,
      dob: formData[2].value,
    }
    console.log("data", data);
    // const res = await fetch("http://localhost:8080/updatebio", {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    // if (res.ok) {
    //   const data = await res.json();
    //   console.log("data", data);
    // } else {
    //   console.log("error");
    // }
  };

  return (
    <div 
      className="modal fade" 
      id="updateProfileSettingsModal" 
      tabIndex="-1" aria-labelledby="createModalLabel" 
      aria-hidden="true" 
      data-bs-backdrop="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Update Profile Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="my-1 p-1">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <div className="p-2">
                  <Avatar username={props.username} userInfo={props.userInfo}/>
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{props.username}</p>
                  </div>
                </div>
                <div>
                  <form id="updateProfileForm" >
                    <input type="text" className="form-control my-3" id="groupname" placeholder="Nickname" />
                    <div>
                      <textarea cols="30" rows="5" className="form-control my-3 border" placeholder="About Me"></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="privacySetting">Date of birth:</label>
                      <input 
                        autoFocus id="dob" 
                        className="form-control my-3" 
                        data-testid="dob"
                        name="dob"
                        placeholder="Date of Birth" 
                        type="date" 
                    />
                    </div>
                    <div className="form-group">
                      <input 
                        autoFocus 
                        className="form-control my-3"   
                        name="gender"
                        placeholder="Gender" 
                        type="text" 
                        required 
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row w-100">
            <div className="col">
                <button type="button" className="btn btn-primary w-100" onClick={handleUpdateProfile}>
                  Save
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfileSettingsModal;
