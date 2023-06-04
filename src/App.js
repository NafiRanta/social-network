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
import GroupsList from "./views/Groups/GroupsList";
import HomeGroup from "./views/Groups/HomeGroup";
import Chat from "./views/Chat/Chat";
import SingleGroup from "./views/Groups/SingleGroup";
import Error from "./views/Error/Error";
import SingleGroupNonMember from "./views/Groups/SingleGroupNonMember";

function App() {
  const isAuth = !!localStorage.getItem("userInfo");
  console.log(isAuth)
 /*  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const username = userInfo ? userInfo.FirstName + " " + userInfo.LastName  : '';
   */
  return (
/*   <Routes>
    {isAuth ? (
         <Route   
         path="/"
         element={
           <div>
              <HomeSidenav username={username} />
              <Home username={username} />
              <Topnav username={username} />
              <CreatePost username={username} />
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
  </Routes>  */
   //<Home />
    <Profile />
     //<GroupsList />
    //<SingleGroup />
    // <SingleGroupNonMember />
   // <Chat />
   //<Error />
  //<HomeGroup />
  //<Login />
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