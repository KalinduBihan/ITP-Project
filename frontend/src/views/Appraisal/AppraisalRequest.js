import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCheck, FaTimes } from 'react-icons/fa';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import SoloAlert from 'soloalert';
import appraisalProcess from '../../apis/modules/appraisalProcess';
import '../../styles/appraisal.css'
import AuthContext from "../../context/AuthContext";

const AppraisalRequest = () => {
  const [request, setRequest] = useState([]);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const appraisalRequest = await appraisalProcess.getAppraisalRequestForUser();

      console.log(appraisalRequest)

      setRequest(appraisalRequest.data)
    }

    fetchData();
  }, []);

  const handleAccept = async (id) => {
    const payload = { id }

    const result = await appraisalProcess.acceptAppraisalRequest(payload);

    if (result.status === 200) {
      window.location = "/appraisalrequest"
    } else {
      // setError(result.message)
    }
  }

  const handleDecline = async (id) => {
    const payload = { id }

    const result = await appraisalProcess.declineAppraisalRequest(payload);

    if (result.status === 200) {
      window.location = "/appraisalrequest"
    } else {
      // setError(result.message)
    }
  }

  const handleDeclineConfirmation = (id) => {
    SoloAlert.confirm({
      title: "Delete Confirmation",
      body: "Are you sure you want to decline this appraisal?",
      icon: "warning",
      theme: "light",
      onOk: () => handleDecline(id),
      onCancel: function () { }
    });
  };

  const handleViewAppraisal = async (rowsAppraisal, id, appraiseeId) => {

    navigate('/appraise', { state: { rowsAppraisal, id, appraiseeId } });

  }

  return (
    <div className="appraisal-request-container">
      <h3 className="process-title" style={{ textAlign: "left" }}>Appraisal Requests</h3>

      <table className="appraisal-request-form">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Appraisees Name</th>
            <th style={{ textAlign: "center" }}>Process Name</th>
            <th style={{ textAlign: "center" }}>Due Date</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {request && request.map((req, index) => {

            const appraiser = req.appraisers.find(appr => String(appr.user) === user?._id);
            const status = appraiser ? appraiser.status : "";
            return (
              <tr key={req._id}>
                <td style={{ textAlign: "center" }}>{req.appraisee}</td>
                <td style={{ textAlign: "center" }}>{req.processName}</td>
                <td style={{ textAlign: "center" }}>{req.dueDate}</td>
                <td style={{ textAlign: "center" }}>{req.status}</td>
                <td style={{ textAlign: "center" }}>
                  {status === "Accepted" ? (
                    <button onClick={() => handleViewAppraisal(req.rows, req._id, req.appraiseeId)} style={{ fontSize: "15px", border: 0, backgroundColor: "#69d84f", width: "50px", height: "25px", borderRadius: "10px" }}>View</button>
                  ) : status === 'Declined' ? (
                    <p style={{ fontWeight: "bold", color: "red" }}>{status}</p>
                  ) : status === 'Marked' ? (
                    <p style={{ fontWeight: "bold", color: "green" }}>{status}</p>
                  ) : (
                    <>
                      <FaCheck onClick={() => handleAccept(req._id)} style={{ fontSize: "20px", color: 'green', border: "none", marginRight: '20px' }} />
                      <FaTimes onClick={() => handleDeclineConfirmation(req._id)} style={{ color: 'red', fontSize: "20px", border: "none" }} />
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default AppraisalRequest