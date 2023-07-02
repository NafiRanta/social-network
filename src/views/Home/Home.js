import React from 'react';
import CreatePost from '../../components/CreatePost/CreatePost'
import PostCard from '../../components/Card/PostCard';
import Avatar from '../../components/Avatar/Avatar';
import './Home.css'
import Topnav from '../Topnav';

function Home(props) {
    // show allusers under Contacts
    const displayChatUsers = () => {
        const allusers = props.allusers;
        console.log("allusers", allusers)
        //get all users profilepicture
        
        if (!allusers) {
          return null; 
        }
        // show all users except the logged in user
        return allusers.filter(user => user.username !== props.userInfo.username).map((user, index) => {
          return (
            <div key= {`${ user.username}-${index}`}>
                <ul className="list-group">
                    <li className="dropdown-item rounded my-2 px-0" type="button">
                        <div className="d-flex align-items-center mx-2 chat-avatar">
                            <div className="position-relative">
                            <   img src={user.profilePicture} alt="avatar" className="rounded-circle me-2"/>
                                <span className="position-absolute bottom-0 translate-middle border border-light rounded-circle-sm bg-success p-1" >
                                    <span className="visually-hidden"></span>
                                </span>
                            </div>
                            <p className="m-0">{user.firstname + " " + user.lastname}</p>
                        </div>
                    </li>
                </ul>
            </div>  
          );
        });
      };

    return (
        <div>
            <Topnav userInfo={props.userInfo} userDisplayname={props.userDisplayname} allusers={props.allusers}/>
            <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myhomepage">
                            <CreatePost userInfo={props.userInfo} userDisplayname={props.userDisplayname}/>
                            <PostCard userDisplayname={props.userDisplayname} userInfo={props.userInfo}/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-contactsbox"> 
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <div className="my-3 d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center mx-2 chat-avatar">
                                            <div className="position-relative">
                                                <Avatar userInfo={props.userInfo} userDisplayname={props.userDisplayname} />  
                                            </div>
                                            <p className="m-0"><strong>{props.userDisplayname}</strong></p>
                                        </div>
                                    </div>
                                    <hr />
                                    <p className="text-muted fs-5 m-0">Contacts</p>
                                    {displayChatUsers()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
