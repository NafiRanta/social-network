import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Topnav from '../Topnav';
import CreateGroupPost from '../../components/CreatePost/CreateGroupPost';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import GroupPostCard from '../../components/Card/GroupPostCard';
import CreateEventModal from '../../components/Modal/CreateEventModal';
import '../../views/Profile/Profile.css';
import '../../components/Card/Card.css';
import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';
//import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';

function SingleGroup(props) {
    console.log("props", props)
    const [group, setGroup] = useState([]);
    const [adminDisplayName, setAdminDisplayName] = useState([]);
    const [membersInfo, setMembersInfo] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const allgroups = useSelector((state) => state.allGroups);
    const groupID = window.location.pathname.split('/')[2];

    // get information about the group from allgroups
    useEffect(() => {
        const group = allgroups.filter((group) => group.GroupID === groupID);
        console.log("group", group)
        //if not null then set the state
        if (group.length > 0) {
            const adminUsername = group[0].Admin;
            //const adminInfo = props.allusers.filter((user) => user.username === adminUsername);
           // const adminDisplayName = adminInfo[0].firstname + " " + adminInfo[0].lastname;
            // make membersUsernames an array
            const membersUsernames = JSON.parse(group[0].MemberUsernames);
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
            setGroup(group);
           // setAdminDisplayName(adminDisplayName);
            setMembersInfo(membersInfo);
        }
    }, [allgroups, props.allusers, groupID]);


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

    return (
        <div>
            <Topnav userDisplayname={props.userDisplayname} userInfo={props.userInfo} allusers={props.allusers}/>
            {group.map((groupItem) => (
            <div className="container-fluid">
                <div className="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                    <div className="panel-group profile-cover p-4" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="profile-cover__info">
                            <h2><strong>{groupItem.GroupName}</strong></h2>
                            <p className="card-text">{groupItem.GroupDescription}</p>
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
                                        <span><i className="fas fa-user"> Admin: </i> <span className="name">{/* {adminDisplayName} */}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"> Created: </i> <span className="name">{new Date(groupItem.CreateAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></span>
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
                            <CreateGroupPost userDisplayname={props.userDisplayname} userInfo={props.userInfo} />
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
