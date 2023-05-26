import React from 'react';
import '../Chat/Chat.css';
import Topnav from '../Topnav';
import Avatar from '../../components/Avatar/Avatar';
import SearchbarChat from '../../components/Searchbar/SearchbarChat';

function Chat(){
    return(
        <div>
            <Topnav />
            <div class="container-fluid">
                <div class="row justify-content-evenly">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 w-100" >
                        <div class="card-chat m-0">
                            <div class="row no-gutters">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                                    <div class="users-container">
                                        <SearchbarChat />
                                        <ul class="users">
                                            <li class="person" data-chat="person1">
                                                <div class="user">
                                                    <Avatar />
                                                    <span class="status busy"></span>
                                                </div>
                                                <p class="name-time">
                                                    <span class="name">Jacob Pesämaa</span>
                                                </p>
                                            </li>
                                            <li class="person" data-chat="person1">
                                                <div class="user">
                                                    <Avatar />
                                                    <span class="status offline"></span>
                                                </div>
                                                <p class="name-time">
                                                    <span class="name">Ashley Hwa</span>
                                                </p>
                                            </li>
                                            <li class="person active-user" data-chat="person2">
                                                <div class="user">
                                                    <Avatar />
                                                    <span class="status away"></span>
                                                </div>
                                                <p class="name-time">
                                                    <span class="name">Gin Thy</span>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                                    <div class="selected-user">
                                        <span>To: <span class="name">Emily Russell</span></span>
                                    </div>
                                    <div class="chat-container">
                                        <ul class="chatview-box chatContainerScroll">
                                            <li class="chat-left">
                                                <div class="chat-avatar">
                                                    <Avatar />
                                                    <div class="chat-name">Russell</div>
                                                </div>
                                                <div class="chat-text">Hello, I'm Russell.
                                                    <br />How can I help you today?</div>
                                                <div class="chat-hour">08:55 <span class="fa fa-check-circle"></span></div>
                                            </li>
                                            <li class="chat-right">
                                                <div class="chat-hour">08:56 <span class="fa fa-check-circle"></span></div>
                                                <div class="chat-text">Hi, Russell
                                                    <br /> I need more information about Developer Plan.</div>
                                                <div class="chat-avatar">
                                                    <Avatar />
                                                    <div class="chat-name">Sam</div>
                                                </div>
                                            </li>
                                            <li class="chat-left">
                                                <div class="chat-avatar">
                                                    <Avatar />
                                                    <div class="chat-name">Russell</div>
                                                </div>
                                                <div class="chat-text">Are we meeting today?
                                                    <br />Project has been already finished and I have results to show you.</div>
                                                <div class="chat-hour">08:57 <span class="fa fa-check-circle"></span></div>
                                            </li>
                                            <li class="chat-right">
                                                <div class="chat-hour">08:59 <span class="fa fa-check-circle"></span></div>
                                                <div class="chat-text">Well I am not sure.
                                                    <br />I have results to show you.</div>
                                                <div class="chat-avatar">
                                                    <Avatar />
                                                    <div class="chat-name">Joyse</div>
                                                </div>
                                            </li>
                                            <li class="chat-left">
                                                <div class="chat-avatar">
                                                    <Avatar />
                                                    <div class="chat-name">Russell</div>
                                                </div>
                                                <div class="chat-text">The rest of the team is not here yet.
                                                    <br />Maybe in an hour or so?</div>
                                                <div class="chat-hour">08:57 <span class="fa fa-check-circle"></span></div>
                                            </li>
                                            <li class="chat-right">
                                                <div class="chat-hour">08:59 <span class="fa fa-check-circle"></span></div>
                                                <div class="chat-text">Have you faced any problems at the last phase of the project?</div>
                                                <div class="chat-avatar">
                                                    <Avatar />
                                                    <div class="chat-name">Jin</div>
                                                </div>
                                            </li>
                                            <li class="chat-left">
                                                <div class="chat-avatar">
                                                    <Avatar />
                                                    <div class="chat-name">Russell</div>
                                                </div>
                                                <div class="chat-text">Actually everything was fine.
                                                    <br />I'm very excited to show this to our team.</div>
                                                <div class="chat-hour">07:00 <span class="fa fa-check-circle"></span></div>
                                            </li>
                                        </ul>
                                        <div class="form-group mt-3 mb-0">
                                            <textarea class="form-control" rows="3" placeholder="Type your message here..."></textarea>
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