import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Topnav from '../Topnav';
import CreateGroupPost from '../../components/CreatePost/CreateGroupPost';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import GroupPostCard from '../../components/Card/GroupPostCard';
import CreateEventModal from '../../components/Modal/CreateEventModal';
import EventCard from '../../components/Card/EventCard';
import '../../views/Profile/Profile.css';
import '../../components/Card/Card.css';
import './Groups.css'
//import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';
//import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';

function SingleGroup(props) {
     // from redux store
     const dispatch = useDispatch();
     const allgroups = useSelector((state) => state.allGroups);
     const userInfo = useSelector((state) => state.userInfo);
     const allusers = useSelector((state) => state.allUsers);
    // group
    const [group, setGroup] = useState([]);
    const [adminDisplayName, setAdminDisplayName] = useState([]);
    const [membersInfo, setMembersInfo] = useState([]);
    const groupID = window.location.pathname.split('/')[2];
    // menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    // check if user is a member of the group 
    const groupmembers = JSON.parse(group?.[0]?.MemberUsernames ?? "[]");
    const isUserGroupMember = Array.isArray(groupmembers) && groupmembers.includes(userInfo.username);
   
    // check if user is the admin of the group
    const isUserGroupAdmin = group.length > 0 && group[0].Admin === userInfo.username;

    // check if user is invited by admin
    const adminInvitedUsers = JSON.parse(group?.[0]?.AdminInvitedUsernames ?? "[]");
    const isInvitedByAdmin = Array.isArray(adminInvitedUsers) && adminInvitedUsers.includes(userInfo.username);

    useEffect(() => {
        const group = allgroups.filter((group) => group.GroupID === groupID);
      
        // Check if group exists and has MemberUsernames property
        if (group.length > 0 && group[0].MemberUsernames) {
          const membersUsernames = JSON.parse(group[0].MemberUsernames);
          const adminUsername = group[0].Admin;
          // get admin display name from allusers
            const admin = allusers.find((user) => user.username === adminUsername);
            setAdminDisplayName(admin.firstname + " " + admin.lastname);
      
          // Proceed with mapping only if membersUsernames is an array
          if (Array.isArray(membersUsernames) && Array.isArray(allusers)) {
            const membersInfo = membersUsernames.map((username) => {
                const member = allusers.find((user) => user.username === username);
                return {
                    username: username,
                    displayName: member.firstname + " " + member.lastname,
                    avatar: member.avatar,
                };
            });
            setGroup(group);
            setMembersInfo(membersInfo);
          }
        }
      }, [allgroups, groupID]);
      

    const openModal = () => {
        setModalOpen(true);
    };
  
    const toggleMenu = () => {
      setIsMenuOpen((prevState) => !prevState);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          event.target.className !== 'fa fa-bars'
        ) {
          setIsMenuOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleAcceptInvite = async() => {
        try {
            const token = localStorage.getItem('token');
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
            headers.append('Content-Type', 'application/json');
            const url = `http://localhost:8080/addusertogroup?groupID=${groupID}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: headers,
            });
            if (!res.ok) {
                throw new Error('Failed to accept invite.');
            } else {
                alert('You have joined the group.');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <Topnav userDisplayname={props.userDisplayname} allusers={props.allusers}/>
            {group.map((groupItem) => (
            <div className="container-fluid" key={groupItem.GroupID}>
                <div className="bg-white p-5" >
                    <div className="panel-group profile-cover p-5" >
                        <div className="profile-cover__info" id="coverContent">
                            <h2><strong>{groupItem.GroupName}</strong></h2>
                            <p className="card-description">{groupItem.GroupDescription}</p>
                            <div className="profile-cover__action">
                                {(isUserGroupAdmin || isUserGroupMember) && (
                                    <>
                                        <button className="btn btn-primary btn-sm d-flex justify-content-center align-items-center ">
                                            <i className="fa fa-plus"> </i>
                                            <span> Invite</span>
                                        </button>
                                        <div
                                            className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                                            onClick={toggleMenu}
                                            ref={dropdownRef}
                                        >
                                            <i className="fa fa-bars"> </i>
                                            {isMenuOpen && (
                                                <div
                                                    className="dropdown-menu show"
                                                    id="groupdropdown"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '84%',
                                                        left: '55%',
                                                    }}
                                                >
                                                    <button className="dropdown-item" type="button">
                                                    Leave
                                                    </button>
                                                    <button className="dropdown-item" type="button"  data-bs-toggle="modal"
                                                    data-bs-target="#createEventModal">
                                                    Create Event
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            {(isInvitedByAdmin && !isUserGroupAdmin && !isUserGroupMember) &&  (
                                <div className="alert alert-warning" role="alert">
                                    <strong>Invited by admin</strong>
                                    <button className="btn btn-success mx-2" onClick={handleAcceptInvite}>
                                    Accept
                                    </button>
                                    <button className="btn btn-danger" /*onClick={handleDeclineInvite}*/>
                                    Decline
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <CreateEventModal userDisplayname={props.userDisplayname} openModal={openModal} allusers={props.allusers} groupID={groupID}/>
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            <div className="bg-white rounded border shadow p-3">
                                <ul >
                                    <li className="dropdown-item p-1 rounded">
                                        <div >
                                            <p className="m-0"><strong>Intro</strong></p>
                                        </div>
                                    </li>
                                    <li className="dropdown-item p-1 rounded" >
                                        <div id="introText"> <i className="fas fa-user"> </i> Admin: <span className="name">{adminDisplayName}</span> </div>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <div id="introText"> <i className="fas fa-birthday-cake"> </i> Created:  <span className="name">{new Date(groupItem.CreateAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <p className="m-0"><strong>Members</strong></p>
                                </div>
                                <div className="follow-box-content p-1 m-0 d-flex">
                                    {membersInfo.map((member) => (
                                        <a href="#" className="d-flex align-items-center text-decoration-none text-dark" key={member.username}>
                                            <div className="fellows d-flex align-items-center">
                                            <AvatarSquare avatar={member.avatar} />
                                            </div>
                                            <div className="fellows d-flex align-items-center">
                                            <p className="m-0">{member.displayName}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            {(isUserGroupAdmin || isUserGroupMember) && (
                                <div className="bg-white rounded border shadow p-3">
                                    <EventCard />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        {(isUserGroupAdmin || isUserGroupMember) && (
                            <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                                <CreateGroupPost userDisplayname={props.userDisplayname} groupID={groupID}/>
                                <GroupPostCard userDisplayname={props.userDisplayname}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default SingleGroup;
