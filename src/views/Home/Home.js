import React from 'react';
import Topnav from '../Topnav'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostCard from '../../components/Card/PostCard';
import Sidenav from './HomeSidenav'
import Avatar from '../../components/Avatar/Avatar';

function Home(props) {
    return (
        <div>
            <Topnav />
            <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <Sidenav />
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-createpost">
                            <CreatePost />
                            <PostCard />
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <div className="d-none d-xxl-block h-100 fixed-top end-0 overflow-hidden scrollbar" id="d-none-end0">
                            <div className="p-3 mt-4">
                                <hr className="m-0" />
                                <div className="my-3 d-flex justify-content-between align-items-center">
                                    <p className="text-muted fs-5 m-0">Contacts</p>
                                </div>
                                <li className="dropdown-item rounded my-2 px-0" type="button">
                                    <div className="d-flex align-items-center mx-2 chat-avatar">
                                        <div className="position-relative">
                                            <Avatar />  
                                            <span className="position-absolute bottom-0 translate-middle border border-light rounded-circle-sm bg-success p-1" >
                                                <span className="visually-hidden"></span>
                                            </span>
                                        </div>
                                        <p className="m-0">{props.username}</p>
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
