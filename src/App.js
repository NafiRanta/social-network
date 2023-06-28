import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from "./views/Login";
import Home from "./views/Home/Home";
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

// Retrieve the value of the "token" cookie
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

function App() {
  const isAuth = useSelector((state) => state.isAuth);
  let conn;

  const userInfo = useSelector((state) => state.userInfo);
  console.log("userInfoFromStore", userInfo);
  // const isAuth = !!localStorage.getItem("userInfo");
 // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // if isAuth is true, get username from localStorage
  //const [userInfo, setUserInfo] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [allusers, setAllUsers] = useState([]);

  useEffect(() => {
    if (isAuth) {
      //const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const usernameDisplay = userInfo.firstname + " " + userInfo.lastname;
      const cookieString = document.cookie; // session-name-0b19be69-f99d-4ce4-ab80-5f053208f212=MTY4NzE3MjEyM3xEdi1CQkFFQ180SUFBUkFCRUFBQUpmLUNBQUVHYzNSeWFXNW5EQThBRFdGMWRHaGxiblJwWTJGMFpXUUVZbTl2YkFJQ0FBRT18gCtLiTcvz5Bk5CId1ybd3bJJUpE7jgHP3JBNtVnO_30=
      const token = cookieString.split("session-name-")[1].split("=")[0]; 
      localStorage.setItem("token", token);
      setUsername(usernameDisplay);
     //setUserInfo(userInfo);


     setTimeout(() => {
      // all browsers have window object, to check if the browser supports websockets
      if (window["WebSocket"]){
          console.log("WebSocket is supported by your Browser!");
          // connect to ws
          console.log("token", token)
          conn = new WebSocket("ws://" + "localhost:8080" + "/ws?otp="+ token);
          console.log("conn", conn)
          conn.onopen = function() {
              console.log("Connection opened");
          };

          conn.onclose = function(evt){
              console.log("Connected to WebSocket: false")
          }
          
          conn.onmessage = function(evt){
              const eventData = JSON.parse(evt.data);
              console.log("eventData", eventData)
             // const event = Object.assign(new Event, eventData);
              //routeEvent(event);
          }
      } else {
          alert("WebSocket is not supported by your Browser!");
      }
  }, 500);


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
              <Home userInfo={userInfo} username={username} allusers={allusers}/>
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
            <Chat userInfo={userInfo} username={username} allusers={allusers}/>
          </div>
          } 
      />
      <Route
       path="/groups"
        element={
          <div>
            <HomeGroup userInfo={userInfo} username={username} allusers={allusers}/>
          </div>
       } 
      />
       <Route
        path="/allgroups"
        element={
          <div>
            <AllGroups userInfo={userInfo} username={username} allusers={allusers}/>
          </div>
       } 
      />
       <Route
        path="/mygroups"
        element={
          <div>
            <MyGroups userInfo={userInfo} username={username} allusers={allusers} />
          </div>
       } 
      />
       <Route
        path="/profile/:username"
        element={
          <div>
            <MyProfile username={username} allusers={allusers} />
          </div>
       } 
      />
      <Route
        path="/singlegroup"
        element={
          <div>
            <SingleGroup userInfo={userInfo} username={username} allusers={allusers}/>
          </div>
       } 
      />
       {/* <Route
        path="/othersprofile/:username"
        // pass :username to othersprofile
        element={
          <div>
            <OthersProfile userInfo={userInfo} username={username} allusers={allusers}/>
          </div>
       } 
      /> */}
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