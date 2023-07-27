import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../components/Avatar/Avatar';
import CreatePostModal from '../components/Modal/CreatePostModal';
import SearchbarGlobal from '../components/Searchbar/SearchbarGlobal';
import CreateGroupModal from '../components/Modal/CreateGroupModal';
import './TopNav.css'

function Topnav(props) {
  const dispatch = useDispatch();
  const chatNotification = useSelector((state) => state.chatNotification);
  const notification = useSelector((state) => state.notification);
  const location = useLocation();
  const navigate = useNavigate();
  const allusers = useSelector((state) => state.allUsers);
  const userInfo = useSelector((state) => state.userInfo);
  const allGroups = useSelector((state) => state.allGroups);
  const myGroups = useSelector((state) => state.myGroups);
  const invitesbyadmin = useSelector((state) => state.invitesByAdmin);
  const invitesbymember = useSelector((state) => state.invitesByMember);
  const followRequestsUsernames = userInfo.FollowerUsernamesReceived ? userInfo.FollowerUsernamesReceived.split(",") : [];
  const [groupInvitesByAdmin, setGroupInvitesByAdmin] = useState([]);
  const [groupInvitesByMember, setGroupInvitesByMember] = useState([]);
  const [followRequestsInfo, setFollowRequestsInfo] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [isInvitedByMember, setIsInvitedByMember] = useState(false);
  const [isInvitedByAdmin, setIsInvitedByAdmin] = useState(false);
  let Notifications = []

  useEffect(() => {
    // for Join Requests
    if(Array.isArray(myGroups) && Array.isArray(allusers)) {
      const filteredGroups = myGroups?.filter((group) => {
        return group.Admin === userInfo.UserName && group.RequestUsernames !== "[]";
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
  }, [myGroups, allusers]);


  useEffect(() => {
    // for Invites by Member
    let memberInvites = [];
    let adminInvites = [];
      if (Array.isArray(allGroups)) {
          const filteredAllGroups = allGroups.map((group) => {
          if (!(group.AdminInvitedUsernames.includes(userInfo.UserName))) {
              
            const groupObj = JSON.parse(group.MemberInvitedUsernames);
           // const groupObj2 = JSON.parse(group.AdminInvitedUsernames);
         
          if (!groupObj || !Array.isArray(groupObj)) {
            return null;
          }
          setIsInvitedByMember(true)
          memberInvites.push(groupObj)
         
          // Return the extracted data as an object
          return {
            groupID: group.GroupID,
            groupName: group.GroupName,
            memberInvites: memberInvites,
            adminInvites: group.AdminInvitedUsernames,
            invitor: memberInvites[0].Member,
          };
          }
        });
        // console.log("filteredAllGroups 1234", filteredAllGroups);
        const matchedGroups = [];
    
        filteredAllGroups.forEach((group) => {
          if (group ) {
            group.memberInvites.forEach((invite) => {
              // console.log("inviteeeee", invite)
              invite.forEach((member) => {
                console.log("member", member.InvitedUsernames, (member.InvitedUsernames.includes(userInfo.UserName)), userInfo.UserName)
                if (member.InvitedUsernames.includes(userInfo.UserName)) {
                  setIsInvitedByMember(true)
                  const memberInfo = allusers?.find((user) => user.UserName === member.Member);
                  const memberAvatar = memberInfo?.Avatar;
                  const memberWhoInvited = memberInfo?.FirstName + " " + memberInfo?.LastName;
                  console.log("memberWhoInvited", memberWhoInvited)
                  matchedGroups.push({
                    type: "SET_INVITESBYMEMBER",
                    memberAvatar: memberAvatar,
                    memberWhoInvited: memberWhoInvited,
                    groupName: group.groupName,
                    groupID: group.groupID,
                  });
                  setGroupInvitesByMember(matchedGroups);
                }
              });
            });
          }
        }
        );
        // console.log("matchedGroups", matchedGroups)
      }
  }, [allGroups]);

useEffect(() => {
  if (followRequestsUsernames && Array.isArray(allusers)) {
    const updatedFollowRequests = followRequestsUsernames.map((username) => {
      const requestorInfo = allusers.find((user) => user.UserName === username);
      const requestorAvatar = requestorInfo?.Avatar;
      const requestorUsername = requestorInfo?.UserName;
      const requestorDisplayname = requestorInfo?.FirstName + " " + requestorInfo?.LastName;

      return {
        type: "SET_FOLLOWNOTIFICATION",
        requestorAvatar: requestorAvatar,
        requestorDisplayname: requestorDisplayname,
        requestorUsername: requestorUsername,
      };
    });
    setFollowRequestsInfo(updatedFollowRequests);
  }
}, [allusers]);


  useEffect(() => {
    // for Invites by Admin
    if (Array.isArray(invitesbyadmin?.groups) && Array.isArray(allusers)) {
      const updatedInvites = invitesbyadmin.groups.map((invite) => {
        const adminInfo = allusers.find((user) => user.UserName === invite.Admin);
        const adminAvatar = adminInfo?.Avatar;
        const adminDisplayname = adminInfo?.FirstName + " " + adminInfo?.LastName;
        setIsInvitedByAdmin(true)
        return {
          type: "SET_INVITESBYADMIN",
          adminAvatar: adminAvatar,
          adminDisplayname: adminDisplayname,
          groupName: invite.GroupName,
          groupID: invite.GroupID,
        };
      });
      setGroupInvitesByAdmin(updatedInvites);
    }
  }, [invitesbyadmin, allusers, invitesbymember]);

  Notifications = [
    ...groupInvitesByAdmin || [],
    ...groupInvitesByMember || [],
    ...followRequestsInfo || [],
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
                  // if notification is true, set to bg-red, else bg-gray dont change color if hover dispatch notification to false onclick and open dropdown
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
                                <img src={notification.memberAvatar} alt="avatar" className="rounded-circle me-2" />
                              </div>
                            <div>
                              <p className="m-0">{notification.memberWhoInvited} invited you to join {notification.groupName}</p>
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
                                <Avatar username={notification.requestorUsername} />
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
                                // onClick={() => handleAcceptJoinRequest(notification.groupID)}
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-danger btn-sm mx-1"
                                // onClick={() => handleDeclineJoinRequest(notification.groupID)}
                              >
                                Decline
                              </button>
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
                    <a href="#" className="text-decoration-none text-dark d-flex align-items-center" onClick={handleLogout}>
                      <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                        <i className="fas fa-power-off"></i>
                      </div>
                      <p className="m-0">Log Out</p>
                    </a>
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

