import { useEffect, useState, useContext } from "react";
import AttendanceRecordsUserSingle from "./attedanceRecordsUserSingle";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";

const AttendanceRecordsUser = () => {
  const [records, setRecords] = useState(null);
  const { userId } = useParams();

  console.log("Uswerid " + userId);
  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch(
        `/api/attendance/userAttendanceRecords/${userId}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      if (response.ok) {
        setRecords(json);
      }
    };
    fetchAllRecords();
  }, []);

  return (
    <div>
      <LeavePlannerNavbar />
      <h2>My attendance record History</h2>
      <br />
      <table  id="attTbl">
        <thead>
          <tr>
            <th>Record Date</th>
            <th>In Time</th>
            <th>In Time Comment</th>
            <th>Out Time</th>
            <th>Out Time Comment</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record) => (
              <AttendanceRecordsUserSingle key={record._id} record={record} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecordsUser;
