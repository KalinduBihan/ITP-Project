import { useNavigate } from "react-router-dom";

const AdminTiles = () => {

  const navigate = useNavigate()

  return (
    <div className="main-body">
      <h2 class="section-heading">Administration</h2>

      <div class="tiles-common user-profiles-tile" onClick={() => { navigate('/userprofile') }}>
        <div class="tile-text">User Profiles</div>
      </div>
      <div class="tiles-common user-roles-tile" onClick={() => { navigate('/allLeaveEntRecords') }}>
        <div class="tile-text">User Leave Ent</div>
      </div>
      <div class="tiles-common user-records-tile" onClick={() => { navigate('/recordHistory') }}>
        <div class="tile-text">User Records</div>
      </div>
      <div class="tiles-common user-appraisals-tile" onClick={() => { navigate('/admin/appraisal'); }}>
        <div class="tile-text">User appraisals</div>
      </div>
      <div class="tiles-common user-goals-tile" onClick={() => { navigate('/viewGoals') }}>
        <div class="tile-text" >User Goals</div>
      </div>
      <div class="tiles-common user-training-tile" onClick={() => { navigate('/trainingpanel') }}>
        <div class="tile-text">User Training</div>
      </div>
    </div>
  );
};

export default AdminTiles
