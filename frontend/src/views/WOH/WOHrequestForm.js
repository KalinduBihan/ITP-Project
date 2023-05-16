import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar"

const CreateWOHrequest = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState("");

  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  const userId = user?.employeeId;
  const userName = user?.name;

  function handleChange(event) {
    console.log(event.target.value);
    setComment(event.target.value);
  }

  const handleDateChange = (date) => {
    const requestedDatelo = new Date(date)
    setSelectedDate(requestedDatelo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedDate);
    if (!user) {
      setError("You must be logged in");
      return;
    }

    new Date(selectedDate)
    const payload = {userName, selectedDate, comment };

    const response = await fetch(
      "/api/workonholiday/createWorkOnHolidayRequest/" + userId,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setSelectedDate(null);
      setComment("");
      setError(null);
      console.log("new request sent:", json);
    }
  };

  return (
    <div>
    <LeavePlannerNavbar/>
      <form onSubmit={handleSubmit}>
        <h2>Work on holiday request</h2>

        <label>Request Date</label>
        <DatePicker
          placeholderText={"dd/mm/yyyy"}
          selected={selectedDate}
          onChange={handleDateChange}
          required
        />

        <label>Comment</label>
        <input
          type="text"
          value={comment}
          onChange={handleChange}
        ></input>

        <button>Send Request</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CreateWOHrequest;
