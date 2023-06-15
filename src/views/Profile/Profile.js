import React from 'react';
import Topnav from '../Topnav'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostContainer from '../../components/Card/PostCard';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import './Profile.css'

function Profile() {
    return (
        <div>
            <Topnav />
            <div className="container-fluid">
                  <div className="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                        <div className="profile-cover__bg bg--img" data-overlay="0.3"></div>
                        <div className="panel profile-cover p-4">
                            <div className="profile-cover__img">
                                <img src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/240729290_10161438043602818_6927266341962394575_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GabteKWVtsMAX9bqdUW&_nc_ht=scontent-hel3-1.xx&oh=00_AfCNVOnNn3krN68kgWTzOcX8oiU89jECUlEMsV7PtTP_bA&oe=6472BDB2" alt="" />
                                <h3 className="h3"><strong>Nafisah Rantasalmi</strong></h3>
                            </div>
                            <div className="profile-cover__info">
                                <ul className="nav">
                                    <li><strong>33</strong>Followers</li>
                                    <li><strong>136</strong>Following</li>
                                </ul>
                                <div className="profile-cover__action">
                                    <button className="btn btn-primary btn-sm d-flex justify-content-center align-items-center ">
                                        <i className="fa fa-plus"> </i>
                                        <span> Follow</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            <div className="bg-white rounded border shadow p-3">
                                <ul  >
                                    <li className="dropdown-item p-1 rounded">
                                        <div className="p-2">
                                            <p className="m-0"><strong>Intro</strong></p>
                                        </div>
                                        <div>
                                            <p className="m-0">Bio</p>
                                        </div>
                                    </li>
                                    <li className="dropdown-item p-1">
                                        <a href="#" className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"> Add bio</a>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-user"></i> <span className="name">Nickname</span></span>
                                    </li>
                                    <li className="my-2 p-1">
                                        <span><i className="fas fa-edit"></i> <span className="name">Email</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"></i> <span className="name">Birthday</span></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <p className="m-0">Followers</p>
                                </div>
                                <div className="follow-box-content p-1 m-0 d-flex">
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Gin</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Ashley</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Amanda</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Noah</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <p className="m-0">Following</p>
                                </div>
                                <div className="follow-box-content p-1 m-0 d-flex">
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <CreatePost />
                            <PostContainer />
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Profile;
