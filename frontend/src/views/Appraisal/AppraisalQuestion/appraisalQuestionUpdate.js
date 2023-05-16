import { useEffect, useState } from "react";
import appraisalQuestions from "../../../apis/modules/appraisalQuestions";
import { useParams } from "react-router-dom";

const AppraisalQuestionUpdate = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [qNo, setQNo] = useState("");
    const [error, setError] = useState(null);
    const { id } = useParams();

    //fetch current data to the form
    useEffect(() => {
        const fetchSingleQuestion = async () => {
            const response = (await appraisalQuestions.getAppraisalQuestion(id)).data;

            setName(response.questionName);
            setDescription(response.questionDescription);
            setWeight(response.questionWeight);
            setQNo(response.questionNo);

            console.log(response);
        };
        fetchSingleQuestion();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { name, description, weight };

            const result = await appraisalQuestions.updateAppraisalQuestion(
                id,
                payload
            );

            if (result.status == 200) {
                window.location = "/appraisalquestions";
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="create" style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <form className="create" style={{ width: "800px" }}>
                <h3 style={{ textAlign: "center" ,marginTop:"50px" }}>Update Appraisal Question</h3>
                <div className="process-form-value" style={{ marginTop:"30px", marginLeft:"25%" }}>
                <label>Question No :</label>
                <input type="text" value={qNo} disabled={true} />

                <label>Question Name :</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label>Description :</label>
                <textarea
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    style={{ width: "450px", height: "100px", border: "1px solid #ddd" }}
                />

                <label>Question Weight :</label>
                <input
                    type="number"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                />
                <div style={{  }}>
                    <button className="appraisal-button" style={{ backgroundColor: "blue", width: "450px"}} onClick={handleSubmit}>
                        Update
                    </button>
                    
                </div>
                {error && <div className="error">{error}</div>}
                </div>
            </form>
        </div>
    );
};

export default AppraisalQuestionUpdate;
