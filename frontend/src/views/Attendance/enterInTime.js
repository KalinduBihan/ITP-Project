import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import attendance from "../../apis/modules/attendance";
import TimePicker from "react-time-picker";
import { useNavigate } from "react-router-dom";

const EnterInTime = () => {
  
  const { user } = useContext(AuthContext)
  const [inTime, setInTime] = useState(new Date());
  const [inTimeComment, setInTimeComment] = useState("In time Entered manually");
  const { error, setError } = useState(null);

  const userId = user?.employeeId;
  const userName = user?.name;
  let navigate = useNavigate();

  const handleTimeChange = (selectedTime) => {
    setInTime(selectedTime);
  };

  function handleChange(event) {
    console.log(event.target.value);
    setInTimeComment(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inTimeComment);
    try {
      const payload = { inTime, inTimeComment, userName };
      const result = attendance.enterInTime(userId, payload);

      if (result.ok) {
        console.log("new workout added:", result);
      }
      console.log(result);
      alert("Record Created : Intime added")
      navigate('/leavePlanner/'+userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="enterTimeForm" onSubmit={handleSubmit}>
        <label className="enterTimeFormLabel">In Time</label>
        <TimePicker
          className="my-time-picker"
          onchange={handleTimeChange}
          value={inTime}
          disableClock
          locale="en-US"
          clearIcon={false}
          readOnly
        />
        <label className="enterTimeFormLabel">Comment</label>
        <input
          type="text"
          onChange={handleChange}
          value={inTimeComment}
          className="txtArea"
          required
        />
        <br />

        <button className="submitTime">Submit In Time</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default EnterInTime;
