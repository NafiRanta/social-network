import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../Chat/Chat.css";
import Avatar from "../../components/Avatar/Avatar";
import Topnav from "../Topnav";
import { decodeJwt } from "../../components/Card/PostCard";

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
  const userInfo = useSelector((state) => state.userInfo);
  const token = localStorage.getItem("token");
  const [selectedChatMateUsername, setSelectedChatMateUsername] = useState("");
  const [selectedChatMateDisplayname, setSelectedChatMateDisplayname] =
    useState("");
  const [senderUsername, setSenderUsername] = useState(userInfo.username);
  const [senderDisplayname, setSenderDisplayname] = useState(
    props.userDisplayname
  );

  const handleUserClick = (chatMateDisplayName, chatMateUsername) => {
    const chatMate = props.allusers.find(
      (chatMate) => chatMate.username === chatMateUsername
    );
    setSelectedChatMateDisplayname(chatMateDisplayName);
    setSelectedChatMateUsername(chatMate.username);
  };

  const displayAllUsers = () => {
    if (!props.allusers) {
      return null;
    }
    // save all users except the current user to a variable called filteredData
    let filteredData = props.allusers.filter(
      (user) => user.username !== userInfo.username
    );
    // sort the filteredData by firstname
    filteredData.sort((a, b) => (a.firstname > b.firstname ? 1 : -1));
    // map the filteredData to display all users except the current user
    return filteredData.map((user) => {
      const chatMatedisplayName = user.firstname + " " + user.lastname;
      const chatMateusername = user.username;
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
    // send messageNotification to receiver through websocket. messageNotification is an object with the following properties: senderUsername, receiverUsername, type: "messageNotification"
    const messageNotification = {
      senderUsername: senderUsername,
      receiverUsername: selectedChatMateUsername,
      type: "messageNotification",
    };

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
                      <ul className="users">
                        <li className="person" data-chat="person1">
                          <div className="user">
                            <Avatar />
                            <span className="status busy"></span>
                          </div>
                          <p className="name-time">
                            <span className="name">Russel Lee</span>
                          </p>
                        </li>
                        <li className="person" data-chat="person1">
                          <div className="user">
                            <Avatar />
                            <span className="status offline"></span>
                          </div>
                          <p className="name-time">
                            <span className="name">Joyce Tan</span>
                          </p>
                        </li>
                        <li className="person active-user" data-chat="person2">
                          <div className="user">
                            <Avatar />
                            <span className="status away"></span>
                          </div>
                          <p className="name-time">
                            <span className="name">Adam Ranta</span>
                          </p>
                        </li>
                      </ul>
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
                            <Avatar />
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
