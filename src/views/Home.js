import React from 'react';
import Topnav from './Topnav'
import CreatePost from '../components/CreatePost'
import ChatContainerSmall from '../components/ChatContainerSmall';
import PostCard from '../components/PostCard';
import Avatar from '../components/Avatar';
import Sidenav from './HomeSidenav'

function Home(){
    return (
        <div>
            <Topnav />
            <div class="container-fluid">
                <div class="row justify-content-evenly">
                    <div class="col-12 col-lg-3">
                        <Sidenav />
                    </div>
                    <div class="col-12 col-lg-6 pb-5">
                        <div class="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-createpost">
                            <CreatePost />
                            <PostCard />
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
