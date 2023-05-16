import { useEffect, useState } from "react";
import WOHrequestsUserSingle from "./WOHrequestUserSingle";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";
import { useParams } from "react-router-dom";

const WOHrequestsUserAll = () => {
  const [records, setRecords] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch(
        `/api/workonholiday/userAllWorkOnHolidayRecords/${userId}`,
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
  }, [userId]);

  return (
    <div>
      <LeavePlannerNavbar />
      <h2>My Work on holiday requests</h2>
      <br />
      <table id="wohTbl">
        <thead>
          <tr>
            <th>Record Date</th>
            <th>Requested Date</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record) => (
              <WOHrequestsUserSingle key={record._id} record={record} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WOHrequestsUserAll;
