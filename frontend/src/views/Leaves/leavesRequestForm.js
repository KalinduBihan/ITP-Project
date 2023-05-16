import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './leaves.css'
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar"

const LeavesRequestForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [comment, setComment] = useState("");
  const [relief, setRelief] = useState("");
  const [error,setError] = useState(null)
  const { user } = useContext(AuthContext);

  const userId = user?.employeeId;
  const userName = user?.name;

  const handleStartDateChange = (date) => {
    const requestedDatelo = new Date(date)
    setStartDate(requestedDatelo);
  };
  const handleEndDateChange = (date) => {
    const requestedDatelo = new Date(date)
    setEndDate(requestedDatelo);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const diffInMs = Math.abs(date2 - date1);
    const diffinDays =  diffInMs / (1000 * 60 * 60 * 24);

    const payload = { userId,userName, startDate, endDate,diffinDays,leaveType,comment,relief };

    const response = await fetch(
      "/api/leaves/createLeaveRequest/",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setStartDate(null)
      setEndDate(null)
      setComment('')
      setLeaveType('')
      setRelief('')
      console.log("new request sent:", json);
    }
  };
  return (
      <div>
      <LeavePlannerNavbar/>
    <div className="form-style">
      <form onSubmit={handleSubmit}>
        <h2>Leave request</h2>
        <label>Start Date</label>
        <DatePicker
          placeholderText={"dd/mm/yyyy"}
          selected={startDate}
          onChange={handleStartDateChange}
          required
        />
        <label>End Date</label>
        <DatePicker
          placeholderText={"dd/mm/yyyy"}
          selected={endDate}
          onChange={handleEndDateChange}
          required
        />

        <label>Comment</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></input>

        <input
          type="radio"
          onChange={(e) => setLeaveType(e.target.value)}
          value="Full Day"
          name="leaveType"
          style={{ width: "auto", display: "inline" }}
        />
        <label for="age1" style={{ width: "auto", display: "inline" }}>
          Full Day
        </label>
        <input
          type="radio"
          onChange={(e) => setLeaveType(e.target.value)}
          value="Half Day"
          name="leaveType"
          style={{ width: "auto", display: "inline" }}
        />
        <label for="age1" style={{ width: "auto", display: "inline" }}>
          Half Day
        </label>
        <input
          type="radio"
          onChange={(e) => setLeaveType(e.target.value)}
          value="Short Leave"
          name="leaveType"
          style={{ width: "auto", display: "inline" }}
        />
        <label for="age1" style={{ width: "auto", display: "inline" }}>
          Short Leave
        </label>

        <label>Relief Name</label>
        <input
          type="text"
          value={relief}
          onChange={(e) => setRelief(e.target.value)}
          required
        ></input>

        <button className="request-btn">Send Request</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
   </div>
  );
};

export default LeavesRequestForm;
