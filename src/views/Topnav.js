import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../components/Avatar/Avatar';
import CreatePostModal from '../components/Modal/CreatePostModal';
import SearchbarGlobal from '../components/Searchbar/SearchbarGlobal';
import CreateGroupModal from '../components/Modal/CreateGroupModal';
import './TopNav.css'

function Topnav(props) {
  const dispatch = useDispatch();
  const chatNotification = useSelector((state) => state.chatNotification);
  const allusers = useSelector((state) => state.allUsers);
  const userInfo = useSelector((state) => state.userInfo);
  const allGroups = useSelector((state) => state.allGroups);
  const [groupInvitesByAdmin, setGroupInvitesByAdmin] = useState([]);
  const [groupInvitesByMember, setGroupInvitesByMember] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [isInvitedByMember, setIsInvitedByMember] = useState(false);
  const [isInvitedByAdmin, setIsInvitedByAdmin] = useState(false);
  const [newEventNotifications, setNewEventNotification] = useState(false);
  const [followRequests, setFollowRequests] = useState(false);
  let Notifications = []

  useEffect(() => {
    // for allUsers compare if userInfo.UserName is in FollowerUsernamesReceived and add followNotification
    if (Array.isArray(allusers) && userInfo.UserName) {
      const filteredAllUsers = allusers.filter((user) => {
        return userInfo.FollowerUsernamesReceived.includes(user.UserName);
      });
      if (filteredAllUsers.length > 0) {
        const updatedFollowNotifications = filteredAllUsers.map((user) => {
          const userAvatar = user.Avatar;
          const userDisplayname = user.FirstName + " " + user.LastName;
          const username = user.UserName;
          return {
            type: "SET_FOLLOWNOTIFICATION",
            requestorAvatar: userAvatar,
            requestorDisplayname: userDisplayname,
            requestorUsername: username,
          };
        });
        dispatch({ type: "SET_NOTIFICATION", payload: true });
        setFollowRequests(updatedFollowNotifications);
        console.log("updatedFollowNotifications", updatedFollowNotifications)
      }
    }
  }, [userInfo]);


  useEffect(() => {
    // for Join Requests
    if(Array.isArray(allGroups) && Array.isArray(allusers)) {
      const filteredGroups = allGroups?.filter((group) => {
        return group.AdminID === userInfo.UserName && group.RequestUsernames !== "[]";
      });
      if (filteredGroups.length > 0 ) {
        const updatedJoinRequests = filteredGroups.map((group) => {
          const requestUsernames = JSON.parse(group.RequestUsernames);
          const requestorInfo = allusers.find((user) => user.UserName === requestUsernames[0]); 
          const requestorAvatar = requestorInfo?.Avatar;
          const requestorUsername = requestorInfo?.UserName;
          const requestorDisplayname = requestorInfo?.FirstName + " " + requestorInfo?.LastName;
    
          return {
            type: "SET_JOINREQUESTS",
            requestorAvatar: requestorAvatar,
            requestorDisplayname: requestorDisplayname,
            requestorUsername: requestorUsername,
            groupName: group.GroupName,
            groupID: group.GroupID,
          };
        });
        setJoinRequests(updatedJoinRequests);
      }
    }
  }, [allGroups, allusers, userInfo]);

  useEffect(() => {
    // for Invites by Admin
    if (Array.isArray(allGroups) ) {
      const filteredAllGroups = allGroups.map((group) => {
        if (group.AdminInvitedUsernames.includes(userInfo.UserName)) {
          const adminInfo = allusers?.find((user) => user.UserName === group.AdminID);
          const adminAvatar = adminInfo?.Avatar;
          const adminDisplayname = adminInfo?.FirstName + " " + adminInfo?.LastName;
          setIsInvitedByAdmin(true)
          return {
            type: "SET_INVITESBYADMIN",
            adminAvatar: adminAvatar,
            adminDisplayname: adminDisplayname,
            groupName: group.GroupName,
            groupID: group.GroupID,
          };
        }
        return null

      });
      setGroupInvitesByAdmin(filteredAllGroups);
    }
  }, [allusers, userInfo, allGroups]);

  useEffect(() => {
    // for Invites by Member
    let filteredGroups = []
      if (Array.isArray(allGroups)) {
         allGroups.map((group) => {
            const memberInvitedUsernames = JSON.parse(group.MemberInvitedUsernames);
            if (memberInvitedUsernames.length > 0 && memberInvitedUsernames[0].InvitedUsernames.includes(userInfo.UserName)){
              setIsInvitedByMember(true)
              const memberInvites = {
                groupID: group.GroupID,
                groupName: group.GroupName,
                memberInvites: memberInvitedUsernames,
                adminInvites: group.AdminInvitedUsernames,
              };
              filteredGroups.push(memberInvites)
            }
          
          return null; 
        });
        let matchedGroups = []
        if (Array.isArray(filteredGroups) && filteredGroups.length > 0) {
          filteredGroups.forEach((group) => {
            const memberWhoInvitedInfo = allusers?.find((user) => user.UserName === group.memberInvites[0].Member);
            const memberWhoInvitedAvatar = memberWhoInvitedInfo?.Avatar;
            const memberWhoInvitedDisplayName = memberWhoInvitedInfo?.FirstName + " " + memberWhoInvitedInfo?.LastName;
            matchedGroups.push({
              type: "SET_INVITESBYMEMBER",
              memberWhoInvitedAvatar: memberWhoInvitedAvatar,
              memberWhoInvitedDisplayName: memberWhoInvitedDisplayName,
              groupName: group.groupName,
              groupID: group.groupID,
            });
          });
          setGroupInvitesByMember(matchedGroups);
      }
    } 
  }, [allGroups, allusers, userInfo]);
  

useEffect(() => {
  // fetch all events and check if userinfo.username is a member in the group and neither in going nor notgoing
  const fetchAllEventNotifications = async () => {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch("http://localhost:8080/geteventnotificatoins", {
        method: "POST",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch all events.");
      }
      const data = await response.json();
      if (data.groupIDEventNotifications) {
        const updatedEventNotifications = data.groupIDEventNotifications.map((groupID) => {
          const groupInfo = allGroups.find((group) => group.GroupID === groupID);
          // const groupAvatar = groupInfo?.GroupAvatar;
          const groupName = groupInfo?.GroupName;
          return {
            type: "SET_NEWEVENTNOTIFICATIONS",
            // groupAvatar: groupAvatar,
            groupName: groupName,
            groupID: groupID,
          };
        });
        setNewEventNotification(updatedEventNotifications);
      }

    } catch (error) {
      console.error("Error fetching all events:", error);
    }
  };
  fetchAllEventNotifications();
}, [allGroups]);

  Notifications = [
    ...newEventNotifications || [],
    ...groupInvitesByAdmin || [],
    ...groupInvitesByMember || [],
    ...followRequests || [],
    ...joinRequests || [],
  ]

  //handle logout
  const handleLogout = () => {
    // clear redux and user info and token from local storage and session storage
    localStorage.removeItem("reduxState");
    sessionStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    // clear all cookies for this site
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost";
    }
      window.location.href = "/login";
  };

  const handleAcceptJoinRequest = async (groupID, requestorUsername) => {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");
    const requestBody = {
      groupID: groupID,
      userName: requestorUsername,
    };
    // send ws notification to requestor to props.socket
    const notification = {
      type: "notification",
      payload: {
        receiverUsername: requestorUsername,
        sender: userInfo.UserName,
      },
    };
    if (props.socket) {
      props.socket.send(JSON.stringify(notification));
    }
    try {
      const response = await fetch("http://localhost:8080/acceptjoinrequest", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to accept the join request.");
      }
      const data = await response.json();
      const allGroups = data.allGroups;
      dispatch({ type: "SET_ALLGROUPS", allGroups: allGroups });
      // remove the join request from the join requests array
      const updatedJoinRequests = joinRequests.filter((joinRequest) => {
        return joinRequest.requestorUsername !== requestorUsername;
      });
      setJoinRequests(updatedJoinRequests);
      
      console.log("join request accepted");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error accepting the join request:", error);
    }
  };

  const handleDeclineJoinRequest = async (groupID, requestorUsername) => {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");
    const requestBody = {
      groupID: groupID,
      userName: requestorUsername,
    };
     // send ws notification to requestor to props.socket
     const notification = {
      type: "notification",
      payload: {
        receiverUsername: requestorUsername,
        sender: userInfo.UserName,
      },
    };
    if (props.socket) {
      props.socket.send(JSON.stringify(notification));
    }
    try {
      const response = await fetch("http://localhost:8080/declinejoinrequest", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to decline the join request.");
      }
      const data = await response.json();
      dispatch({ type: "SET_ALLGROUPS", allGroups: data.allGroups });
      // remove the join request from the join requests array
      const updatedJoinRequests = joinRequests.filter((joinRequest) => {
        return joinRequest.requestorUsername !== requestorUsername;
      });
      setJoinRequests(updatedJoinRequests);
      console.log("join request declined");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error declining the join request:", error);
    }
  };
    // rm empty elements from Notifications array
    Notifications = Notifications.filter((notification) => {
      return notification !== null;
    });

  return (
    <div className="bg-white d-flex align-items-center fixed-top shadow" >
      <div className="container-fluid" id="topNavBox">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center" type="button" id="homeMenu"> 
                <Link to="/" className="text-decoration-none text-dark">
                  <i className="fab fa-facebook text-primary" id="isthislogo"></i>
                </Link>                
                <SearchbarGlobal allusers={props.allusers} />
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            <div className="mx-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="mainMenu"
                  className="rounded-circle bg-gray border-0"
                >
                  <i className="fas fa-plus"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu border-0 shadow p-3 overflow-auto"
                  aria-labelledby="mainMenu"
                >
                  <div>
                    <div>
                      <Dropdown.Item as="li" className="p-1 mx-2">
                        <h5>Create</h5>
                      </Dropdown.Item>
                      <Dropdown.Item as="li" className="my-2 p-1">
                        <div 
                          type="button" 
                          className="text-decoration-none text-dark d-flex align-items-center"  
                          data-bs-toggle="modal" 
                          data-bs-target="#createPostModal"
                        >
                          <div className="rounded-circle bg-gray p-1 d-flex align-items-center justify-content-center me-3">
                            <i className="fas fa-edit"></i>
                          </div>
                          <div>
                            <p className="m-0">Post</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item as="li" className="my-2 p-1">
                      <div 
                          type="button" 
                          className="text-decoration-none text-dark d-flex align-items-center"  
                          data-bs-toggle="modal" 
                          data-bs-target="#createGroupModal" 
                        >
                          <div className="rounded-circle bg-gray p-1 d-flex align-items-center justify-content-center me-3">
                            <i className="fas fa-users"></i>
                          </div>
                          <div>
                            <p className="m-0">Group</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" type="button" id="groupMenu">
              <Link to="/groups" className="text-decoration-none text-dark">
                <i className="fas fa-users"></i>
              </Link>
            </div>
            {/* set to bg-gray by default and to bg-red if chatNotification*/}
            <div className={`rounded-circle p-1 ${chatNotification ? "bg-red" : "bg-gray"} d-flex align-items-center justify-content-center mx-2`} type="button" id="chatMenu">              
              <Link to="/chat" className="text-decoration-none text-dark">
                <i className="fas fa-comment"></i>
              </Link>
            </div>
            <div className="mx-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="notMenu"
                  className={`rounded-circle ${Notifications.length > 0 ? "bg-red" : "bg-gray"} border-0`}
                  onMouseDown={() => dispatch({ type: "SET_NOTIFICATION", payload: false }) }
                  >
                  <i className="fas fa-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu border-0 shadow p-3"
                  aria-labelledby="notMenu"
                >
                <Dropdown.Item as="li" className="p-1">
                  <div className="d-flex justify-content-between">
                    <h2>Notifications</h2>
                    </div>
                </Dropdown.Item>
                <div className="overflow-auto" style={{ maxHeight: "300px" }}>
                  {Notifications.map((notification) => {// Add parentheses here to return JSX
                  if (!notification) {
                    return null; 
                  } else if (notification.type === "SET_FOLLOWNOTIFICATION") {
                    return (
                      <div key={notification.type}>
                        <Dropdown.Item as="li" className="my-2 p-1">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center"> 
                              <div className="rounded-circle d-flex align-items-center justify-content-center mx-2" id="avatar">
                                <img src={notification.requestorAvatar} alt="avatar" className="rounded-circle me-2" />
                              </div>
                              <div>
                                <p className="m-0">{notification.requestorDisplayname} wants to follow you</p>
                              </div>
                            </div>
                            <div>
                              <Link
                                to={`/othersprofile/${notification.requestorUsername}`}
                                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    );
                  } else if (notification.type === "SET_INVITESBYADMIN" && isInvitedByAdmin) {
                    return (
                      <div key={notification.groupID}>
                        <Dropdown.Item as="li" className="my-2 p-1">
                          <div className="d-flex justify-content-between"> 
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle d-flex align-items-center justify-content-center mx-2" id="avatar">
                                <img src={notification.adminAvatar} alt="avatar" className="rounded-circle me-2" />
                              </div>
                              <div>
                                <p className="m-0">{notification.adminDisplayname} invited you to join {notification.groupName}</p>
                              </div>
                            </div>
                            <div>
                              <Link
                                to={`/singlegroup/${notification.groupID}`}
                                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center" 
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    );
                  } else if (notification.type === "SET_INVITESBYMEMBER" && isInvitedByMember) {
                    return (
                      <div key={notification.groupID}>
                        <Dropdown.Item as="li" className="my-2 p-1">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle d-flex align-items-center justify-content-center mx-2" id="avatar">
                                <img src={notification.memberWhoInvitedAvatar} alt="avatar" className="rounded-circle me-2" />
                              </div>
                            <div>
                              <p className="m-0">{notification.memberWhoInvitedDisplayName} invited you to join {notification.groupName}</p>
                            </div>
                          </div>
                          <div>
                            <Link
                              to={`/singlegroup/${notification.groupID}`}
                              className="btn btn-primary btn-sm d-flex justify-content-center align-items-center" 
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </Dropdown.Item>
                    </div>
                    );
                  } else if (notification.type === "SET_JOINREQUESTS"){
                    return (
                      <div key={notification.groupID}>
                        <Dropdown.Item as="li" className="my-2 p-1">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle d-flex align-items-center justify-content-center mx-2" id="avatar">
                                <img src={notification.requestorAvatar} alt="avatar" className="rounded-circle me-2" />
                              </div>
                              <div>
                                <p className="m-0">
                                  {notification.requestorDisplayname} wants to join {notification.groupName}
                                </p>
                              </div>
                            </div>
                            <div>
                              <button
                                className="btn btn-success btn-sm mx-1"
                                onClick={() => handleAcceptJoinRequest(notification.groupID, notification.requestorUsername)}
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-danger btn-sm mx-1"
                                onClick={() => handleDeclineJoinRequest(notification.groupID, notification.requestorUsername)}
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    );
                  } else if (notification.type === "SET_NEWEVENTNOTIFICATIONS") {
                    return (
                      <div key={notification.groupID}>
                        <Dropdown.Item as="li" className="my-2 p-1">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="m-0">New event in {notification.groupName}</p>
                              </div>
                            </div>
                            <div>
                              <Link
                                to={`/singlegroup/${notification.groupID}`}
                                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center" 
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    );
                  } else if (notification.type === "SET_FOLLOWNOTIFICATION") {
                    return (
                      // show follow notification, with avatar, displayname and username of the requestor + "wants to follow you" + button to view profile
                      <div key={notification.type}>
                        <Dropdown.Item as="li" className="my-2 p-1">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle d-flex align-items-center justify-content-center mx-2" id="avatar">
                                <img src={notification.requestorAvatar} alt="avatar" className="rounded-circle me-2" />
                              </div>
                              <div>
                                <p className="m-0">{notification.requestorDisplayname} wants to follow you</p>
                              </div>
                            </div>
                            <div>
                              <Link

                                to={`/othersprofile/${notification.requestorUsername}`}
                                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    );

                  } else {
                    return null;
                  }
                })}
                </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="mx-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="secondMenu"
                  className="bg-transparent border-0"
                >
                  <Avatar userDisplayname={props.userDisplayname} />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-menu border-0 shadow p-3"
                  aria-labelledby="secondMenu"
                >
                  <Dropdown.Item as="li" className="my-2 p-1">
                    <Link to={`/profile/${userInfo.UserName}`} className="text-decoration-none text-dark d-flex align-items-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center mx-2" id="avatar">
                        <Avatar username={props.userDisplayname} />
                      </div>
                      <p className="m-0">{props.userDisplayname}</p>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="li" className="my-2 p-1">
                    <button className="p-1 bg-gray d-flex align-items-center justify-content-center mx-2" onClick={handleLogout}>
                      <p className="m-0">Log Out</p>
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <CreatePostModal userDisplayname={props.userDisplayname}/>
      <CreateGroupModal userDisplayname={props.userDisplayname} allusers={props.allusers} socket={props.socket}/>
    </div>
  );
}

export default Topnav;

