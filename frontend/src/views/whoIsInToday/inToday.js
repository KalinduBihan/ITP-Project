import { useEffect, useState } from "react";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";
import './inToday.css'
const InToday = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch(`/api/whoIsInToday/allEmployeesToday`, {
        method: "GET",
      });
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
      <h2>Who are in Today</h2>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By ID or Name"
        className="inputBar"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <br />
      <table id="inTodayTable">
      <thead>
					<tr>
						<th>User Id</th>
						<th>User Name</th>
						<th>User InTime</th>
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
                  <td>{record.inTime}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default InToday;
