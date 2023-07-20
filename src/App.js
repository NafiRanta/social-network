import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import { click } from "@testing-library/user-event/dist/click";

//import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";
const eventStruct = {
  type: '',
  payload: null,
};


function App() {
  const chatMateusername = useSelector((state) => state.chatMateUsername);
  const routeEvent = (event) => {
    switch (event.type) {
      case "message_notification"
        : {
          // if the user is in the chat page, then update the chat page
          console.log("event.payload", event.payload);

          if (window.location.pathname === "/chat") {
              // if chosen user is the same as the user that sent the message
              if (event.payload) {
                if (event.payload.senderUsername == chatMateusername) {
                  // update the chat page
                  console.log("update the chat page");
                  
                } else {
                  // show the notification on the sender icon
                  console.log("show the notification on the sender icon");
                }
              }
            } else {
              // show the notification on the chat bubble icon
              console.log("show the notification on the chat icon");
          break;
        }
      }
      case "acknowledgement"
        : {
          // dispatch event.data.loggedinUsers to redux store
          if (event) {
            const loggedinUsers = event.payload.loggedInUsers;
            dispatch({ type: "SET_LOGGEDINUSERS", payload: loggedinUsers });
          }
          break;
        }
      }
  }
  const decodeJwt = (jwt) => {
    if (!jwt) {
      return null; // Or handle the error in an appropriate way
    }

    const base64Url = jwt.split(".")[1];
    if (!base64Url) {
      return null; // Or handle the error in an appropriate way
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);
    const result = JSON.parse(decoded);
    return result;
  };

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuth);
  let conn;
  const userInfo = useSelector((state) => state.userInfo);
  const [userDisplayname, setUserDisplayname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [allusers, setAllUsers] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [ws, setConn] = useState(null);
  useEffect(() => {
    if (isAuth) {
      const userDisplayname = userInfo.firstname + " " + userInfo.lastname;
      const username = userInfo.username;
      setUsername(username);
      const cookieString = document.cookie; // session-name-0b19be69-f99d-4ce4-ab80-5f053208f212=MTY4NzE3MjEyM3xEdi1CQkFFQ180SUFBUkFCRUFBQUpmLUNBQUVHYzNSeWFXNW5EQThBRFdGMWRHaGxiblJwWTJGMFpXUUVZbTl2YkFJQ0FBRT18gCtLiTcvz5Bk5CId1ybd3bJJUpE7jgHP3JBNtVnO_30=
      const token = cookieString.split("session-name-")[1].split("=")[0];
      localStorage.setItem("token", token);
      setUserDisplayname(userDisplayname);

      setTimeout(() => {
        // all browsers have window object, to check if the browser supports websockets
        if (window["WebSocket"]) {
          console.log("WebSocket is supported by your Browser!");
          // connect to ws
          const user = decodeJwt(token);
          conn = new WebSocket(
            "ws://" + "localhost:8080" + "/ws?otp=" + user.userID
          );
          setConn(conn);
          conn.onopen = function () {
            console.log("Connection opened");
          };

          conn.onclose = function (evt) {
            console.log("Connected to WebSocket: false");
          };

          conn.onmessage = function (evt) {
            const eventData = JSON.parse(evt.data);
            console.log("eventData", eventData);
            // const event = Object.assign(new Event(eventData.type, eventData) );
            // const event = new Event(eventData.type, eventData.payload);
            eventStruct.type = eventData.type;
            eventStruct.payload = eventData.payload;
            console.log("event at onmessage", eventStruct);
            routeEvent(eventStruct);
          };
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
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (res.ok) {
              const data = await res.json();
              // setAllUsers to include users that are not the current user
              const filteredData = data.filter((user) => user.email !== email);
              setAllUsers(filteredData);
              console.log("allusers", filteredData);
              dispatch({ type: "FETCH_ALLUSERS", payload: filteredData });
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
  }, [isAuth]);

  // get all groups that the user is a member of or admin from /getmygroups
  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      const fetchGroups = async () => {
        try {
          const res = await fetch("http://localhost:8080/getmygroups", {
            method: "GET",
            headers: headers,
          });
          if (res.ok) {
            const data = await res.json();
            // add userMemberGroups and adminGroups to one object
            const mygroups = [
              ...(data.userMemberGroups || []),
              ...(data.userAdminGroups || []),
            ];
            setMyGroups(mygroups);
            setAllGroups(data.allGroups || []);
            dispatch({ type: "SET_MYGROUPS", payload: mygroups });
            dispatch({ type: "SET_ALLGROUPS", payload: data.allGroups || [] });
          } else {
            console.log("error");
          }
        } catch (error) {
          // Handle error
          console.log(error);
        }
      };
      if (isAuth) {
        fetchGroups();
      }
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      const fetchInvitesByAdmin = async () => {
        try {
          const res = await fetch("http://localhost:8080/invitesbyadmin", {
            method: "GET",
            headers: headers,
          });
          if (res.ok) {
            const data = await res.json();
            dispatch({ type: "SET_INVITESBYADMIN", payload: data });
          } else {
            console.log("error");
          }
        } catch (error) {
          // Handle error
          console.log(error);
        }
      };
      if (isAuth) {
        fetchInvitesByAdmin();
      }
    }
  }, [isAuth]);

  return (
    <Routes>
      {isAuth ? (
        <Route
          path="/"
          element={
            <div>
              <Home
                userInfo={userInfo}
                userDisplayname={userDisplayname}
                allusers={allusers}
              />
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
            <Chat
              userInfo={userInfo}
              username={username}
              userDisplayname={userDisplayname}
              allusers={allusers}
              socket={ws}
            />
          </div>
        }
      />
      <Route
        path="/groups"
        element={
          <div>
            <HomeGroup
              userInfo={userInfo}
              username={username}
              userDisplayname={userDisplayname}
              allusers={allusers}
            />
          </div>
        }
      />
      <Route
        path="/allgroups"
        element={
          <div>
            <AllGroups
              userInfo={userInfo}
              username={username}
              userDisplayname={userDisplayname}
              allusers={allusers}
            />
          </div>
        }
      />
      <Route
        path="/mygroups"
        element={
          <div>
            <MyGroups
              userInfo={userInfo}
              username={username}
              userDisplayname={userDisplayname}
              allusers={allusers}
            />
          </div>
        }
      />
      <Route
        path="/profile/:userDisplayname"
        element={
          <div>
            <MyProfile
              userDisplayname={userDisplayname}
              username={username}
              allusers={allusers}
            />
          </div>
        }
      />
      <Route
        path="/singlegroup/:groupid"
        element={
          <div>
            <SingleGroup
              userInfo={userInfo}
              username={username}
              userDisplayname={userDisplayname}
              allusers={allusers}
            />
          </div>
        }
      />
      {/* <Route
        path="/othersprofile/:username"
        // pass :username to othersprofile
        element={
          <div>
            <OthersProfile userInfo={userInfo} userDisplayname={userDisplayname} allusers={allusers}/>
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
