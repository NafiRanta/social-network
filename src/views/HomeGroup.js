import React from 'react';
import Topnav from './Topnav'
import CreateGroupPost from '../components/CreateGroupPost'
import GroupPostCard from '../components/GroupPostCard';
import GroupSidenav from './GroupSidenav'

function HomeGroup(){
    return (
        <div>
            <Topnav />
            <div class="container-fluid">
                <div class="row justify-content-evenly">
                    <div class="col-12 col-lg-3">
                        <GroupSidenav />
                    </div>
                    <div class="col-12 col-lg-6 pb-5">
                        <div class="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-createpost">
                            <CreateGroupPost />
                            <GroupPostCard />
                        </div>
                    </div>
                    <div class="col-12 col-lg-3"></div>
                </div>
            </div>
        </div>
    )
}

export default HomeGroup;
