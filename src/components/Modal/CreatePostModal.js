import React, { useState } from "react";
import "./Modal.css";
import Avatar from "../Avatar/Avatar";
import { decodeJwt } from "../Card/PostCard";

function CreatePostModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [includedFriends, setIncludedFriends] = useState("");
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
    
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const authorId = decodeJwt(token).userID;
    const postContent = document.getElementById("postContent").value;
    const postPrivacy = document.getElementById("postPrivacy").value;
    const now = new Date();
    console.log("now: ", now);

    // Create an object with the required properties
    const postData = {
      privacy: postPrivacy,
      IncludedFriends: [],
      content: postContent,
      image: "",
      createAt: now
    };
    console.log(postData)
  
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
     
    try {
      const response = await fetch("http://localhost:8080/createpost", {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(postData) // Stringify the entire object
      });
      if (!response.ok) {
        throw new Error('Error occurred while creating the post');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  return (
    <div className="modal fade" id="createPostModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">
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
                <div className="d-flex align-items-center">  
                  <div className="p-2">
                    <Avatar userInfo={props.userInfo} username={props.username} />
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{props.username}</p>
                    <select id="postPrivacy" className="form-select border-0 bg-gray w-75 fs-7" aria-label="Default select example">
                    <optgroup label="Choose privacy">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="custom">Custom</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                {selectedImage && (
                  <div className="mt-3">
                    <img src={selectedImage} alt="Selected" className="img-fluid rounded" />
                  </div>
                )}
                <div>
                  <textarea 
                    cols="30" 
                    rows="5" 
                    className="form-control my-3 border"
                    id="postContent"
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                  <p className="m-0">Add image to your post</p>
                  <div>
                    <label htmlFor="uploadImage">
                      <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="uploadImage"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
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
