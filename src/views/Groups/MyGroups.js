import React from 'react';
import GroupProfileCard from '../../components/Card/GroupProfileCard'
import GroupSidenav from './GroupSidenav'


function MyGroups(props) {
    return (
        <div className="container-fluid">
            <div className="row justify-content-evenly">
                <div className="col-12 col-lg-3">
                    <GroupSidenav username={props.username}/>
                </div>
                <div className="col col-lg-9 pb-5 p-3">
                    <div className="d-flex flex-column justify-content-center w-100 " id="d-flex-postcontainer-mygroups">
                        <h5><strong>All groups you've joined</strong></h5>
                        <GroupProfileCard username={props.username}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyGroups;
