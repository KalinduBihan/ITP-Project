import goalAssign from '../../../apis/modules/goalAssign'
import goalTable from '../../../apis/modules/goalTable'
import SoloAlert from 'soloalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../GoalTables/singleGoalDetail.css';
import { useEffect, useState } from 'react';

const SingleGoalDetails = ({ goal }) => {

    const [employeeEmail, setEmployeeEmail] = useState("");

    useEffect(() => {
        const fetchEmployeeData = async () => {
        const employee = await goalTable.getEmailByID(goal.Employee);
       
          if (employee) {
            setEmployeeEmail(employee.email);
         
          }
        };

        fetchEmployeeData();
        setTimeout(() => {
          console.log('email:', employeeEmail);
        }, 100);
    
      }, [goal.Employee]);

      useEffect(() => {
        console.log('email:', employeeEmail);
      }, [employeeEmail]);


    const handleDelete = async () => {
        try {
            await goalAssign.deletegoalAssign(goal._id);

            SoloAlert.alert({
                title: "Success",
                body: "Goal Deleted successfully",
                icon: "success",
                theme: "light",
                onOk: function () {
                    window.location = "/assignGoals"
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


    return (
        <div className="goal-details">
            <h4>{goal.goalTitle}</h4>
            <p><strong>Employee ID:</strong> {goal.Employee}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <strong>Status:</strong> {goal.status} </p> 
            <p><strong>Assigned Date</strong> : {goal.assignedDate} &nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Deadline :</strong> {goal.goalDeadline}</p>
           
            
           
            <span className="material-symbols-outlined" onClick={handleDeleteConfirmation}>
                <FontAwesomeIcon icon={faTrashAlt} color="#ff6666" />
            </span>
            <br />
            <div className="material-symbols-outlined" >
            <a href={`assignGoals/${goal._id}`}>
                <button className="up">
                    <FontAwesomeIcon icon={faEdit} color="#2ecc71" />
                </button>
            </a>
            </div>
        </div>
    )
}

export default SingleGoalDetails;

