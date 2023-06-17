import React, { useState, useEffect } from 'react';
import "./Modal.css";
import { set } from 'draft-js/lib/EditorState';

function UpdateProfileSettingsModal(props) {
  const [isDobEditMode, setDobEditMode] = useState(false);
  const [isGenderEditMode, setGenderEditMode] = useState(false);
  const [isNicknameEditMode, setNicknameEditMode] = useState(false);
  const [isAboutEditMode, setAboutEditMode] = useState(false);
  const [nickname, setNickname] = useState(props.userInfo.nickname);
  const [nicknameLabel, setNicknameLabel] = useState("");
  const [about, setAbout] = useState(props.userInfo.about);
  const [aboutLabel, setAboutLabel] = useState("");

  useEffect(() => {
    const nicknamelabel = document.getElementById("nicknameLabel");
    const nicknameInput = document.getElementById("nicknameInput");
    const aboutlabel = document.getElementById("aboutLabel");
    const aboutInput = document.getElementById("aboutInput");
    if (nicknamelabel) {
      setNicknameLabel(nicknamelabel.innerHTML);
    }
    if (nicknameInput) {
      setNickname(nicknameInput.value);
    }
    if (aboutlabel) {
      setAboutLabel(aboutlabel.innerHTML);
    }
    if (aboutInput) {
      setAbout(aboutInput.value);
    }
  }, []);


  const handleNicknameEditToggle  = () => {
    setNicknameEditMode(!isNicknameEditMode);
    const nicknameInput = document.getElementById("nicknameInput");
    const nicknameLabel = document.getElementById("nicknameLabel");
  
    if (isNicknameEditMode) {
      if( nicknameInput.value=== "") {
        if (nickname === "") {
          setNicknameLabel("Add a nickname");
          setNickname("");
          nicknameLabel.innerHTML = "Add a nickname";
        } else {
          setNicknameLabel(nickname);
          nicknameLabel.innerHTML = nickname;
        }
      } else {
        setNicknameLabel(nicknameInput.value);
        setNickname(nicknameInput.value);
        nicknameLabel.innerHTML = nicknameInput.value;
      }
    }
 
  };
  

 const handleRemoveNickname = () => {
  const nicknameLabel = document.getElementById("nicknameLabel");
  setNicknameLabel("Add a nickname");
  setNickname("");
  nicknameLabel.innerHTML = "Add a nickname";
 }

 const handleNicknameCancelBtn = () => {
  setNicknameEditMode(!isNicknameEditMode);
};

const handleAboutEditToggle   = () => {
  setAboutEditMode(!isAboutEditMode);
  const aboutInput = document.getElementById("aboutInput");
  const aboutLabel = document.getElementById("aboutLabel");
  if (isAboutEditMode) {
    if (aboutInput.value === "") {
      setAboutLabel(about);
      setAbout(about);
      aboutLabel.innerHTML = about;
    } else {
      const aboutLabel = document.getElementById("aboutLabel");
      setAboutLabel(aboutInput.value);
      setAbout(aboutInput.value);
      aboutLabel.innerHTML = aboutInput.value;
    }
  }
};

const handleAboutCancelBtn = () => {
  setAboutEditMode(!isAboutEditMode);
  /* if (props.userInfo.about) {
    setAboutLabel(props.userInfo.about);
  } else {
    setAboutLabel("Add a bio");
  } */
};

const handleRemoveAbout = () => {
  const aboutLabel = document.getElementById("aboutLabel");
  setAboutLabel("Add a description");
  setAbout("");
  aboutLabel.innerHTML = "Add a description";
};

  const handleDobEditToggle = () => {
    setDobEditMode(!isDobEditMode);
  };

  const handleGenderEditToggle = () => {
    setGenderEditMode(!isGenderEditMode);
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
    };
  
    if (isNicknameEditMode) {
      // if nickname is edited, update the nickname and if it is not updated, set it to the original nickname
      data.nickname = formData.nickname.value ? formData.nickname.value : props.userInfo.nickname;
      console.log("data.nickname", data.nickname)
    }
    
    if (isAboutEditMode) {
      // if about is edited, update the about and if it is not updated, set it to the original about
      data.aboutMe = formData.aboutMe.value ? formData.aboutMe.value : props.userInfo.about;
    }
    
    if (isDobEditMode) {
      // if dob is edited, update the dob and if it is not updated, set it to the original dob
      data.dob = formData.dob.value ? formData.dob.value : props.userInfo.dob;
    }
    
    if (isGenderEditMode) {
      // if gender is edited, update the gender and if it is not updated, set it to the original gender
      data.gender = formData.gender.value? formData.gender.value : props.userInfo.gender
    }
    
    console.log("data", data);
    const res = await fetch("http://localhost:8080/updatebio", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer'
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
                              <strong>Nickname:</strong> 
                            </label>
                            <p id="nicknameLabel" className="mb-0">Add a nickname</p>
                            
                            {!isNicknameEditMode && (
                              <i className="fas fa-pen" onClick={handleNicknameEditToggle}></i>
                            )}
                            {(!isNicknameEditMode && nicknameLabel !== "Add a nickname" && nicknameLabel.innerHTML !== props.userInfo.nickname) && (
                              <i className="fas fa-times" onClick={handleRemoveNickname}></i>
                            )}
                          </div>
                          {isNicknameEditMode ? (
                            <>
                              <input
                                autoFocus
                                className="form-control my-3"
                                id="nicknameInput"
                                name="nickname"
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
                                onClick={handleNicknameCancelBtn}
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
                              <strong>Nickname:</strong> 
                              <p id="nicknameLabel" className="mb-0">{props.userInfo.nickname}</p>
                            </label>
                            {!isNicknameEditMode && (
                              <i className="fas fa-pen" onClick={handleNicknameEditToggle}></i>
                            )}
                             {(!isNicknameEditMode && nicknameLabel !== "Add a nickname" && nicknameLabel.innerHTML !== props.userInfo.nickname) && (
                              <i className="fas fa-times" onClick={handleRemoveNickname}></i>
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
                                onClick={handleNicknameCancelBtn}
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
                              <strong>About:</strong> 
                              <p id="aboutLabelDescription" className="mb-0">Add a description</p>
                            </label>
                            {!isAboutEditMode && (
                              <i className="fas fa-pen" onClick={handleAboutEditToggle}></i>
                            )}
                             {(!isAboutEditMode && aboutLabel !== "Add a description" && aboutLabel.innerHTML !== props.userInfo.about) && (
                              <i className="fas fa-times" onClick={handleRemoveNickname}></i>
                            )}
                          </div>
                          {isAboutEditMode ? (
                            <>
                              <textarea
                                cols="30"
                                rows="5"
                                className="form-control my-3 border"
                                id='aboutInput'
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
                                onClick={handleAboutCancelBtn}
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
                              <strong>About:</strong>
                              <p id="aboutLabel" className="mb-0 ">{props.userInfo.about}</p>
                            </label>
                            {!isAboutEditMode && (
                              <i className="fas fa-pen" onClick={handleAboutEditToggle}></i>
                            )}
                            <i className="fas fa-times" onClick={handleRemoveAbout}></i>
                          </div>
                          {isAboutEditMode ? (
                            <>
                              <textarea
                                cols="30"
                                rows="5"
                                className="form-control my-3 border"
                                id='aboutInput'
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
                                onClick={handleAboutCancelBtn}
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
