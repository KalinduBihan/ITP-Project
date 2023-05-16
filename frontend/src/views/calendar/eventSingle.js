import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const EventSingle = ({ record }) => {
  const { user } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (window.confirm("Are You sure you want to delete record?")) {
      const response = await fetch("/api/events/delete/" + record._id, {
        method: "DELETE",
      });
      const json = await response.json();

      if (response.ok) {
        console.log("Request delete", json);
        window.location.reload(false);
      }
    }
  };

  return (
    <tr>
      <td>{record.eventName}</td>
      <td>{record.eventDate}</td>
      <td>{record.comment}</td>
      <td>{record.eventType}</td>
      <td>
        <button className="redButton" onClick={handleClick}>
          Delete
        </button>
      </td>
      <td>
        <a href={"/updateEvent/" + record._id}>
          <button className="blueButton">Update</button>
        </a>
      </td>
    </tr>
  );
};
export default EventSingle;
