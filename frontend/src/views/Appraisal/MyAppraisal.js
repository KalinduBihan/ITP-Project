import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import appraisalProcess from '../../apis/modules/appraisalProcess';
import '../../styles/appraisal.css'
import _ from 'lodash'


const MyAppraisal = () => {
  const [appraisals, setAppraisals] = useState([])
  const [search, setSearch] = useState("");
  const [data, setData] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const myAppraisal = await appraisalProcess.getMyAppraisals();
      const process = myAppraisal.data.map(e => e.processId)

      const uniqeProcess = _.uniqBy(process, function (o) {
        return o._id
      })

      setData(myAppraisal.data)
      setAppraisals(uniqeProcess);
    }

    fetchData();
  }, []);

  const handleView = async (id) => {
    const appraisalResult = data.filter(
      (item) => item.processId._id === id
    );

    navigate('/viewmyappraisal', { state: { appraisalResult } });
  }

  console.log(appraisals)

  return (
    <div>
      <input
        type="text"
        style={{ width: "500px", display: "block", margin: "0 auto" }}
        placeholder="Search by Appraisal Process Name"
        className="inputSearch"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <div className="appraisalHome">
        <div className="appraisal-container">
          {appraisals && appraisals.filter((e) => {
            if (search === "") {
              return e;
            } else if (e.processName.toLowerCase().includes(search.toLowerCase())) {
              return e;
            }
          }).map((appraisal, index) => (
            <div className="appraisal-card" key={index}
            >
              <div className="profile-picture">
                <FaUserCircle size="50px" />

              </div>
              <h3 className="appraisee-name">{appraisal.processName}</h3>

              <p style={{ fontSize: "14px", color: "black" }}>End date:{appraisal.dueDate}</p>
              <p style={{ color: appraisal.status === 'closed' ? 'red' : '#E99204', fontSize: "15px", marginBottom: "10px" }}>{appraisal.status}</p>
              <div className="appraisal-home-btn-container">
                <button className="appraisal-home-button" onClick={() => handleView(appraisal._id)}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );

}
export default MyAppraisal