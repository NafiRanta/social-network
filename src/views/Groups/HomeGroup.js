import React from 'react';
import CreateGroupPost from '../../components/CreatePost/CreateGroupPost'
import GroupPostCard from '../../components/Card/GroupPostCard'
import GroupSidenav from '../../views/Groups/GroupSidenav'

function HomeGroup(props) {
    return (
        <div className="container-fluid">
            <div className="row justify-content-evenly">
                <div className="col-12 col-lg-3">
                    <GroupSidenav username={props.username} />
                </div>
                <div className="col-12 col-lg-6 pb-5 p-3">
                    <div className="d-flex flex-column justify-content-center w-100" id="d-flex-postcontainer-homeGroup">
                    <h5><strong>Your Feed</strong></h5>
                        <CreateGroupPost username={props.username} />
                        <GroupPostCard />
                    </div>
                </div>
                <div className="col-12 col-lg-3"></div>
            </div>
        </div>
      
    )
}

export default HomeGroup;
