import React from 'react';
import GroupProfileCard from '../../components/Card/GroupProfileCard'
import GroupSidenav from './GroupSidenav'
import Topnav from '../../views/Topnav'


function MyGroups(props) {
    return (
        <div>
             <Topnav userDisplayname={props.userDisplayname} userInfo={props.userInfo} allusers={props.allusers}/>
            <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <GroupSidenav userDisplayname={props.userDisplayname} myGroups={props.myGroups} allgroups={props.allgroups}/>
                    </div>
                    <div className="col col-lg-9 pb-5 p-3">
                        <div className="d-flex flex-column justify-content-center w-100 " id="d-flex-postcontainer-mygroups">
                            <h5><strong>All groups you've joined</strong></h5>
                            <GroupProfileCard userDisplayname={props.userDisplayname} username={props.username} userInfo={props.userInfo} myGroups={props.myGroups} allgroups={props.allgroups}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyGroups;
