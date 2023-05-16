import { useNavigate } from "react-router-dom";
import '../../styles/appraisal.css'
import appraisalQuestions from "../../apis/modules/appraisalQuestions";
import { counter } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userProfiles from '../../apis/modules/userProfiles';
import appraisalProcess from '../../apis/modules/appraisalProcess';


const AppraisalView = () => {

    const [counter, setCounter] = useState(0);

    const [processName, setProcessName] = useState('')
    const [appraisee, setAppraisee] = useState('')
    const [processedBy, setProcessedBy] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [selectedAppraisers, setSelectedAppraisers] = useState([]);
    const [emptyFields, setEmptyFields] = useState([])
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        let status = document.getElementById('status');
        let counter = 0;

        let intervalId = setInterval(() => {
            if (counter === 65) {
                clearInterval(intervalId);
            } else {
                counter += 1;
                status.innerHTML = counter + '%';
            }
        }, 30);
    }, []
    );

    useEffect(() => {
        const fetchData = async () => {
            const allUsersResponse = await userProfiles.getAllUserProfiles();
            const singleAppraisalResponse = await appraisalProcess.getSingleAppraisalProcess(id);

            const allUsers = allUsersResponse.data.data.map(user => ({
                value: user._id,
                label: user.name
            }));

            const selectedAppraisers = allUsers.filter(user => singleAppraisalResponse.data.appraisers.includes(user.value));

            setSelectedAppraisers(selectedAppraisers);
            setAppraisee(singleAppraisalResponse.data.appraisee)
            setProcessName(singleAppraisalResponse.data.processName);
            setProcessedBy(singleAppraisalResponse.data.porcessBy);
            setDueDate(singleAppraisalResponse.data.dueDate);
        }

        fetchData();
    }, [id]);



    return (
        <body className="appraisal-view-pg">
            <div className="appraisal-form">

                <form className="process-form-update">
                    <h3 style={{ textAlign: "center", marginTop: "-300px", marginLeft: "-150px" }}>Appraisal Status Report</h3>
                    <div className="process-form-value" style={{ marginTop: "10px" }}>

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
                    </div>


                </form>
            </div>


            <div>

                <div className="appraisal-view">

                    <div className="appraisal-status">

                        <div className="appraisal-outer">
                            <div className="appraisal-inner">
                                <div id="status">
                                    {counter}%
                                </div>
                            </div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                            <defs>
                                <linearGradient id="GradientColor">
                                    <stop offset="0%" stop-color="#e91e63" />
                                    <stop offset="100%" stop-color="#673ab7" />
                                </linearGradient>
                            </defs>
                            <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                        </svg>
                    </div>

                    <h3 style={{ marginTop: "100px" }}>Appraisal Status</h3>
                </div>
            </div>
        </body>
    )

}

export default AppraisalView