import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function EventCard(props) {
  const groupID = props.groupID;
  const userInfo = useSelector((state) => state.userInfo);
  const [events, setEvents] = useState([]);
  //const [going, setGoing] = useState(""); // State to track if user is going to the event

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    const url = `http://localhost:8080/getevents?groupID=${groupID}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
    // console.log("ALL GROUPS: ", data);
    setEvents(data.groupEvent);
  };

  const handleGoingClick = async (GroupEventID, EventName) => {
    // const token = localStorage.getItem("token");
    // const headers = new Headers();
    // headers.append("Authorization", "Bearer " + token);
    // headers.append("Content-Type", "application/json");
  
    const requestBody = {
      groupEventID: GroupEventID,
      eventName: EventName,
      userName: userInfo.UserName,
    };

    console.log(requestBody)
    try {
      const response = await fetch("http://localhost:8080/going", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Failed to accept the event.");
      }
  
      getEvents();
    } catch (error) {
      console.error("Error accepting the event:", error);
    }
  };
  

  const handleNotGoingClick = async (groupEventID, eventName) => {  
    const requestBody = {
      groupEventID: groupEventID,
      eventName: eventName,
      userName: userInfo.UserName,
    };
  
    try {
      const response = await fetch('http://localhost:8080/decline', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Failed to decline the event.');
      }

      getEvents();
    } catch (error) {
      console.error('Error declining the event:', error);
    }
  };
  
  
  return (
    <div>
      {events && events.length > 0 ? (
        events.map((event) => {
          const goingUsersArray = event.GoingUsers ? event.GoingUsers.split(',') : [];
          const notGoingUsersArray = event.NotGoingUsers ? event.NotGoingUsers.split(',') : [];
  
          return (
            <div key={event.GroupEventID} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{event.EventName}</h5>
                <p className="card-text">{event.EventDescription}</p>
                <p className="card-text">Date: {event.EventDate}</p>
                <p className="card-text">Time: {event.EventTime}</p>
                {/* Check if user is going and render appropriate content */}
                {goingUsersArray.includes(userInfo.UserName) ? (
                  <p class="text-success">See you there!</p>
                ) : notGoingUsersArray.includes(userInfo.UserName) ? (
                  <p className="text-warning"> No big deal! We don't need you anyway.</p>
                ) : (
                  <>
                    <a href="#" className="btn btn-primary" onClick={() => handleGoingClick(event.GroupEventID, event.EventName)}>
                      Going
                    </a>
                    <a href="#" className="btn btn-danger" onClick={() => handleNotGoingClick(event.GroupEventID, event.EventName)}>
                      Not going
                    </a>
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
  
}

export default EventCard;
