import React, { useState, useRef, useEffect } from 'react';
import Topnav from '../Topnav';
import CreatePost from '../../components/CreatePost/CreatePost';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import GroupPostCard from '../../components/Card/GroupPostCard';
import CreateEventModal from '../../components/Modal/CreateEventModal';
import '../../views/Profile/Profile.css';
import '../../components/Card/Card.css';
//import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';

function SingleGroup(props) {
    const token = localStorage.getItem("token");
    const [group, setGroup] = useState([]);
    const [adminUsername, setAdminUsername] = useState([]);
    const [adminDisplayName, setAdminDisplayName] = useState([]);
    const [membersInfo, setMembersInfo] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        console.log("open create group modal");
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

    
    const getSingleGroup = async () => {
        // get groupID from window.location
        const groupID = window.location.pathname.split('/')[2];
        const url = `http://localhost:8080/getsinglegroup?groupID=${groupID}`;
        
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'application/json');
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: headers,
            });
            if (res.ok) {
                const data = await res.json();
                console.log('data', data);
                if (data.group !== null) {
                    setGroup(data.group);
                    const adminID = data.group[0].adminID;
                    setAdminUsername(adminID);
                    const admin = props.allusers.filter((user) => user.username === adminID);
                    const adminDisplayName = admin[0].firstname + " " + admin[0].lastname;
                    setAdminDisplayName(adminDisplayName);

                    // save memberUsernames displaynames and avatar from allusers to a map
                    const membersUsernames = data.group[0].memberUsernames;
                    const membersInfo = membersUsernames.map((username) => {
                        const member = props.allusers.find((user) => user.username === username);
                        const displayName = member.firstname + ' ' + member.lastname;
                        return {
                          username: username,
                          displayName: displayName,
                          avatar: member.avatar,
                          privacy: member.privacy
                        };

                    });
                    setMembersInfo(membersInfo);
                    console.log('membersInfo', membersInfo); 

                    // 


                } else {
                    // Handle the case when data.group is null
                    console.log('No group available');
                    setGroup(null);
                }
            } else {
                throw new Error('Error occurred while getting the group');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getSingleGroup();
      }, []);

    return (
        <div>
            <Topnav userDisplayname={props.userDisplayname} userInfo={props.userInfo} allusers={props.allusers}/>
            {group.map((groupItem) => (
            <div className="container-fluid">
                <div className="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                    <div className="panel-group profile-cover p-4" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="profile-cover__info">
                            <h2><strong>{groupItem.groupName}</strong></h2>
                            <p className="card-text">{groupItem.groupDescription}</p>
                            <div className="profile-cover__action">
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
                                            <button className="dropdown-item" type="button">
                                            Create Chat
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CreateEventModal userDisplayname={props.userDisplayname} openModal={openModal}/>
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
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-user"> Admin: </i> <span className="name">{adminDisplayName}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"> Created: </i> <span className="name">{new Date(groupItem.createAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></span>
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
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <CreatePost userDisplayname={props.userDisplayname} userInfo={props.userInfo} />
                            <GroupPostCard userDisplayname={props.userDisplayname} userInfo={props.userInfo} />
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default SingleGroup;
