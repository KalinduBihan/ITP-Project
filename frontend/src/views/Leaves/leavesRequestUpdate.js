import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";
import './leaves.css'

const LeavesRequestUpdate = () => {
  const [empId, setEmpId] = useState();
  const [empName, setEmpName] = useState();
  const [recordDate, setRecordDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [noOfDays, setNoOfDays] = useState();
  const [leaveType, setLeaveType] = useState();
  const [comment, setComment] = useState();
  const [status, setStatus] = useState();
  const [relief, setRelief] = useState();
  const [error, setError] = useState(null);

  const { id } = useParams();
  let navigate = useNavigate();

  const handleStartDateChange = (date) => {
    const requestedDatelo = new Date(date);
    setStartDate(requestedDatelo);
  };
  const handleEndDateChange = (date) => {
    const requestedDatelo = new Date(date);
    setEndDate(requestedDatelo);
  };

  //fetch current information to a form
  useEffect(() => {
    setError(null);

    const fetchWorkout = async () => {
      fetch(`/api/leaves/LeaveRecord/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEmpId(data.userId);
          setEmpName(data.userName);
          setRecordDate(data.recordDate);
          setNoOfDays(data.noOfDays);
          setLeaveType(data.leaveType);
          setStartDate(new Date(data.startDate));
          setEndDate(new Date(data.endDate));
          setComment(data.comment);
          setStatus(data.status);
          setRelief(data.relief);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchWorkout();
  }, [id]);

  //send the updated information
  const handleSubmit = async (e) => {
    e.preventDefault();

    const record = {
      empId,
      empName,
      recordDate,
      startDate,
      endDate,
      noOfDays,
      leaveType,
      comment,
      status,
      relief,
    };

    const response = await fetch(`/api/leaves/updateLeaveRecord/${id}`, {
      method: "PATCH",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      navigate("/allLeaveRecords");
    }
  };

  //update form component
  return (
    <div>
      <LeavePlannerNavbar />
    <div className="form-style">
      <form className="create">
        <h3>Update Record</h3>
        <label>User ID : </label>
        <span className="attSpn">{empId}</span><br/>
        <label>User Name : </label>
        <span className="attSpn">{empName}</span><br/>
        <label>Record Date : </label>
        <span className="attSpn">{recordDate}</span><br/>
        <label>Leave Type : </label>
        <span className="attSpn">{leaveType}</span><br/>
        <label>Start Date : </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            style={{ width: "322px" }}
          />
          <br />
          <label>End Date : </label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            style={{ width: "322px" }}
          />
        <label>Comment : </label>
        <input
          className="attIn"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "auto" }}
          required
        /><br/>
        <label>Relief : </label>
        <input
          className="attIn"
          type="text"
          value={relief}
          onChange={(e) => setRelief(e.target.value)}
          style={{ width: "auto" }}
          required
        /><br/>
        <label>Status : {status}</label><br/>
        <input
          type="radio"
          onChange={(e) => setStatus(e.target.value)}
          value="Accepted"
          name="lvar"
          style={{ width: "auto", display: "inline" }}
        />
        <label style={{ width: "auto", display: "inline" }}>
          Accepted
        </label>
        <br />
        <br />
        <input
          type="radio"
          onChange={(e) => setStatus(e.target.value)}
          value="Rejected"
          name="lvar"
          style={{ width: "auto", display: "inline" }}
        />
        <label style={{ width: "auto", display: "inline" }}>
          Rejected
        </label>
        <br />
        <br />
        <br />
        <button onClick={handleSubmit} className="update-btn">Update Record</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
    </div>
  );
};

export default LeavesRequestUpdate;
