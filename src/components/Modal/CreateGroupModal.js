import React from "react";
import "./Modal.css";
import Avatar from "../Avatar/Avatar";

function CreateGroupModal(props) {
  console.log("username create group", props.username);
    return(
        <div className="modal fade" id="createGroupModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header align-items-center">
              <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Create Group</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.closeModal}></button>
            </div>
            <div className="modal-body">
              <div className="my-1 p-1">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <Avatar /> 
                    </div>
                    <div>
                      <p className="m-0 fw-bold">{props.username}</p>
                    </div>             
                  </div>
                  <div>
                      <form id="createGroupForm">
                          <input type="text" className="form-control my-3" id="groupname" placeholder="Group Name" />
                          <select className="form-select form-control my-3" aria-label="Default select example">
                            <option disabled selected>
                              Choose Privacy
                            </option>
                            <option value="1">Public</option>
                            <option value="2">Private</option>
                          </select>
                          <select className="form-select form-control my-3" aria-label="Default select example">
                            <option disabled selected>
                              Invite Friends
                            </option>
                            <option value="1">
                              <div className="d-flex align-items-center">
                                <Avatar />
                                <p className="m-0">Jacob</p>
                              </div>
                            </option>
                          </select>
                      </form>
                    </div>       
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-100">Create</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreateGroupModal;

