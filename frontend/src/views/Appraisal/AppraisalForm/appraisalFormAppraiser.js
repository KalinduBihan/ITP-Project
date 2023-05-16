import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SoloAlert from 'soloalert';
import appraisalQuestions from '../../../apis/modules/appraisalQuestions';
import appraisalProcess from '../../../apis/modules/appraisalProcess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AppraisalForm.css';

const AppraisalFormAppraiser = () => {
    const location = useLocation();
    const { rowsAppraisal, id, appraiseeId } = location.state ? location.state : {};
    const [rows, setRows] = useState([]);
    // const [rowsMarked, setRowsMarked] = useState([{
    //     value: ''
    // }]);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAllQuestions = async () => {
            const response = await (await appraisalQuestions.getAppraisalQuestions()).data

            const newRows = response
                .filter((question) => rowsAppraisal?.includes(question._id)) // filter the questions based on rowsAppraisal array
                .map((question, index) => ({
                    id: question._id,
                    name: question.questionName,
                    description: question.questionDescription,
                    weight: question.questionWeight,
                    key: index
                }));

            setRows(newRows);
        }

        fetchAllQuestions()
    }, []);

    const handleRadioChange = (rowIndex, value, weight) => {
        console.log(weight)
        const updatedRows = [...rows];
        updatedRows[rowIndex].value = Number(weight * value);
        setRows(updatedRows);
    };

    console.log(rows)

    const handleSubmit = async () => {
        try {
            const payload = { rows, id, appraiseeId }

            const result = await appraisalProcess.markAppraisal(payload);

            if (result.status === 200) {
                SoloAlert.alert({
                    title: "Success",
                    body: "Appraisal Marked Successfully",
                    icon: "success",
                    theme: "light",
                    onOk: function () {
                        window.location = "/appraisalrequest"
                    }
                });
            } else {
                SoloAlert.alert({
                    title: "Error",
                    body: result.message,
                    icon: "error",
                    theme: "light",
                    onOk: function () {
                        window.location = "/appraisalrequest"
                    }
                });
            }

        } catch (error) {
            setError(error)
        }
    };

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <form>
                {location.state ?
                    <a href="/appraisalrequest">
                        <button className="appraisal-button" type="button"><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                    </a>
                    : ''}
                <h1 style={{ marginTop: "20px" }}>Appraisal Form</h1>
                <table style={{ marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{ textAlign: "center" }}>Unsatisfactory</th>
                            <th style={{ textAlign: "center" }}>Average</th>
                            <th style={{ textAlign: "center" }}>Good</th>
                            <th style={{ textAlign: "center" }}>Very Good</th>
                            <th style={{ textAlign: "center" }}>Excellent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => {
                            const MAX_LINE_LENGTH = 62; // maximum length for each line
                            const lines = [];
                            let currentLine = "";

                            for (let i = 0; i < row.description.length; i++) {
                                if (currentLine.length === MAX_LINE_LENGTH) {
                                    lines.push(currentLine);
                                    currentLine = "";
                                }
                                currentLine += row.description[i];
                            }

                            if (currentLine.length > 0) {
                                lines.push(currentLine);
                            }

                            <p style={{ fontSize: "12px" }}>{lines.map(line => <>{line}<br /></>)}</p>

                            return (

                                <tr key={row.key}>
                                    <td style={{ width: "400px" }}>
                                        <div style={{ textAlign: "left" }}>
                                            <p>{row.name}</p>
                                            <p style={{ fontSize: "13px", wordWrap: "break-word", whiteSpace: "pre-line" }}>
                                                {row.description.length > MAX_LINE_LENGTH ? (
                                                    row.description.match(new RegExp(`.{1,${MAX_LINE_LENGTH}}`, "g")).map((line) => <>{line}<br /></>)
                                                ) : (
                                                    row.description
                                                )}
                                            </p>
                                            <p style={{ textAlign: "right" }}>Weight - {row.weight}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="1"
                                            style={{ textAlign: "center" }}
                                            // checked={row.value === "Unsatisfactory"}
                                            onChange={(e) => handleRadioChange(index, e.target.value, row.weight)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="2"
                                            // checked={row.value === "Average"}
                                            onChange={(e) => handleRadioChange(index, e.target.value, row.weight)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="3"
                                            // checked={row.value === "Good"}
                                            onChange={(e) => handleRadioChange(index, e.target.value, row.weight)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="4"
                                            // checked={row.value === "Very Good"}
                                            onChange={(e) => handleRadioChange(index, e.target.value, row.weight)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="5"
                                            // checked={row.value === "Excellent"}
                                            onChange={(e) => handleRadioChange(index, e.target.value, row.weight)}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <button className="appraisal-button" type="button" onClick={handleSubmit} style={{ backgroundColor: "blue", marginTop: "20px" }}>Finish</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default AppraisalFormAppraiser;
