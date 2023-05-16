import { useEffect, useState } from "react";
import goalAssign from '../../../apis/modules/goalAssign'
import { useParams } from "react-router-dom";
import goalTable from "../../../apis/modules/goalTable";
import '../GoalTables/singleGoalDetail.css';
import '../../../styles/goals.css'


const GoalAssignUpdate = () => {
    const [Employee, setEmployee] = useState('')
    const [goalType, setType] = useState('')
    const [goalTitle, setTitle] = useState('')
    const [assignedDate, setAssign] = useState('')
    const [goalDeadline, setDeadline] = useState('')
    const [status, setStatus] = useState('')


    const [error, setError] = useState(null);
    const { id } = useParams();

    
    const [allEmp, setAllEmp] = useState('')
    const [allCat, setAllCat] = useState('')
    const [allTitle, setAllTitle] = useState('')

    //fetch current data to the form
    useEffect(() => {
        
        const fetchSingleAssignment = async () => {
            const response = (await goalAssign.getOnegoalAssign(id)).data;
          console.log(response)
            setEmployee(response.Employee)
            setTitle(response.goalTitle)
            setType(response.goalType)
            setAssign(response.assignedDate)
            setDeadline(response.goalDeadline)
            setStatus(response.status)

            const allEmp = await (await goalTable.getAllEmployees()).data
            setAllEmp(allEmp);
            console.log(allEmp)

            const allCat = await (await goalTable.getAllCategory()).data
            setAllCat(allCat);
            console.log(allCat)
            const allTitle = await (await goalTable.getAllTitles()).data
            setAllTitle(allTitle);
            console.log(allTitle)

            // Convert goalDeadline to a Date object
            const deadlineDate = new Date(response.goalDeadline);
            const assignDate = new Date(response.assignedDate);

            // Format the deadline date to yyyy-MM-dd format
            const formattedDeadline = deadlineDate.toISOString().slice(0, 10);
            const formattedAssignedDate = assignDate.toISOString().slice(0, 10);

            // Update the state with the formatted date
            setDeadline(formattedDeadline);
            setAssign(formattedAssignedDate);

            console.log(response);
        };
        fetchSingleAssignment();
    }, [id]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { Employee, goalType, goalTitle, assignedDate, goalDeadline, status};

            const result = await goalAssign.updategoalAssign(
                id,
                payload
            );

            if (result.status == 200) {
                window.location = "/assignGoals";
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="create" style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <form className="goalForm" style={{ width: "500px" }}>
                <h3 style={{ textAlign: "center" }}>Update Goal Assignement</h3>

                <label>Employee Name :</label>
            <select

                onChange={(e) => setEmployee(e.target.value)}
                value={Employee}
              
            >
                <option value={Employee}>{Employee}</option>
                {allEmp && allEmp.map((emp) => (
                    <option key={emp._id} value={emp.employeeId}>{emp.employeeId}</option>
                ))}
            </select>


            <label>Goal Type :</label>
            <select

                onChange={(e) => setType(e.target.value)}
                value={goalType}
            >
                <option value="">Select Goal Category</option>
                <option value="Peformance">Performance</option>
                <option value="Carrier">Carrier</option>
                <option value="Team">Team</option>
                <option value="Personal">Personal</option>
                <option value="Development">Development</option>
                {/* {allCat && allCat.map((emp) => (
                    <option key={emp._id} value={emp.goalCategory}>{emp.goalCategory}</option>
                ))} */}
            </select>

            <label>Goal Title :</label>
            <select

                onChange={(e) => setTitle(e.target.value)}
                value={goalTitle}
                
            >
                <option value={goalTitle}>{goalTitle}</option>
                {allTitle && allTitle.map((emp) => (
                    <option key={emp._id} value={emp.goalType}>{emp.goalType}</option>
                ))}
            </select>
            

            <label>Assigned Date :</label>
            <input
                type="date"
                onChange={(e) => setAssign(e.target.value)}
                value={assignedDate}
              
            />

            <label>Deadline :</label>
            <input
                type="date"
                onChange={(e) => setDeadline(e.target.value)}
                value={goalDeadline}
               
            />

            <label>Status :</label>
            <select

                onChange={(e) => setStatus(e.target.value)}
                value={status}
              
            >
                <option  value="">Select the status</option>
                <option  value="ongoing">Ongoing</option>
                <option  value="completed">Completed</option>
                
            </select>
                <br /><br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="blueButton" onClick={handleSubmit}>
                        Update
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default GoalAssignUpdate ;
