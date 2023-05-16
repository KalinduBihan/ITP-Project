import { useContext , useEffect, useState} from "react";
import goalAssign from '../../../apis/modules/goalsView';
import GoalsNavbar from "../../../components/goalsNavbar";
import '../GoalTables/singleGoalDetail.css';
import '../../../styles/goals.css'


import AuthContext from "../../../context/AuthContext";

const ViewGoalsHome = () => {

  const { user } = useContext(AuthContext)
  const userID = user?.employeeId
 const[goals, setGoals] = useState([])

  useEffect(() => {
    const fetchAllAssigns = async () => {
     
      const response = await (await goalAssign.getGoalByEmmployee(userID)).data
      console.log(response)
      setGoals(response)
  
    }

    fetchAllAssigns()
  }, [])

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };
  const getRemainingDays = (currentDate, deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDateDate = new Date(currentDate);
    const diffTime = Math.abs(deadlineDate - currentDateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    return diffDays;
  };
  return (
    <div>
      {/* <GoalsNavbar /> */}
      <h1  style={{ marginLeft: "20px", marginTop:"35px" }}>List of Goals</h1>
      <div className="goalsHome">
        <div className="goals-container">
          <div className="goals">
            
      
        {goals && goals.map((goal, index) => (
        <div key={index} className="goal-details">
           <h4>{goal.goalTitle}</h4>
          <p><strong>Goal Type:</strong> {goal.goalType}</p>
         
          <p><strong>Assigned Date:</strong> {goal.assignedDate}</p>
          <p><strong>Deadline:</strong> {goal.goalDeadline}</p>
          
          <p>{" "}<span><strong>
              {getRemainingDays(getCurrentDate(), goal.goalDeadline)} Days Remaining
              </strong></span></p>
              <p><strong>Status:</strong> {goal.status}</p>
          <br />
        </div>
       
      ))}
    
    </div></div></div>
    </div>
    );
}

 
export default ViewGoalsHome;