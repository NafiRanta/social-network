import React from "react";
import "./Modal.css";

function LoginModal(){
    return(
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <h2 class="modal-title" id="exampleModalLabel">Register</h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <input type="text" class="form-control my-3" placeholder="First name" />
                            <input type="text" class="form-control my-3" placeholder="Lastname" />
                            <input type="email" class="form-control my-3" placeholder="Email" />
                            <input type="password" class="form-control my-3" placeholder="Password" />
                            <span class="text-muted fs-7">Date of birth</span>
                            <input type="date" class="form-control my-3" autofocus placeholder="Date of Birth" id="Dob" required />
                            <input type="text" class="form-control  my-3" autofocus placeholder="Gender"required />
                            <input type="text" class="form-control  my-3" autofocus placeholder="Nickname (optional)"required />
                            <input type="text" class="form-control  my-3" autofocus placeholder="About me (optional)"required />
                            <div class="text-center mt-3">
                                <button type="button" class="btn btn-success btn-lg" data-bs-dismiss="modal">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;