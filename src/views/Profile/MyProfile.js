import React, { useState } from 'react';
import Switch from 'react-switch';
import CreatePost from '../../components/CreatePost/CreatePost';
import PostContainer from '../../components/Card/PostCard';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import './Profile.css';
import ChangeProfilePicModal from '../../components/Modal/ChangeProfilePicModal';
import UpdateProfileSettingsModal from '../../components/Modal/UpdateProfileSettingsModal';
import Topnav from '../Topnav';

function MyProfile(props) {
    const [privacy, setPrivacy] = useState(false);

    const handlePrivacyChange = (checked) => {
      setPrivacy(checked); 
    };
  
  return (
    <div>
        <Topnav username={props.username} profilePicture={props.profilePicture} allusers={props.allusers}/>
        <div className="container-fluid">
            <section className="profileTopnav">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        <div className="flex-shrink-0">
                                            <img src={props.profilePicture}
                                            alt="Generic placeholder image" className="img-fluid"/>
                                            <i
                                                className="fas fa-images fs-5 text-success pointer position-absolute bottom-0 start-0 ms-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#changeProfilePicModal"
                                            ></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="d-flex align-items-center">
                                                <h2 className="mb-0 mr-2"><strong>{props.username}</strong></h2>
                                                <span className="nickname-text">
                                                    <small className="text-muted">({props.nickname})</small>
                                                </span>
                                            </div>
                                            <div 
                                                className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                style={{ backgroundColor: '#efefef' }}
                                            >
                                                <div className="px-3">
                                                    <p className="small text-muted mb-1">Followers</p>
                                                    <p className="mb-0">976</p>
                                                </div>
                                                <div>
                                                    <p className="small text-muted mb-1">Following</p>
                                                    <p className="mb-0">8.5</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                            <i className="fas fa-globe mr-2"></i>
                                                <small className="mb-0 text-muted mr-2">Your profile is now:</small>
                                                <span className="switch">
                                                    <small className="switch-label text-muted mr-2" htmlFor="privacyToggle">
                                                    {privacy ? "Public" : "Private"}
                                                    </small>
                                                    <Switch
                                                    checked={privacy}
                                                    onChange={handlePrivacyChange}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    handleDiameter={16}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    height={14}
                                                    width={36}
                                                    className="react-switch"
                                                    id="privacyToggle"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ChangeProfilePicModal username={props.username} profilePicture={props.profilePicture}/>
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            <div className="bg-white rounded border shadow p-3">
                                <ul >
                                    <li className="dropdown-item p-1 rounded">
                                        <div >
                                            <p className="m-0"><strong>Bio</strong></p>
                                        </div>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-user"></i> <span className="name">{props.nickname}</span></span>
                                    </li>
                                    <li className="my-2 p-1">
                                        <span><i className="fas fa-edit"></i> <span className="name">{props.email}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"></i> <span className="name">{props.dob}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                    <button 
                                        type="button" 
                                        className="btn btn-primary w-100" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#updateProfileSettingsModal"
                                    >
                                        Edit Profile
                                    </button>
                                    <UpdateProfileSettingsModal username={props.username} profilePicture={props.profilePicture}/>
                                    </li>
                                </ul>
                            </div>
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
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <p className="m-0">Following</p>
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
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
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
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <CreatePost username={props.username} profilePicture={props.profilePicture}/>
                            <PostContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
