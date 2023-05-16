import { useEffect, useState } from "react";

import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";

const LeaveToday = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");
  const [recordsToday, setRecordsToday] = useState(null);

  const today = new Date();

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch("/api/leaves/allLeaveRecords");
      const json = await response.json();
      if (response.ok) {
        setRecords(json);
      }
    };
    fetchAllRecords();
    
    const fetchTodayRecords = async()=>{
      if(today<=records.fromDate || today>=records.endDate){
          
      } 
    }
  }, []);

  return (
    <div>
      <LeavePlannerNavbar />
      <h2>Who are on leave Today</h2>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By ID or Name"
        className="inputBar"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <br />
      <table id="leaveTodayTable">
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Leave End</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records
              .filter((record) => {
                if (search === "") {
                  return record;
                } else if (
                  record.userId.toLowerCase().includes(search.toLowerCase()) ||
                  record.userName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return record;
                }
              })
              .map((record) => {
                return (
                  <tr key={record._id}>
                    <td>{record.userId}</td>
                    <td>{record.userName}</td>
                    <td>{record.endDate}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveToday;
