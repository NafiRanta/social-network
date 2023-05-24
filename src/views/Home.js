import React from 'react';
import Topnav from './Topnav'
import CreatePost from '../components/CreatePost'
import ChatContainerSmall from '../components/ChatContainerSmall';
import PostContainer from '../components/PostCard';
import HomeSidenav from './HomeSidenav';
import Avatar from '../components/Avatar';

function Home(){
    return (
        <div>
            <Topnav />
            <div class="container-fluid">
                <div class="row justify-content-evenly">
                    <div class="col-12 col-lg-3">
                        <div class="d-none d-xxl-block h-100 fixed-top overflow-hidden scrollbar">
                            <ul class="navbar-nav mt-4 ms-3 d-flex flex-column pb-5 mb-5" >
                                 <li class="dropdown-item p-1 rounded">
                                    <div class="p-2">
                                        <div class="d-flex align-items-center">
                                            <Avatar/>
                                            <p class="m-0">Zuratun Nafisah Rantasalmi</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="dropdown-item p-1 rounded">
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="p-2">
                                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png" alt="from fb" class="rounded-circle" id="avatar"/>
                                        </div>
                                        <div>
                                            <p class="m-0">My Groups</p>
                                            <i class="fas fa-circle text-primary" id="fas-fa-circle"></i>
                                            <span class="fs-7 text-primary"> 1 new</span>
                                        </div>
                                    </a>
                                </li>
                                <li class="dropdown-item p-1">
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="p-2">
                                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png" alt="from fb" class="rounded-circle" id="avatar"/>
                                        </div>
                                        <div>
                                            <p class="m-0">All Groups</p>
                                        </div>
                                    </a>
                                </li>
                                <li class="dropdown-item p-1">
                                    <a href="#" class="d-flex align-items-center justify-content-between text-decoration-none text-dark">
                                        <div class="d-flex align-items-center justify-content-evenly">
                                            <div class="p-2">
                                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/0gH3vbvr8Ee.png" alt="from fb" class="rounded-circle" id="avatar"/>
                                            </div>
                                            <div>
                                                <p class="m-0">Create Groups</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <hr class="m-0" />
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
                        <div class="d-none d-xxl-block h-100 fixed-top end-0 overflow-hidden scrollbar" id="d-none-end0">
                            <div class="p-3 mt-4">
                                <hr class="m-0" />
                                <div class="my-3 d-flex justify-content-between align-items-center">
                                    <p class="text-muted fs-5 m-0">Contacts</p>
                                </div>
                                <li class="dropdown-item rounded my-2 px-0" type="button" data-bs-toggle="modal" data-bs-target="#singleChat1">
                                    <div class="d-flex align-items-center mx-2 chat-avatar">
                                        <div class="position-relative">
                                            <img src="https://source.unsplash.com/random/4"  alt="avatar" class="rounded-circle me-2"id="avatar"/>
                                            <span class="position-absolute bottom-0 translate-middle border border-light rounded-circle bg-success p-1" >
                                                <span class="visually-hidden"></span>
                                            </span>
                                        </div>
                                        <p class="m-0">Nafi</p>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
