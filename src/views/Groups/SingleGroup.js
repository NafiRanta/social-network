import React, { useState, useRef, useEffect } from 'react';
import Topnav from '../Topnav';
import CreatePost from '../../components/CreatePost/CreatePost';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import GroupPostCard from '../../components/Card/GroupPostCard';
import CreateEventModal from '../../components/Modal/CreateEventModal';
import '../../views/Profile/Profile.css';
import '../../components/Card/Card.css';

function SingleGroup(props) {
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
    return (
        <div>
            <Topnav username={props.username} profilePicture={props.profilePicture} allusers={props.allusers}/>
            <div className="container-fluid">
                <div className="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                    <div className="panel-group profile-cover p-4" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="profile-cover__info">
                            <h2><strong>Ålands köp och sälj</strong></h2>
                            <p className="card-text">Environmentally friendly, social, completely simple.</p>
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
                <CreateEventModal username={props.username} openModal={openModal}/>
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <p className="m-0">Followers</p>
                                </div>
                                <div className="follow-box-content p-1 m-0 d-flex">
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Gin</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Ashley</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Amanda</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Noah</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <CreatePost />
                            <GroupPostCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleGroup;
