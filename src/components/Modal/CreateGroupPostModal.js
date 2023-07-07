import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import "./Modal.css";
import Avatar from "../../components/Avatar/Avatar";

function CreateGroupPostModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const mygroups = useSelector((state) => state.myGroups);
  const [groupID, setGroupID] = useState("");
  console.log("props in create group post modal: ", props);
  //const [myGroups, setMyGroups] = useState(props.myGroups);
  const url = window.location.href;

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

 const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const postContent = document.getElementById("groupPostContent").value;
    const postGroupIDSelect = document.getElementById("postGroupName")?.value || "";
    const now = new Date();

    let groupPostData;
    let targetGroupID;

  if (url === "http://localhost:3000/groups") {
    groupPostData = {
      username: props.userInfo.username,
      groupID: postGroupIDSelect,
      content: postContent,
      image: selectedImage,
      createAt: now
    };
    targetGroupID = postGroupIDSelect;
  } else {
    groupPostData = {
      username: props.userInfo.username,
      groupID: props.groupID,
      content: postContent,
      image: selectedImage,
      createAt: now
    };
    targetGroupID = props.groupID;
  }
    console.log("group post data", groupPostData)

    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch("http://localhost:8080/addgrouppost", {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(groupPostData) // Stringify the entire object
      });
      if (!response.ok) {
        throw new Error("Error occurred while creating the post");
      }
      alert("Post created to group");
      window.location.href = `/singlegroup/${targetGroupID}`;
    } catch (error) {
      console.log(error);
    } 
  };
  
  return (
    <div className="modal fade" id="createGroupPostModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">
              Post to a group
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
                    <Avatar userDisplayname={props.userDisplayname} userInfo={props.userInfo}/> 
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{props.userDisplayname}</p>
                    {url === "http://localhost:3000/groups" && (
                      <select id="postGroupName" className="form-select border-0 bg-gray w-75 fs-7" aria-label="Default select example">
                        <option defaultValue="0">Select your groups</option>
                        {mygroups.map((group) => (
                          <option key={group.GroupID} value={group.GroupID}>
                            {group.GroupName}
                          </option>
                        ))}
                      </select>
                    )}
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
                  id="groupPostContent" 
                  className="form-control my-3 border"
                   placeholder="What's on your mind?"
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                  <p className="m-0">Add image to your group post</p>
                  <div>
                    <label htmlFor="uploadImageGroupPost">
                        <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="uploadImageGroupPost"
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

export default CreateGroupPostModal;
