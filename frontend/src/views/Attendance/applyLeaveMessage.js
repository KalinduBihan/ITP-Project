import React from 'react'
import { useNavigate } from "react-router-dom";

const ApplyLeaveMessage = () => {
  var date = new Date();
  const recordDate = new Date(date.setDate(date.getDate() - 1))
  const recordDatelocal = recordDate.toLocaleDateString("en-GB");

  const navigate = useNavigate();

  return (
    <div className='applyLeaveMassage'>
      <h3 style={{display:'inline-block'}}>Attendance record for {recordDatelocal} is missing. Please apply Leave</h3>
      <button
        className="applyLeaveBtn"
        onClick={() => {
          navigate("/createLeaveRequest");
        }}
      >
        Apply Leave
      </button>
    </div>
  )
}

export default ApplyLeaveMessage
