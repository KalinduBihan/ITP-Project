import React, { useEffect, useState } from 'react'
import AttendanceRecordsDetails from '../views/Attendance/attendanceRecordsAll'
import LeaveRecordsAll from "../views/Leaves/leavesRequestsAll"
import WOHRecordsAll from "../views/WOH/WOHrequestsAll"
const RecordHistory=()=> {
  const [attendanceRecords,setattendanceRecords] = useState(true)
  const [leaveRecords,setLeaveRecords] = useState(false)
  const [WOHrecords,setWOHrecords] = useState(false)

  const attRecs=(()=>{
    setattendanceRecords(true)
    setLeaveRecords(false)
    setWOHrecords(false)
  })
  const leaveRecs=(()=>{
    setattendanceRecords(false)
    setLeaveRecords(true)
    setWOHrecords(false)
  })
  const wohRecs=(()=>{
    setattendanceRecords(false)
    setLeaveRecords(false)
    setWOHrecords(true)
  })

  return (
    <div>
      <h2 className="leavePlannerTopic">Record History</h2><br/>
      <button onClick={attRecs} className={attendanceRecords?'timeFormBtn timeFormBtnUnderline':"timeFormBtn"}    >Attendance</button>
      <button onClick={leaveRecs} className={leaveRecords?'timeFormBtn timeFormBtnUnderline':"timeFormBtn"}    >Leave</button>
      <button onClick={wohRecs} className={WOHrecords?'timeFormBtn timeFormBtnUnderline':"timeFormBtn"}    >WOH</button>
      {attendanceRecords ? (<AttendanceRecordsDetails/>): leaveRecords? (<LeaveRecordsAll/>):(<WOHRecordsAll/>)}
    </div>
  )
}

export default RecordHistory
