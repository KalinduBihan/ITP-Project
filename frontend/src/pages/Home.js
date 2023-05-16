import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext)
  const userId = user?.employeeId;
  const userRole = user?.userRole
  
  const navigate = useNavigate()
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(()=>{
    if(userRole=="Admin"){
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }
  })

  return (
    <div className="main-body">
      <h2 className="section-heading">Home</h2>

      <div
        className="tiles-common leave-planner-tile"
        onClick={() => {
          navigate("/leavePlanner/" + userId);
        }}
      >
        <div className="tile-icon">
          <i className="fa-solid fa-person-walking fa-lg"></i>
        </div>
        <div className="tile-text">Leave Planner</div>
      </div>

      <div
        className="tiles-common training-tile"
        onClick={() => {
          navigate("/AllCourses");
        }}
      >
        <div className="tile-icon">
          <i className="fa-solid fa-graduation-cap fa-lg"></i>
        </div>
        <div className="tile-text">Training</div>
      </div>

      <div className="tiles-common goals-tile">
        <div className="tile-icon">
          <i className="fa-solid fa-bullseye fa-lg"></i>
        </div>
        <div
          className="tile-text"
          onClick={() => {
            navigate("/EmployeeGoal");
          }}
        >
          Goals
        </div>
      </div>

      <div
        className="tiles-common appraials-tile"
        onClick={() => {
          navigate("/user/appraisal");
        }}
      >
        <div className="tile-icon">
          <i className="fa-solid fa-3 fa-lg"></i>
          <i className="fa-solid fa-6 fa-lg"></i>
          <i className="fa-solid fa-0 fa-lg"></i>
        </div>
        <div className="tile-text">360-appraisel</div>
      </div>

      <div
        className="tiles-common calendar-tile"
        onClick={() => {
          navigate("/eventCalendar");
        }}
      >
        <div className="tile-icon">
          <i className="fa-solid fa-calendar-days fa-lg"></i>
        </div>
        <div className="tile-text">Calendar</div>
      </div>

      {isAdmin ? (
        <div
          className="tiles-common administration-tile"
          onClick={() => {
            navigate("/adminTiles");
          }}
        >
          <div className="tile-icon">
            <i className="fa-solid fa-address-card fa-lg"></i>
          </div>
          <div className="tile-text">Administration</div>
        </div>
      ) : (
        ""
      )}

      <div className="tiles-common company-policies-tile">
        <div className="tile-icon">
          <i className="fa-solid fa-file-contract fa-lg"></i>
        </div>
        <div className="tile-text">Company Policies</div>
      </div>
    </div>
  );
};

export default Home;
