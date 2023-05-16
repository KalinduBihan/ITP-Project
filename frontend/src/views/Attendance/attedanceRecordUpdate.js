import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./leavepage.css";
import TimePicker from "react-time-picker";

const UpdateAttendanceRecord = () => {
  const [empId, setEmpId] = useState();
  const [recordDate, setRecordDate] = useState();
  const [inTime, setInTime] = useState();
  const [inTimeComment, setInTimeComment] = useState();
  const [outTime, setOutTime] = useState();
  const [outTime2, setOutTime2] = useState();
  const [outTimeComment, setOutTimeComment] = useState();

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { id } = useParams();
  let navigate = useNavigate();

  //fetch current information to a form
  useEffect(() => {
    setError(null);

    const fetchWorkout = async () => {
      fetch(`/api/attendance/attendanceRecords/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEmpId(data.userId);
          setRecordDate(data.recordDate);
          setInTime(data.inTime);
          setInTimeComment(data.inTimeComment);
          setOutTime(data.outTime);
          setOutTimeComment(data.outTimeComment);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchWorkout();

    if (outTime == "TBA") {
      setOutTime2(null);
    } else {
      setOutTime2(outTime);
    }
  }, [id]);

  //send the updated information
  const handleSubmit = async (e) => {
    e.preventDefault();

    const record = {
      empId,
      recordDate,
      inTime,
      inTimeComment,
      outTime,
      outTimeComment,
    };

    const response = await fetch(
      `/api/attendance/updateAttendanceRecord/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(record),
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
      alert("Record updated:", json);
      navigate("/recordHistory");
    }
  };

  //update form component
  return (
    <form className="updateAttRec">
      <h3>Update Record</h3>
      <br />
      <label>User ID : </label>
      <span className="attSpn">{empId}</span>
      <br />
      <label>Record Date : </label>
      <span className="attSpn">{recordDate}</span>
      <br />

      <label>In Time : </label>
      <span className="attSpn">{inTime}</span>
      <br />
      <TimePicker
        className="my-time-picker"
        disableClock
        locale="en-US"
        clearIcon={false}
      />
      <label>In Time Comment :</label>
      <input
        className="attIn"
        type="text"
        value={inTimeComment}
        onChange={(e) => setInTimeComment(e.target.value)}
        required
      />
      <br />
      <label>Out Time : </label>
      <span className="attSpn">{outTime}</span>
      <br />
      <TimePicker
        className="my-time-picker"
        disableClock
        locale="en-US"
        clearIcon={false}
      />

      <label>Out Time Comment : </label>
      <input
        className="attIn"
        type="text"
        value={outTimeComment}
        onChange={(e) => setOutTimeComment(e.target.value)}
        required
      />

      <button onClick={handleSubmit} className="updateBtn">
        Update Record
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateAttendanceRecord;
