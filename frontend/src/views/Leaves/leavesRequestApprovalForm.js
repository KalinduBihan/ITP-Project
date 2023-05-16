import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";
import "./leaves.css";

const LeavesRequestApprovalForm = () => {
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
  //fetch current information to a form
  useEffect(() => {
    setError(null);

    const fetchLeave = async () => {
      fetch(`/api/leaves/LeaveRecord/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEmpId(data.userId);
          setEmpName(data.userName);
          setRecordDate(data.recordDate);
          setNoOfDays(data.noOfDays);
          setLeaveType(data.leaveType);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
          setComment(data.comment);
          setStatus(data.status);
          setRelief(data.relief);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchLeave();
  }, [id]);


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

      // const rec = {
      //   empId,
      //   leaveType,
      //   status,
      // };
      // const response2 = await fetch(`/api/leaves/updateLeaveEntRecord`, {
      //   method: "PATCH",
      //   body: JSON.stringify(rec),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const json2 = await response2.json();
      
      // if (!response2.ok) {
      //   setError(json2.error);
      // }
    }
    if (response.ok) {
      navigate("/leaveRecordsApproval");
    }
  };

  //update form component
  return (
    <div className="form-style">
      <form className="create">
        <h3>Update Record</h3>
        <label>User ID</label>
        <span className="attSpn">{empId}</span>
        <label>User Name</label>
        <span className="attSpn">{empName}</span>
        <label>Record Date</label>
        <span className="attSpn">{recordDate}</span>
        <label>Leave Type</label>
        <span className="attSpn">{leaveType}</span>
        <label>Start Date</label>
        <DatePicker
          onChange={(e) => setStartDate(e.target.value)}
          style={{ width: "322px" }}
        />
        <label>End Date</label>
        <DatePicker
          onChange={(e) => setEndDate(e.target.value)}
          style={{ width: "322px" }}
        />
        <label>Comment</label>
        <span className="attSpn">{comment}</span>
        <label>Relief</label>
        <span className="attSpn">{relief}</span>
        <label>Status</label>
        <input
          type="radio"
          onChange={(e) => setStatus(e.target.value)}
          value="Accepted"
          style={{ width: "auto", display: "inline" }}
        />
        <label style={{ width: "auto", display: "inline" }}>Accepted</label>
        <br />
        <br />
        <input
          type="radio"
          onChange={(e) => setStatus(e.target.value)}
          value="Rejected"
          style={{ width: "auto", display: "inline" }}
        />
        <label style={{ width: "auto", display: "inline" }}>Rejected</label>
        <br />
        <br />
        <br />
        <button onClick={handleSubmit} className="update-btn">
          Update Record
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};
export default LeavesRequestApprovalForm;
