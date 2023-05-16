
import { useEffect, useState } from 'react'
import appraisalQuestions from '../../../apis/modules/appraisalQuestions';
import AppraisalQuestionForm from './appraisalQuestionForm';
import SingleAppraisalQuestion from './singleAppraisalQuestion';
import AppraisalAdminNavbar from "../../../components/appraisalAdminNavbar"

const AppraisalQuestionsHome = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchAllQuestions = async () => {
            const response = await (await appraisalQuestions.getAppraisalQuestions()).data

            setQuestions(response);
        }

        fetchAllQuestions()
    }, [])

    return (
        <div><AppraisalAdminNavbar/>
        <div className="home">
            <div className="questions">
                <h1 style={{ marginLeft: "20px" }}>All Appraisal Questions</h1>
                {questions && questions.map((question) => (
                    
                    <SingleAppraisalQuestion key={question._id} question={question} />
                ))}
            </div>
            <AppraisalQuestionForm />
        </div>
        </div>

    )
}

export default AppraisalQuestionsHome