import { useEffect, useState } from "react"
import userProfiles from '../../../apis/modules/userProfiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../../../styles/appraisal.css'
import AppraisalAdminNavbar from "../../../components/appraisalAdminNavbar"

const AppraisalProcess = () => {
    const [processName, setProcessName] = useState('')
    const [appraisee, setAppraisee] = useState('')
    const [processedBy, setProcessedBy] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [selectAppraisers, setSelectAppraisers] = useState([])
    const [selectedOption, setSelectedOption] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [selectedAppraisers, setSelectedAppraisers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await (await userProfiles.getAllUserProfiles()).data.data

            const users = response.map(user => ({
                value: user._id,
                label: user.name
            }));

            setSelectAppraisers(users);
            // setQuestions(response);
        }

        fetchAllUsers()
    }, [])

    const handleAddAppraiser = () => {
        // Check if the selected appraiser is already in the selectedAppraisers array
        const isAlreadyAdded = selectedAppraisers.some((appraiser) => appraiser.value === selectedOption.value);

        if (isAlreadyAdded) {
            // Set the error message state
            setErrorMessage('This appraiser has already been added.');

            // Clear the error message state after 3 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } else {
            // Add the selected appraiser to the selectedAppraisers array
            setSelectedAppraisers([...selectedAppraisers, selectedOption]);
        }
    }

    const handleNext = async (e) => {
        e.preventDefault()

        const fields = { processName, processedBy, dueDate, appraisee }
        const empty = Object.entries(fields).filter(([key, value]) => value === '').map(([key, value]) => key)

        if (selectedOption.length === 0) {
            empty.push('selectAppraiser')
        }

        if (empty.length === 0) {
            navigate('/appraisalform', { state: { selectedAppraisers, processName, processedBy, dueDate, appraisee } });
        } else {
            setEmptyFields(empty)
        }
    }

    return (
        <div>
            <AppraisalAdminNavbar />
            <body className="create-process">
                <h3 className="process-title">Create a appraisal process</h3>
                <div className="appraisal-form">

                    <form className="process-form">
                        <div className="process-form-value">

                            <div >
                                <label style={{ marginTop: "100px" }}>Process Name :</label>
                                <input
                                    type="text"
                                    onChange={(e) => setProcessName(e.target.value)}
                                    value={processName}
                                    className={emptyFields.includes('processName') ? 'error' : ''} />
                                {emptyFields.includes('processName') && processName.length === 0 && <h5 style={{ color: "red", marginTop: "-10px" }}>Please enter a process name</h5>}
                            </div>
                            <label style={{ marginTop: "10px" }}>Select Appraisee :</label>
                            <div class="dropdown-container" style={{ display: "flex", marginTop: "10px" }}>
                                <Select
                                    value={selectAppraisers.value}
                                    options={selectAppraisers}
                                    onChange={(selectedOption) => setAppraisee(selectedOption)}
                                    placeholder="-- Select an appraisee --"
                                    styles={{
                                        container: (provided) => ({
                                            ...provided,
                                            width: "75%",

                                        }),
                                        control: (provided) => ({
                                            ...provided,
                                            border: '1px solid gray',
                                            borderRadius: 5,
                                            boxShadow: 'none',
                                            height: "40"
                                        })
                                    }} />
                            </div>
                            {emptyFields.includes('appraisee') && appraisee.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please select an appraisee</h5>}
                            <label style={{ marginTop: "10px" }}>Process By :</label>
                            <input
                                type="text"
                                onChange={(e) => setProcessedBy(e.target.value)}
                                value={processedBy}
                                className={emptyFields.includes('processedBy') ? 'error' : ''} />
                            {emptyFields.includes('processedBy') && processedBy.length === 0 && <h5 style={{ color: "red", marginTop: "-10px" }}>Please enter a process by</h5>}
                            <label style={{ marginTop: "10px" }}>Due Date :</label>
                            <input
                                type="date"
                                onChange={(e) => setDueDate(e.target.value)}
                                value={dueDate}
                                className={emptyFields.includes('dueDate') ? 'error' : ''}
                                min={new Date().toISOString().split("T")[0]} />

                            {emptyFields.includes('dueDate') && dueDate.length === 0 && <h5 style={{ color: "red", marginTop: "1px" }}>Please enter a due date</h5>}

                            <label style={{ marginTop: "10px" }}>Select Appraisers :</label>
                            <div class="dropdown-container" style={{ display: "flex", marginTop: "10px" }}>
                                <Select
                                    value={selectAppraisers.value}
                                    options={selectAppraisers}
                                    onChange={(selectedOption) => setSelectedOption(selectedOption)}
                                    placeholder="-- Select an appraiser --"
                                    styles={{
                                        container: (provided) => ({
                                            ...provided,
                                            width: "59%",


                                        }),
                                        control: (provided) => ({
                                            ...provided,
                                            border: '1px solid gray',
                                            borderRadius: 5,
                                            boxShadow: 'none',
                                            height: 45

                                        }),

                                    }} />



                                <button
                                    className="appraisal-button"
                                    type="button"
                                    style={{ width: "85px", marginLeft: "10px" }}
                                    onClick={handleAddAppraiser}> ADD
                                </button>
                            </div>

                        </div>
                        <br />
                        {emptyFields.includes('selectAppraiser') && selectedOption.length === 0 && <h5 style={{ color: "red", marginTop: "-10px" }}>Please select appraiser</h5>}

                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <br />
                        {selectedAppraisers.length > 0 &&
                            <table className="appraisal-form-table" border={1} width="75%" cellPadding={10}>
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Action</td>
                                    </tr>
                                    {selectedAppraisers.map((appraiser, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{appraiser.label}</td>
                                            <td><span className="material-symbols-outlined" onClick={() => {
                                                // Filter out the appraiser that is being removed and set the new state
                                                setSelectedAppraisers(selectedAppraisers.filter((a) => a.value !== appraiser.value));
                                            }}><FontAwesomeIcon icon={faTrashAlt} color="#ff6666" size="xs" /></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}

                        <div style={{ display: "flex", justifyContent: "left" }}>
                            <button className="appraisal-button" type="button" style={{ backgroundColor: "blue", width: "75%", marginTop: "10px", alignItems: "center" }} onClick={handleNext}>
                                NEXT
                            </button>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </body>
        </div>

    )
}

export default AppraisalProcess