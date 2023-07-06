import React from 'react';
import CreateGroupPostModal from '../Modal/CreateGroupPostModal';
import Avatar from '../Avatar/Avatar';

function CreateGroupPost(props) {
  console.log("props in create group post", props)
    return(
      <div className="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
          <div className="d-flex" type="button">
              <div className="p-1">
              <Avatar userDisplayname={props.userDisplayname} userInfo={props.userInfo}/>
              </div>
              <input 
                type="text" 
                className="form-control rounded-pill border-0 bg-gray pointer" 
                disabled 
                placeholder={`Post to a group, ${props.userDisplayname}`} 
                data-bs-toggle="modal" 
                data-bs-target="#createGroupPostModal"/>
          </div>
          <CreateGroupPostModal userDisplayname={props.userDisplayname} userInfo={props.userInfo} allusers={props.allusers} />
          <hr />
          <div className="d-flex flex-column flex-lg-row mt-3">
            <div className="dropdown-item rounded d-flex align-items-center justify-content-center" type="button">
              <i className="fas fa-photo-video me-2 text-success"></i>
              <p className="m-0 text-muted">Photo/Video</p>
            </div>
          </div>
      </div>
  )
}

export default CreateGroupPost;