import React from 'react';
import '../Chat/Chat.css';
import Avatar from '../../components/Avatar/Avatar';
import SearchbarChat from '../../components/Searchbar/SearchbarChat';
import Topnav from '../Topnav';

function Chat(props) {
  const displayAllUsers = () => {
    const allusers = props.allusers;
    if (!allusers) {
      return null;
    }
    // return all users except the current user
    return allusers.filter(user => user.email !== props.userInfo.email).map(user => {
      const username = user.firstname + " " + user.lastname;
      return (
        <div key={user.email}>
          <ul className="users">
            <li className="person" data-chat="person1">
              <div className="user">
                <img src={user.profilePicture} alt="avatar" className="rounded-circle me-2" id="avatar" />
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
                <span>To: <span className="name" id="chatUsernameTitle">Emily Russell</span></span>
              </div>
              <div className="chat-container" id="chatArea">
                <ul className="chatview-box chatContainerScroll" id='chatmessagesSelectedChatMate'>
                  <li className="chat-left">
                    <div className="chat-avatar">
                      <Avatar />
                      <div className="chat-name">Russell</div>
                    </div>
                    <div className="chat-text">Hello, I'm Russell.
                      <br />How can I help you today?</div>
                    <div className="chat-hour">08:55 <span className="fa fa-check-circle"></span></div>
                  </li>
                  <li className="chat-right">
                    <div className="chat-hour">08:56 <span className="fa fa-check-circle"></span></div>
                    <div className="chat-text">Hi, Russell
                      <br /> I need more information about the Developer Plan.</div>
                    <div className="chat-avatar">
                      <Avatar />
                      <div className="chat-name">Sam</div>
                    </div>
                  </li>
                  {/* Rest of the chat messages */}
                </ul>
              </div>
              <div className="form-group mt-3 mb-0" id='chatroomMessageArea'>
                <form className="chatroom-message" id={`chatroom-message${props.username}`}>
                  <textarea className="form-control" rows="3" id={`messageSubmit${props.username}`} placeholder="Message @xxx"></textarea>
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
