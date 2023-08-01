import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./views/Login";
import Home from "./views/Home/Home";
import MyProfile from "./views/Profile/MyProfile";
import MyGroups from "./views/Groups/MyGroups";
import HomeGroup from "./views/Groups/HomeGroup";
import Chat from "./views/Chat/Chat";
import SingleGroup from "./views/Groups/SingleGroup";
import AllGroups from "./views/Groups/AllGroups";
import OthersProfile from "./views/Profile/OthersProfile";
// import CreatePost from "./components/CreatePost/CreatePost";
// import CreatePostModal from "./components/Modal/CreatePostModal";
// import Topnav from "./views/Topnav";
// import Error from "./views/Error/Error";
// import SingleGroupNonMember from "./views/Groups/SingleGroupNonMember";
// import GroupSidenav from "./views/Groups/GroupSidenav";
// import SingleEvent from "./views/Events/SingleEvent";
// import SearchbarGlobal from "./components/Searchbar/SearchbarGlobal";
// import { click } from "@testing-library/user-event/dist/click";

//import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";
const eventStruct = {
  type: String,
  payload: Object,
};


function App() {
  const dispatch = useDispatch();
  const chatMateusername = useSelector((state) => state.chatMateUsername);
  const routeEvent = (event) => {
    switch (event.type) {
      case "message_notification"
        : {
          // if the user is in the chat page, then update the chat page
          if (window.location.pathname === "/chat") {
            // render chat messages
            dispatch({ type: "SET_CHATMESSAGES", payload: event.payload });
          } else {
            // set chatNotification to true
            dispatch({ type: "SET_CHATNOTIFICATION", payload: true });
            break;
          }
        }
      case "acknowledgement"
        : {
          // dispatch event.data.loggedinUsers to redux store
          if (event) {
            if (event.payload.loggedInUsers) {
              let loggedinUsers = event.payload.loggedInUsers;
              dispatch({ type: "SET_LOGGEDINUSERS", payload: loggedinUsers });
              // console.log("loggedinUsers", loggedinUsers);
            }
          }
          break;
        }
        case "notification"
        : {
          console.log("notification event", event);
          if (event) {
            if (event.payload) {
              if (event.payload.receiverUsername === userInfo.UserName) {
                if (event.payload.senderUsername) {
                  dispatch({ type: "SET_NOTIFICATION", payload: true });
                }
                window.location.reload();
              }
            }
          }
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

  const isAuth = useSelector((state) => state.isAuth);
  let conn;
  const userInfo = useSelector((state) => state.userInfo);
  const [userDisplayname, setUserDisplayname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [ws, setConn] = useState(null);
  const [myGroups, setMyGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  useEffect(() => {
    if (isAuth) {
      const userDisplayname = userInfo.FirstName + " " + userInfo.LastName;
      const username = userInfo.UserName;
      setUsername(username);
      const cookieString = document.cookie; // session-name-0b19be69-f99d-4ce4-ab80-5f053208f212=MTY4NzE3MjEyM3xEdi1CQkFFQ180SUFBUkFCRUFBQUpmLUNBQUVHYzNSeWFXNW5EQThBRFdGMWRHaGxiblJwWTJGMFpXUUVZbTl2YkFJQ0FBRT18gCtLiTcvz5Bk5CId1ybd3bJJUpE7jgHP3JBNtVnO_30=
      let token 
      if (cookieString.split("session-name-")[1]) {
        token = cookieString.split("session-name-")[1].split("=")[0];
      }
      localStorage.setItem("token", token);
      setUserDisplayname(userDisplayname);

      setTimeout(() => {
        // all browsers have window object, to check if the browser supports websockets
        if (window["WebSocket"]) {
          console.log("WebSocket is supported by your Browser!");
          // connect to ws
          const user = decodeJwt(token);
          if (user) {
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
              routeEvent(eventData);
            };
          } else {
            console.log("user is null");
             // clear redux and user info and token from local storage and session storage
            localStorage.removeItem("reduxState");
            sessionStorage.removeItem("userInfo");
            localStorage.removeItem("token");

            // clear all cookies for this site
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i];
              const eqPos = cookie.indexOf("=");
              const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie =
                name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost";
            }
            window.location.href = "/login";
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
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (res.ok) {
              const data = await res.json();
              // setAllUsers to include users that are not the current user
              const filteredData = data.filter((user) => user.email !== email);
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
        } else {
          console.log("not authenticated");
          // clear redux and user info and token from local storage and session storage
          localStorage.removeItem("reduxState");
          sessionStorage.removeItem("userInfo");
          localStorage.removeItem("token");
        }
    }
  }, [isAuth]);
  useEffect(() => {
    if (isAuth) {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("token");
          const headers = new Headers();
          headers.append("Authorization", "Bearer " + token);
          headers.append("Content-Type", "application/json");
          const res = await fetch(`http://localhost:8080/getUserByUsername?senderUsername=${userInfo.UserName}`, {
            method: "GET",
            headers: headers,
          });
          if (res.ok) {
            const data = await res.json();
            dispatch({ type: "SET_USER", payload: data });
            sessionStorage.setItem("userInfo", JSON.stringify(data));
          } else {
            console.log("error");
          }
        } catch (error) {
          // Handle error
          console.log(error);
        }
      };
      if (isAuth) {
        fetchUserInfo();
      } else {
        console.log("not authenticated");
        // clear redux and user info and token from local storage and session storage
        localStorage.removeItem("reduxState");
        sessionStorage.removeItem("userInfo");
        localStorage.removeItem("token");
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
          const res = await fetch("http://localhost:8080/getgroups", {
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
      } else {
        localStorage.removeItem("reduxState");
        sessionStorage.removeItem("userInfo");
        localStorage.removeItem("token");
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
          console.log(error);
        }
      };
      if (isAuth) {
        fetchInvitesByAdmin();
      } else {
        localStorage.removeItem("reduxState");
        sessionStorage.removeItem("userInfo");
        localStorage.removeItem("token");
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
              socket={ws}
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
              socket={ws}
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
              socket={ws}
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
              socket={ws}
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
              socket={ws}
            />
          </div>
        }
      />
      <Route
        path="/othersprofile/:username"
        element={
          <div>
            <OthersProfile userInfo={userInfo} userDisplayname={userDisplayname} socket={ws}/>
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