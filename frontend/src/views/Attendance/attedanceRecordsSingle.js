import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AttendanceRecordsSingle = ({ record }) => {
  const { user } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (window.confirm("Are You sure you want to delete record?")) {
      const response = await fetch(
        "/api/attendance/deleteAttendanceRecords/" + record._id,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();

      if (response.ok) {
        console.log("Workout delete", json);
        window.location.reload(false);
      }
    }
  };

  return (
    <tr>
      <td>{record.userId}</td>
      <td>{record.userName}</td>
      <td>{record.recordDate}</td>
      <td>{record.inTime}</td>
      <td>{record.inTimeComment}</td>
      <td>{record.outTime}</td>
      <td>{record.outTimeComment}</td>
      <td>{record.totalTime}</td>
      <td>
        <button className="redButton" onClick={handleClick}>
          Delete
        </button>
      </td>
      <td>
        <a className="div16" href={"/attendanceRecordUpdate/" + record._id}>
          <button className="blueButton">Update</button>
        </a>
      </td>
    </tr>
  );
};
export default AttendanceRecordsSingle;
