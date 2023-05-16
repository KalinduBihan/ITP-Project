import React, { useEffect, useState, useContext } from "react";
import EnterInTime from "./enterInTime";
import EnterOutTime from "./enterOutTime";
import AuthContext from "../../context/AuthContext";
import LeavePlannerNavbar from "../../components/LeavePlannerNavbar";
import "./leavepage.css";

const AttendanceForm = () => {
  const { user } = useContext(AuthContext);
  const [inTimeForm, setInTimeForm] = useState();
  const currentDate = new Date();

  useEffect(() => {
    setInTimeForm(true);
  }, []);

  return (
    <div>
      <LeavePlannerNavbar />
      <br/>
      <h2 className="leavePlannerTopic">Enter attendance</h2>
      <br />
      <span className="leavePlannerDate">{currentDate.toDateString()}</span>
      <br />
      <button
        onClick={() => setInTimeForm(true)}
        className={
          inTimeForm ? "timeFormBtn timeFormBtnUnderline" : "timeFormBtn"
        }
      >
        In Time
      </button>
      <button
        onClick={() => setInTimeForm(false)}
        className={
          !inTimeForm ? "timeFormBtn timeFormBtnUnderline" : "timeFormBtn"
        }
      >
        Out Time
      </button>
      {inTimeForm ? <EnterInTime /> : <EnterOutTime />}
    </div>
  );
};

export default AttendanceForm;
