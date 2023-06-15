import React, { useState } from 'react';
import CreatePostModal from '../Modal/CreatePostModal';
import Avatar from '../../components/Avatar/Avatar';

function CreatePost(props) {
    return(
        <div className="bg-white p-3 mt-3 rounded border shadow">
              <div className="d-flex" type="button">
                <div className="p-1">
                  <Avatar profilePicture={props.profilePicture} />
                </div>
                <input 
                  type="text" 
                  className="form-control rounded-pill border-0 bg-gray pointer" 
                  disabled 
                  placeholder={`What's on your mind, ${props.username}?`}
                  data-bs-toggle="modal" 
                  data-bs-target="#createPostModal"/>
              </div>
              <CreatePostModal username={props.username} profilePicture={props.profilePicture}/>
              <hr />
              <div className="d-flex flex-column flex-lg-row mt-3">
                <div className="dropdown-item rounded d-flex align-items-center justify-content-center" type="button">
                  <p className="m-0 text-muted">Create Post</p>
                </div>
              </div>
            </div>
    )
}

export default CreatePost;