import React from 'react';
import Avatar from './CommentCard';

function PostCard() {
    return(
        <div className="bg-white p-4 rounded shadow mt-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" className="rounded-circle me-2"/>
              <div>
                <p className="m-0 fw-bold">John</p>
                <span className="text-muted fs-7">July 17 at 1:23 pm</span>
              </div>
            </div>
            <i className="fas fa-ellipsis-h" type="button" id="post1Menu" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu border-0 shadow" aria-labelledby="post1Menu">
              <li className="d-flex align-items-center">
                <a className="dropdown-item d-flex justify-content-around align-items-center fs-7" href="#">Edit Post</a>
              </li>
              <li className="d-flex align-items-center">
                <a className="dropdown-item d-flex justify-content-around align-items-center fs-7" href="#">Delete Post</a>
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <div>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quae fuga incidunt consequatur tenetur doloremque officia
                corrupti provident tempore vitae labore?
              </p>
              <img src="https://source.unsplash.com/random/12" alt="post image" className="img-fluid rounded"/>
            </div>
            <Avatar />  
          </div>
        </div>
      )
}

export default PostCard;