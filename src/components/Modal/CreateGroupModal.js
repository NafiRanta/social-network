import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Modal.css";
import Avatar from "../Avatar/Avatar";

function CreateGroupModal(props) {
  const userInfo = useSelector((state) => state.userInfo);
  const [myFriends, setMyFriends] = useState([]); // [{username: "John", displayname: "John Doe"}, {username: "Jane", displayname: "Jane Doe"}
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const names = myFriends.map((friend) => friend.displayname);

  useEffect(() => {
    const allusers = props.allusers;
    const filteredData = allusers.filter((user) => user.username !== userInfo.username);
    const updatedFriends = filteredData.map((friend) => ({
      username: friend.username,
      displayname: friend.firstname + " " + friend.lastname,
    }));
    setMyFriends(updatedFriends);
  }, [props.allusers, userInfo.username]);
  
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

  const handleGroupSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const groupName = document.getElementById("groupname").value;
    const groupDescription = document.getElementById("groupdescription").value;
   // get usernames of the selected names
    const selectedUserNames = [];
    selectedNames.forEach((name) => {
      const user = myFriends.find((friend) => friend.displayname === name);
      selectedUserNames.push(user.username);
    });

    const now = new Date();
    const groupData = {
      groupName: groupName,
      groupDescription: groupDescription,
      groupAdmin: userInfo.username,
      memberUsernames: selectedUserNames,
      createAt: now
    };

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
      const groupId = group.groupID;
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
                    <Avatar userDisplayname={props.userDisplayname} />
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
                        Add Friends (optional)
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
