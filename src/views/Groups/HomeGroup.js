import React from 'react';
import Topnav from '../../views/Topnav'
import CreateGroupPost from '../../components/CreatePost/CreateGroupPost'
import GroupPostCard from '../../components/Card/GroupPostCard'
import GroupSidenav from '../Groups/GroupSidenav'

function HomeGroup() {
    return (
        <div>
            <Topnav />
            <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <GroupSidenav />
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-homeGroup">
                            <CreateGroupPost />
                            <GroupPostCard />
                        </div>
                    </div>
                    <div className="col-12 col-lg-3"></div>
                </div>
            </div>
        </div>
    )
}

export default HomeGroup;
