import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Switch from 'react-switch';
import CreatePost from '../../components/CreatePost/CreatePost';
import PostCard from '../../components/Card/PostCard';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import './Profile.css';
import ChangeProfilePicModal from '../../components/Modal/ChangeProfilePicModal';
import UpdateProfileSettingsModal from '../../components/Modal/UpdateProfileSettingsModal';
import Topnav from '../Topnav';

export const UpdateUserInfoInLocalStorage = (updatedData) => {
    
    // const updatedUserInfo = { ...userInfo, ...updatedData };
    // localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  };

function MyProfile(props) {
  const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);
    const [privacy, setPrivacy] = useState(userInfo.privacy);
    useEffect(() => {
        if (userInfo) {
        setPrivacy(privacy)
        }
    }, [userInfo]);

    if (!userInfo) {
        return null;
  }

  const handlePrivacyChange = (checked) => {
    const newPrivacy = checked ? "public" : "private";
    setPrivacy(checked ? "Public" : "Private");
    updatePrivacy(newPrivacy); // Call the function to update the privacy in the backend
  };
  const updatePrivacy = async (privacy) => {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    try {
        const response = await fetch("http://localhost:8080/updateprivacy", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ privacy }),
        });
      
        if (response.ok) {
          console.log("Privacy updated successfully");
          const data = await response.json();
          console.log("data", data);
          dispatch({ type: 'SET_USER', payload: data });
          // UpdateUserInfoInLocalStorage({ privacy });
        } else {
          throw new Error("Error updating privacy");
        }
      } catch (error) {
        console.error("Error updating privacy:", error);
      }
  };
  
  return (
    <div>
        <Topnav userDisplayname={props.userDisplayname} userInfo={userInfo} allusers={props.allusers}/>
        <div className="container-fluid">
            <section className="profileTopnav">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        <div className="flex-shrink-0">
                                            <img src={userInfo.profilePicture}
                                            alt="Generic placeholder image" className="img-fluid"/>
                                            <i
                                                className="fas fa-images fs-5 text-success pointer position-absolute bottom-0 start-0 ms-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#changeProfilePicModal"
                                            ></i>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <div className="d-flex align-items-center">
                                                <h2 className="mb-0 mr-2"><strong>{props.userDisplayname}</strong></h2>
                                                {userInfo.nickname && (
                                                    <span className="nickname-text">
                                                        <small className="text-muted">{userInfo.nickname}</small>
                                                    </span>
                                                )}
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
                                                {privacy !== null && (
                                                    <span className="switch">
                                                        <small className="switch-label text-muted mr-2" htmlFor="privacyToggle">
                                                        {privacy}
                                                        </small>
                                                        <Switch
                                                        checked={privacy === "public"} // Provide a default value of false when privacy is null
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
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ChangeProfilePicModal userDisplayname={props.userDisplayname} userInfo={userInfo}/>
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
                                    {userInfo.about && (
                                        <li className="dropdown-item p-1 rounded text-center">
                                            <p className="text-center">{userInfo.about}</p>
                                        </li>
                                    )}
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-user"></i> <span className="name">{userInfo.nickname}</span></span>
                                    </li>
                                    <li className="my-2 p-1">
                                        <span><i className="fas fa-edit"></i> <span className="name">{userInfo.email}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"></i> <span className="name">{userInfo.dob}</span></span>
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
                                    <UpdateProfileSettingsModal userDisplayname={props.userDisplayname} userInfo={userInfo} />
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
                            <CreatePost userDisplayname={props.userDisplayname} userInfo={userInfo} />
                            <PostCard userDisplayname={props.userDisplayname} userInfo={userInfo}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
