import React, { useState } from 'react';
import "./Modal.css";
import Avatar from "../Avatar/Avatar";
import { create } from 'draft-js/lib/CharacterMetadata';

function CreateGroupModal(props) {
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  const names = ['John', 'Jane', 'Bob', 'Alice'];

  const handleNameChange = (event) => {
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

  const handleGroupSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const groupName = document.getElementById("groupname").value;
    const groupDescription = document.getElementById("groupdescription").value;
    const now = new Date();
    const groupData = {
      groupName: groupName,
      groupDescription: groupDescription,
      groupAdmin: props.userInfo.username,
      invitedFriends: selectedNames,
      createAt: now
    };
    console.log("groupData", groupData)

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');

    try {
      const response = await fetch("http://localhost:8080/creategroup", {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(groupData) // Stringify the entire object
      });
      if (!response.ok) {
        throw new Error('Error occurred while creating the group');
      }

      // fetch the group id
      const group = await response.json();
      console.log("group", group);
      const groupId = group.groupID;
      console.log("groupId", groupId);
      alert("Group created");
     window.location.href = `/singlegroup/${groupId}`;
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="modal fade" id="createGroupModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Create Group</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="my-1 p-1">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <div className="p-2">
                    <Avatar userDisplayname={props.userDisplayname} userInfo={props.userInfo}/>
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{props.userDisplayname}</p>
                  </div>
                </div>
                <div>
                  <form id="createGroupForm">
                    <input type="text" className="form-control my-3" id="groupname" placeholder="Group Name" />
                    <div>
                      <textarea cols="30" rows="5" className="form-control my-3 border" id="groupdescription" placeholder="Group Description"></textarea>
                    </div>
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
                        Invite Friends (optional)
                      </option>
                      {names.filter((name) => !selectedNames.includes(name)).map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleAddName}>Add Name</button>
                  </form>
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
                  onClick={handleGroupSubmit}
                  >
                  Create
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

export default CreateGroupModal;
