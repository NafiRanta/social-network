import {React, useState, useEffect} from 'react';
import Topnav from '../../views/Topnav';    
import PostCard from '../../components/Card/PostCard';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import { useLocation } from 'react-router-dom';
import './Profile.css';
import { useSelector } from 'react-redux';



function OthersProfile(props) {
    const location = useLocation();
    const { pathname } = location;
    const allusers = useSelector((state) => state.allUsers);
    const userInfo = useSelector((state) => state.userInfo);
    const username = window.location.pathname.split("/")[2];
  
    const clickedProfileInfo = allusers?.find(user => user.UserName  === username);
    const clickedProfileUsername = clickedProfileInfo?.UserName;
    const clickedProfileDisplayName = clickedProfileInfo?.FirstName + " " + clickedProfileInfo?.LastName;
    
    const [followers, setFollowers] = useState([]);
    const [followingUsernamesReceived, setFollowingUsernamesReceived] = useState([]);
    const [followingUsernamesSent, setFollowingUsernamesSent] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [pending, setPending] = useState([]);

    const clickedProfilePrivacy = clickedProfileInfo?.Privacy;

  
    useEffect(() => {
        if (userInfo.FollowerUsernames) {
            const myFollowers = userInfo.FollowerUsernames.split(",");
            setFollowers(myFollowers);
        } 

        if (userInfo.FollowerUsernamesReceived) {
            const followingReceived = userInfo.FollowerUsernamesReceived.split(",");
            setFollowingUsernamesReceived(followingReceived);
        } 
        if (userInfo.FollowingUsernamesSent) {
            const followingSent = userInfo.FollowerUsernamesSent.split(",");
            setFollowingUsernamesSent(followingSent);
        } 
        if (clickedProfilePrivacy === 'public') {
            setIsPublic(true);
        } else if (clickedProfilePrivacy === 'private') {
            setIsPrivate(true);
        }
    }, [userInfo]); // Only run the effect when clickedProfileInfo changes 


    // if username is found in followers, then the user is following the clicked profile
    const isFollowing = followers.includes(clickedProfileUsername);

    // if username is found in followingUsernamesReceived or followingUsernamesSent, then the clicked profile follow request is pending
    const isPending = followingUsernamesReceived.includes(clickedProfileUsername) || followingUsernamesSent.includes(clickedProfileUsername);

    console.log("myfollowers", isFollowing);
    console.log("isPending", isPending);
    console.log("ClickedProfile isPrivate", isPrivate);
    console.log("ClickedProfile isPublic", isPublic);

    // handle follow button
    const handleFollow = async (event) => {
        event.preventDefault();
        const data = {
            sender_username: userInfo.UserName,
            receiver_username: username
        }
        try{
            const response = await fetch("http://localhost:8080/sendfollowreq", {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                console.log("Follow request sent");
                alert("Follow request sent");
                window.location.reload();
            } else {
                console.log("Error sending follow request");
            }
        }
        catch(error){
            console.log(error);
        }
    }

  return (
        <div>
           <Topnav userDisplayname={props.userDisplayname} />
            <div className="container-fluid">
                <section className="profileTopnav">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-8">
                            <div className="card">
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                <div className="flex-shrink-0">
                                    <img src={clickedProfileInfo?.Avatar}
                                    className="img-fluid"/>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <div className="d-flex align-items-center">
                                        <h2 className="mb-0 mr-2"><strong>{clickedProfileDisplayName}</strong></h2>
                                        {clickedProfileInfo?.Nickname && (
                                            <span className="nickname-text">
                                                <small className="text-muted">({clickedProfileInfo?.Nickname})</small>
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
                                        <div className="px-3">
                                            <p className="small text-muted mb-1">
                                            Profile
                                            </p>
                                            <p className="mb-0">{clickedProfileInfo?.Privacy}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex pt-1">
                                    {isFollowing ? (
                            <button type="button" className="btn btn-primary flex-grow-1" disabled>
                              You follow each other
                            </button>
                          ) : isPending ? (
                            <button type="button" className="btn btn-primary flex-grow-1" disabled>
                              Pending Follow Request
                            </button>
                          ) : clickedProfilePrivacy === 'public' ? (
                            <button type="button" className="btn btn-primary flex-grow-1" onClick={handleFollow}>
                              Follow
                            </button>
                          ) : (
                            <button type="button" className="btn btn-primary flex-grow-1" disabled>
                              Private Profile
                            </button>
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
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            <div className="bg-white rounded border shadow p-3">
                                <ul  >
                                    <li className="dropdown-item p-1 rounded">
                                        <div className="p-2">
                                            <p className="m-0"><strong>Intro</strong></p>
                                        </div>
                                         {clickedProfileInfo?.AboutMe && (
                                            <li className="dropdown-item p-1 rounded text-center">
                                                <p className="text-center">{clickedProfileInfo?.AboutMe}</p>
                                            </li>
                                        )}
                                    </li>
                                    {/* <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-user"></i> <span className="name">Nickname</span></span>
                                    </li> */}
                                    <li className="my-2 p-1">
                                        <span><i className="fas fa-edit"></i> <span className="name">{clickedProfileInfo?.Email}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"></i> <span className="name">{clickedProfileInfo?.DateOfBirth}</span></span>
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
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <PostCard userDisplayname={props.userDisplayname} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OthersProfile;
