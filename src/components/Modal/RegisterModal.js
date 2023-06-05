import React from "react";
import $ from "jquery"; 
import "./Modal.css";

function RegisterModal({ openModal }) {
    $(document).ready(function() {
        var readURL = function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
    
                reader.onload = function (e) {
                    $('.profile-pic').attr('src', e.target.result);
                }
        
                reader.readAsDataURL(input.files[0]);
            }
        }
       
        $(".file-upload").on('change', function(){
            readURL(this);
        });
        
        $(".upload-button").on('click', function() {
           $(".file-upload").click();
        });
    });
    return(
        <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <h2 className="modal-title" id="exampleModalLabel">Register</h2>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="registerForm">
                            <div className="avatar-wrapper">
                                <img className="profile-pic" src="" />
                                <div className="upload-button">
                                    <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                                </div>
                                <input className="file-upload" type="file" accept="image/*"/>
                            </div>
                            <div className="registerForm-group">
                                <p className="text-muted text-center">Upload Avatar (optional)</p>
                                <input type="text" className="form-control my-3" id="firstname" placeholder="First name" />
                                <input type="text" className="form-control my-3" id="lastname" placeholder="Lastname" />
                                <input type="email" className="form-control my-3" id="email" placeholder="Email" />
                                <input type="password" className="form-control my-3" id="password" placeholder="Password" />
                                <span className="text-muted fs-7">Date of birth</span>
                                <input type="date" className="form-control my-3" autoFocus id="dob" placeholder="Date of Birth" required />
                                <input type="text" className="form-control  my-3" autoFocus id="gender" placeholder="Gender"required />
                                <input type="text" className="form-control  my-3" autoFocus id="nickname" placeholder="Nickname (optional)" />
                                <input type="text" className="form-control  my-3" autoFocus id="about" placeholder="About me (optional)" />
                                <div className="text-center mt-3">
                                    <button type="button" className="btn btn-success btn-lg" onClick={openModal} data-bs-dismiss="modal">Sign Up</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal;