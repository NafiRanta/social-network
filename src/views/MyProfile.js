import React from 'react';
import Topnav from './Topnav'
import CreatePost from '../components/CreatePost'
import PostContainer from '../components/PostCard';
import AvatarSquare from '../components/AvatarSquare';
//import css
import './MyProfile.css'

function MyProfile(){
    return (
        <div>
            <Topnav />
            <div class="container-fluid">
                  <div class="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                        <div class="profile-cover__bg bg--img" data-overlay="0.3"></div>
                        <div class="panel profile-cover p-4">
                            <div class="profile-cover__img">
                                <img src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/240729290_10161438043602818_6927266341962394575_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GabteKWVtsMAX9bqdUW&_nc_ht=scontent-hel3-1.xx&oh=00_AfCNVOnNn3krN68kgWTzOcX8oiU89jECUlEMsV7PtTP_bA&oe=6472BDB2" alt="" />
                                <h3 class="h3"><strong>Nafisah Rantasalmi</strong></h3>
                            </div>
                            <div class="profile-cover__info">
                                <ul class="nav">
                                    <li><strong>33</strong>Followers</li>
                                    <li><strong>136</strong>Following</li>
                                </ul>
                                <div class="profile-cover__action">
                                    <button class="btn btn-primary btn-sm d-flex justify-content-center align-items-center ">
                                        <i class="fa fa-plus"> </i>
                                        <span> Follow</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="row justify-content-evenly">
                    <div class="col-12 col-lg-3">
                        <div class="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            <div class="bg-white rounded border shadow p-3">
                                <div>
                                    <p class="m-0">Followers</p>
                                </div>
                                <div class="follow-box-content p-1 m-0 d-flex">
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Gin</p>
                                        </div>
                                    </a>
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Ashley</p>
                                        </div>
                                    </a>
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Amanda</p>
                                        </div>
                                    </a>
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Noah</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="bg-white rounded border shadow p-3">
                                <div>
                                    <p class="m-0">Followers</p>
                                </div>
                                <div class="follow-box-content p-1 m-0 d-flex">
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark">
                                        <div class="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div class="fellows d-flex align-items-center">
                                            <p class="m-0">Jacob</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 pb-5">
                        <div class="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <CreatePost />
                            <PostContainer />
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
