import React from 'react';
import Topnav from '../../views/Topnav'
import GroupProfileCard from '../../components/Card/GroupProfileCard'
import GroupSidenav from './GroupSidenav'


function GroupsList(){
    return (
        <div>
            <Topnav />
            <div class="container-fluid">
                <div class="row justify-content-evenly">
                    <div class="col-12 col-lg-3">
                        <GroupSidenav />
                    </div>
                    <div class="col col-lg-9 pb-5 p-3">
                        <div class="d-flex flex-column justify-content-center w-100 " id="d-flex-postcontainer-mygroups">
                            <h5><strong>All groups you've joined hello</strong></h5>
                            <GroupProfileCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupsList;