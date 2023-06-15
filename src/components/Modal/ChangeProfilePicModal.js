import React, { useState, useRef } from "react";
import "./Modal.css";
import Avatar from "../Avatar/Avatar";
const fileInputRef = useRef();

function ChangeProfilePicModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="modal fade"
      id="changeProfilePicModal"
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
      data-bs-backdrop="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">
              Upload Photo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="my-1 p-1">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 align-items-center">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Uploaded profile picture"
                        className="img-fluid"
                      />
                    ) : (
                      <img
                        src={props.profilePicture}
                        alt="Generic placeholder image"
                        className="img-fluid"
                      />
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                  <p className="m-0">Add new profile photo</p>
                  <div>
                    <label htmlFor="uploadImage">
                      <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="uploadImage"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row w-100">
            <div className="col">
                <button type="button" className="btn btn-primary w-100">
                  Upload
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
  );
}

export default ChangeProfilePicModal;
