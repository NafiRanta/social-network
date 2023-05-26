import React from "react";
import "./Modal.css";

function CreateGroupPostModal(){
    return(
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header align-items-center">
              <h5 class="text-dark text-center w-100 m-0" id="exampleModalLabel">Post to a group</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="my-1 p-1">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                    <div class="p-2">
                      <img src="https://source.unsplash.com/collection/happy-people" alt="from fb" class="rounded-circle"/>
                    </div>
                    <div>
                      <p class="m-0 fw-bold">John</p>
                      <select class="form-select border-0 bg-gray w-75 fs-7" aria-label="Default select example" >
                        <option selected>Select your groups</option>
                        <option value="1">Ålands köp och sälj </option>
                        <option value="2">Marimekko Pre-loved</option>
                        <option value="3">Gritlab Drink and Socialise</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <textarea cols="30" rows="5" class="form-control border-0" placeholder="What's on your mind?"></textarea>
                  </div>
                  <div class="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                    <p class="m-0">Add to your post</p>
                    <div>
                      <i class="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary w-100">Post</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreateGroupPostModal;