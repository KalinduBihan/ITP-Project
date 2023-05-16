import { useNavigate } from "react-router-dom";
import '../../styles/appraisal.css'

const AppraisalHomeUser = () => {

  const navigate = useNavigate()

  return (
    <div className="main-body">
      <h2 className="appraisal-heading">360 Appraisal</h2>

      <div className="tiles-common my-appraisal-title"
        onClick={() => { navigate('/myappraisal') }}>
        <div className="tile-icon">
          <i className="fa-solid fa-person-walking fa-lg"></i>
        </div>
        <div className="tile-text-my">My Appraisals</div>
      </div>

      <div className="tiles-common appraisal-req--title"
        onClick={() => { navigate('/appraisalrequest') }}>
        <div className="tile-icon">
          <i className="fa-solid fa-person-walking fa-lg"></i>
        </div>
        <div className="tile-text-req">Appraisal Requests</div>
      </div>
    </div>
  );
}
export default AppraisalHomeUser
