import { useEffect, useState } from "react"
import userProfiles from '../../../apis/modules/userProfiles';
import appraisalProcess from '../../../apis/modules/appraisalProcess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SoloAlert from 'soloalert';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../styles/appraisal.css'

const AppraisalProcessUpdate = () => {
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

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const allUsersResponse = await userProfiles.getAllUserProfiles();
            const singleAppraisalResponse = await appraisalProcess.getSingleAppraisalProcess(id);

            const allUsers = allUsersResponse.data.data.map(user => ({
                value: user._id,
                label: user.name
            }));

            const selectedAppraisers = allUsers.filter(user => singleAppraisalResponse.data.appraisers.some(appraiser => appraiser.user === user.value));

            setSelectAppraisers(allUsers);
            setSelectedAppraisers(selectedAppraisers);
            setAppraisee(singleAppraisalResponse.data.appraisee)
            setProcessName(singleAppraisalResponse.data.processName);
            setProcessedBy(singleAppraisalResponse.data.processBy);
            setDueDate(singleAppraisalResponse.data.dueDate);
        }

        fetchData();
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const fields = { dueDate }

        const empty = Object.entries(fields).filter(([key, value]) => value === '').map(([key, value]) => key)

        if (empty.length === 0) {
            try {
                const payload = { dueDate, selectedAppraisers };

                const result = await appraisalProcess.updateAppraisalProcess(
                    id,
                    payload
                );

                if (result.status == 200) {
                    SoloAlert.alert({
                        title: "Success",
                        body: "Appraisal Process Updated Successfully",
                        icon: "success",
                        theme: "light",
                        onOk: function () {
                            window.location = "/admin/appraisal";
                        }
                    });
                }
            } catch (error) {
                setError(error);
            }
        } else {
            setEmptyFields(empty)
        }
    }

    return (
        <div className="appraisal-form">

            <form className="process-form-update">
                <h3 className="process-title" style={{ marginRight: "150px", marginTop: "-50px" }}>Update Appraisal Process</h3>
                <div className="process-form-value">

                    <div >
                        <label>Process Name :</label>
                        <input
                            type="text"
                            onChange={(e) => setProcessName(e.target.value)}
                            value={processName}
                            className={emptyFields.includes('processName') ? 'error' : ''}
                            disabled
                        />
                    </div>
                    <label>Appraisee :</label>
                    <input
                        type="text"
                        value={appraisee}
                        className={emptyFields.includes('processName') ? 'error' : ''}
                        disabled
                    />
                    <label style={{ marginTop: "10px" }}>Process By :</label>
                    <input
                        type="text"
                        value={processedBy}
                        className={emptyFields.includes('processedBy') ? 'error' : ''}
                        disabled
                    />
                    <label>Due Date :</label>
                    <input
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        className={emptyFields.includes('dueDate') ? 'error' : ''}
                        min={new Date().toISOString().split("T")[0]}
                    />
                    {emptyFields.includes('dueDate') && dueDate.length === 0 && <h5 style={{ color: "red", marginTop: "10px" }}>Please enter a due date</h5>}
                    <div>
                        <label style={{ marginTop: "10px" }}>Select Appraisers :</label>
                        <div class="dropdown-container-appraisal" style={{ display: "flex", marginTop: "10px" }}>
                            <Select
                                value={selectAppraisers.value}
                                options={selectAppraisers}
                                onChange={(selectedOption) => setSelectedOption(selectedOption)}
                                placeholder="-- Select an appraiser --"
                                styles={{
                                    container: (provided) => ({
                                        ...provided,
                                        width: "59%"
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        border: '1px solid gray',
                                        height: 45
                                    })
                                }}
                            />

                            <button
                                className="appraisal-button"
                                type="button"
                                style={{ width: "85px", marginLeft: "10px" }}
                                onClick={handleAddAppraiser}>
                                ADD
                            </button>
                        </div>
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
                                    <td>
                                        <span className="material-symbols-outlined" onClick={() => {
                                            // Filter out the appraiser that is being removed and set the new state
                                            setSelectedAppraisers(selectedAppraisers.filter((a) => a.value !== appraiser.value));
                                        }}><FontAwesomeIcon icon={faTrashAlt} color="#ff6666" size="xs" /></span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

                <div style={{ display: "flex", justifyContent: "left" }}>
                    <button className="appraisal-button" type="button" style={{ backgroundColor: "blue", width: "75%", marginTop: "10px", alignItems: "center" }} onClick={handleSubmit}>
                        UPDATE
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>


    )
}

export default AppraisalProcessUpdate