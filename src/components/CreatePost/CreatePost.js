import React from 'react';
import CreatePostModal from '../Modal/CreatePostModal';

function CreatePost(){
    return(
        <div class="bg-white p-3 mt-3 rounded border shadow">
              <div class="d-flex" type="button">
                <div class="p-1">
                  <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" class="rounded-circle me-2"/>
                </div>
                <input type="text" class="form-control rounded-pill border-0 bg-gray pointer" disabled placeholder="What's on your mind, John?" data-bs-toggle="modal" data-bs-target="#createModal"/>
              </div>
              <CreatePostModal />
              <hr />
              <div class="d-flex flex-column flex-lg-row mt-3">
                <div class="dropdown-item rounded d-flex align-items-center justify-content-center" type="button">
                  <i class="fas fa-photo-video me-2 text-success"></i>
                  <p class="m-0 text-muted">Photo/Video</p>
                </div>
              </div>
            </div>
    )
}

export default CreatePost;