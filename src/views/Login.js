import React from 'react';
import LoginModal from '../components/Modal/LoginModal';

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
                        <LoginModal />
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

