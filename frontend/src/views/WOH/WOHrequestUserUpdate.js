import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";
import "./woh.css";

const WOHrequestUserUpdate = () => {
  const [empId, setEmpId] = useState();
  const [recordDate, setRecordDate] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const [comment, setComment] = useState();
  const [status, setStatus] = useState();
  const [error, setError] = useState(null);

  const { id } = useParams();
  let navigate = useNavigate();

  const handleDateChange = (date) => {
    const requestedDatelo = new Date(date);
    setSelectedDate(requestedDatelo);
  };
  //fetch current information to a form
  useEffect(() => {
    setError(null);

    const fetchWorkout = async () => {
      fetch(`/api/workonholiday/workOnHolidayRecord/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEmpId(data.userId);
          setRecordDate(data.recordDate.toString());
          setSelectedDate(new Date(data.requestedDate));
          setComment(data.comment);
          setStatus(data.status);
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

    const record = { empId, recordDate, comment, status };

    const response = await fetch(
      `/api/workonholiday/updateWorkOnHolidayRecord/${id}`,
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
      navigate("/allWOHRecords");
    }
  };

  //update form component
  return (
    <div>
      <LeavePlannerNavbar />
      <form className="updateAttRec">
        <h3>Update WOH Record</h3>
        <label>User ID</label>
        <span className="attSpn">{empId}</span>
        <br />
        <label>Record Date</label>
        <span className="attSpn">{recordDate}</span>
        <br />
        <label>Requested Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          style={{ width: "322px" }}
        />
        <br />
        <label>Comment</label>
        <input
          className="attIn"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "auto" }}
        />
        <br />
        <label>Status</label>
        <br />
        <span className="attSpn">{status}</span><br/>
        <br />
        <br />
        <br />
        <button onClick={handleSubmit} className="updateBtn">
          Update Record
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WOHrequestUserUpdate;
