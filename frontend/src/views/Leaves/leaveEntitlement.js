import { useEffect, useState } from "react";

const LeaveEntitlement = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch("/api/leaves/allLeaveEntitlementRecords");
      const json = await response.json();
      if (response.ok) {
        setRecords(json);
      }
    };
    fetchAllRecords();
  });

  return (
    <div>
      <h2>Leave Entitlement</h2>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By ID or name"
        className="inputBar"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <table id="leaveTable">
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Full day leaves</th>
            <th>Half day leaves</th>
            <th>Short leaves</th>
            <th>Full day leaves taken</th>
            <th>Half day leaves taken</th>
            <th>Short leaves taken</th>
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
                    <td>{record.fullDayAll}</td>
                    <td>{record.halfDayAll}</td>
                    <td>{record.shortLeaveAll}</td>
                    <td>{record.fullDayTaken}</td>
                    <td>{record.halfDayTaken}</td>
                    <td>{record.shortLeaveTaken}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};
export default LeaveEntitlement;
