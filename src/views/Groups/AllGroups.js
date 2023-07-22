import React from 'react';
import GroupProfileCard from '../../components/Card/GroupProfileCard'
import GroupSidenav from './GroupSidenav'
import Topnav from '../../views/Topnav'
import './Groups.css'


function AllGroups(props){
    console.log("props", props)
    return (
        <div>
             <Topnav userDisplayname={props.userDisplayname} />
            <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <GroupSidenav userDisplayname={props.userDisplayname} />
                    </div>
                    <div className="col col-lg-9 pb-5 p-3">
                        <div className="d-flex flex-column justify-content-center w-100 " id="d-flex-postcontainer-allGroups">
                            <h5><strong>Discover all groups you can join</strong></h5>
                            <GroupProfileCard userDisplayname={props.userDisplayname} username={props.username} socket={props.socket} />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AllGroups;

