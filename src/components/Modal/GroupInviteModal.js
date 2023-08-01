import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Modal.css";
import Avatar from "../Avatar/Avatar";
import { useDispatch } from 'react-redux';
import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';

function GroupInviteModal(props) {
  const dispatch = useDispatch();
  // define websocket connection from redux store websocket
  const websocket = useSelector((state) => state.websocket);
  const userInfo = useSelector((state) => state.userInfo);
  const allGroups = useSelector((state) => state.allGroups);
  const allusers = useSelector((state) => state.allUsers);
  const groupID = props.groupID;
  const [group, setGroup] = useState([]);
  // get group info with props.groupID from allGroups
 
  const [myFriends, setMyFriends] = useState([]); 
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const names = myFriends.map((friend) => friend.displayname);
  const [groupAdmin, setGroupAdmin] = useState('');
  const [MemberInvitedUsernames, setMemberInvitedUsernames] = useState([]);
  const [AdminInvitedUsernames, setAdminInvitedUsernames] = useState([]);
  const [MemberUsernames, setMemberUsernames] = useState([]);
  const [groupData, setGroupData] = useState({});
  const [url, setUrl] = useState('');


  useEffect(() => {
    if (allGroups === undefined  || allGroups.length === 0) {
      const fetchSingleGroup = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getsinglegroup?groupID=${groupID}`, {
                method: "GET",});
            const data = await response.json();
            const group = data.group[0];
            console.log('group in fetch', group);
            setGroup(group);

            const membersUsernames = group.MemberUsernames;
            console.log('membersUsernames in xxx', membersUsernames);
            setMemberUsernames(MemberUsernames);

            const groupAdmin = group.AdminID;
            setGroupAdmin(groupAdmin);

            const MemberInvitedUsernames = group.MemberInvitedUsernames;
            setMemberInvitedUsernames(MemberInvitedUsernames);
             
            console.log('MemberInvitedUsernames in xxx', MemberInvitedUsernames);

            const AdminInvitedUsernames = group.AdminInvitedUsernames;
            console.log('AdminInvitedUsernames in xxx', AdminInvitedUsernames);
            setAdminInvitedUsernames(AdminInvitedUsernames);
        }
        catch (error) {
            console.error('Error fetching group data:', error);
          }
        
    };
    fetchSingleGroup();
    } else {
        const group = allGroups?.find((group) => group.GroupID === props.groupID);
        const groupAdmin = group?.AdminID;
          setGroupAdmin(groupAdmin);
          const MemberInvitedUsernames = (group?.MemberInvitedUsernames)
          console.log("MemberInvitedUsernames groupinvitemodal", MemberInvitedUsernames);

          setMemberInvitedUsernames(MemberInvitedUsernames);
          const AdminInvitedUsernames = (group?.AdminInvitedUsernames)
          console.log("AdminInvitedUsernames groupinvitemodal", AdminInvitedUsernames);
          setAdminInvitedUsernames(AdminInvitedUsernames);
          const MemberUsernames = (group?.MemberUsernames)
          console.log("MemberUsernames groupinvitemodal", MemberUsernames);
          setMemberUsernames(MemberUsernames);  
    }
  }, [allGroups, props.groupID]);


 useEffect(() => {
    let filteredData = allusers?.filter((user) => user.UserName !== userInfo.UserName);
    filteredData = filteredData.filter((user) => user.UserName !== groupAdmin);
    filteredData = filteredData.filter((user) => !MemberInvitedUsernames.includes(user.UserName));
    filteredData = filteredData.filter((user) => !AdminInvitedUsernames.includes(user.UserName));
    filteredData = filteredData.filter((user) => !MemberUsernames.includes(user.UserName));
    const updatedFriends = filteredData.map((friend) => ({
      username: friend.UserName,
      displayname: friend.FirstName + " " + friend.LastName,
    }));
    setMyFriends(updatedFriends);
  }, [allusers, userInfo.UserName]); 
  
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
  const handleInviteSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    const groupID = props.groupID;
    const isGroupAdmin = props.isGroupAdmin;
    const isGroupMember = props.isGroupMember;
    const selectedUserNames = [];
    console.log("isMember", isGroupMember);
    console.log("isAdmin", isGroupAdmin);
    let url = '';
    let groupData = {};
    selectedNames.forEach((name) => {
      const user = myFriends.find((friend) => friend.displayname === name);
      selectedUserNames.push(user.username);
    });
    if (isGroupMember){
       url = "http://localhost:8080/invitesbymember?groupID=" + groupID;
       setUrl(url);
        groupData = {
        groupID: groupID,
        memberInvitedUsernames: selectedUserNames,
        memberUsername : userInfo.UserName,
      };
      setGroupData(groupData);
    } else if (isGroupAdmin){
        url = "http://localhost:8080/invitesbyadmin?groupID=" + groupID;
        setUrl(url);
       groupData = {
        groupID: groupID,
        adminInvitedUsernames: selectedUserNames,
        adminUsername : userInfo.UserName,
      };
      setGroupData(groupData);
    }
    
    console.log("groupData", groupData);
    // loop through selectedUserNames and send notification to each user through ws
    if (selectedUserNames) {
      selectedUserNames.forEach((username) => {
        const notification = {
          type : "notification",
          payload : {
            senderUsername : userInfo.UserName,
            receiverUsername : username,
          }
        }
        if (props.socket) {
          console.log("sending notification through ws: ", props.socket, notification)
          props.socket.send(JSON.stringify(notification));
        }
      });
    }
    console.log("url in handleInviteSubmit", url)
  try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(groupData)
      });
      const data = await response.json();
      console.log("data: ", data)
      const status = response.status;
      if (isGroupMember){
      dispatch({ type: "SET_INVITESBYMEMBER", payload: data.invitesByMemberResponse });
      dispatch({ type: "SET_ALLGROUPS", payload: data.allGroups });
    } else if (isGroupAdmin){
      dispatch({ type: "SET_ALLGROUPS", payload: data.allGroups });
      }
      if ( status === 200) {
        alert("Invite Sent!");
        window.location.href = `/singlegroup/${groupID}`;
      } else {
        alert("Invite Failed!");
      }
    } catch (error) {
      console.log(error);
    }  
  }

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
                  onClick={handleInviteSubmit}
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
