import React from 'react';
import CreatePost from '../../components/CreatePost/CreatePost'
import PostCard from '../../components/Card/PostCard';
import Avatar from '../../components/Avatar/Avatar';
import './Home.css'

function Home(props) {
    return (
        <div className="container-fluid">
            <div className="row justify-content-evenly">
                <div className="col-12 col-lg-6 pb-5">
                    <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                        <CreatePost />
                        <PostCard />
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox"> 
                        <div className="bg-white rounded border shadow p-3">
                            <div>
                                <div className="my-3 d-flex justify-content-between align-items-center">
                                    <p>{props.username}</p>
                                    <p className="text-muted fs-5 m-0">Contacts/Following</p>
                                </div>
                                <li className="dropdown-item rounded my-2 px-0" type="button">
                                    <div className="d-flex align-items-center mx-2 chat-avatar">
                                        <div className="position-relative">
                                            <Avatar />  
                                            <span className="position-absolute bottom-0 translate-middle border border-light rounded-circle-sm bg-success p-1" >
                                                <span className="visually-hidden"></span>
                                            </span>
                                        </div>
                                        <p className="m-0">Jacob P</p>
                                    </div>
                                </li>
                                <li className="dropdown-item rounded my-2 px-0" type="button">
                                    <div className="d-flex align-items-center mx-2 chat-avatar">
                                        <div className="position-relative">
                                            <Avatar />  
                                            <span className="position-absolute bottom-0 translate-middle border border-light rounded-circle-sm bg-success p-1" >
                                                <span className="visually-hidden"></span>
                                            </span>
                                        </div>
                                        <p className="m-0">Ashley Hwa</p>
                                    </div>
                                </li>
                                <li className="dropdown-item rounded my-2 px-0" type="button">
                                    <div className="d-flex align-items-center mx-2 chat-avatar">
                                        <div className="position-relative">
                                            <Avatar />  
                                            <span className="position-absolute bottom-0 translate-middle border border-light rounded-circle-sm bg-success p-1" >
                                                <span className="visually-hidden"></span>
                                            </span>
                                        </div>
                                        <p className="m-0">Gin Thy</p>
                                    </div>
                                </li>
                                <li className="dropdown-item rounded my-2 px-0" type="button">
                                    <div className="d-flex align-items-center mx-2 chat-avatar">
                                        <div className="position-relative">
                                            <Avatar />  
                                            <span className="position-absolute bottom-0 translate-middle border border-light rounded-circle-sm bg-success p-1" >
                                                <span className="visually-hidden"></span>
                                            </span>
                                        </div>
                                        <p className="m-0">Noah R</p>
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
