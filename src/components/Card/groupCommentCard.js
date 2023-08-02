import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Avatar from "../Avatar/Avatar";
import "./Card.css";


function GroupCommentCard(props) {
    const userInfo = useSelector((state) => state.userInfo);
    const token = localStorage.getItem("token");
    const groupPostId = props.groupPostID;
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [groupCommentInput, setGroupCommentInput] = useState("");
    const [groupComments, setGroupComments] = useState([]);
    const [groupCommentCount, setGroupCommentCount] = useState(0);

    const handleInputChange = (e) => {
        setGroupCommentInput(e.target.value);
    }

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

    const getGroupComments = async () => {
        const url = `http://localhost:8080/getgroupcomments?groupPostID=${groupPostId}`;
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: headers,
            });
            if (res.ok) {
                const data = await res.json();
                console.log('gr post comment: ', data)
                if (data.groupComments !== null) {
                    setGroupComments(data.groupComments);
                    setGroupCommentCount(data.groupComments.length);
                    // setSelectedImage(data.selectedImage)
                    // groupComments.map((comment) => {
                    //     console.log("comment", comment);
                    // })
                } else {
                    setGroupComments([]);
                    setGroupCommentCount(0);
                }
            } else {
                throw new Error("Error occurred while getting the comments");
            }
        } catch (error) {
            console.log("error", error);
        }
    }


    useEffect(() => {
        getGroupComments();
    }, []);

const handleGroupCommentSubmit = async (e) => {
    e.preventDefault();
    const comment = groupCommentInput;
    const now = new Date();
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");
    const body = {
        groupPostID: groupPostId,
        content: comment,
        createAt: now,
        image: selectedImage,
        userName: userInfo.UserName,
    };
    try {
        const res = await fetch("http://localhost:8080/addgroupcomment", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        if (res.ok) {
          alert("Comment added successfully");
            setGroupCommentInput("");
            getGroupComments();
            setSelectedImage(null);
        } else {
            throw new Error("Error occurred while adding the comment");
        }
    } catch (error) {
        console.log("error", error);
    }
};

const formatCommentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
};
return (
    <div className="post__comment mt-3 position-relative">
      <div
        className="d-flex align-items-center top-0 start-0 position-absolute"
        id="d-flex-comments"
      >
      </div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item border-0">
          <h2 className="accordion-header" id="headingTwo">
            <div
              className="accordion-button collapsed pointer d-flex justify-content-end"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePost1"
              aria-expanded="false"
              aria-controls="collapsePost1"
            >
              <p className="m-0">{groupCommentCount} Comments</p>
            </div>
          </h2>
          <hr />
          <div className="d-flex justify-content-around">
            <div
              className=" dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePost1"
              aria-expanded="false"
              aria-controls="collapsePost1"
            >
              <i className="fas fa-comment-alt me-3"></i>
              <p className="m-0">Comment</p>
            </div>
          </div>
          <div
            id="collapsePost1"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          ></div>
           <hr />
           <div className="accordion-body">
            {groupComments &&
              groupComments.map((groupComment, index) => (
            <div
                className="d-flex align-items-center my-1"
                key={`${groupComment.groupCommentID}-${index}`}
                >
                <Avatar userName={groupComment.userName}/>
                <div className="p-3 rounded comment__input w-100">
                      <p className="m-0 fs-7 bg-gray p-2 rounded">
                        {groupComment.content}
                      </p>
                      {groupComment.image && (
                        <img
                          src={groupComment.image}
                          alt="comment image"
                          className="img-fluid rounded"
                          id="commentImg"
                        />
                      )}
                      <p className="m-0 fs-7 text-muted">
                        {formatCommentDate(groupComment.createAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <form className="d-flex my-1" onSubmit={handleGroupCommentSubmit}>
                  <div>
                    <Avatar userDisplayname={props.userDisplayname} 
                    />
                  </div>
                  <div  id="commentBox" className="d-flex flex-column flex-grow-1">
                  <input
                    type="text"
                    className="form-control border-0 rounded-pill bg-gray"
                    placeholder="Write a comment"
                    value={groupCommentInput}
                    onChange={handleInputChange}
                  />
                  {/* Add image to comments */}
                <div className="d-flex justify-content-left border border-1 border-light rounded p-3 mt-3" id="pictureButton">
                  <div>
                    <label htmlFor="uploadImageGComment">
                      <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="uploadImageGComment"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                {selectedImage && (
                  <div className="mt-3">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="img-fluid rounded"
                    />
                  </div>
                )}
                {selectedImage && (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={() => setSelectedImage(null)} // Set selectedImage to null on button click
                    >
                      Remove Picture
                    </button>
                  </div>
                )}
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default GroupCommentCard;