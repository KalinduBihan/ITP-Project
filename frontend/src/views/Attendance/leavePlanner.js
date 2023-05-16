import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar"
import ApplyLeaveMessage from "./applyLeaveMessage";
import './leavepage.css'
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";

const LeavePlanner = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState();
  const [leaveRecords, setLeaveRecords] = useState();
  const [fullDayTaken, setFullDayTaken] = useState();
  const [halfDayTaken, sethHalfDayTaken] = useState();
  const [shortLeaveTaken, setShortLeaveTaken] = useState();
  const [recExists, setRecExists] = useState();

  const today = new Date().toISOString().slice(0, 10)
  const d = new Date(new Date().getFullYear(), 0, 1);
  const startDate  = d;
  const endDate    = today;
  const diffInMs   = new Date(endDate) - new Date(startDate)
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const {userId} = useParams()

  useEffect(() => {
    const fetchAttRecords = async () => {
      const response = await fetch(`/api/attendance/userNoOfAttendanceRecords/${userId}`);
      const json = await response.json();
      if (response.ok) {
        setRecords(json.count)
      }
    };

    const fetchLeaveRecords = async () => {
      const response = await fetch(`/api/leaves/userAllLeaveEntRecords/${userId}`);
      const json = await response.json();
      if (response.ok) {
        setLeaveRecords(json);
        setFullDayTaken(json[0].fullDayTaken)
        sethHalfDayTaken(json[0].halfDayTaken)
        setShortLeaveTaken(json[0].shortLeaveTaken)
      }
    };

    const checkRecord = async () => {
      const attResponse = await fetch(`/api/attendance/checkAttRecord/${userId}`, {
        method: "GET",
      });
      const leaveResponse = await fetch(`/api/attendance/checkLeaveRecord/${userId}`, {
        method: "GET",
      });
      const attJson = await attResponse.json();
      const leaveJson = await leaveResponse.json();

      if (attJson.length == 0 && leaveJson.length ==0) {
        console.log("false");
        setRecExists(false)
      } else {
        console.log("true");
        setRecExists(true)
      }
    };

    fetchAttRecords();
    fetchLeaveRecords();
    checkRecord();

  }, []);

  const userAttData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: "No of Days",
        data: [records,Math.round(diffInDays)-records],
        backgroundColor: [
          "#FBAF4E",
          "#00b4d0 "
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  }
 
  const userLeaveData = {
    labels: ['fullDayAll','fullDayTaken', 'halfDayAll','halfDayTaken','shortLeaveAll','shortLeaveTaken'],
    datasets: [
      {
        label:"Leave Stats",
        data: [14,fullDayTaken,14,halfDayTaken,14,shortLeaveTaken],
        backgroundColor: [
          "#009B4D",
          "#00b4d0 ",
          "#FFCC00",
          "#EF036C ",
          "#FBAF4E",
          "#00b4d0 "
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  }


  return (
    <div>
      <LeavePlannerNavbar />
      {recExists ? " ":<ApplyLeaveMessage/>}
      <h2 className="leavePlannerTopic">Leave Planner </h2>
      <button
        className="enterTimeBtn"
        onClick={() => {
          navigate("/attendanceForm");
        }}
      >
        Enter time
        <i
          class="fa fa-clock-o"
          aria-hidden="true"
          style={{ paddingLeft: "14px" }}
        ></i>
      </button>
      <br />
      <br />
      <br />
      <div>
      <div style={{ width: 400,display:"inline-block" }}>
        <PieChart chartData={userAttData} />
      </div>

      <div style={{ width: 650,display:"inline-block",marginLeft:"100px" }}>
        <BarChart chartData={userLeaveData} />
      </div>
      </div>

    </div>
  );
};

export default LeavePlanner;
