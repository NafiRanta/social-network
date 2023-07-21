import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Modal.css";
import Avatar from "../Avatar/Avatar";

function GroupInviteModal(props) {
  const userInfo = useSelector((state) => state.userInfo);
  const allGroups = useSelector((state) => state.allGroups);
  console.log("props.isGroupAdmin: ", props.isUserGroupAdmin)
  console.log("props.isGroupMember: ", props.isUserGroupMember)
  // find props.groupID from allGroups
  const group = allGroups.find((group) => group.GroupID === props.groupID);
  const groupAdmin = group.Admin;
  const MemberInvitedUsernames = group.MemberInvitedUsernames
  const AdminInvitedUsernames = group.AdminInvitedUsernames
  const MemberUsernames = group.MemberUsernames
  const [myFriends, setMyFriends] = useState([]); 
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const names = myFriends.map((friend) => friend.displayname);

  useEffect(() => {
    const allusers = props.allusers;
    let filteredData = allusers.filter((user) => user.UserName !== userInfo.UserName);
    filteredData = filteredData.filter((user) => user.UserName !== groupAdmin);
    filteredData = filteredData.filter((user) => !MemberInvitedUsernames.includes(user.UserName));
    filteredData = filteredData.filter((user) => !AdminInvitedUsernames.includes(user.UserName));
    filteredData = filteredData.filter((user) => !MemberUsernames.includes(user.UserName));
    const updatedFriends = filteredData.map((friend) => ({
      username: friend.UserName,
      displayname: friend.FirstName + " " + friend.LastName,
    }));
    setMyFriends(updatedFriends);
  }, [props.allusers, userInfo.UserName]);
  
  const handleNameChange = (event) => {
    // get username of the selected name
    setSelectedName(event.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    if (selectedName && !selectedNames.includes(selectedName)) {
      setSelectedNames([...selectedNames, selectedName]);
      setSelectedName('');
    }
  };

  const handleRemoveName = (name) => {
    const updatedNames = selectedNames.filter((n) => n !== name);
    setSelectedNames(updatedNames);
  };

  // Handle Invite Submit: handleInviteSubmit

  // const handleGroupSubmit = async (event) => {


  return (
    <div className="modal fade" id="groupInviteModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Invite Friends to Group</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="my-1 p-1">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <div className="p-2">
                    <Avatar userDisplayname={props.userDisplayname} />
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{props.userDisplayname}</p>
                  </div>
                </div>
                <div>
                    <div>
                      {selectedNames.map((name) => (
                        <div key={name} className="d-flex align-items-center">
                          <input type="text" className="form-control me-2" value={name} readOnly />
                          <button onClick={() => handleRemoveName(name)}>Remove</button>
                        </div>
                      ))}
                    </div>
                    <select value={selectedName} onChange={handleNameChange} className="form-select form-control my-3">
                      <option disabled value="">
                        Invite Friends
                      </option>
                      {names.filter((name) => !selectedNames.includes(name)).map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleAddName}>Add Name</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row w-100">
            <div className="col">
                <button 
                  type="button" 
                  className="btn btn-primary w-100"
                  //onClick={handleInviteSubmit}
                  >
                  Invite
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupInviteModal;
