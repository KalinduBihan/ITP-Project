import goalTable from '../../../apis/modules/goalTable'
import SoloAlert from 'soloalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './singleGoalDetail.css';

const singleGoalDetails = ({ goal }) => {
    console.log(goal)
    const handleDelete = async () => {
        try {
            await goalTable.deleteGoalTable(goal._id);

            SoloAlert.alert({
                title: "Success",
                body: "Goal Deleted successfully",
                icon: "success",
                theme: "light",
                onOk: function () {
                    window.location = "/viewGoals"
                }
            });
        } catch {
        }
    };

    const handleDeleteConfirmation = () => {
        SoloAlert.confirm({
            title: "Delete Confirmation",
            body: "Are you sure you want to delete this ?",
            icon: "warning",
            theme: "light",
            onOk: handleDelete,
            onCancel: function () { }
        });
    };

    console.log(goal.submissions)

    return (
        <div className="goal-details">
            
            <h4>{goal.goalCategory} - {goal.goalType}</h4>
            <p><strong>Deadline</strong> : {goal.goalDeadline}</p><br /><br />
            <p>{goal.description}</p><br />
            <p><strong>{goal.submissions === "true" ? "Need to Submit": "No submissions"}</strong></p>
            
           
            <span className="material-symbols-outlined" onClick={handleDeleteConfirmation}>
                <FontAwesomeIcon icon={faTrashAlt} color="#ff6666" />
            </span>
            <br />
            <div className="material-symbols-outlined" >
            <a href={`viewGoals/${goal._id}`}>
                <button className="up">
                    <FontAwesomeIcon icon={faEdit} color="#2ecc71" />
                </button>
            </a>
           
            </div>
        </div>
    )
}

export default singleGoalDetails;

