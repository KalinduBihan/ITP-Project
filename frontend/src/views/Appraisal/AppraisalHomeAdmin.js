import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import SoloAlert from 'soloalert';
import appraisalProcess from '../../apis/modules/appraisalProcess';
import '../../styles/appraisal.css'
import AppraisalAdminNavbar from "../../components/appraisalAdminNavbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const AppraisalHomeAdmin = () => {
    const navigate = useNavigate()

    const [appraisals, setAppraisals] = useState([])
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchAllAppraisals = async () => {
            const response = await (await appraisalProcess.getAllAppraisals()).data

            setAppraisals(response);
        }

        fetchAllAppraisals()
    }, [])

    const handleAppraisalClose = async (id) => {

        SoloAlert.confirm({
            title: "Are you sure?",
            body: "Do you want to close this Appraisal",
            onOk: () => closeAppraisal(id),
        });
    }

    const closeAppraisal = async (id) => {
        try {
            const result = await appraisalProcess.closeAppraisalProcess(id);

            if (result.status == 200) {
                SoloAlert.alert({
                    title: "Success",
                    body: "Appraisal Process Closed Successfully",
                    icon: "success",
                    theme: "light",
                    onOk: function () {
                        window.location = "/admin/appraisal";
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await appraisalProcess.deleteAppraisalProcess(id);

            SoloAlert.alert({
                title: "Success",
                body: "Appraisal Process Deleted successfully",
                icon: "success",
                theme: "light",
                onOk: function () {
                    window.location = "/admin/appraisal"
                }
            });
        } catch {
        }
    };

    const handleDeleteConfirmation = (id) => {
        SoloAlert.confirm({
            title: "Delete Confirmation",
            body: "Are you sure you want to delete this appraisal process?",
            icon: "warning",
            theme: "light",
            onOk: () => handleDelete(id),
            onCancel: function () { }
        });
    };


    return (
        <div>
            <AppraisalAdminNavbar />

            <input
                type="text"
                style={{ width: "500px" }}
                placeholder="Search by Appraisee Name"
                className="inputSearch"
                onChange={(e) => setSearch(e.target.value)}
            ></input>
            <div className="appraisalHome">
                <button className="add-button" onClick={() => { navigate('/appraisalprocess') }}>
                    <FaPlus />
                </button>

                <div className="appraisal-container">
                    {appraisals && appraisals.filter((e) => {
                        if (search === "") {
                            return e;
                        } else if (e.appraisee.toLowerCase().includes(search.toLowerCase())) {
                            return e;
                        }
                    }).map((appraisal, index) => (
                        <div className="appraisal-card" key={index}
                        // onClick={() => {
                        //     navigate(`/appraisalview/${appraisal._id}`);
                        // }}
                        >
                            <div style={{ position: "relative" }}>
                                <span className="material-symbols-outlined1" onClick={(e) => { e.stopPropagation(); handleDeleteConfirmation(appraisal._id) }}><FontAwesomeIcon icon={faTrashAlt} color="#ff6666" size="xl" /></span>
                            </div>
                            <div className="profile-picture">
                                <FaUserCircle size="50px" />

                            </div>
                            <h3 className="appraisee-name">{appraisal.appraisee}</h3>

                            <p style={{ fontSize: "14px", color: "black" }}>End date:{appraisal.dueDate}</p>
                            <span style={{ color: appraisal.status === 'closed' ? 'red' : '#E99204', fontSize: "15px", marginBottom: "10px" }}>{appraisal.status}</span>
                            <div className="appraisal-home-btn-container">
                                <a href={`/appraisalprocess/${appraisal._id}`}>
                                    <button className="appraisal-home-button" onClick={(e) => e.stopPropagation()}>Update</button>
                                </a>
                                <button className="appraisal-home-button" style={{ background: "#FF3333", marginLeft: "20px" }} onClick={(e) => { e.stopPropagation(); handleAppraisalClose(appraisal._id) }}
                                // disabled={appraisal.status === "On going" ? true : false}
                                >Close</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default AppraisalHomeAdmin;
