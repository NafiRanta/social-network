import React from 'react';
import Avatar from '../Avatar/Avatar';
import './Card.css';

function CommentCard(){
    return(
        <div class="post__comment mt-3 position-relative">
        <div class="d-flex align-items-center top-0 start-0 position-absolute" id="d-flex-comments">
          <div class="me-2">
            <i class="text-primary fas fa-thumbs-up"></i>
          </div>
          <p class="m-0 text-muted fs-7">Nafi, Gin, Jacob and 3 others</p>
        </div>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item border-0">
            <h2 class="accordion-header" id="headingTwo">
              <div class="accordion-button collapsed pointer d-flex justify-content-end" data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false" aria-controls="collapsePost1">
                <p class="m-0">2 Comments</p>
              </div>
            </h2>
            <hr />
            <div class="d-flex justify-content-around">
              <div class="dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1">
                <i class="fas fa-thumbs-up me-3"></i>
                <p class="m-0">Like</p>
              </div>
              <div
                class=" dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1" data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false" aria-controls="collapsePost1">
                <i class="fas fa-comment-alt me-3"></i>
                <p class="m-0">Comment</p>
              </div>
            </div>
            <div id="collapsePost1" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <hr />
              <div class="accordion-body">
                <div class="d-flex align-items-center my-1">
                  <Avatar/>
                  <div class="p-3 rounded comment__input w-100">
                    <p class="fw-bold m-0">John</p>
                    <p class="m-0 fs-7 bg-gray p-2 rounded">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </div>
                <form class="d-flex my-1">
                  <div>
                    <Avatar/>
                  </div>
                  <input type="text" class="form-control border-0 rounded-pill bg-gray" placeholder="Write a comment"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CommentCard;