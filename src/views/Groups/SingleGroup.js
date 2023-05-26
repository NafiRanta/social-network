import React from 'react';
import Topnav from '../Topnav'
import CreatePost from '../../components/CreatePost/CreatePost'
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import GroupPostCard from '../../components/Card/GroupPostCard';
import '../../views/Profile/Profile.css'
import '../../components/Card/Card.css'

function SingleGroup(){
    return (
        <div>
            <Topnav />
            <div class="container-fluid">
                  <div class="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                        <div class="profile-cover-group__bg bg--img" data-overlay="0.3"></div>
                        <div class="panel-group profile-cover p-4">
                            <div class="profile-cover__info">
                                <h2><strong>Ålands köp och sälj</strong></h2>
                                <p class="card-text">Environmentally friendly, social, completely simple.</p>
                                <div class="profile-cover__action">
                                    <button class="btn btn-primary btn-sm d-flex justify-content-center align-items-center ">
                                        <i class="fa fa-plus"> </i>
                                        <span> Leave</span>
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
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 pb-5">
                        <div class="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <CreatePost />
                            <GroupPostCard />
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default SingleGroup;
