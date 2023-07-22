import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Modal.css";
import Avatar from "../Avatar/Avatar";

function CreateEventModal(props) {
  const userInfo = useSelector((state) => state.userInfo);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
 
  const handleEventDateChange = (event) => {
    setEventDate(event.target.value);
  };

  const handleEventTimeChange = (event) => {
    setEventTime(event.target.value);
  };

const handleEventSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const eventName = document.getElementById("eventname").value;
    const eventDescription = document.getElementById("eventdescription").value;
    const eventDate = document.getElementById("eventdate").value;
    const eventTime = document.getElementById("eventtime").value;
   
    const now = new Date();
    const goingFriends = [];

    const eventData = {
      groupID: props.groupID,
      userName: userInfo.UserName,
      eventName: eventName,
      eventDescription: eventDescription,
      eventDate: eventDate,
      eventTime: eventTime,
      notGoingUsers: [],
      goingUsers: goingFriends,
      createAt: now,
    };
    // fetch group with groupID
    const group = await fetch(`http://localhost:8080/getgroup?groupID=${props.groupID}`, { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token, 
        'Content-Type': 'application/json'
      }
    });
    const groupData = await group.json();
    const groupMembers = groupData.MemberUsernames;
    // loop through groupMembers and broadcast to all users in the group a notification through websocket
    groupMembers.forEach((member) => {
      const notification = {
        type: "notification",
        payload: {
          receiverUsername: member,
          senderUsername: userInfo.UserName,
        }
      }
      props.socket.send(JSON.stringify(notification));
    });

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');

    const response = await fetch('http://localhost:8080/addevent', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    alert("Event created successfully");
    window.location.href = `/singlegroup/${props.groupID}`;
  };


  return (
    <div className="modal fade" id="createEventModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Create Event</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="my-1 p-1">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <div className="p-2">
                    <Avatar userDisplayname={props.userDisplayname} />
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{props.userDisplayname}</p>
                  </div>
                </div>
                <div>
                  <form id="createGroupForm">
                    <input type="text" id="eventname"className="form-control my-3" placeholder="Event Name" />
                    <div>
                      <textarea id="eventdescription" cols="30" rows="5" className="form-control my-3 border" placeholder="Event Description"></textarea>
                    </div>
                    <input type="date" value={eventDate} id="eventdate" onChange={handleEventDateChange} className="form-control my-3" placeholder="Event Date" />
                    <input type="time" value={eventTime} id="eventtime" onChange={handleEventTimeChange} className="form-control my-3" placeholder="Event Time" />
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row w-100">
            <div className="col">
                <button 
                  type="button" 
                  className="btn btn-primary w-100"
                  onClick={handleEventSubmit}
                  >
                  Create
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEventModal;
