import { useState } from "react"
import appraisalQuestions from "../../../apis/modules/appraisalQuestions"
import '../../../styles/appraisal.css'

const AppraisalQuestionForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [weight, setWeight] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // check for empty fields
        const fields = { name, description, weight }
        const empty = Object.entries(fields).filter(([key, value]) => value === '').map(([key, value]) => key)
        setEmptyFields(empty)

        if (empty.length === 0) {
            try {
                const payload = { name, description, weight }

                const result = await appraisalQuestions.createAppraisalQuestion(payload);

                if (result.status === 200) {
                    window.location = "/appraisalquestions"
                } else {
                    setError(result.message)
                }

            } catch (error) {
                setError(error)
            }
        }
    }

    return (
        <form className="create-question" onSubmit={handleSubmit}>
            <h3 style={{marginBottom:"20px"}}>Add a new Appraisal Question</h3>

            <label>Question Name :</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />
            {emptyFields.includes('name') && name.length === 0 && <h5 style={{ color: "red", marginTop: "-10px" }}>Please enter a question name</h5>}

            <label style={{ marginBottom: "10px" }}>Description :</label>
            <textarea
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                style={{ width: "350px", height: "100px", marginBottom: "10px" }}
            />
            {emptyFields.includes('description') && description.length === 0 && <h5 style={{ color: "red", marginTop: "5px" }}>Please enter a description</h5>}

            <label>Question Weight :</label>
            <input
                type="number"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                className={emptyFields.includes('weight') ? 'error' : ''}
            />
            {emptyFields.includes('weight') && weight.length === 0 && <h5 style={{ color: "red", marginTop: "-10px" }}>Please enter a question weight</h5>}


            <button style={{ backgroundColor: "blue" }}>Add Question</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AppraisalQuestionForm