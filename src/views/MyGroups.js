import React from 'react';
import Topnav from './Topnav'
import CreateGroupPost from '../components/CreateGroupPost'
import GroupCard from '../components/GroupCard';
import GroupSidenav from './GroupSidenav'


function MyGroups(){
    return (
        <div>
            <Topnav />
            <div class="container-fluid">
                <div class="row justify-content-evenly">
                    <div class="col-12 col-lg-3">
                        <GroupSidenav />
                    </div>
                    <div class="col-12 col-lg-9 pb-5 p-3">
                        <div class="d-flex flex-column justify-content-center w-100 " id="d-flex-postcontainer-createpost">
                            <h5><strong>All groups you've joined</strong></h5>
                            <GroupCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyGroups;

