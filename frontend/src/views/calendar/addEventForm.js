import React, { useState } from "react";
import Datetime from "react-datetime";
import { useNavigate } from "react-router-dom";
import './events.css'

const AddEventForm =  () => {
  const [eventName, setEventName] = useState("");
  const [comment, setComment] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(new Date());

  let navigate = useNavigate();

  const onSubmit= async(e)=>{
    e.preventDefault();
    const payload = { eventName, eventDate, comment, eventType };
    const response = await fetch("/api/events/createEvent", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      setEventName("");
      setComment("");
      console.log("new request sent:", json);
      navigate("/eventCalendar");
    }
  }

  return (
    <div>
      <form className="form-style-adding-form" onSubmit={onSubmit}>
        <h3 className="heading">Event Adding Form</h3>
        <label className="lables">Event Name </label>
        <input
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <label className="lables">Comment</label>
        <input
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <label className="lables">Event Date</label>
        <Datetime value={eventDate} onChange={date=>setEventDate(date)}/>

        <label className="lables">Type:</label>
        <input
          type="radio"
          onChange={(e) => setEventType(e.target.value)}
          value="Holiday"
          name="eventType"
          style={{ width: "auto", display: "inline" }}
          required
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
        <button className="add-btn">Add Event</button>
      </form>
    </div>
  );
}

export default AddEventForm
