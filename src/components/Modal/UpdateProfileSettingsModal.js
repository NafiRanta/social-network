import React, { useState } from 'react';
import "./Modal.css";
import Avatar from "../Avatar/Avatar";

function UpdateProfileSettingsModal(props) {
  const [isDobEditMode, setDobEditMode] = useState(false);
  const [isGenderEditMode, setGenderEditMode] = useState(false);
  const [isNicknameEditMode, setNicknameEditMode] = useState(false);
  const [isAboutEditMode, setAboutEditMode] = useState(false);

  const handleDobEditToggle = () => {
    setDobEditMode(!isDobEditMode);
  };

  const handleGenderEditToggle = () => {
    setGenderEditMode(!isGenderEditMode);
  };

  const handleNicknameEditToggle  = () => {
    setNicknameEditMode(!isNicknameEditMode);
  };

  const handleAboutEditToggle   = () => {
    setAboutEditMode(!isAboutEditMode);
  };

  // handle updateProfile 
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = document.getElementById("updateProfileForm");
    // get form data
    const data = {
      nickname: formData[0].value,
      aboutMe: formData[1].value,
      dob: formData[2].value,
      gender: formData[3].value,
    }
    console.log("data", data);
    const res = await fetch("http://localhost:8080/updatebio", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
     if (res.ok) {
      const data = await res.json();
      console.log("UPDATED SUCCESSFULLY", data);
    } else {
     console.log("error", res.status);
    }
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
                {/* <div className="d-flex align-items-center">
                  <div className="p-2">
                    <Avatar username={props.username} userInfo={props.userInfo}/>
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{props.username}</p>
                  </div>
                </div> */}
                <div>
                  <form id="updateProfileForm" >
                  <div className="form-group">
                      {!props.userInfo.nickname && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="mb-0">
                              <strong>Nickname:</strong> Add a nickname
                            </label>
                            {!isNicknameEditMode && (
                              <i className="fas fa-pen" onClick={handleNicknameEditToggle}></i>
                            )}
                          </div>
                          {isNicknameEditMode ? (
                            <>
                              <input
                                autoFocus
                                className="form-control my-3"
                                name="nickname"
                                placeholder="Nickname"
                                style={{ marginRight: '10px' }}
                                type="text"
                              />
                              <button
                                type="button"
                                className="btn btn-primary me-2"
                                onClick={handleNicknameEditToggle}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleNicknameEditToggle}
                              >
                                Cancel
                              </button>
                            </>
                          ) : null}
                        </>
                      )}
                      {props.userInfo.nickname && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="mb-0">
                              <strong>Nickname:</strong> {props.userInfo.nickname}
                            </label>
                            {!isNicknameEditMode && (
                              <i className="fas fa-pen" onClick={handleNicknameEditToggle}></i>
                            )}
                          </div>
                          {isNicknameEditMode ? (
                            <>
                              <input
                                autoFocus
                                className="form-control my-3"
                                name="nickname"
                                placeholder="Nickname"
                                type="text"
                              />
                              <button
                                type="button"
                                className="btn btn-primary me-2"
                                onClick={handleNicknameEditToggle}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleNicknameEditToggle}
                              >
                                Cancel
                              </button>
                            </>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className="form-group">
                      {!props.userInfo.about && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="mb-0">
                              <strong>About:</strong> {props.userInfo.about}
                            </label>
                            {!isAboutEditMode && (
                              <i className="fas fa-pen" onClick={handleAboutEditToggle}></i>
                            )}
                          </div>
                          {isAboutEditMode ? (
                            <>
                              <textarea
                                cols="30"
                                rows="5"
                                className="form-control my-3 border"
                                name="aboutMe"
                                placeholder="About Me"
                              ></textarea>
                              <button
                                type="button"
                                className="btn btn-primary me-2"
                                onClick={handleAboutEditToggle}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleAboutEditToggle}
                              >
                                Cancel
                              </button>
                            </>
                          ) : null}
                        </>
                      )}
                      {props.userInfo.about && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="mb-0">
                              <strong>About:</strong> {props.userInfo.about}
                            </label>
                            {!isAboutEditMode && (
                              <i className="fas fa-pen" onClick={handleAboutEditToggle}></i>
                            )}
                          </div>
                          {isAboutEditMode ? (
                            <>
                              <textarea
                                cols="30"
                                rows="5"
                                className="form-control my-3 border"
                                name="aboutMe"
                                placeholder="About Me"
                              ></textarea>
                              <button
                                type="button"
                                className="btn btn-primary me-2"
                                onClick={handleAboutEditToggle}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleAboutEditToggle}
                              >
                                Cancel
                              </button>
                            </>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="mb-0">
                          <strong>Date of birth:</strong> {props.userInfo.dob}
                        </label>
                        {!isDobEditMode && (
                          <i className="fas fa-pen" onClick={handleDobEditToggle}></i>
                        )}
                      </div>
                      <div className="d-flex align-items-center">
                        {isDobEditMode ? (
                          <>
                            <input
                              autoFocus
                              id="dob"
                              className="form-control my-3 me-2"
                              data-testid="dob"
                              name="dob"
                              placeholder="Date of Birth"
                              type="date"
                            />
                            <button
                              type="button"
                              className="btn btn-primary me-2"
                              onClick={handleDobEditToggle}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleDobEditToggle}
                            >
                              Cancel
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="mb-0">
                          <strong>Gender:</strong> {props.userInfo.gender}
                        </label>
                        {!isGenderEditMode && (
                          <i className="fas fa-pen" onClick={handleGenderEditToggle}></i>
                        )}
                      </div>
                      <div className="d-flex align-items-center">
                        {isGenderEditMode ? (
                          <>
                            <input
                              autoFocus
                              className="form-control my-3"
                              name="gender"
                              placeholder="Gender"
                              type="text"
                              style={{ marginRight: '10px' }}
                              required
                            />
                            <button
                              type="button"
                              className="btn btn-primary me-2"
                              onClick={handleGenderEditToggle}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleGenderEditToggle}
                            >
                              Cancel
                            </button>
                          </>
                        ) : null}
                      </div>
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
