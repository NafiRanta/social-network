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
                                    <div class="education">
                                        <ul class="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link active" id="pills-btech-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-btech" aria-selected="true">B Tech</a>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link" id="pills-intermediate-tab" data-toggle="pill" href="#pills-intermediate" role="tab" aria-controls="pills-intermediate" aria-selected="false">Intermediate</a>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link" id="pills-tenth-tab" data-toggle="pill" href="#pills-tenth" role="tab" aria-controls="pills-tenth" aria-selected="false">Tenth</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="pills-tabContent">
                                            <div class="tab-pane fade show active" id="pills-btech" role="tabpanel" aria-labelledby="pills-btech-tab">
                                                <div class="container">
                                                    <div class="row ">
                                                        <div class="col lg-6">College Name</div>
                                                        <div class="col lg-6">CVR College of Engineering</div>
                                                    </div>
                                                    <div class="row ">
                                                        <div class="col lg-6">Location</div>
                                                        <div class="col lg-6">Mangalpally,Hyderabad</div>
                                                    </div>
                                                    <div class="row ">
                                                        <div class="col lg-6">Stream</div>
                                                        <div class="col lg-6">CSE</div>
                                                    </div>
                                                    <div class="row ">
                                                        <div class="col lg-6">Graduation Year</div>
                                                        <div class="col lg-6">2021</div>
                                                    </div>
                                                    <div class="row ">
                                                        <div class="col lg-6">CGPA</div>
                                                        <div class="col lg-6">9.47</div>
                                                    </div>
                                                </div>
                                            </div>
                                        <div class="tab-pane fade" id="pills-intermediate" role="tabpanel" aria-labelledby="pills-intermediate-tab">
                                            <div class="container">
                                                <div class="row ">
                                                    <div class="col lg-6">College Name</div>
                                                    <div class="col lg-6">Narayana Jr College</div>
                                                </div>
                                                <div class="row ">
                                                    <div class="col lg-6">Location</div>
                                                    <div class="col lg-6">Dilsukhnagar,Hyderabad</div>
                                                </div>
                                                <div class="row ">
                                                    <div class="col lg-6">Stream</div>
                                                    <div class="col lg-6">MPC</div>
                                                </div>
                                                <div class="row ">
                                                    <div class="col lg-6">Graduation Year</div>
                                                    <div class="col lg-6">2017</div>
                                                </div>
                                                <div class="row ">
                                                    <div class="col lg-6">Percentage</div>
                                                    <div class="col lg-6">949</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="pills-tenth" role="tabpanel" aria-labelledby="pills-tenth-tab">
                                            <div class="container">
                                                <div class="row ">
                                                    <div class="col lg-6">School Name</div>
                                                    <div class="col lg-6">Vignan Integrated High School</div>
                                                </div>
                                                <div class="row ">
                                                    <div class="col lg-6">Location</div>
                                                    <div class="col lg-6">Nadergul,Hyderabad</div>
                                                </div>
                                                
                                                <div class="row ">
                                                    <div class="col lg-6">Graduation Year</div>
                                                    <div class="col lg-6">2015</div>
                                                </div>
                                                <div class="row ">
                                                    <div class="col lg-6">CGPA</div>
                                                    <div class="col lg-6">9.7</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
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