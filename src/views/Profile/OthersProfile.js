import React from 'react';
import Topnav from '../../views/Topnav';    
import PostCard from '../../components/Card/PostCard';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import { useLocation } from 'react-router-dom';
import './Profile.css';



function OthersProfile(props) {
    const location = useLocation();
    const { pathname } = location;
    const encodedUsername = pathname.split('/').pop();
    const clickedProfileUsername = decodeURIComponent(encodedUsername);
    console.log("username in othersprofile", clickedProfileUsername)

  if (!clickedProfileUsername) {
    // Handle the error here, such as displaying an error message or redirecting to a different page
    return <p>Error: User information not found.</p>;
  }
  
  // iterate in allusers and find the user with the user.firstname and user.lastname that matches clickedProfileUsername
    const clickedProfileInfo = props.allusers.find(user => user.firstname + " " + user.lastname === clickedProfileUsername);
    console.log("clickedProfile", clickedProfileInfo)

  return (
        <div>
           <Topnav username={props.username} userInfo={props.userInfo} allusers={props.allusers}/>
            <div className="container-fluid">
                <section className="profileTopnav">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-8">
                            <div className="card">
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                <div className="flex-shrink-0">
                                    <img src={clickedProfileInfo.profilePicture}
                                    className="img-fluid"/>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <div className="d-flex align-items-center">
                                        <h2 className="mb-0 mr-2"><strong>{clickedProfileUsername}</strong></h2>
                                        {clickedProfileInfo.nickname && (
                                            <span className="nickname-text">
                                                <small className="text-muted">({clickedProfileInfo.nickname})</small>
                                            </span>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                    style={{ backgroundColor: '#efefef' }}>
                                        <div className="px-3">
                                            <p className="small text-muted mb-1">
                                            Followers
                                            </p>
                                            <p className="mb-0">976</p>
                                        </div>
                                        <div>
                                            <p className="small text-muted mb-1">
                                            Following
                                            </p>
                                            <p className="mb-0">8.5</p>
                                        </div>
                                    </div>
                                    <div className="d-flex pt-1">
                                        <button type="button" className="btn btn-outline-primary me-1 flex-grow-1">
                                            Chat
                                        </button>
                                        <button type="button" className="btn btn-primary flex-grow-1">
                                            Follow
                                        </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            <div className="bg-white rounded border shadow p-3">
                                <ul  >
                                    <li className="dropdown-item p-1 rounded">
                                        <div className="p-2">
                                            <p className="m-0"><strong>Intro</strong></p>
                                        </div>
                                         {clickedProfileInfo.about && (
                                            <li className="dropdown-item p-1 rounded text-center">
                                                <p className="text-center">{clickedProfileInfo.about}</p>
                                            </li>
                                        )}
                                    </li>
                                    {/* <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-user"></i> <span className="name">Nickname</span></span>
                                    </li> */}
                                    <li className="my-2 p-1">
                                        <span><i className="fas fa-edit"></i> <span className="name">{clickedProfileInfo.email}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"></i> <span className="name">{clickedProfileInfo.dob}</span></span>
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
                            <PostCard username={props.username} userInfo={props.userInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OthersProfile;
