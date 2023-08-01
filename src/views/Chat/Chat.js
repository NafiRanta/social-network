import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import "../Chat/Chat.css";
import Avatar from "../../components/Avatar/Avatar";
import Topnav from "../Topnav";
import { useDispatch } from "react-redux";

function useChatMessages(
  selectedChatMateUsername,
  senderUsername,
  token,
  handleMessageSubmit,
  activeTab,
  allusers,
) {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const fetchChatMessages = async () => {
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      if (activeTab === "inbox") {
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
            // if inbox tab is selected, filter the data to display only the messages sent to the current user
            const filteredData = data.filter(
              (message) =>
                (message.senderUsername === senderUsername &&
                  message.receiverUsername === selectedChatMateUsername) ||
                (message.senderUsername === selectedChatMateUsername &&
                  message.receiverUsername === senderUsername)
            );
            filteredData.sort((a, b) => (a.sentAt > b.sentAt ? 1 : -1));
            const addSenderInfo = (chatMessages) => {
              let updatedMessages = [];
              allusers.forEach((user) => {
                chatMessages?.forEach((message) => {
                  const updatedMessage = { ...message };
                  // Check if the senderUsername of the current message matches the user's username
                  if (updatedMessage.senderUsername === user.UserName) {
                    updatedMessage.senderDisplayname = user.FirstName + " " + user.LastName;
                    updatedMessage.senderAvatar = user.Avatar;
                    updatedMessages.push(updatedMessage);
                  }
                });
              });
              return updatedMessages;
            };
            const moreFilteredData = addSenderInfo(filteredData);
            setChatMessages(moreFilteredData);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (activeTab === "communities") {
        try {
          const response = await fetch(
            `http://localhost:8080/groupmessages?groupID=${selectedChatMateUsername}`,
            {
              method: "GET",
              headers: headers,
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (!data) {
              return chatMessages;
            }
            // if group tab is selected, filter the data to display only the messages sent to the current group
            const filteredData = data.filter(
              (message) => message.receiverUsername === selectedChatMateUsername
            );

             // loop through the chatMessages array and add senderDisplayname and senderAvatar to each message
            const addSenderInfo = (chatMessages) => {
              let updatedMessages = [];
              allusers.forEach((user) => {
                chatMessages?.forEach((message) => {
                  const updatedMessage = { ...message };
                  // Check if the senderUsername of the current message matches the user's username
                  if (updatedMessage.senderUsername === user.UserName) {
                    // Add senderDisplayname and senderAvatar properties to the message
                    updatedMessage.senderDisplayname = user.FirstName + " " + user.LastName;
                    updatedMessage.senderAvatar = user.Avatar;
                    updatedMessages.push(updatedMessage);
                  }
                });
              });
              updatedMessages.sort((a, b) => (a.sentAt > b.sentAt ? 1 : -1))

              return updatedMessages;
            };
            const moreFilteredData = addSenderInfo(filteredData);
            setChatMessages(moreFilteredData);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchChatMessages();
  }, [selectedChatMateUsername, senderUsername, token, handleMessageSubmit]);

  return chatMessages;
}

function Chat(props) {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.activeTab);

  const handleTabChange = (tab) => {
    dispatch ({ type: "SET_ACTIVE_TAB", payload: tab });
  };

  const userInfo = useSelector((state) => state.userInfo);
  const allusers = useSelector((state) => state.allUsers);
  const loggedinUsers = useSelector((state) => state.loggedinUsers);
  const token = localStorage.getItem("token");
  const [selectedChatMateUsername, setSelectedChatMateUsername] = useState("");
  const [selectedChatMateDisplayname, setSelectedChatMateDisplayname] =
    useState("");
  const [senderUsername] = useState(userInfo.UserName);
  const [senderDisplayname] = useState(
    props.userDisplayname
  );
  const mygroups = useSelector((state) => state.myGroups);

  const handleUserClick = (chatMateDisplayName, chatMateUsername) => {
    const chatMate = allusers.find(
      (chatMate) => chatMate.UserName === chatMateUsername
    );
    setSelectedChatMateDisplayname(chatMateDisplayName);
    setSelectedChatMateUsername(chatMate.UserName);
    dispatch ({ type: "SET_CHATMATEUSERNAME", payload: chatMate.UserName });
  };

  const handleGroupClick = (chatMateDisplayName, chatMateUsername) => {
    setSelectedChatMateDisplayname(chatMateDisplayName);
    setSelectedChatMateUsername(chatMateUsername);
    dispatch ({ type: "SET_CHATMATEUSERNAME", payload: chatMateUsername });
  };

  const displayAllUsers = () => {
    dispatch ({ type: "SET_CHATNOTIFICATION", payload: false });
    if (!allusers) {
      return null;
    }
    let filteredData = allusers.filter(
      (user) => user.UserName !== userInfo.UserName
    );
    // sort the filteredData by firstname
    filteredData.sort((a, b) => (a.FirstName > b.FirstName ? 1 : -1));
    // map the filteredData to display all users except the current user
    return filteredData.map((user) => {
      const chatMatedisplayName = user.FirstName + " " + user.LastName;
      const chatMateusername = user.UserName;
      let isUserLoggedIn
      if (loggedinUsers) {
       isUserLoggedIn = loggedinUsers.includes(chatMateusername);
      }
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
                  src={user.Avatar}
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
    console.log("mygroups", mygroups);
    if (mygroups.length === 0) {
      dispatch ({ type: "SET_CHATMATEUSERNAME", payload: "" });
      // set chatmateusername to empty string
      console.log("no groups found");
      return (
      <div key={"no users"}>
        <ul className="users">
          <li
            className="text-right"
            data-chat="person1">
            <p>No groups found</p>
          </li>
        </ul>
      </div>
      );
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
    // if no chatmate is selected or if message is empty, return
    const content = document.getElementById(
      `submitMessageBtn${selectedChatMateUsername}`
      ).value;
    if (!selectedChatMateUsername || !content) {
      return;
    }
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
    handleMessageSubmit,
    activeTab,
    allusers,
  );
    
  // get chatMate avatar
  const chatMateUser = allusers.filter(
    (user) => user.UserName == selectedChatMateUsername
  );
  let chatMateAvatar = process.env.PUBLIC_URL + '/defaultImg/default-avatar.jpeg';
  if (chatMateUser) {
    if (chatMateUser[0]) {
      chatMateAvatar = chatMateUser[0].Avatar;
    }
  }

  return (
    <div>
      <Topnav
        userDisplayname={props.userDisplayname}
        allusers={props.allusers}
        socket={props.socket}
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
                      aria-selected="true"
                      onClick={() => handleTabChange("inbox")}
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
                      onClick={() => handleTabChange("communities")}
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
                            <img src={message.senderAvatar} alt="avatar" className="rounded-circle me-2" id="avatar"/>
                            <div className="chat-name">
                              {message.senderDisplayname}
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
                  // empty the textarea after submitting the message and scrolldown to the bottom of the chat
                  onSubmit={((e) => {
                    e.preventDefault();
                    handleMessageSubmit(e);
                    document.getElementById(
                      `submitMessageBtn${selectedChatMateUsername}`
                    ).value = "";
                  }
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleMessageSubmit(e);
                      document.getElementById(
                        `submitMessageBtn${selectedChatMateUsername}`
                      ).value = "";
                    }
                  }}
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