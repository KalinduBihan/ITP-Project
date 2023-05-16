import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const LeavesRequestsAllSingle = ({ record }) => {
  const { user } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if(window.confirm("Are You sure you want to delete record?")){
      const response = await fetch(
        "/api/leaves/deleteLeaveRecord/" + record._id,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();
  
      if (response.ok) {
        console.log("Request delete", json);
        window.location.reload(false);
      }
    }
  };

  return (
      <tr>
      <td>{record.userId}</td>
      <td>{record.userName}</td>
      <td>{record.recordDate}</td>
      <td>{record.startDate}</td>
      <td>{record.endDate}</td>
      <td>{record.noOfDays}</td>
      <td>{record.leaveType}</td>
      <td>{record.comment}</td>
      <td>{record.status}</td>
      <td>{record.relief}</td>
      <td>
        <button className="redButton" onClick={handleClick}>
          Delete
        </button>
      </td>
      <td>
        <a href={"./leaveRequestUpdate/" + record._id}>
          <button className="blueButton">Update</button>
        </a>
      </td>
      </tr>
  );
};

export default LeavesRequestsAllSingle;