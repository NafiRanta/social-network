import React from 'react';
import '../Chat/Chat.css';
import Topnav from '../Topnav';
import Avatar from '../../components/Avatar/Avatar';
import SearchbarChat from '../../components/Searchbar/SearchbarChat';

function Chat() {
    return(
        <div>
            <Topnav />
            <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 w-100" >
                        <div className="card-chat m-0">
                            <div className="row no-gutters">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                                    <div className="users-container">
                                        <SearchbarChat />
                                        <ul className="users">
                                            <li className="person" data-chat="person1">
                                                <div className="user">
                                                    <Avatar />
                                                    <span className="status busy"></span>
                                                </div>
                                                <p className="name-time">
                                                    <span className="name">Jacob Pesämaa</span>
                                                </p>
                                            </li>
                                            <li className="person" data-chat="person1">
                                                <div className="user">
                                                    <Avatar />
                                                    <span className="status offline"></span>
                                                </div>
                                                <p className="name-time">
                                                    <span className="name">Ashley Hwa</span>
                                                </p>
                                            </li>
                                            <li className="person active-user" data-chat="person2">
                                                <div className="user">
                                                    <Avatar />
                                                    <span className="status away"></span>
                                                </div>
                                                <p className="name-time">
                                                    <span className="name">Gin Thy</span>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                                    <div className="selected-user">
                                        <span>To: <span className="name">Emily Russell</span></span>
                                    </div>
                                    <div className="chat-container">
                                        <ul className="chatview-box chatContainerScroll">
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
                                                    <br /> I need more information about Developer Plan.</div>
                                                <div className="chat-avatar">
                                                    <Avatar />
                                                    <div className="chat-name">Sam</div>
                                                </div>
                                            </li>
                                            <li className="chat-left">
                                                <div className="chat-avatar">
                                                    <Avatar />
                                                    <div className="chat-name">Russell</div>
                                                </div>
                                                <div className="chat-text">Are we meeting today?
                                                    <br />Project has been already finished and I have results to show you.</div>
                                                <div className="chat-hour">08:57 <span className="fa fa-check-circle"></span></div>
                                            </li>
                                            <li className="chat-right">
                                                <div className="chat-hour">08:59 <span className="fa fa-check-circle"></span></div>
                                                <div className="chat-text">Well I am not sure.
                                                    <br />I have results to show you.</div>
                                                <div className="chat-avatar">
                                                    <Avatar />
                                                    <div className="chat-name">Joyse</div>
                                                </div>
                                            </li>
                                            <li className="chat-left">
                                                <div className="chat-avatar">
                                                    <Avatar />
                                                    <div className="chat-name">Russell</div>
                                                </div>
                                                <div className="chat-text">The rest of the team is not here yet.
                                                    <br />Maybe in an hour or so?</div>
                                                <div className="chat-hour">08:57 <span className="fa fa-check-circle"></span></div>
                                            </li>
                                            <li className="chat-right">
                                                <div className="chat-hour">08:59 <span className="fa fa-check-circle"></span></div>
                                                <div className="chat-text">Have you faced any problems at the last phase of the project?</div>
                                                <div className="chat-avatar">
                                                    <Avatar />
                                                    <div className="chat-name">Jin</div>
                                                </div>
                                            </li>
                                            <li className="chat-left">
                                                <div className="chat-avatar">
                                                    <Avatar />
                                                    <div className="chat-name">Russell</div>
                                                </div>
                                                <div className="chat-text">Actually everything was fine.
                                                    <br />I'm very excited to show this to our team.</div>
                                                <div className="chat-hour">07:00 <span className="fa fa-check-circle"></span></div>
                                            </li>
                                        </ul>
                                        <div className="form-group mt-3 mb-0">
                                            <textarea className="form-control" rows="3" placeholder="Type your message here..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;