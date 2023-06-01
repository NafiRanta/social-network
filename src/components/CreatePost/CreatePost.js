import React from 'react';
import CreatePostModal from '../Modal/CreatePostModal';

function CreatePost() {
 
    return(
        <div className="bg-white p-3 mt-3 rounded border shadow">
              <div className="d-flex" type="button">
                <div className="p-1">
                  <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" className="rounded-circle me-2"/>
                </div>
                <input type="text" className="form-control rounded-pill border-0 bg-gray pointer" disabled placeholder="What's on your mind, JJ?" data-bs-toggle="modal" data-bs-target="#createModal"/>
              </div>
              <CreatePostModal />
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