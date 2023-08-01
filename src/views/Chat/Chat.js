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
  const [senderUsername, setSenderUsername] = useState(userInfo.UserName);
  const [senderDisplayname, setSenderDisplayname] = useState(
    props.userDisplayname
  );
  const mygroups = useSelector((state) => state.myGroups);
  const [activeTab, setActiveTab] = useState("inbox");
  
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

  const [otherUsers, setOtherUsers] = useState([]);
    
  useEffect(() => {
    // set chatNotification to false
    dispatch ({ type: "SET_CHATNOTIFICATION", payload: false });
    const fetchAllMessagesAndSortUsers = async () => {
      console.log("activeTab", activeTab)
      if (activeTab == "communities") {
        console.log("fetchAllMessagesAndSortUsers activeTab", activeTab);
        return;
      }

    // save all users except the current user to a variable called otherUsers
    let otherUsers = allusers.filter(
      (user) => user.UserName !== userInfo.UserName
    );
    // fetch all messages from the database
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      try {
        const response = await fetch(
          `http://localhost:8080/messages?username=${userInfo.UserName}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        if (response.ok) {
          const allMessages = await response.json();
          console.log("allMessages", allMessages);
            if (allMessages) {
              // sort otherUsers by allMessages sentAt 
              otherUsers?.sort((a, b) => {
                const aMessages = allMessages?.filter(
                  (message) =>
                    (message?.senderUsername === a?.UserName &&
                      message?.receiverUsername === userInfo?.UserName) ||
                    (message?.senderUsername === userInfo?.UserName &&
                      message?.receiverUsername === a?.UserName)
                );
                const bMessages = allMessages?.filter(
                  (message) =>
                    (message?.senderUsername === b?.UserName &&
                      message?.receiverUsername === userInfo?.UserName) ||
                    (message?.senderUsername === userInfo?.UserName &&
                      message?.receiverUsername === b?.UserName)
                );
                const aLastMessage = aMessages[aMessages?.length - 1];
                const bLastMessage = bMessages[bMessages?.length - 1];
          
                // If a user has no messages, move them to the end
                if (!aLastMessage) return 1;
                if (!bLastMessage) return -1;
          
                // Sort by sentAt if both users have messages
                return aLastMessage?.sentAt > bLastMessage?.sentAt ? -1 : 1;
            });
          }
          setOtherUsers(otherUsers);
        } else {
          throw new Error("Error occurred while fetching messages");
        }
      } catch (error) {
        console.log(error);
      }
      // set the first user in otherUsers as the selectedChatMate
      if (otherUsers[0]) {
        setSelectedChatMateUsername(otherUsers[0].UserName);
        setSelectedChatMateDisplayname(
          otherUsers[0].FirstName + " " + otherUsers[0].LastName
        );
        dispatch ({ type: "SET_CHATMATEUSERNAME", payload: otherUsers[0].UserName });
      }
    };
    fetchAllMessagesAndSortUsers();
}, [allusers, userInfo, token]);

  const displayAllUsers = () => {   
    return otherUsers.map((user) => {
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
    (user) => user.UserName == selectedChatMateUsername
  );
  let chatMateAvatar = process.env.PUBLIC_URL + '/defaultImg/default-avatar.jpeg';
  if (chatMateUser) {
    if (chatMateUser[0]) {
      chatMateAvatar = chatMateUser[0].Avatar;
    }
  }
  const handleTabChange = (tab) => {
    console.log("handleTabChange tab", tab);
    setActiveTab(tab);
  };

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
                      className={`nav-link ${activeTab === "inbox" ? "active" : ""}`}
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
                      className={`nav-link ${activeTab === "communities" ? "active" : ""}`}
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
                    className={`tab-pane fade ${activeTab === "inbox" ? "show active" : ""}`}
                    id="pills-inbox"
                    role="tabpanel"
                    aria-labelledby="pills-inbox-tab"
                  >
                    <div className="container" id="chatUsers">
                      {displayAllUsers()}
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade `}//${activeTab === "communities" ? "show active" : ""}`}
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
