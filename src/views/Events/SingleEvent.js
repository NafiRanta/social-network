import React, { useState, useRef, useEffect } from 'react';
import Topnav from '../Topnav';
import CreatePost from '../../components/CreatePost/CreatePost';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import GroupPostCard from '../../components/Card/GroupPostCard';
import CreateEventModal from '../../components/Modal/CreateEventModal';
import '../../views/Profile/Profile.css';
import '../../components/Card/Card.css';

function SingleEvent(props) {
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
        <div className="container-fluid">
            <div className="bg-white p-3 mt-3 rounded border shadow" id="bg-white">
                <div className="panel-group profile-cover p-4" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="profile-cover__info">
                        <h2><strong>Berds Karaoke Night</strong></h2>
                        <p className="card-text">Singing out hearts out but try not to get 2nd warning</p>
                        <div className="profile-cover__action">
                            <button className="btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center">
                                <i className="fa fa-check"></i>
                                <span> Going</span>
                            </button>
                            <button className="btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center">
                                <i className="fa fa-question"></i>
                                <span> Maybe</span>
                            </button>
                            <button className="btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center">
                                <i className="fa fa-times"></i>
                                <span> Can't go</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CreateEventModal username={props.username} openModal={openModal}/>
            <div className="row justify-content-evenly">
                <div className="col-12 col-lg-3">
                    <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                        <div className="bg-white rounded border shadow p-3">
                            <ul>
                                <li className="dropdown-item p-1 rounded">
                                    <div >
                                        <h4 className="m-0"><strong>Event Details</strong></h4>
                                    </div>
                                </li>
                                <li className="dropdown-item p-1 rounded">
                                    <span><i className="fas fa-calendar-alt text-white rounded-circle bg-secondary p-1 d-inline-flex align-items-center justify-content-center" style={{ fontSize: '0.7rem', width: '1.6rem', height: '1.6rem' }}></i> <span className="name">Saturday, 24 June 2023, at 4:30pm</span></span>
                                </li>
                                <li className="my-2 p-1">
                                    <span><i className="fas fa-user text-white rounded-circle bg-secondary p-1 d-inline-flex align-items-center justify-content-center" style={{ fontSize: '0.7rem', width: '1.6rem', height: '1.6rem' }}></i> <span className="name">Event by</span></span>
                                </li>
                                <li className="dropdown-item p-1 rounded">
                                    <div >
                                        <h4 className="m-0"><strong>Guest List</strong></h4>
                                    </div>
                                </li>
                                <li className="dropdown-item p-1 rounded">
                                    <span><i className="fa fa-check text-white rounded-circle bg-primary p-1 d-inline-flex align-items-center justify-content-center" style={{ fontSize: '0.7rem', width: '1.6rem', height: '1.6rem' }}></i> <span className="name">23 people going</span></span>
                                </li>
                                <li className="dropdown-item p-1 rounded">
                                    <span><i className="fas fa-question text-white rounded-circle bg-primary p-1 d-inline-flex align-items-center justify-content-center" style={{ fontSize: '0.7rem', width: '1.6rem', height: '1.6rem' }}></i> <span className="name">2 people maybe going</span></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 pb-5">
                    <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                        <CreatePost username={props.username} userInfo={props.userInfo}/>
                        <GroupPostCard username={props.username} userInfo={props.userInfo}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SingleEvent;
