import React from 'react';
import Topnav from '../Topnav'
import CreatePost from '../../components/CreatePost/CreatePost'
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import GroupPostCard from '../../components/Card/GroupPostCard';
import '../../views/Profile/Profile.css'
import '../../components/Card/Card.css'

function SingleGroupNonMember(props) {
    return (
        <div>
            <Topnav userDisplayname={props.userDisplayname} allusers={props.allusers}/>
            <div className="container-fluid">
                  <div className="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                        <div className="profile-cover-group__bg bg--img" data-overlay="0.3"></div>
                        <div className="panel-group profile-cover p-4">
                            <div className="profile-cover__info">
                                <h2><strong>Ålands köp och sälj</strong></h2>
                                <div className="profile-cover__action">
                                    <button className="btn btn-primary btn-sm d-flex justify-content-center align-items-center ">
                                        <i className="fa fa-plus"> </i>
                                        <span> Join</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <div className="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                                <p className="m-0">About this group</p>
                                <hr />
                                <p>Environmentally friendly, social, completely simple.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleGroupNonMember;
