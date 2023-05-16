import { useState, useEffect } from "react"
import goalAssign from "../../../apis/modules/goalAssign";
import goalTable from "../../../apis/modules/goalTable";
import '../GoalTables/singleGoalDetail.css';
import '../../../styles/goals.css'

const GoalAssignForm = () => {
    const [Employee, setEmployee] = useState('')
    const [goalType, setType] = useState('')
    const [goalTitle, setTitle] = useState('')
    const [assignedDate, setAssign] = useState('')
    const [goalDeadline, setDeadline] = useState('')
    const [status, setStatus] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const [allEmp, setAllEmp] = useState('')
    const [allCat, setAllCat] = useState('')
    const [allTitle, setAllTitle] = useState('')


    useEffect(() => {
        const fetchForDropdown = async () => {
            const allEmp = await (await goalTable.getAllEmployees()).data
            setAllEmp(allEmp);
            console.log(allEmp)

            const allCat = await (await goalTable.getAllCategory()).data
            setAllCat(allCat);
            console.log(allCat)
            const allTitle = await (await goalTable.getAllTitles()).data
            setAllTitle(allTitle);
            console.log(allTitle)
        }

        fetchForDropdown()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // check for empty fields
        const fields = { Employee, goalType, goalTitle, assignedDate, goalDeadline, status }

        const empty = Object.entries(fields).filter(([key, value]) => value === '').map(([key, value]) => key)
        setEmptyFields(empty)

        if (empty.length === 0) {
            try {
                const payload = { Employee, goalType, goalTitle, assignedDate, goalDeadline, status }

                console.log(payload)
                const result = await goalAssign.creategoalAssign(payload);

                if (result.status === 200) {
                    window.location = "/assignGoals/"
                } else {
                    setError(result.message)
                }

            } catch (error) {
                setError(error)
            }
        }
    }

    return (
        
        <form className="goalForm" onSubmit={handleSubmit}>
            <h3>Assign an Employee </h3>

            <label>Employee ID :</label>
            <select

                onChange={(e) => setEmployee(e.target.value)}
                value={Employee}
                className={emptyFields.includes('Employee') ? 'error' : ''}
            >
                <option value="">Select Employee</option>
                {allEmp && allEmp.map((emp) => (
                    <option key={emp._id} value={emp.employeeId}>{emp.employeeId}</option>
                ))}
            </select>

            {emptyFields.includes('Employee') && Employee.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a Category name</h5>}

            <label>Goal Type :</label>
            <select

                onChange={(e) => setType(e.target.value)}
                value={goalType}
                className={emptyFields.includes('goalType') ? 'error' : ''}
            >
                <option value="">Select Goal Category</option>
                <option value="Peformance">Performance</option>
                <option value="Carrier">Carrier</option>
                <option value="Team">Team</option>
                <option value="Personal">Personal</option>
                <option value="Development">Development</option>
              
            </select>
            {emptyFields.includes('goalType') && goalType.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a Title</h5>}

            <label>Goal Title :</label>
            <select

                onChange={(e) => setTitle(e.target.value)}
                value={goalTitle}
                className={emptyFields.includes('goalTitle') ? 'error' : ''}
            >
                <option value="">Select Goal Title</option>
                {allTitle && allTitle.map((emp) => (
                    <option key={emp._id} value={emp.goalType}>{emp.goalType}</option>
                ))}
            </select>
            {emptyFields.includes('goalTitle') && goalTitle.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a Title</h5>}


            <label>Assigned Date :</label>
            <input
                type="date"
                onChange={(e) => setAssign(e.target.value)}
                value={assignedDate}
                className={emptyFields.includes('assignedDate') ? 'error' : ''}
            />
            {emptyFields.includes('assignedDate') && assignedDate.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter the Assigned date</h5>}

            <label>Deadline :</label>
            <input
                type="date"
                onChange={(e) => setDeadline(e.target.value)}
                value={goalDeadline}
                className={emptyFields.includes('goalDeadline') ? 'error' : ''}
            />
            {emptyFields.includes('goalDeadline') && goalDeadline.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a deadline</h5>}

            <label>Status :</label>
            <select

                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className={emptyFields.includes('status') ? 'error' : ''}
            >
                <option  value="">Select the status</option>
                <option  value="ongoing">Ongoing</option>
                <option  value="completed">Completed</option>
                
            </select>
            {emptyFields.includes('status') && status.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a status</h5>}


            <br /><br />
            <button className="blueButton">Submit</button>
            {error && <div className="error">{error}</div>}


        </form>
    )
}

export default GoalAssignForm