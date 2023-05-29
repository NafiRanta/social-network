import React from "react";
import "./Modal.css";

function CreatePostModal() {
    return(
        <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header align-items-center">
              <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Create Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="my-1 p-1">
                <div className="d-flex flex-column">
      
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <img src="https://source.unsplash.com/collection/happy-people" alt="from fb" className="rounded-circle"/>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">John</p>
                      <select className="form-select border-0 bg-gray w-75 fs-7" aria-label="Default select example">
                        <option defaultValue="1">Public</option>
                        <option value="2">Pin To Top</option>
                        <option value="3">Hide</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <textarea cols="30" rows="5" className="form-control border-0"></textarea>
                  </div>
                  <div
                    className="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                    <p className="m-0">Add to your post</p>
                    <div>
                      <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-100">Post</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreatePostModal;