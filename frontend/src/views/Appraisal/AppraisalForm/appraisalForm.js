import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SoloAlert from 'soloalert';
import appraisalQuestions from '../../../apis/modules/appraisalQuestions';
import appraisalProcess from '../../../apis/modules/appraisalProcess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import './AppraisalForm.css';

const AppraisalForm = () => {
    const location = useLocation();
    const { selectedAppraisers, processName, processedBy, dueDate, appraisee } = location.state ? location.state : {};
    const [rows, setRows] = useState([]);
    const [selectedOption, setSelectedOption] = useState([])
    const [error, setError] = useState(null)
    const [selectQuestions, setSelectQuestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAllQuestions = async () => {
            const response = await (await appraisalQuestions.getAppraisalQuestions()).data

            const newRows = response.map((question, index) => ({
                id: question._id,
                name: question.questionName,
                description: question.questionDescription,
                key: index
            }));

            const questions = response.map((question, index) => ({
                id: question._id,
                name: question.questionName,
                value: question._id,
                label: question.questionName,
                description: question.questionDescription
            }));

            setRows(newRows);
            setSelectQuestions(questions)
        }

        fetchAllQuestions()
    }, []);

    const handleRadioChange = (rowIndex, value) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex].value = value;
        setRows(updatedRows);
    };

    const handleRemoveRow = (rowKey) => {
        const filteredRows = rows.filter(row => row.key !== rowKey);
        setRows(filteredRows);
    }

    const handleAddQuestion = () => {
        // Check if the selected appraiser is already in the selectedAppraisers array
        const isAlreadyAdded = rows.some((question) => question.id === selectedOption.value);

        console.log(isAlreadyAdded)

        if (isAlreadyAdded) {
            // Set the error message state
            setErrorMessage('This question has already been added.');

            // Clear the error message state after 3 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } else {
            // Add the selected appraiser to the selectedAppraisers array
            setRows([...rows, selectedOption]);
        }
    }

    const handleSubmit = async () => {
        try {
            const payload = { selectedAppraisers, processName, processedBy, dueDate, rows, appraisee }

            const result = await appraisalProcess.createAppraisalProcess(payload);

            if (result.status === 200) {
                SoloAlert.alert({
                    title: "Success",
                    body: "Appraisal Process Created Successfully",
                    icon: "success",
                    theme: "light",
                    onOk: function () {
                        window.location = "/admin/appraisal"
                    }
                });
            } else {
                SoloAlert.alert({
                    title: "Error",
                    body: result.message,
                    icon: "error",
                    theme: "light",
                    onOk: function () {
                        window.location = "/admin/appraisal"
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
                    <a href="/appraisalprocess">
                        <button className="appraisal-button" type="button"><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                    </a>
                    : ''}
                <h1 style={{marginTop:"20px"}}>Appraisal Form</h1>
                {location.state ?
                    <div className="dropdown-container" style={{ display: "flex", marginTop: "10px" }}>
                        <Select
                            value={selectQuestions.value}
                            options={selectQuestions}
                            onChange={(selectedOption) => setSelectedOption(selectedOption)}
                            placeholder="-- Select an questions --"
                            styles={{
                                container: (provided) => ({
                                    ...provided,
                                    width: 300
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: 5,
                                    boxShadow: 'none'
                                })
                            }}
                        />

                        <button
                            className="appraisal-button"
                            style={{marginLeft:"10px"}}
                            type="button"
                            onClick={handleAddQuestion}>
                            ADD
                        </button>
                    </div>
                    : ''}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <br />
                <table style={{marginTop:"20px"}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Unsatisfactory</th>
                            <th>Average</th>
                            <th>Good</th>
                            <th>Very Good</th>
                            <th>Excellent</th>
                            <th></th>
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
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="Unsatisfactory"
                                            style={{textAlign:"center"}}
                                            checked={row.value === "Unsatisfactory"}
                                            onChange={(e) => handleRadioChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="Average"
                                            checked={row.value === "Average"}
                                            onChange={(e) => handleRadioChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="Good"
                                            checked={row.value === "Good"}
                                            onChange={(e) => handleRadioChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="Very Good"
                                            checked={row.value === "Very Good"}
                                            onChange={(e) => handleRadioChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            value="Excellent"
                                            checked={row.value === "Excellent"}
                                            onChange={(e) => handleRadioChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                    
                                    <span className="material-symbols-outlined"  onClick={() => handleRemoveRow(row.key)}><FontAwesomeIcon icon={faTrashAlt} color="#ff6666" size="xs" /></span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
               
                <button className="appraisal-button" type="button" onClick={handleSubmit} style={{ backgroundColor: "blue",marginTop:"20px" }}>Finish</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default AppraisalForm;
