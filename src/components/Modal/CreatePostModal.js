import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";

function CreatePostModal(props) {
  const userInfo = useSelector((state) => state.userInfo);
  const allusers = useSelector ((state) => state.allUsers)
  const [selectedImage, setSelectedImage] = useState(null);
  // const [includedFriends, setIncludedFriends] = useState("");
  const [privacy, setPrivacy] = useState(''); // Initialize the selected privacy option state
  const [selectedUsers, setSelectedUsers] = useState([]);
  const fileInputRef = useRef();

  const handlePrivacyChange = (event) => {
    setPrivacy(event.target.value); // Update the selected privacy option
  };

  const handleUserSelect = (event) => {
    const selectedValue = event.target.value;
    // Check if the user is already selected
    const alreadySelected = selectedUsers.includes(selectedValue);

    if (alreadySelected) {
      // If the user is already selected, remove it from the selectedUsers array
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((user) => user !== selectedValue)
      );
    } else {
      // If the user is not already selected, add it to the selectedUsers array
      setSelectedUsers((prevSelected) => [...prevSelected, selectedValue]);
    }
  };
 

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const postContent = document.getElementById("postContent").value;
    const postPrivacy = document.getElementById("postPrivacy").value;
    const now = new Date();

    // Create an object with the required properties
    const postData = {
      username: userInfo.UserName,
      privacy: postPrivacy,
      IncludedFriends: [],
      content: postContent,
      image: selectedImage,
      createAt: now,
    };

    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch("http://localhost:8080/createpost", {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(postData), // Stringify the entire object
      });
      if (!response.ok) {
        throw new Error("Error occurred while creating the post");
      }
      alert("Post created");
      window.location.href = `/profile/${props.userDisplayname}`;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="createPostModal"
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
      data-bs-backdrop="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5
              className="text-dark text-center w-100 m-0"
              id="exampleModalLabel"
            >
              Create Post
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="my-1 p-1">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-baseline">
                  <div className="p-2">
                    <Avatar userDisplayname={props.userDisplayname} />
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{props.userDisplayname}</p>
                    <select
                      id="postPrivacy"
                      className="form-select border-0 bg-gray w-100 fs-7"
                      aria-label="Default select example"
                      value={privacy}
                      onChange={handlePrivacyChange}
                    >
                      <optgroup label="Choose privacy">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="custom">Custom</option>
                      </optgroup>
                    </select>
                    {/* When custom is selected */}
                    {privacy === 'custom' && (
                      <select multiple
                      className="form-select border-0 bg-gray w-100 fs-7"
                      id="customOptions"
                      size={3}
                      value={selectedUsers} 
                      onChange={handleUserSelect}
                      >
                        {userInfo.FollowerUserNames.split(',').map((user, index) => (
                          <option id="allusers" key={index} value={user.id}>
                            {user.FirstName}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div>
                  <textarea
                    cols="30"
                    rows="5"
                    className="form-control my-3 border"
                    id="postContent"
                  ></textarea>
                </div>
                {selectedImage && (
                  <>
                  <div className="mt-3">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="remove-btn text-center">
                    <button type="button" className="btn btn-primary" onClick={handleRemoveImage}>Remove</button>
                </div>
                  </>
                )}
                {!selectedImage && (
                <div className="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                  <p className="m-0">Add image to your post</p>
                  <div onClick={handleUploadButtonClick}>
                      <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    <input
                      type="file"
                      id="uploadImage"
                      style={{ display: "none" }}
                      accept=".jpg, .jpeg, .png, .gif"
                      max-size="1000000"
                      ref={fileInputRef} 
                      onChange={handleFileInputChange}
                    />
                  </div>
                </div>
                 )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row w-100">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handlePostSubmit}
                >
                  Post
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
  );
}

export default CreatePostModal;
