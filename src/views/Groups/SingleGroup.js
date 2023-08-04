import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Topnav from '../Topnav';
import CreateGroupPost from '../../components/CreatePost/CreateGroupPost';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import GroupPostCard from '../../components/Card/GroupPostCard';
import CreateEventModal from '../../components/Modal/CreateEventModal';
import GroupInviteModal from '../../components/Modal/GroupInviteModal';
import EventCard from '../../components/Card/EventCard';
import '../../views/Profile/Profile.css';
import '../../components/Card/Card.css';
import './Groups.css'

function SingleGroup(props) {
     // from redux store
     const dispatch = useDispatch();
     const allgroups = useSelector((state) => state.allGroups);
     const userInfo = useSelector((state) => state.userInfo);
     const allusers = useSelector((state) => state.allUsers);
     const [group, setGroup] = useState([]);
    const [adminDisplayName, setAdminDisplayName] = useState([]);
    const [membersInfo, setMembersInfo] = useState([]);
    const groupID = window.location.pathname.split('/')[2];
    const [declineInvite, setDeclineInvite] = useState(false);
    const [isGroupMember, setIsGroupMember] = useState(false);
    const [isGroupAdmin, setIsGroupAdmin] = useState(false);
    const [adminInvitedUsers, setAdminInvitedUsers] = useState([]); 
    const [isInvitedByAdmin, setIsInvitedByAdmin] = useState(false);
    const [memberInvitedUsers, setMemberInvitedUsers] = useState([]);
    const [isInvitedByMember, setIsInvitedByMember] = useState(false);
    // menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (group === undefined || group.length === 0 || allgroups === undefined || allgroups.length === 0) {
            const fetchSingleGroup = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/getsinglegroup?groupID=${groupID}`, {
                        method: "GET",});
                    const data = await response.json();
                    const group = data.group[0];
                    setGroup(group);
                    const admin = allusers?.find((user) => user.UserName === data.group[0].AdminID);
                    setAdminDisplayName(admin.FirstName + " " + admin.LastName);
                    const membersUsernames = data.group[0].MemberUsernames;
                    if (Array.isArray(membersUsernames) && Array.isArray(allusers)) {
                        const membersInfo = membersUsernames.map((username) => {
                            const member = allusers.find((user) => user.UserName === username);
                            return {
                                username: username,
                                displayName: member.FirstName + " " + member.LastName,
                                avatar: member.Avatar,
                            };
                        });
                        setMembersInfo(membersInfo);
                    }
    
                    // check if user is the admin of the group
                    const isGroupAdmin = group?.AdminID === userInfo.UserName;
                    setIsGroupAdmin(isGroupAdmin);
    
                    // check if user is a member of the group
                    const isGroupMember = Array.isArray(membersUsernames) && membersUsernames.includes(userInfo.UserName);
                    setIsGroupMember(isGroupMember);
    
                    // check if user is invited by admin
                    const adminInvitedUsers = (group?.AdminInvitedUsernames ?? "[]");
                    setAdminInvitedUsers(adminInvitedUsers);
    
                    const isInvitedByAdmin = Array.isArray(adminInvitedUsers) && adminInvitedUsers.includes(userInfo.UserName);
                    setIsInvitedByAdmin(isInvitedByAdmin);
    
                    // check if user is invited by member
                    const memberInvitedUsers = (group?.MemberInvitedUsernames ?? "[]");
                    setMemberInvitedUsers(memberInvitedUsers);
                    if (Array.isArray(memberInvitedUsers) && memberInvitedUsers.length > 0){
                        const isInvitedByMember = memberInvitedUsers.map ((memberInvitedUser) => memberInvitedUser.InvitedUsernames.includes(userInfo.UserName));
                        setIsInvitedByMember(isInvitedByMember);
                    } 
                }
                catch (error) {
                    console.error('Error fetching group data:', error);
                  }              
            };
            fetchSingleGroup();
        }     
    }, [allgroups, groupID])

 /*    useEffect(() => {
        const fetchSingleGroup = async () => {
            try {
                const response = await fetch(`http://localhost:8080/getsinglegroup?groupID=${groupID}`, {
                    method: "GET",});
                const data = await response.json();
                const group = data.group[0];
                setGroup(group);
                const admin = allusers?.find((user) => user.UserName === data.group[0].AdminID);
                setAdminDisplayName(admin.FirstName + " " + admin.LastName);
                const membersUsernames = data.group[0].MemberUsernames;
                if (Array.isArray(membersUsernames) && Array.isArray(allusers)) {
                    const membersInfo = membersUsernames.map((username) => {
                        const member = allusers.find((user) => user.UserName === username);
                        return {
                            username: username,
                            displayName: member.FirstName + " " + member.LastName,
                            avatar: member.Avatar,
                        };
                    });
                    setMembersInfo(membersInfo);
                }

                // check if user is the admin of the group
                const isGroupAdmin = group?.AdminID === userInfo.UserName;
                setIsGroupAdmin(isGroupAdmin);

                // check if user is a member of the group
                const isGroupMember = Array.isArray(membersUsernames) && membersUsernames.includes(userInfo.UserName);
                setIsGroupMember(isGroupMember);

                // check if user is invited by admin
                const adminInvitedUsers = (group?.AdminInvitedUsernames ?? "[]");
                setAdminInvitedUsers(adminInvitedUsers);

                const isInvitedByAdmin = Array.isArray(adminInvitedUsers) && adminInvitedUsers.includes(userInfo.UserName);
                setIsInvitedByAdmin(isInvitedByAdmin);

                // check if user is invited by member
                const memberInvitedUsers = (group?.MemberInvitedUsernames ?? "[]");
                setMemberInvitedUsers(memberInvitedUsers);
                if (Array.isArray(memberInvitedUsers) && memberInvitedUsers.length > 0){
                    const isInvitedByMember = memberInvitedUsers.map ((memberInvitedUser) => memberInvitedUser.InvitedUsernames.includes(userInfo.UserName));
                    setIsInvitedByMember(isInvitedByMember);
                } 
            }
            catch (error) {
                console.error('Error fetching group data:', error);
              }
        };
        fetchSingleGroup();
    }, [groupID, allusers]); */

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

    const handleAdminAcceptInvite = async() => {
        console.log('handleAdminAcceptInvite')
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
                const data = await res.json();
                const allgroups = data.allgroups;
                dispatch({ type: 'SET_ALLGROUPS', payload: allgroups });
                window.location.reload();
              
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleMemberAcceptInvite = async() => {
        try {
            const token = localStorage.getItem('token');
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
            headers.append('Content-Type', 'application/json');
            const url = `http://localhost:8080/joinrequest?groupID=${groupID}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: headers,
            });
            if (!res.ok) {
                throw new Error('Failed to accept invite.');
            } else {
                const data = await res.json();
                const allgroups = data.allGroups;
                dispatch({ type: 'SET_ALLGROUPS', payload: allgroups });
                alert('Pending admin approval.');
                window.location.href = '/allgroups';
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeclineInvite = async() => {
        try {
            const token = localStorage.getItem('token');
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
            headers.append('Content-Type', 'application/json');
            const url = `http://localhost:8080/declinegroupinvite?groupID=${groupID}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: headers,
            });
            if (!res.ok) {
                throw new Error('Failed to decline invite.');
            } else {
                const data = await res.json();
                dispatch({ type: 'SET_ALLGROUPS', payload: data.allGroups });
                setDeclineInvite(true);
                alert('You have declined the invite.');
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error);
        }
    };
  
    return (
        <div>
            <Topnav userDisplayname={props.userDisplayname} allusers={props.allusers} socket={props.socket}/>
            {group && (
            <div className="container-fluid" key={group.GroupID}>
                <div className="bg-white p-5" >
                    <div className="panel-group profile-cover p-5" >
                    <div className="profile-cover__info" id="coverContent">
                            <h2><strong>{group.GroupName}</strong></h2>
                            <p className="card-description">{group.GroupDescription}</p>
                        {!(declineInvite && (!isGroupAdmin || !isGroupMember)) && ( // Check for isDecline and group membership conditions
                            <>
                            
                            <div className="profile-cover__action">
                                {(isGroupAdmin || isGroupMember) && (
                                <>
                                    <button
                                    href="#"
                                    className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#groupInviteModal"
                                    >
                                    + Invite
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
                                        {/* <button className="dropdown-item" type="button">
                                            Leave
                                        </button> */}
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createEventModal"
                                        >
                                            Create Event
                                        </button>
                                        </div>
                                    )}
                                    </div>
                                </>
                                )}
                            </div>
                            {(isInvitedByAdmin) && !isGroupAdmin && !isGroupMember && (
                                <div className="alert alert-warning" role="alert">
                                <strong>Invited by admin</strong>
                                <button className="btn btn-success mx-2" onClick={handleAdminAcceptInvite}>
                                    Accept
                                </button>
                                <button className="btn btn-danger" onClick={handleDeclineInvite}>
                                    Decline
                                </button>
                                </div>
                            )}
                            {(isInvitedByMember) && !isGroupAdmin && !isGroupMember && (
                                <div className="alert alert-warning" role="alert">
                                <strong>Invited by member</strong>
                                <button className="btn btn-success mx-2" onClick={handleMemberAcceptInvite}>
                                    Accept
                                </button>
                                <button className="btn btn-danger" onClick={handleDeclineInvite}>
                                    Decline
                                </button>
                                </div>
                            )}
                            </>
                        )}
                        </div>
                    </div>
                </div>
                <GroupInviteModal userDisplayname={props.userDisplayname} openModal={openModal} allusers={props.allusers} groupID={groupID} isGroupAdmin={isGroupAdmin} isGroupMember={isGroupMember} socket={props.socket}></GroupInviteModal>
                <CreateEventModal userDisplayname={props.userDisplayname} openModal={openModal} allusers={props.allusers} groupID={groupID} socket={props.socket}/>
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
                                        <div id="introText"> <i className="fas fa-birthday-cake"> </i> Created:  <span className="name">{new Date(group.CreateAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
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
                            {(isGroupAdmin || isGroupMember) && (
                                <div className="bg-white rounded border shadow p-3">
                                    <p className="m-0"><strong>Events</strong></p>
                                    <EventCard groupID={groupID}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        {(isGroupAdmin || isGroupMember) && (
                            <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                                <CreateGroupPost userDisplayname={props.userDisplayname} groupID={groupID}/>
                                <GroupPostCard userDisplayname={props.userDisplayname}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default SingleGroup;