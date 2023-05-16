import { useEffect, useState } from "react";
import goalTable from '../../../apis/modules/goalTable';
import { useParams } from "react-router-dom";
import './singleGoalDetail.css';
import '../../../styles/goals.css'

const AppraisalQuestionUpdate = () => {
    const [goalType, setType] = useState('')
    const [goalCategory, setCategory] = useState('')
    const [goalDeadline, setDeadline] = useState('')
    const [description, setDescription] = useState('')
    const [submission, setSubmission] = useState('')

    const [error, setError] = useState(null);
    const { id } = useParams();

    //fetch current data to the form
    useEffect(() => {
        const fetchSingleGoal = async () => {
            const response = (await goalTable.getGoalTable(id)).data;

            setCategory(response.goalCategory)
            setType(response.goalType)
            setDeadline(response.goalDeadline)
            setDescription(response.description)
            setSubmission(response.submission)
            // Convert goalDeadline to a Date object
            const deadlineDate = new Date(response.goalDeadline);

            // Format the deadline date to yyyy-MM-dd format
            const formattedDeadline = deadlineDate.toISOString().slice(0, 10);
            // Update the state with the formatted date
            setDeadline(formattedDeadline);


            console.log(response);
        };
        fetchSingleGoal();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { goalType, goalCategory, goalDeadline, description, submission };

            const result = await goalTable.updateGoalTable(
                id,
                payload
            );

            if (result.status == 200) {
                window.location = "/viewGoals";
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="create" style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <form className="goalForm" style={{ width: "500px" }}>
                <h3 style={{ textAlign: "center" }}>Update Goal</h3>

                <label>Goal Category:</label>
                <input
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    value={goalCategory}
                />
                <label>Goal Title :</label>
                <input
                    type="text"
                    onChange={(e) => setType(e.target.value)}
                    value={goalType}
                />

                <label>Description :</label>
                <textarea
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    style={{ width: "380px", height: "100px", border: "1px solid #ddd" }}
                />

                <label>Deadline :</label>
                <input
                    type="date"
                    onChange={(e) => setDeadline(e.target.value)}
                    value={goalDeadline}
                />

                <label>Submission :</label>
                Yes
                <input
                    type="radio"
                    name="submission"
                    value="true"
                    onChange={(e) => setSubmission(e.target.value)}
                    style={{ margin: "5px", display: "inline-block"}}
                />
                No
                <input
                    type="radio"
                    name="submission"
                    value="false"
                    onChange={(e) => setSubmission(e.target.value)}
                    style={{ margin: "5px" ,display: "inline-block"}}
                />
                
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="blueButton"  onClick={handleSubmit}>
                        Update
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default AppraisalQuestionUpdate;
