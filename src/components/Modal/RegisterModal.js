import React from "react";
import $ from "jquery"; 
import "./Modal.css";

function RegisterModal() {
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
                            <div class="avatar-wrapper">
                                <img class="profile-pic" src="" />
                                <div class="upload-button">
                                    <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
                                </div>
                                <input class="file-upload" type="file" accept="image/*"/>
                            </div>
                            <div className="registerForm-group">
                                <p className="text-muted text-center">Upload Avatar (optional)</p>
                                <input type="text" className="form-control my-3" placeholder="First name" />
                                <input type="text" className="form-control my-3" placeholder="Lastname" />
                                <input type="email" className="form-control my-3" placeholder="Email" />
                                <input type="password" className="form-control my-3" placeholder="Password" />
                                <span className="text-muted fs-7">Date of birth</span>
                                <input type="date" className="form-control my-3" autoFocus placeholder="Date of Birth" id="Dob" required />
                                <input type="text" className="form-control  my-3" autoFocus placeholder="Gender"required />
                                <input type="text" className="form-control  my-3" autoFocus placeholder="Nickname (optional)" />
                                <input type="text" className="form-control  my-3" autoFocus placeholder="About me (optional)" />
                                <div className="text-center mt-3">
                                    <button type="button" className="btn btn-success btn-lg" data-bs-dismiss="modal">Sign Up</button>
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