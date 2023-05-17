import React from 'react';

function Login(){
    return(
        <div>
            <div class="container mt-5 pt-5 d-flex flex-column flex-lg-row justify-content-evenly">
                <div class="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
                    <h1 class="text-primary fw-bold fs-0">ÅlandSocial</h1>
                    <p class="w-75 mx-auto fs-4 mx-lg-0">ÅlandSocial helps you connect and share with the people in Åland.</p>
                </div>
                <div class="login-form">
                    <div class="bg-white shadow rounded p-3 input-group-lg">
                        <input type="email" class="form-control my-3" placeholder="Email address or phone number" />
                        <input type="password" class="form-control my-3" placeholder="Password" />
                        <a href="#"><button class="btn btn-primary w-100 my-3">Log In</button></a>
                        <a href="#" class="text-decoration-none text-center" data-bs-toggle="modal" data-bs-target="#createModal"><p>Not a user? Register</p></a>
                
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
                </div>
            </div>
        </div>
        <footer class="bg-white p-4 text-muted">
            <div class="container">
                <hr />
                <div class="mt-4 mx-2">
                <p class="fs-7">ÅlandSocial &copy; 2023</p>
                </div>
            </div>
        </footer>
    </div>   
    )
}

export default Login;

