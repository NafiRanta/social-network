import React, {useState, useEffect} from 'react';
import '../Chat/Chat.css';
import Avatar from '../../components/Avatar/Avatar';
import SearchbarChat from '../../components/Searchbar/SearchbarChat';
import Topnav from '../Topnav';
import { decodeJwt } from '../../components/Card/PostCard';

function useChatMessages(selectedChatMateId, userId, token) {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
    
      try {
        const response = await fetch("http://localhost:8080/messages", {
          method: "GET",
          headers: headers,
        });
    
        if (response.ok) {
          const data = await response.json();
          // check for null values
          if (!data) {
            return null;
          }
          const filteredData = data.filter(
            (message) =>
              (message.senderID === userId && message.receiverID === selectedChatMateId) ||
              (message.senderID === selectedChatMateId && message.receiverID === userId)
          );
          filteredData.sort((a, b) => (a.sentAt > b.sentAt ? 1 : -1));
          setChatMessages(filteredData);
          console.log("chatMessages", chatMessages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatMessages();
  }, [selectedChatMateId, userId, token]);

  return chatMessages;
}

function Chat(props) {
    const token = localStorage.getItem("token");
    const userId = decodeJwt(token).userID;
    const [selectedChatMateName, setSelectedChatMateName] = useState(""); 
    const [selectedChatMateId, setSelectedChatMateId] = useState("");
    const chatMessages = useChatMessages(selectedChatMateId, userId, token);
    
    useEffect(() => {
      console.log('selectedUsername', selectedChatMateName);
    }, [selectedChatMateName]);
  

    const handleUserClick = (username) => {
      setSelectedChatMateName(username); // Update the selected username in the state
      console.log("selectedUsername", selectedChatMateName)
      // get email of selected username from allUsers
      const receiverID = props.allusers.filter((user) => user.firstname + " " + user.lastname === username)[0].email;
      setSelectedChatMateId(receiverID);
      console.log("receiverId", receiverID) 
    };
    
    const displayAllUsers = () => {
      // this will be users that are followers of current on. now it has all
        if (!props.allusers) {
          return null;
        }
      // save all users except the current user to a variable called filteredData
      let filteredData = props.allusers.filter((user) => user.email !== props.userInfo.email);
      // sort the filteredData by firstname
      filteredData.sort((a, b) => (a.firstname > b.firstname) ? 1 : -1);    
      // map the filteredData to display all users except the current user
      return filteredData.map(user => {
        const username = user.firstname + " " + user.lastname;
        return (
          <div key={user.email}>
            <ul className="users">
              <li className="person" data-chat="person1" onClick={() => handleUserClick(username)}>
                <div className="user">
                  <img src={user.profilePicture} alt="avatar" className="rounded-circle me-2" id={`avatar${selectedChatMateId}`} />
                  <span className="status busy"></span>
                </div>
                <p className="name-time">
                  <span className="name">{username}</span>
                </p>
              </li>
            </ul>
          </div>
        );
      });
    };

   
    const  handleMessageSubmit = async (e) => {
      e.preventDefault();
      // get message from input field id id={`submitMessageBtn${selectedUsername}`}
      const content = document.getElementById(`submitMessageBtn${selectedChatMateId}`).value;
      console.log("selectedUsername in submitbutton", selectedChatMateName)
      console.log("selectedChatMateId in submitbutton", selectedChatMateId)
      console.log("content", content)
      // get email of selectedUsername from allUsers and save to receiverID
      const receiverID = props.allusers.filter((user) => user.firstname + " " + user.lastname === selectedChatMateName)[0].email;
      const senderID = userId;
      const sentAt = new Date();
      const headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      headers.append('Content-Type', 'application/json');
      const messagedata = {
       "content": content, 
        "senderID": senderID,
        "receiverID": receiverID,
        "sentAt": sentAt
      };  
      try {
        const response = await fetch ("http://localhost:8080/sendmessage", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(messagedata)
        });
        if (!response.ok) {
          throw new Error('Error occurred while sending message ');
        }
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div>
      <Topnav userInfo={props.userInfo} username={props.username} allusers={props.allusers} />
      <div className="container-fluid">
        <div className="row justify-content-evenly">
          <div className="col-12 col-lg-3 sidebar">
            <div className="chat-title">
              <p className="fs-5 m-0"><strong>Chats</strong></p>
              <SearchbarChat />
            </div>
            <div className="users-container">
              <div className="chat-category">
                <ul className="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-inbox-tab" data-toggle="pill" href="#pills-inbox" role="tab" aria-controls="pills-inbox" aria-selected="false">Inbox</a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-communities-tab" data-toggle="pill" href="#pills-communities" role="tab" aria-controls="pills-communities" aria-selected="false">Communities</a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade" id="pills-inbox" role="tabpanel" aria-labelledby="pills-inbox-tab">
                    <div className="container" id='chatUsers'>
                      {displayAllUsers()}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="pills-communities" role="tabpanel" aria-labelledby="pills-communities-tab">
                    <div className="container" id='chatUsers'>
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
                <span>To: <span className="name" id="chatUsernameTitle">{selectedChatMateName}</span></span>
              </div>
              <div className="chat-container" id="chatArea">
               {chatMessages.map(message => {
                 const sentAt = new Date(message.sentAt).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                });
                 if (message.senderID === userId) {
                   return (
                    <ul className="chatview-box chatContainerScroll" id='chatmessagesSelectedChatMate'>
                      <li className="chat-left">
                        <div className="chat-avatar">
                          <Avatar />
                          <div className="chat-name">{props.username}</div>
                        </div>
                        <div className="chat-text">{message.content}</div>
                        <div className="chat-hour">{sentAt} <span className="fa fa-check-circle"></span></div>
                      </li>
                    </ul>
                    
                    )
                  } else {
                    return (
                      <ul className="chatview-box chatContainerScroll" id='chatmessagesSelectedChatMate'>
                        <li className="chat-left">
                          <div className="chat-avatar">
                            <Avatar />
                            <div className="chat-name">{message.receiverID}</div>
                          </div>
                          <div className="chat-text">{message.content}</div>
                          <div className="chat-hour">{sentAt} <span className="fa fa-check-circle"></span></div>
                        </li>
                      </ul>
                    )
                  }
                })}
              </div>
              <div className="form-group mt-3 mb-0" id='chatroomMessageArea'>
                <form className="chatroom-message" id={`chatroom-message${userId}`}>
                  <textarea className="form-control" rows="3"  id={`submitMessageBtn${selectedChatMateId}`} placeholder={`Message @${selectedChatMateName}`}></textarea>
                  <button type="submit" className="btn btn-primary" onClick={handleMessageSubmit}>Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;
