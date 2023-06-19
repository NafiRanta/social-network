import React, { useState, useEffect } from 'react';
import "./Modal.css";
import {UpdateUserInfoInLocalStorage} from "../../views/Profile/MyProfile";
function UpdateProfileSettingsModal(props) {
  const [isDobEditMode, setDobEditMode] = useState(false);
  const [isGenderEditMode, setGenderEditMode] = useState(false);
  const [isNicknameEditMode, setNicknameEditMode] = useState(false);
  const [isAboutEditMode, setAboutEditMode] = useState(false);
  const [nickname, setNickname] = useState(props.userInfo.nickname);
  const [nicknameLabel, setNicknameLabel] = useState("");
  const [about, setAbout] = useState(props.userInfo.about);
  const [aboutLabel, setAboutLabel] = useState("");
  const [gender, setGender] = useState(props.userInfo.gender)
  const [genderLabel, setGenderLabel] = useState(props.userInfo.gender);
  const [dob, setDob] = useState(props.userInfo.dob);
  const [dobLabel, setDobLabel] = useState(props.userInfo.dob);

  useEffect(() => {
    const nicknamelabel = document.getElementById("nicknameLabel");
    const nicknameInput = document.getElementById("nicknameInput");
    const aboutlabel = document.getElementById("aboutLabel");
    const aboutInput = document.getElementById("aboutInput");
    const genderlabel = document.getElementById("genderLabel");
    const genderInput = document.getElementById("genderInput");
    const doblabel = document.getElementById("dobLabel");
    const dobInput = document.getElementById("dobInput");

    if (nicknamelabel) {
      if (nickname === "") {
        setNicknameLabel("Add a nickname");
        nicknamelabel.innerHTML = "Add a nickname";
      } else {
        setNicknameLabel(nickname);
        nicknamelabel.innerHTML = nickname;
      }
    }
    if (nicknameInput) {
      setNickname(nicknameInput.value);
    }
    if (aboutlabel) {
      if (about === "") {
        setAboutLabel("Add a description");
        aboutlabel.innerHTML = "Add a description";
      } else {
        setAboutLabel(about);
        aboutlabel.innerHTML = about;
      }
    }
    if (aboutInput) {
      setAbout(aboutInput.value);
    }
    if (genderLabel){
      setGenderLabel(gender);
      genderlabel.innerHTML = genderLabel
    }
    if (genderInput){
      setGender(genderInput.value)
    }
    if (doblabel){
      setDobLabel(dob);
      doblabel.innerHTML = dobLabel;
    }
    if (dobInput){
      setDob(dobInput.value)
    }
  }, [nickname, about]);

  // handle nickname change
  const handleNicknameEditToggle = () => {
    setNicknameEditMode(!isNicknameEditMode);
    const nicknameInput = document.getElementById("nicknameInput");
    if (isNicknameEditMode) {
      if (nicknameInput.value === "") {
        setNicknameLabel(nickname);
        console.log("line 82");
      } else {
        setNicknameLabel(nicknameInput.value);
        setNickname(nicknameInput.value);
        console.log("line 92");
      }
    }
  };


  const handleRemoveNickname = () => {
    const nicknameLabel = document.getElementById("nicknameLabel");
    setNicknameLabel("Add a nickname");
    setNickname("");
    nicknameLabel.innerHTML = "Add a nickname";
  };

  const handleNicknameCancelBtn = () => {
    setNicknameEditMode(!isNicknameEditMode);
  }

// handle about change
const handleAboutEditToggle = () => {
  setAboutEditMode(!isAboutEditMode);
  const aboutInput = document.getElementById("aboutInput");
  const aboutLabel = document.getElementById("aboutLabel")
  if (isAboutEditMode) {
    if (aboutInput.value === "" && about !== "") {
      setAboutLabel(about);
      setAbout(about);
      aboutLabel.innerHTML = about;
    } else if (aboutInput.value === "" && about === "") {
      setAboutLabel("Add a description");
      setAbout("");
      aboutLabel.innerHTML = "Add a description";
    }
    else {
      setAboutLabel(aboutInput.value);
      setAbout(aboutInput.value);
      aboutLabel.innerHTML = aboutInput.value;
    }
  }
};


const handleAboutCancelBtn = () => {
  setAboutEditMode(!isAboutEditMode);
};

const handleRemoveAbout = () => {
  const aboutLabel = document.getElementById("aboutLabel");
  setAboutLabel("Add a description");
  setAbout("");
  aboutLabel.innerHTML = "Add a description";
};

  // handle dob change
  const handleDobEditToggle = () => {
    setDobEditMode(!isDobEditMode);
    const dobInput = document.getElementById("dobInput");
    const dobLabel = document.getElementById("dobLabel");
    if (isDobEditMode) {
      if (dobInput && dobInput.value === "") {
        setDobLabel(dob);
        setDob(dob);
        dobLabel.innerHTML = dob;
      } else if (dobInput) {
        setDobLabel(dobInput.value);
        setDob(dobInput.value);
        dobLabel.innerHTML = dobInput.value;
      }
    }
  };

  const handleDobCancelBtn = () => {
    setDobEditMode(!isDobEditMode);
  };
 
  // handle gender change
  const handleGenderEditToggle = () => {
    setGenderEditMode(!isGenderEditMode);
    const genderInput = document.getElementById("genderInput");
    const genderLabel = document.getElementById("genderLabel");
    if (isGenderEditMode) {
      if (genderInput && genderInput.value === "") {
        setNicknameLabel(gender);
        setNickname(gender);
        genderLabel.innerHTML = gender;
      } else if (genderInput){
        setNicknameLabel(genderInput.value);
        setGender(genderInput.value);
        genderLabel.innerHTML = genderInput.value;
      }
    }
  };

  const handleGenderCancelBtn = () => {
    setGenderEditMode(!isGenderEditMode);
  };
 

  // handle updateProfile 
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    console.log("nickname handleUPdate", nickname);
    try{
      const res = await fetch("http://localhost:8080/updatebio", {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify({nickname, about, dob, gender}),
      });
      if (res.ok) {
        console.log("UPDATED SUCCESSFULLY");

      } else {
        console.log("Error:", res.status);
      }
    }
    catch (err) {
      console.log("err", err);
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
                <div>
                  <form id="updateProfileForm" >
                    <div className="form-group">
                      {!nickname && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="mb-0">
                              <strong>Nickname:</strong> 
                            </label>
                            <p id="nicknameLabel" className="mb-0">{nicknameLabel}</p>
                            {!isNicknameEditMode && (
                              <i className="fas fa-pen" onClick={handleNicknameEditToggle}></i>
                            )}
                            {(!isNicknameEditMode && nicknameLabel !== "Add a nickname" && nicknameLabel.innerHTML !== nickname && nicknameLabel !== "Add a nickname" )&& (
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
                      {nickname && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="mb-0">
                              <strong>Nickname:</strong> 
                              <p id="nicknameLabel" className="mb-0">{nicknameLabel}</p>
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
                                id="nicknameInput"
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
                      {!about && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="mb-0">
                              <strong>About:</strong> 
                              <p id="aboutLabel" className="mb-0">{aboutLabel}</p>
                            </label>
                            {!isAboutEditMode && (
                              <i className="fas fa-pen" onClick={handleAboutEditToggle}></i>
                            )}
                            {(!isAboutEditMode && aboutLabel !== "Add a description" && aboutLabel.innerHTML !== about && aboutLabel !== "Add a description") && (
                              <i className="fas fa-times" onClick={handleRemoveAbout}></i>
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
                      {about && (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="mb-0">
                              <strong>About:</strong>
                              <p id="aboutLabel" className="mb-0 ">{aboutLabel}</p>
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
                          <strong>Date of birth:</strong> 
                        </label>
                        <p id="dobLabel">{dob}</p>
                        {!isDobEditMode && (
                          <i className="fas fa-pen" onClick={handleDobEditToggle}></i>
                        )}
                      </div>
                      <div className="d-flex align-items-center">
                        {isDobEditMode ? (
                          <>
                            <input
                              autoFocus
                              id="dobInput"
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
                              onClick={handleDobCancelBtn}
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
                          <strong>Gender:</strong> 
                        </label>
                        <p id="genderLabel" className="mb-0">{gender}</p>                     
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
                              id = "genderInput"
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
                              onClick={handleGenderCancelBtn}
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
