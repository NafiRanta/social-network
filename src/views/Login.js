import React from 'react';

function Login(){
    return(
        <div>
            <body class="bg-gray">
                <div class="container mt-5 pt-5 d-flex flex-column flex-lg-row justify-content-evenly">
                    <div class="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
                        <h1 class="text-primary fw-bold fs-0">ÅlandSocial</h1>
                        <p class="w-75 mx-auto fs-4 mx-lg-0">ÅlandSocial helps you connect and share with the people in Åland.</p>
                    </div>
                    <div class="login-form">
                        <div class="bg-white shadow rounded p-3 input-group-lg">
                        <input type="email" class="form-control my-3" placeholder="Email address or phone number" />
                        <input type="password" class="form-control my-3" placeholder="Password" />
                        <a href="./feed.html"><button class="btn btn-primary w-100 my-3">Log In</button></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#createModal">Not a user? Register</a>
                    
                        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div>
                                            <h2 class="modal-title" id="exampleModalLabel">Sign Up</h2>
                                            <span class="text-muted fs-7">It's quick and easy.</span>
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                            
                                    <div class="modal-body">
                                        <form>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" class="form-control" placeholder="First name" />
                                                </div>
                                                <div class="col">
                                                    <input type="text" class="form-control" placeholder="Lastname" />
                                                </div>
                                             </div>
                                            <input type="email" class="form-control my-3" placeholder="Email" />
                                            <input type="password" class="form-control my-3" placeholder="Password" />
                                
                                            <div class="row my-3">
                                                <span class="text-muted fs-7">Date of birth <i class="fas fa-question-circle" data-bs-toggle="popover" type="button" data-bs-content="And here's some amazing content. It's very engaging. Right?"></i></span>
                                                <input type="date" class="form-control my-3" autofocus placeholder="Date of Birth" id="Dob" required></input>
                                            </div>
                                
                                            <div class="row my-3">
                                                <span class="text-muted fs-7">Gender <i class="fas fa-question-circle" data-bs-toggle="popover" type="button" data-bs-content="And here's some amazing content. It's very engaging. Right?"></i></span>
                                                <div class="col">
                                                    <div class="border rounded p-2">
                                                        <label class="form-check-label" for="flexRadioDefault1">Male </label>
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="border rounded p-2">
                                                        <label class="form-check-label" for="flexRadioDefault1">Female </label>
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="border rounded p-2">
                                                        <label class="form-check-label" for="flexRadioDefault1">Custom </label>
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-none" id="genderSelect">
                                                <select class="form-select">
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                                <div class="my-3">
                                                    <span class="text-muted fs-7">Your pronoun is visible to everyone.</span>
                                                    <input type="text" class="form-control" placeholder="Gender (optional)" />
                                                </div>
                                            </div>
                                            <div>
                                            <span class="text-muted fs-7">By clicking Sign Up, you agree to our Terms, Data Policy....</span>
                                            </div>
                                
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
 
                <div class="d-flex flex-wrap">
                </div>
                <hr />
      
                <div class="d-flex flex-wrap">
 
                </div>
             
                <div class="mt-4 mx-2">
                <p class="fs-7">ÅlandSocial &copy; 2023</p>
                </div>
            </div>
            </footer>
            </body>
        </div>   

    )
}

export default Login;

