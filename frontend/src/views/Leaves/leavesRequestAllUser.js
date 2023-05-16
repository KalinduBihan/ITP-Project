import { useEffect, useState } from "react";
import LeavesRequestsUserSingle from "./leavesRequestUserSingle";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";
import { useParams } from "react-router-dom";

const LeavesRequestsUserAll = () => {
  const [records, setRecords] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch(
        `/api/leaves/userAllLeaveRecords/${userId}`,
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
      <h2>My Leave requests</h2>
      <br />
      <table id="leaveTable">
        <thead>
          <tr>
            <th>Record Date</th>
            <th>From Date</th>
            <th>End Date</th>
            <th>No of Days</th>
            <th>Leave Type</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Relief</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record) => (
              <LeavesRequestsUserSingle key={record._id} record={record} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesRequestsUserAll;
