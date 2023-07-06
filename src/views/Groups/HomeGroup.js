import React from 'react';
import CreateGroupPost from '../../components/CreatePost/CreateGroupPost'
import GroupPostCard from '../../components/Card/GroupPostCard'
import GroupSidenav from '../../views/Groups/GroupSidenav'
import Topnav from '../../views/Topnav'

function HomeGroup(props) {
    return (
        <div>
            <Topnav userDisplayname={props.userDisplayname} userInfo={props.userInfo} allusers={props.allusers}/>
            <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <GroupSidenav userDisplayname={props.userDisplayname} userInfo={props.userInfo} allusers={props.allusers} />
                    </div>
                    <div className="col-12 col-lg-6 pb-5 p-3">
                        <div className="d-flex flex-column justify-content-center w-100" id="d-flex-postcontainer-homeGroup">
                        <h5><strong>Your Feed</strong></h5>
                            <CreateGroupPost userDisplayname={props.userDisplayname} userInfo={props.userInfo} allusers={props.allusers}  />
                            <GroupPostCard userDisplayname={props.userDisplayname} userInfo={props.userInfo} allusers={props.allusers}  />
                        </div>
                    </div>
                    <div className="col-12 col-lg-3"></div>
                </div>
            </div>
        </div>
    )
}

export default HomeGroup;
