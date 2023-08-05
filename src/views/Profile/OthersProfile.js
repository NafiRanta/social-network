import {React, useState, useEffect} from 'react';
import Topnav from '../../views/Topnav';    
import OthersPostCard from '../../components/Card/OthersPostCard';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import { useDispatch } from 'react-redux';
import './Profile.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function OthersProfile(props) {
    const dispatch = useDispatch();
    const allusers = useSelector((state) => state.allUsers);
    const userInfo = useSelector((state) => state.userInfo);

    const clickedProfileUsername = decodeURIComponent(window.location.pathname.split("/")[2]);
    // if own profile, redirect to /profile/username
    if (clickedProfileUsername == userInfo.UserName) {
        window.location.href = "/profile/" + userInfo.UserName;
    }
    const [clickedProfileInfo, setClickedProfileInfo] = useState({});
    //everything related to the clicked profile
    const clickedProfileDisplayName = clickedProfileInfo.FirstName + " " + clickedProfileInfo.LastName;
    const [clickedProfileFollowers, setClickedProfileFollowers] = useState([]); 
    const [clickedProfileFollowings, setclickedProfileFollowings] = useState([]); 
    const [clickedProfileFollowingUsernamesSent, setClickedProfileFollowingUsernamesSent] = useState([]);
    const [clickedProfileFollowerUsernamesReceived, setClickedProfileFollowerUsernamesReceived] = useState([]);

    const [clickedProfileFollowersInfo, setClickedProfileFollowersInfo] = useState([]); // [ {username, avatar, displayname}
    const [clickedProfileFollowingsInfo, setclickedProfileFollowingsInfo] = useState([]); // [ {username, avatar, displayname}

   
    
    
    const [isPrivate, setIsPrivate] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    
    const [isPending, setPending] = useState(false);
    const [isPendingToAprove, setIsPendingToAprove] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const dob = new Date(clickedProfileInfo.DateOfBirth).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const day = dob.split(" ")[1];
      const month = dob.split(" ")[0];
      const year = dob.split(" ")[2];
      const formattedDOB = `${day} ${month} ${year}`.replace(/,/g, ""); // remove comma from date
    
      // get clickedProfileInfo from /users database
    useEffect(() => {
        const getClickedProfileInfo = async () => {
            const token = localStorage.getItem('token');
            const header = new Headers();
            header.append("Authorization", "Bearer " + token);
            header.append("Content-Type", "application/json");
    
            try {
                const response = await fetch(`http://localhost:8080/getUserByUsername?senderUsername=${clickedProfileUsername}`, {
                    method: 'GET',
                    headers: header,
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setClickedProfileInfo(data);
                    
                    dispatch ({type: "SET_CLICKEDPROFILEINFO", payload: data});

                } else {
                    console.log("error getting clicked profile info");
                }
            } catch (error) {
                console.log(error);
            }
        };
        getClickedProfileInfo();
    }, []);
    useEffect(() => {
        //set everything related to the clicked profile
                        //check private or public
                        if (clickedProfileInfo.Privacy === 'public') {
                            setIsPublic(true);
                        }else{
                            setIsPublic(false);
                        }
                        
                        if (clickedProfileInfo.Privacy === 'private') {
                            setIsPrivate(true);
                        } else{
                            setIsPrivate(false);
                        }
                        //check there is followers and followings
                        if (clickedProfileInfo.FollowerUsernames != "" && clickedProfileInfo.FollowerUsernames != undefined) {
                            const followerUserNamesArray = clickedProfileInfo.FollowerUsernames.includes(',')
                                ? clickedProfileInfo.FollowerUsernames.split(',')
                                : [clickedProfileInfo.FollowerUsernames];
                                setClickedProfileFollowers(followerUserNamesArray);
                        } else {
                            setClickedProfileFollowers([]);
                        }

                        if (clickedProfileInfo.FollowingUsernames != "" && clickedProfileInfo.FollowingUsernames != undefined) {
                            const followingUserNamesArray = clickedProfileInfo.FollowingUsernames.includes(',')
                                ? clickedProfileInfo.FollowingUsernames.split(',')
                                : [clickedProfileInfo.FollowingUsernames];
                                setclickedProfileFollowings(followingUserNamesArray);
                        } else {
                            setclickedProfileFollowings([]);
                        }
                        //check if there is FollowingUsernamesSent and FollowerUsernamesReceived
                        if (clickedProfileInfo.FollowingUsernamesSent != "" && clickedProfileInfo.FollowingUsernamesSent != undefined) {
                            const followingUsernamesSentArray = clickedProfileInfo.FollowingUsernamesSent.includes(',')
                                ? clickedProfileInfo.FollowingUsernamesSent.split(',')
                                : [clickedProfileInfo.FollowingUsernamesSent];
                                setClickedProfileFollowingUsernamesSent(followingUsernamesSentArray);
                        }else {
                            setClickedProfileFollowingUsernamesSent([]);
                        }
                        if (clickedProfileInfo.FollowerUsernamesReceived != "" && clickedProfileInfo.FollowerUsernamesReceived != undefined ) {
                            const followerUsernamesReceivedArray = clickedProfileInfo.FollowerUsernamesReceived.includes(',')
                                ? clickedProfileInfo.FollowerUsernamesReceived.split(',')
                                : [clickedProfileInfo.FollowerUsernamesReceived];
                                setClickedProfileFollowerUsernamesReceived(followerUsernamesReceivedArray);
                        } else {
                            setClickedProfileFollowerUsernamesReceived([]);
                        }
    }, [clickedProfileInfo]);
    //map the followers and followings of clicked profile to get the avatar and displayname
    useEffect(() => {
        if (clickedProfileFollowers.length > 0) {
            const clickedProfileFollowersInfo = [];
            clickedProfileFollowers.forEach((follower) => {
                const followerInfo = allusers?.find((user) => user.UserName === follower);
                clickedProfileFollowersInfo.push(followerInfo);
            });
            setClickedProfileFollowersInfo(clickedProfileFollowersInfo);
        } else {
            setClickedProfileFollowersInfo([]);
        }

        if (clickedProfileFollowings.length > 0) {
            const clickedProfileFollowingsInfo = [];
            clickedProfileFollowings.forEach((follower) => {
                const followingInfo = allusers?.find((user) => user.UserName === follower);
                clickedProfileFollowingsInfo.push(followingInfo);
            });
            setclickedProfileFollowingsInfo(clickedProfileFollowingsInfo);
        } else {
            setclickedProfileFollowingsInfo([]);
        }
    }, [clickedProfileFollowers, clickedProfileFollowings]);


    const [userInfoFollowings, setFollowings] = useState([]);
    const [userInfoFollowers, setFollowers] = useState([]);
    const [userInfoFollowingUsernamesSent, setfollowingUsernamesSent] = useState([]);
    const [userInfoFollowerUsernamesReceived, setFollowerUsernamesReceived] = useState([]);

    useEffect(() => {
        if (userInfo.FollowingUsernames!= "") {
            const followingUserNamesArray = userInfo.FollowingUsernames.includes(',')
            ? userInfo.FollowingUsernames.split(',')
            : [userInfo.FollowingUsernames];
            setFollowings(followingUserNamesArray);
            
        } else {
            setFollowings([]);
        }
        if (userInfo.FollowerUsernames != "") {
            const followerUserNamesArray = userInfo.FollowerUsernames.includes(',')
            ? userInfo.FollowerUsernames.split(',')
            : [userInfo.FollowerUsernames];
            setFollowers(followerUserNamesArray);
            
        } else {
            setFollowers([]);
        }
        if (userInfo.FollowingUsernamesSent != "") {
            const followingUsernamesSentArray = userInfo.FollowingUsernamesSent.includes(',')
            ? userInfo.FollowingUsernamesSent.split(',')
            : [userInfo.FollowingUsernamesSent];
            setfollowingUsernamesSent(followingUsernamesSentArray);
        } else {
            setfollowingUsernamesSent([]);
        }
        if (userInfo.FollowerUsernamesReceived != "") {
            const followerUsernamesReceivedArray = userInfo.FollowerUsernamesReceived.includes(',')
            ? userInfo.FollowerUsernamesReceived.split(',')
            : [userInfo.FollowerUsernamesReceived];
            setFollowerUsernamesReceived(followerUsernamesReceivedArray);
        } else {
            setFollowerUsernamesReceived([]);
        }
    }, [userInfo]); 
  
    useEffect(() => {
        const isFollowing = userInfoFollowings.includes(clickedProfileInfo.UserName);
        const isPending = userInfoFollowingUsernamesSent.includes(clickedProfileInfo.UserName);
        const isPendingToAprove = userInfoFollowerUsernamesReceived.includes(clickedProfileInfo.UserName)   
        setPending(isPending);
        setIsPendingToAprove(isPendingToAprove);
        setIsFollowing(isFollowing);
    }, [clickedProfileInfo]);

    // handle follow button
    const handleFollow = async (event) => {
        event.preventDefault();
        const data = {
            sender_username: userInfo.UserName,
            receiver_username: clickedProfileUsername
        }

        try{
            const response = await fetch("http://localhost:8080/follow", {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                // send notification to clickedProfileUsername through ws if clickedProfileUsername is private
                if (clickedProfileInfo.Privacy === 'private') {
                    alert("Follow request sent");
                    const notification = {
                        type: "notification",
                        payload: {
                            senderUsername : userInfo.UserName,
                            receiverUsername : clickedProfileInfo.UserName,
                        }
                    };
                    if (props.socket) {
                        props.socket.send(JSON.stringify(notification));
                       dispatch({ type: "SET_FOLLOWNOTIFICATION", payload: notification.payload });
                    }
                }
            window.location.reload();
            } else {
                alert("Error sending follow request");
            }
        }
        catch(error){
            console.log(error);
        }
    }
   const handleUnfollow = async (event) => {
        event.preventDefault();
        const data = {
            sender_username: userInfo.UserName,
            receiver_username: clickedProfileUsername
        }

        try{
            const response = await fetch("http://localhost:8080/unfollow", {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("You unfollowed " + clickedProfileDisplayName + "");
                setIsFollowing(false);
                window.location.reload();
            } else {
                    alert("Error sending follow request");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const handleAcceptFollowRequest = async (event) => {
        const data = {
            sender_username: clickedProfileUsername,
            receiver_username: userInfo.UserName
        };
        try {
            const response = await fetch("http://localhost:8080/acceptfollowreq", {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("Follow request accepted");
                window.location.href = "/profile/" + userInfo.UserName;
            } else {
                alert("Error accepting follow request");
            }
        }
        catch(error) {
            console.log(error);
        }
    };
    const handleDeclineFollowRequest = async (event) => {
        const data = {
            sender_username: clickedProfileUsername,
            receiver_username: userInfo.UserName
        };
        try {
            const response = await fetch("http://localhost:8080/declinefollowreq", {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("Follow request declined");
                window.location.href = "/profile/" + userInfo.UserName;
            } else {
                alert("Error declined follow request");
            }
        }
        catch(error) {
            console.log(error);
        }
    };

  return (
        <div>
           <Topnav userDisplayname={props.userDisplayname} socket={props.socket}/>
            <div className="container-fluid">
                <section className="profileTopnav">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-8">
                            <div className="card">
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                <div className="flex-shrink-0">
                                    <img src={clickedProfileInfo.Avatar}
                                    className="img-fluid"/>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <div className="d-flex align-items-center">
                                        <h2 className="mb-0 mr-2"><strong>{clickedProfileDisplayName}</strong></h2>
                                        {clickedProfileInfo.Nickname && (
                                            <span className="nickname-text">
                                                <small className="text-muted">({clickedProfileInfo.Nickname})</small>
                                            </span>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                    style={{ backgroundColor: '#efefef' }}>
                                        <div className="px-3">
                                            <p className="small text-muted mb-1">
                                            Followers
                                            </p>
                                            <p className="mb-0">{clickedProfileFollowers.length}</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="small text-muted mb-1">
                                            Profile
                                            </p>
                                            <p className="mb-0">{clickedProfileInfo.Privacy}</p>
                                        </div>
                                    </div>
                                    {/* check from userInfo  */}
                                    <div className="d-flex pt-1">
                                    {isFollowing ? (
                                        <button type="button" className="btn btn-primary flex-grow-1" onClick={handleUnfollow}>
                                        Unfollow
                                        </button>
                                    ) : isPending ? (
                                        <button type="button" className="btn btn-primary flex-grow-1" disabled>
                                        Pending Follow Request
                                        </button>
                                    ) : isPendingToAprove ? (
                                        <div className="d-flex flex-column">
                                            <div className="row mb-2">
                                                <div className="col">
                                                <p className="mb-0">{clickedProfileDisplayName} requested to follow you</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                <div className="btn-group" role="group" aria-label="Follow Request Actions">
                                                    <button type="button" className="btn btn-primary mr-2" onClick={handleAcceptFollowRequest}>
                                                    Accept
                                                    </button>
                                                    <button type="button" className="btn btn-danger" onClick={handleDeclineFollowRequest}>
                                                    Decline
                                                    </button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    ) : (
                                        <button type="button" className="btn btn-primary flex-grow-1" onClick={handleFollow}>
                                        Follow
                                        </button>
                                    )
                                    }
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                {/* check from clickedProfileInfo */}
                {isPublic || (isPrivate && isFollowing) ? (
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            
                            <div className="bg-white rounded border shadow p-3">
                                <ul  >
                                    <li className="dropdown-item p-1 rounded">
                                        <div className="p-2">
                                            <p className="m-0"><strong>Intro</strong></p>
                                        </div>
                                         {clickedProfileInfo.AboutMe && (
                                            <h6 className="dropdown-item p-1 rounded text-center">
                                                <p className="text-center">{clickedProfileInfo.AboutMe}</p>
                                            </h6>
                                        )}
                                    </li>
                                        {clickedProfileInfo.Nickname && (
                                            <li className="dropdown-item p-1 rounded">
                                            <span><i className="fas fa-user"></i> <span className="name">{clickedProfileInfo.Nickname}</span></span>
                                            </li>
                                        )}
                                    <li className="my-2 p-1">
                                        <span><i className="fas fa-edit"></i> <span className="name">{clickedProfileInfo.Email}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"></i> <span className="name">{formattedDOB}</span></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white rounded border shadow p-3">
                                <div className="p-2">
                                    <p className="m-0"><strong>Followers</strong></p>
                                </div>
                                {/* followers box */}
                                <div className="follow-box-content p-1 m-0 d-flex">
                                    {clickedProfileFollowers.length === 0 ? (
                                        <p className="m-0">{clickedProfileDisplayName} has no followers</p>
                                    ) : (
                                        // If not empty, map over the followers
                                        clickedProfileFollowersInfo.map((follower) => (
                                            <div className="p-2" key={follower.UserName}>
                                              <Link to={`/othersprofile/${follower.UserName}`} className="text-decoration-none text-dark">
                                                <div className="fellows d-flex align-items-center">
                                                  <AvatarSquare avatar={follower.Avatar} />
                                                </div>
                                                <div className="fellows d-flex align-items-center">
                                                  <p className="m-0">{follower.FirstName + " " + follower.LastName}</p>
                                                </div>
                                              </Link>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded border shadow p-3">
                                <div className="p-2">
                                    <p className="m-0"><strong>Followings</strong></p>
                                </div>
                                {/* followings box */}
                                <div className="follow-box-content p-1 m-0 d-flex">
                                    {clickedProfileFollowings.length === 0 ? (
                                        <p className="m-0">{clickedProfileDisplayName} has no followings</p>
                                    ) : (
                                        // If not empty, map over the followings
                                        clickedProfileFollowingsInfo.map((following) => (
                                            <div className="p-2" key={following.UserName}>
                                              <Link to={`/othersprofile/${following.UserName}`} className="text-decoration-none text-dark">
                                                <div className="fellows d-flex align-items-center">
                                                  <AvatarSquare avatar={following.Avatar} />
                                                </div>
                                                <div className="fellows d-flex align-items-center">
                                                  <p className="m-0">{following.FirstName + " " + following.LastName}</p>
                                                </div>
                                              </Link>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <OthersPostCard isFollowing={isFollowing} />
                        </div>
                    </div>
                </div>
                ): null}
            </div>
        </div>
    )
}

export default OthersProfile;
