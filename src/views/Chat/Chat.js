import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import "../Chat/Chat.css";
import Avatar from "../../components/Avatar/Avatar";
import Topnav from "../Topnav";
import { decodeJwt } from "../../components/Card/PostCard";
import { useDispatch } from "react-redux";

function useChatMessages(
  selectedChatMateUsername,
  senderUsername,
  token,
  handleMessageSubmit
) {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const fetchChatMessages = async () => {
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      try {
        const response = await fetch(
          `http://localhost:8080/messages?username=${senderUsername}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (!data) {
            return null;
          }
          const filteredData = data.filter(
            (message) =>
              (message.senderUsername === senderUsername &&
                message.receiverUsername === selectedChatMateUsername) ||
              (message.senderUsername === selectedChatMateUsername &&
                message.receiverUsername === senderUsername)
          );
          filteredData.sort((a, b) => (a.sentAt > b.sentAt ? 1 : -1));
          setChatMessages(filteredData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatMessages();
  }, [selectedChatMateUsername, senderUsername, token, handleMessageSubmit]);

  return chatMessages;
}

function Chat(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const allusers = useSelector((state) => state.allUsers);
  const loggedinUsers = useSelector((state) => state.loggedinUsers);
  const token = localStorage.getItem("token");
  const [selectedChatMateUsername, setSelectedChatMateUsername] = useState("");
  const [selectedChatMateDisplayname, setSelectedChatMateDisplayname] =
    useState("");
  const [senderUsername, setSenderUsername] = useState(userInfo.username);
  const [senderDisplayname, setSenderDisplayname] = useState(
    props.userDisplayname
  );
  const mygroups = useSelector((state) => state.myGroups);

  const handleUserClick = (chatMateDisplayName, chatMateUsername) => {
    const chatMate = allusers.find(
      (chatMate) => chatMate.username === chatMateUsername
    );
    setSelectedChatMateDisplayname(chatMateDisplayName);
    setSelectedChatMateUsername(chatMate.username);
    dispatch ({ type: "SET_CHATMATEUSERNAME", payload: chatMate.username });
  };

  const handleGroupClick = (chatMateDisplayName, chatMateUsername) => {
    setSelectedChatMateDisplayname(chatMateDisplayName);
    setSelectedChatMateUsername(chatMateUsername);
    dispatch ({ type: "SET_CHATMATEUSERNAME", payload: chatMateUsername });
  };

  const displayAllUsers = () => {
    if (!allusers) {
      return null;
    }
    // save all users except the current user to a variable called filteredData
    let filteredData = allusers.filter(
      (user) => user.username !== userInfo.username
    );
    // sort the filteredData by firstname
    filteredData.sort((a, b) => (a.firstname > b.firstname ? 1 : -1));
    // map the filteredData to display all users except the current user
    return filteredData.map((user) => {
      const chatMatedisplayName = user.firstname + " " + user.lastname;
      const chatMateusername = user.username;
      const isUserLoggedIn = loggedinUsers.includes(chatMateusername);

      return (

        <div key={chatMateusername}>
          <ul className="users">
            <li
              className="person"
              data-chat="person1"
              onClick={() =>
                handleUserClick(chatMatedisplayName, chatMateusername)
              }
            >
              <div className="user">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="rounded-circle me-2"
                />
                <span className={`status ${isUserLoggedIn ? 'online' : 'offline'}`}></span>
              </div>
              <p className="name-time">
                <span className="name">{chatMatedisplayName}</span>
              </p>
            </li>
          </ul>
        </div>
      );
    });
  };

  const displayGroupChats = () => {
    if (!mygroups) {
      return null;
    }
    // save GroupName and GroupID to a variable called filteredData
    let filteredData = mygroups.map((group) => {
      return {
        GroupName: group.GroupName,
        GroupID: group.GroupID,
      };
    });
    // sort the filteredData by GroupName
    filteredData.sort((a, b) => (a.GroupName > b.GroupName ? 1 : -1));
    // map the filteredData to display all groups
    return filteredData.map((group) => {
      const chatMatedisplayName = group.GroupName;
      const chatMateusername = group.GroupID;
      dispatch ({ type: "SET_CHATMATEUSERNAME", payload: chatMateusername });
      return (
        <div key={chatMateusername}>
          <ul className="users">
            <li
              className="person"
              data-chat="person1"
              onClick={() =>
                handleGroupClick(chatMatedisplayName, chatMateusername)
              }
            >
              <div className="user">
              <img
                src={process.env.PUBLIC_URL + '/defaultImg/default-avatar.jpeg'}
                alt="avatar"
                className="rounded-circle me-2"
                />

                <span className="status busy"></span>
              </div>
              <p className="name-time">
                <span className="name">{chatMatedisplayName}</span>
              </p>
            </li>
          </ul>
        </div>
      );
    });
  };
  

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const content = document.getElementById(
      `submitMessageBtn${selectedChatMateUsername}`
    ).value;
    const sentAt = new Date();
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");
    const messagedata = {
      content: content,
      senderUsername: senderUsername,
      receiverUsername: selectedChatMateUsername,
      sentAt: sentAt,
    };
    // send message_notification to receiver through websocket. message_notification is an object with the following properties: senderUsername, receiverUsername, type: "message_notification"
    const payload = {
      senderUsername: senderUsername,
      receiverUsername: selectedChatMateUsername,
    };
    const messageNotification = {
      type: "message_notification",
      payload: payload,
    };
    
    // send message_notification to receiver through websocket
    props.socket.send(JSON.stringify(messageNotification));

    try {
      const response = await fetch("http://localhost:8080/sendmessage", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(messagedata),
      });
      if (!response.ok) {
        throw new Error("Error occurred while sending message ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const chatMessages = useChatMessages(
    selectedChatMateUsername,
    senderUsername,
    token,
    handleMessageSubmit
  );
    
  // get chatMate avatar
  const chatMateUser = allusers.filter(
    (user) => user.username == selectedChatMateUsername
  );
  let chatMateAvatar = process.env.PUBLIC_URL + '/defaultImg/default-avatar.jpeg';
  if (chatMateUser) {
    if (chatMateUser[0]) {
      chatMateAvatar = chatMateUser[0].avatar;
    }
  }

  return (
    <div>
      <Topnav
        userDisplayname={props.userDisplayname}
        allusers={props.allusers}
      />
      <div className="container-fluid">
        <div className="row justify-content-evenly">
          <div className="col-12 col-lg-3 sidebar">
            <div className="chat-title">
              <p className="fs-4 m-0">
                <strong>Chats</strong>
              </p>
            </div>
            <div className="users-container">
              <div className="chat-category">
                <ul
                  className="nav nav-pills nav-fill mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="pills-inbox-tab"
                      data-toggle="pill"
                      href="#pills-inbox"
                      role="tab"
                      aria-controls="pills-inbox"
                      aria-selected="false"
                    >
                      Inbox
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="pills-communities-tab"
                      data-toggle="pill"
                      href="#pills-communities"
                      role="tab"
                      aria-controls="pills-communities"
                      aria-selected="false"
                    >
                      Communities
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade"
                    id="pills-inbox"
                    role="tabpanel"
                    aria-labelledby="pills-inbox-tab"
                  >
                    <div className="container" id="chatUsers">
                      {displayAllUsers()}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-communities"
                    role="tabpanel"
                    aria-labelledby="pills-communities-tab"
                  >
                    <div className="container" id="chatUsers">
                      {displayGroupChats()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 pb-5 p-3">
            <div className="d-flex flex-column justify-content-center w-100">
              <div className="selected-user">
                <span>
                  To:{" "}
                  <span className="name" id="chatUsernameTitle">
                    {selectedChatMateDisplayname}
                  </span>
                </span>
              </div>
              <div className="chat-container" id="chatArea">
                {chatMessages.map((message) => {
                  const sentAt = new Date(message.sentAt).toLocaleString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }
                  );
                  if (message.senderUsername === senderUsername) {
                    return (
                      <ul
                        className="chatview-box chatContainerScroll"
                        id="chatmessagesSelectedChatMate"
                      >
                        <li className="chat-right">
                          <div className="chat-avatar">
                            <Avatar />
                            <div className="chat-name">{senderDisplayname}</div>
                          </div>
                          <div className="chat-text">{message.content}</div>
                          <div className="chat-hour">
                            {sentAt}{" "}
                            <span className="fa fa-check-circle"></span>
                          </div>
                        </li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul
                        className="chatview-box chatContainerScroll"
                        id="chatmessagesSelectedChatMate"
                      >
                        <li className="chat-left">
                          <div className="chat-avatar">
                            {/* display chatMate avatar */}
                            <img src={chatMateAvatar} alt="avatar" className="rounded-circle me-2" id="avatar"/>
                            <div className="chat-name">
                              {selectedChatMateDisplayname}
                            </div>
                          </div>
                          <div className="chat-text">{message.content}</div>
                          <div className="chat-hour">
                            {sentAt}{" "}
                            <span className="fa fa-check-circle"></span>
                          </div>
                        </li>
                      </ul>
                    );
                  }
                })}
              </div>
              <div className="form-group mt-3 mb-0" id="chatroomMessageArea">
                <form
                  className="chatroom-message"
                  id={`chatroom-message${selectedChatMateUsername}`}
                >
                  <div className="row">
                    <div className="col-10">
                      <textarea
                        className="form-control"
                        rows="3"
                        id={`submitMessageBtn${selectedChatMateUsername}`}
                        placeholder={`Message @${selectedChatMateDisplayname}`}
                      ></textarea>
                    </div>
                    <div className="col-2 col-sm-2 d-flex align-items-center justify-content-center">
                      <button 
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleMessageSubmit}
                        >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
