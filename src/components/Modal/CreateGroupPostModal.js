import React, { useState, useEffect } from "react";
import "./Modal.css";
import Avatar from "../../components/Avatar/Avatar";

function CreateGroupPostModal(props) {
  const [myGroups, setMyGroups] = useState(props.myGroups);
    return(
        <div className="modal fade" id="createGroupPostModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header align-items-center">
              <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Post to a group</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="my-1 p-1">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <Avatar userDisplayname={props.userDisplayname} userInfo={props.userInfo}/> 
                    </div>
                    <div>
                      <p className="m-0 fw-bold">{props.userDisplayname}</p>
                      <select className="form-select border-0 bg-gray w-75 fs-7" aria-label="Default select example" >
                        <option defaultValue="0">Select your groups</option>
                        {myGroups.map((group) => (
                        <option key={group.GroupID} value={group.GroupID}>
                          {group.GroupName}
                        </option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <textarea cols="30" rows="5" className="form-control my-3 border" placeholder="What's on your mind?"></textarea>
                  </div>
                  <div className="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                    <p className="m-0">Add post to your group</p>
                    <div>
                      <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
            <div className="row w-100">
            <div className="col">
                <button type="button" className="btn btn-primary w-100">
                  Post
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
}

export default CreateGroupPostModal;