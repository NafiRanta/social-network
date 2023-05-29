import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import GroupsList from "./views/Groups/GroupsList";
import HomeGroup from "./views/Groups/HomeGroup";
import Chat from "./views/Chat/Chat";
import SingleGroup from "./views/Groups/SingleGroup";

function App() {
  const isAuth = !!localStorage.getItem("userInfo");
  console.log(isAuth)
  return (
    <Routes>
    {isAuth ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Navigate replace to="/login" />} />
      )}
    {!isAuth ? (
        <Route path="/login" element={<Login />} />
      ) : (
        <Route path="/login" element={<Navigate replace to="/" />} />
      )}
  </Routes>
    // <Home />
    // <Profile />
    // <GroupsList />
    // <HomeGroup />
    //<Chat />
    // <SingleGroup />
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