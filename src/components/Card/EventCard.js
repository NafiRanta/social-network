import { useEffect, useState } from "react";

function EventCard(props) {
  const groupID = props.groupID;
  const [events, setEvents] = useState([]);

  useEffect(() => {
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
      console.log("data: ", data);
      setEvents(data.groupEvent);
    };
    getEvents();
  }, [groupID]);

  return (
    <div>
      {events && events.length > 0 ? (
        events.map((event) => (
          <div key={event.GroupEventID} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{event.EventName}</h5>
              <p className="card-text">{event.EventDescription}</p>
              <p className="card-text">Date: {event.EventDate}</p>
              <p className="card-text">Time: {event.EventTime}</p>
              <a href="#" className="btn btn-primary">
                Going
              </a>
              <a href="#" className="btn btn-danger">
                Not going
              </a>
            </div>
          </div>
        ))
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}

export default EventCard;
