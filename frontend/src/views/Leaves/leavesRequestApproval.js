import { useEffect, useState } from "react";
import LeavesRequestApprovalSingle from "./leavesRequestApprovalSingle";
import './leaves.css'

const LeavesRequestApproval = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch("/api/leaves/allLeaveRecordsApproval");
      const json = await response.json();
      if (response.ok) {
        setRecords(json);
      }
    };
    fetchAllRecords();
  }, []);

  return (
    <div>
      <h2>Leave Record Approval</h2>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By ID"
        className="inputBar"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <table  id="leaveTable">
      <thead>
        <tr>
        <th>User Id</th>
        <th>User Name</th>
        <th>Record Date</th>
        <th>From Date</th>
        <th>End Date</th>
        <th>No of Days</th>
        <th>Leave Type</th>
        <th>Comment</th>
        <th>Relief</th>
        <th>Status</th>
        <th>Update</th>
        </tr>
      </thead>
        <tbody>
          {records &&
            records
              .filter((record) => {

                if (search === "") {
                  return record;
                } else if (
                  record.userId.toLowerCase().includes(search.toLowerCase())||
                  record.userName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return record;
                }
                
              })
              .map((record) => (
                <LeavesRequestApprovalSingle key={record._id} record={record} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesRequestApproval;
