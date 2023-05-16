import React, { useEffect, useState } from "react";
import Datetime from "react-datetime";
import { useNavigate, useParams } from "react-router-dom";
import './events.css'

const UpdateEventForm = () =>  {
  const [eventName, setEventName] = useState("");
  const [comment, setComment] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState();

  
  let navigate = useNavigate();

  const {id} = useParams()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/single/"+id);
        const data = await response.json();

        if(response.ok){
          setEventDate(new Date(data.eventDate))
          setEventName(data.eventName)
          setEventType(data.eventType)
          setComment(data.comment)
        }

      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const onSubmit= async(e)=>{
    e.preventDefault();
    const payload = { eventName, eventDate, comment, eventType };
    const response = await fetch("/api/events/update/"+id, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      setEventName("");
      setComment("");
      console.log("new request sent:", json);
      navigate("/eventCalendar");
    }
  }

  const handleDelete=async(e)=>{
    e.preventDefault();

    if (window.confirm("Are You sure you want to delete record?")) {
      const response = await fetch(
        "/api/events/delete/" + id,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();

      if (response.ok) {
        console.log("Workout delete", json);
        navigate("/eventCalendar");
      }
    }
  }

  return (
    <div>
      <form className="update-form-styles">
        <h3 className="heading">Update Event</h3><br></br>
        <label className="lables">Event Name</label>
        <input
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <label className="lables">Comment</label>
        <input
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <label className="lables">Event Date</label>
        <Datetime value={eventDate} onChange={date=>setEventDate(date)}/>

        <label className="lables">Type: {eventType}</label>
        <input
          type="radio"
          onChange={(e) => setEventType(e.target.value)}
          value="Holiday"
          name="eventType"
          style={{ width: "auto", display: "inline" }}
        />
        <label className="lables" style={{ width: "auto", display: "inline" }}>Holiday</label>
        <br />
        <br />
        <input
          type="radio"
          onChange={(e) => setEventType(e.target.value)}
          value="Event"
          name="eventType"
          style={{ width: "auto", display: "inline" }}
        />
        <label className="lables" style={{ width: "auto", display: "inline" }}>Company Event</label>
        <br />
        <br />
        <div className="eveBtnHolder">
          <button className="eveUpdateBtn" onClick={onSubmit}>Update</button>
          <button  className="eveDeleteBtn" onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEventForm 
