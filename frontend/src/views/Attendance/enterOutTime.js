import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import attendance from "../../apis/modules/attendance";
import TimePicker from "react-time-picker";
import { useNavigate } from "react-router-dom";

const EnterOutTime = () => {
  const { user } = useContext(AuthContext)
  const [outTime, setOutTime] = useState(new Date());
  const [outTimeComment, setOutTimeComment] = useState("Out time Entered manually");
  const { error, setError } = useState(null);
  let navigate = useNavigate();

  const userId = user?.employeeId;

  const handleTimeChange = (selectedTime) => {
    setOutTime(selectedTime);
  };

  function handleChange(event) {
    console.log(event.target.value);
    setOutTimeComment(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(outTimeComment);
    try {
      const payload = { outTime, outTimeComment };
      const result = attendance.enterOutTime(userId, payload);
      console.log(result);
      alert("Record Updated : Out Time Added")
      navigate('/leavePlanner/'+userId);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      <form className="enterTimeForm" onSubmit={handleSubmit}>
        <label className="enterTimeFormLabel" >Out Time</label>
        <TimePicker
          className="my-time-picker"
          onchange={handleTimeChange}
          value={outTime}
          disableClock
          locale="en-US"
          clearIcon={null}
          readOnly
        />
        <label className="enterTimeFormLabel">Comment</label>
        <input
          type="text"
          onChange={handleChange}
          value={outTimeComment}
          className="txtArea"
          required
        />
        <br />
        <button className="submitTime">Submit Out Time</button>
      </form>
    </div>
  );
};

export default EnterOutTime;
