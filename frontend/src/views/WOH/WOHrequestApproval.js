import { useEffect, useState } from "react";
import WOHrequestApprovalSingle from "./WOHrequestApprovalSingle";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar"

const WOHrequestsAll = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch("/api/workonholiday/allWorkOnHolidayRecordsApproval");
      const json = await response.json();
      if (response.ok) {
        setRecords(json);
      }
    };
    fetchAllRecords();
  }, []);

  return (
    <div>
        <LeavePlannerNavbar/>
      <h2>WOH Record Approval</h2>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By ID"
        className="inputBar"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <table id="wohTbl">
      <thead>
        <tr>
        <th>User Id</th>
        <th>User Name</th>
        <th>Record Date</th>
        <th>Requested Date</th>
        <th>Comment</th>
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
                  record.userId.toLowerCase().includes(search.toLowerCase())
                ) {
                  return record;
                }
              })
              .map((record) => (
                <WOHrequestApprovalSingle key={record._id} record={record} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default WOHrequestsAll;
