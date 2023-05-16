import { useState } from "react"
import goalTable from '../../../apis/modules/goalTable';
import './singleGoalDetail.css';
import '../../../styles/goals.css'

const GoalTableForm = () => {
    const [goalType, setType] = useState('')
    const [goalCategory, setCategory] = useState('')
    const [goalDeadline, setDeadline] = useState('')
    const [description, setDescription] = useState('')
    const [submission, setSubmission] = useState('')
    
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // check for empty fields
        const fields = { goalType, goalCategory,goalDeadline,description,submission}
        const empty = Object.entries(fields).filter(([key, value]) => value === '').map(([key, value]) => key)
        setEmptyFields(empty)

        if (empty.length === 0) {
            try {
                const payload = {goalType,goalCategory,goalDeadline,description,submission}
                
                console.log(payload)
                const result = await goalTable.createGoalTable(payload);

                if (result.status === 200) {
                    window.location = "/viewGoals"
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
            <h3 >Add a new Goal </h3>

            <label>Goal Category :</label>
            <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={goalCategory}
                className={emptyFields.includes('goalCategory') ? 'error' : ''}
            />
            {emptyFields.includes('goalCategory') && goalCategory.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a Category name</h5>}

            <label>Goal Title :</label>
            <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={goalType}
                className={emptyFields.includes('goalType') ? 'error' : ''}
            />
            {emptyFields.includes('goalType') && goalType.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a Title</h5>}

           
            <label style={{ marginBottom: "10px" }}>Description :</label>
            <textarea
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                style={{ width: "350px", height: "100px", marginBottom: "10px" }}
            />
            {emptyFields.includes('description') && description.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a description</h5>}

            <label>Deadline :</label>
            <input
                type="date"
                onChange={(e) => setDeadline(e.target.value)}
                value={goalDeadline}
                className={emptyFields.includes('goalDeadline') ? 'error' : ''}
            />
            {emptyFields.includes('goalDeadline') && goalDeadline.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a deadline</h5>}

            <label>Submission :</label>
            Yes
            <input
                type="radio"
                name="submission"
                value="true"
                onChange={(e) => setSubmission(e.target.value)}
                style={{margin:"5px"}}
            /><br />
            No   
            <input
                type="radio"
                name="submission"
                value="false"
                onChange={(e) => setSubmission(e.target.value)}
                style={{margin:"5px"}}
            />
            <br />
            <button className="blueButton">Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default GoalTableForm