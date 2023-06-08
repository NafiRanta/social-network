import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home/Home";
import HomeSidenav from "./views/Home/HomeSidenav";
import CreatePost from "./components/CreatePost/CreatePost";
import CreatePostModal from "./components/Modal/CreatePostModal";
import Topnav from "./views/Topnav";
import Profile from "./views/Profile/Profile";
import MyGroups from "./views/Groups/MyGroups";
import HomeGroup from "./views/Groups/HomeGroup";
import Chat from "./views/Chat/Chat";
import SingleGroup from "./views/Groups/SingleGroup";
import Error from "./views/Error/Error";
import SingleGroupNonMember from "./views/Groups/SingleGroupNonMember";
import GroupSidenav from "./views/Groups/GroupSidenav";
import AllGroups from "./views/Groups/AllGroups";

function App() {
  const isAuth = !!localStorage.getItem("userInfo");
  console.log(isAuth)

  // if isAuth is true, get username from localStorage
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (isAuth) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const username = userInfo.firstname + " " + userInfo.lastname;
      setUsername(username);
    }
  }, [isAuth]);

  return (
 <Routes>
    {isAuth ? (
         <Route   
         path="/"
         element={
           <div>
              <Topnav username={username} />
              <Home username={username} />
           </div>
           
         }/>
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
        element={<Chat username={username} />} 
      />
      <Route
        path="/groups"
        element={
          <div>
            <Topnav username={username} />
            <HomeGroup username={username} />
          </div>
       } 
      />
       <Route
        path="/allgroups"
        element={
          <div>
            <Topnav username={username} />
            <AllGroups username={username} />
          </div>
       } 
      />
       <Route
        path="/mygroups"
        element={
          <div>
            <Topnav username={username} />
            <MyGroups username={username} />
          </div>
       } 
      />
  </Routes>  
   //<Home />
    //<Profile />
     //<GroupsList />
    //<SingleGroup />
    // <SingleGroupNonMember />
   //<Chat />
   //<Error />
 // <HomeGroup />
  //<Login />
  //<Topnav />
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