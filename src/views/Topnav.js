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
  const chatNotification = useSelector((state) => state.chatNotification);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const allusers = useSelector((state) => state.allUsers);
  const userInfo = useSelector((state) => state.userInfo);
  const invitesbyadmin = useSelector((state) => state.invitesByAdmin);
  const invitesbymember = useSelector((state) => state.invitesByMember);
  const [groupInvitesByAdmin, setGroupInvitesByAdmin] = useState([]);
  const [groupInvitesByMember, setGroupInvitesByMember] = useState([]);
  
  let Notifications = []

  // fetch all users from redux
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + token);
        const url = "http://localhost:8080/users";
        const res = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        const data = await res.json();
        dispatch({ type: "FETCH_ALLUSERS", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, [dispatch]);


  // get group invites by admin getting admin Avatar, admin Displayname, groupName, groupID 
  // set these variables to setGroupInvitesByAdmin
  useEffect(() => {
    if (Array.isArray(invitesbyadmin?.groups) && Array.isArray(allusers)) {
      const updatedInvites = invitesbyadmin.groups.map((invite) => {
        const adminInfo = allusers.find((user) => user.UserName === invite.Admin);
        const adminAvatar = adminInfo?.Avatar;
        const adminDisplayname = adminInfo?.FirstName + " " + adminInfo?.LastName;

        return {
          adminAvatar: adminAvatar,
          adminDisplayname: adminDisplayname,
          groupName: invite.GroupName,
          groupID: invite.GroupID,
        };
      });
      setGroupInvitesByAdmin(updatedInvites);
    }
  }, [invitesbyadmin, allusers]);
   // get group invites by member getting member Avatar, member Displayname, groupName, groupID 
  // set these variables to setGroupInvitesByMember
  useEffect(() => {
    if (Array.isArray(invitesbymember?.groups) && Array.isArray(allusers)) {
      const updatedInvites = invitesbymember.groups.map((invite) => {
        const memberInfo = allusers.find((user) => user.UserName === invite.Member);
        const memberAvatar = memberInfo?.Avatar;
        const memberDisplayname = memberInfo?.FirstName + " " + memberInfo?.LastName;

        return {
          memberAvatar: memberAvatar,
          memberDisplayname: memberDisplayname,
          groupName: invite.GroupName,
          groupID: invite.GroupID,
        };
      });
      setGroupInvitesByMember(updatedInvites);
    }
  }, [invitesbymember, allusers]);

Notifications = [
  ...groupInvitesByAdmin || [],
  ...groupInvitesByMember || [],
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
    // alert("You have been logged out");
    // setTimeout(() => {
      window.location.href = "/login";
    // }, 5);
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
                  className=" rounded-circle bg-gray border-0"
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
                  {Notifications.map((invite) => ( // Add parentheses here to return JSX
                    <div key={invite.groupID}>
                      <Dropdown.Item as="li" className="my-2 p-1">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-2" id="avatar">
                              <img src={invite.adminAvatar} alt="avatar" className="rounded-circle me-2" />
                            </div>
                            <div>
                              <p className="m-0">{invite.adminDisplayname} invited you to join {invite.groupName}</p>
                            </div>
                          </div>
                          <div>
                            <Link
                              to={`/singlegroup/${invite.groupID}`}
                              className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </Dropdown.Item>
                    </div>
                  ))}
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
                    <Link to={`/profile/${props.userDisplayname}`} className="text-decoration-none text-dark d-flex align-items-center">
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
      <CreateGroupModal userDisplayname={props.userDisplayname} allusers={props.allusers}/>
    </div>
  );
}

export default Topnav;

