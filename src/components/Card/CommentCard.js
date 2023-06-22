import React, { useState, useEffect } from 'react';
import { decodeJwt } from './PostCard';
import Avatar from '../Avatar/Avatar';
import './Card.css';

function CommentCard(props) {
  const token = localStorage.getItem('token');
  const authorId = decodeJwt(token).userID;
  const postId = props.PostID;

  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);

  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const getComments = async () => {
    const url = `http://localhost:8080/getcomments?postID=${postId}`;
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      if (res.ok) {
        const data = await res.json();
        console.log("comments data", data);
        setComments(data.comments);
      } else {
        throw new Error('Error occurred while getting the comments');
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const comment = commentInput;

    const now = new Date();

    const commentData = {
      content: comment,
      createAt: now,
      authorId: authorId,
      postId: postId,
    };

    // if comment is empty, do nothing
    if (!comment) {
      return;
    }

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    try {
      const res = await fetch("http://localhost:8080/addcomment", {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        // Refresh the comments
        getComments();
        // Clear the comment input field
        setCommentInput('');
      } else {
        throw new Error('Error occurred while creating the comment');
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
      <div className="d-flex align-items-center top-0 start-0 position-absolute" id="d-flex-comments">
        <div className="me-2">
          <i className="text-primary fas fa-thumbs-up"></i>
        </div>
        <p className="m-0 text-muted fs-7">Nafi, Gin, Jacob and 3 others</p>
      </div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item border-0">
          <h2 className="accordion-header" id="headingTwo">
            <div className="accordion-button collapsed pointer d-flex justify-content-end" data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false" aria-controls="collapsePost1">
              <p className="m-0">2 Comments</p>
            </div>
          </h2>
          <hr />
          <div className="d-flex justify-content-around">
            <div className="dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1">
              <i className="fas fa-thumbs-up me-3"></i>
              <p className="m-0">Like</p>
            </div>
            <div
              className=" dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1" data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false" aria-controls="collapsePost1">
              <i className="fas fa-comment-alt me-3"></i>
              <p className="m-0">Comment</p>
            </div>
          </div>
          <div id="collapsePost1" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <hr />
            <div className="accordion-body" >
              {comments && comments.map((comment) => (
                <div className="d-flex align-items-center my-1" key={comment.CommentID+comment+comment.PostID}>
                  <Avatar username={comment.AuthorID} userInfo={props.userInfo} />
                  <div className="p-3 rounded comment__input w-100">
                    <p className="fw-bold m-0">{comment.AuthorID}</p>
                    <p className="m-0 fs-7 bg-gray p-2 rounded">{comment.Content}</p>
                    <p className="m-0 fs-7 text-muted">{formatCommentDate(comment.CreateAt)}</p>
                  </div>
                </div>
              ))}
              <form className="d-flex my-1" onSubmit={handleCommentSubmit}>
                <div>
                <Avatar username={props.username}userInfo={props.userInfo} />
                </div>
                <input
                  type="text"
                  className="form-control border-0 rounded-pill bg-gray"
                  placeholder="Write a comment"
                  value={commentInput}
                  onChange={handleInputChange}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
