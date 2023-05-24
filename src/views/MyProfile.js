import React from 'react';
import Topnav from './Topnav'
import CreatePost from '../components/CreatePost'
import ChatContainerSmall from '../components/ChatContainerSmall';
import PostContainer from '../components/PostCard';
import HomeSidenav from './HomeSidenav';
import Avatar from '../components/Avatar';

function MyProfile(){
    return (
        <div>
            <Topnav />
            <div class="container-fluid">
                <div class="row justify-content-evenly">
                    <div class="col-12 col-lg-3">
                        <div class="d-none d-xxl-block h-100 fixed-top overflow-hidden scrollbar">
                            <ul class="navbar-nav mt-4 ms-3 d-flex flex-column pb-5 mb-5" >
                                <li class="follow-box p-1 rounded">
                                    <hr class="m-0" />
                                    <div>
                                        <p class="m-0">Followers</p>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Gin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    
                                    <hr class="m-0" />
                                </li>
                                <li class="follow-box p-1 rounded">
                                    <div>
                                        <p class="m-0">Following</p>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Ashley</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Gin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="follow-box-content p-1 m-0 d-flex">
                                        <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                            <div class="fellows d-flex align-items-center">
                                                <Avatar/>
                                                <p class="m-0">Jacob</p>
                                            </div>
                                        </a>
                                    </div>

                                    <hr class="m-0" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 pb-5">
                        <div class="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-createpost">
                            <CreatePost />
                            <PostContainer />
                        </div>
                    </div>
                    <div class="col-12 col-lg-3">
                  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
