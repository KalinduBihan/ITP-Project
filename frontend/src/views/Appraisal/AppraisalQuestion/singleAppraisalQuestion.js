import appraisalQuestions from "../../../apis/modules/appraisalQuestions";
import SoloAlert from 'soloalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './SingleAppraisalQuestion.css';

const SingleAppraisalQuestion = ({ question }) => {
    const handleDelete = async () => {
        try {
            await appraisalQuestions.deleteAppraisalQuestion(question._id);

            SoloAlert.alert({
                title: "Success",
                body: "Question Deleted successfully",
                icon: "success",
                theme: "light",
                onOk: function () {
                    window.location = "/appraisalquestions"
                }
            });
        } catch {
        }
    };

    const handleDeleteConfirmation = () => {
        SoloAlert.confirm({
            title: "Delete Confirmation",
            body: "Are you sure you want to delete this question?",
            icon: "warning",
            theme: "light",
            onOk: handleDelete,
            onCancel: function () { }
        });
    };

    return (
        <div className="question-details">
            <h4>{question.questionNo} - {question.questionName}</h4>
            <p><strong>Description: </strong>{question.questionDescription}</p>
            <p><strong>Weight </strong>{question.questionWeight}</p>
            <span className="material-symbols-outlined" onClick={handleDeleteConfirmation}>
                <FontAwesomeIcon icon={faTrashAlt} color="#ff6666" />
            </span>
            <br />
            <a href={`/appraisalquestions/${question._id}`}>
                <button className="up">
                    <FontAwesomeIcon icon={faEdit} color="#2ecc71" />
                </button>
            </a>
        </div>
    )
}

export default SingleAppraisalQuestion;

