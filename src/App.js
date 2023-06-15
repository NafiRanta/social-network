import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home/Home";
import HomeSidenav from "./views/Home/HomeSidenav";
import CreatePost from "./components/CreatePost/CreatePost";
import CreatePostModal from "./components/Modal/CreatePostModal";
import Topnav from "./views/Topnav";
import MyProfile from "./views/Profile/MyProfile";
import MyGroups from "./views/Groups/MyGroups";
import HomeGroup from "./views/Groups/HomeGroup";
import Chat from "./views/Chat/Chat";
import SingleGroup from "./views/Groups/SingleGroup";
import Error from "./views/Error/Error";
import SingleGroupNonMember from "./views/Groups/SingleGroupNonMember";
import GroupSidenav from "./views/Groups/GroupSidenav";
import AllGroups from "./views/Groups/AllGroups";
import OthersProfile from "./views/Profile/OthersProfile";
import SingleEvent from "./views/Events/SingleEvent";
import SearchbarGlobal from "./components/Searchbar/SearchbarGlobal";

function App() {
  const isAuth = !!localStorage.getItem("userInfo");
  
  // if isAuth is true, get username from localStorage
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [profilePicture, setProfilePic] = useState("");
  const [nickname, setNickname] = useState("");
  const [allusers, setAllUsers] = useState([]);

  useEffect(() => {
    if (isAuth) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const username = userInfo.firstname + " " + userInfo.lastname;
      const nickname = userInfo.nickname;
      setUsername(username);
      setEmail(userInfo.email);
      setDob(userInfo.dob);
      setProfilePic(userInfo.profilePicture);
      setNickname(nickname);
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      const fetchUsers = async () => {
        try {
          const res = await fetch("http://localhost:8080/users", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (res.ok) {
            const data = await res.json();
            // setAllUsers to include users that are not the current user
            const filteredData = data.filter((user) => user.email !== email);
            setAllUsers(filteredData);
          } else {
            console.log("error");
          }
        } catch (error) {
          // Handle error
          console.log(error);
        }
      };
      if (isAuth) {
        fetchUsers();
      }
    }
  }, [isAuth, email]);

  return (
    <Routes>
      {isAuth ? (
        <Route
          path="/"
          element={
            <div>
              <Home username={username} profilePicture={profilePicture} allusers={allusers} />
            </div>
          }
        />
      ) : (
        <Route path="/" element={<Navigate replace to="/login" />} />
      )}
    {!isAuth ? (
        <Route path="/login" element={<Login />} />
      ) : (
        <Route path="/login" element={<Navigate replace to="/" />} />
      )}
      <Route
        path="/chat"
        element={
          <div>
            <Chat username={username} profilePicture={profilePicture} allusers={allusers}/>
          </div>
          } 
      />
      <Route
       path="/groups"
        element={
          <div>
            <HomeGroup username={username} profilePicture={profilePicture} allusers={allusers}/>
          </div>
       } 
      />
       <Route
        path="/allgroups"
        element={
          <div>
            <AllGroups username={username} profilePicture={profilePicture} allusers={allusers}/>
          </div>
       } 
      />
       <Route
        path="/mygroups"
        element={
          <div>
            <MyGroups username={username} profilePicture={profilePicture} allusers={allusers}/>
          </div>
       } 
      />
       <Route
        path="/profile/:username"
        
        element={
          <div>
            <MyProfile username={username} email={email} dob={dob} profilePicture={profilePicture} nickname={nickname} allusers={allusers}/>
          </div>
       } 
      />
      <Route
        path="/singlegroup"
        element={
          <div>
            <SingleGroup username={username} profilePicture={profilePicture} allusers={allusers}/>
          </div>
       } 
      />
       <Route
        path="/othersprofile/:username"
        
        element={
          <div>
            <OthersProfile username={username} profilePicture={profilePicture} allusers={allusers}/>
          </div>
       } 
      />
  </Routes>  
  );
}

export default App;


//TODO: Add a 404 page
function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}