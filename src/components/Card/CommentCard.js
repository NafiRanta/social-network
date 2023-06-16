import React from 'react';
import Avatar from '../Avatar/Avatar';
import './Card.css';

function CommentCard(props) {
    return(
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
              <div className="accordion-body">
                <div className="d-flex align-items-center my-1">
                  <Avatar username={props.username} userInfo={props.userInfo}/>
                  <div className="p-3 rounded comment__input w-100">
                    <p className="fw-bold m-0">John</p>
                    <p className="m-0 fs-7 bg-gray p-2 rounded">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </div>
                <form className="d-flex my-1">
                  <div>
                    <Avatar username={props.username} userInfo={props.userInfo}/>
                  </div>
                  <input type="text" className="form-control border-0 rounded-pill bg-gray" placeholder="Write a comment"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CommentCard;