import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//pages
import Home from './pages/Home'
import AdminTiles from "./pages/AdminTiles"

import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import recordHistory from './pages/recordHistory';
import Fingerprint from './pages/Fingerprint';

//import Appraisal questions
import AppraisalQuestionsHome from './views/Appraisal/AppraisalQuestion/appraisalQuestions';
import AppraisalQuestionUpdate from './views/Appraisal/AppraisalQuestion/appraisalQuestionUpdate';
import AppraisalForm from './views/Appraisal/AppraisalForm/appraisalForm';
import AppraisalFormAppraiser from './views/Appraisal/AppraisalForm/appraisalFormAppraiser';
import AppraisalProcess from './views/Appraisal/AppraisalProcess/AppraisalProcess';
import AppraisalProcessUpdate from './views/Appraisal/AppraisalProcess/AppraisalProcessUpdate';
import AppraisalHomeAdmin from './views/Appraisal/AppraisalHomeAdmin';
import MyAppraisal from './views/Appraisal/MyAppraisal';
import ViewMyAppraisal from './views/Appraisal/viewMyAppraisal';
import AppraisalRequest from './views/Appraisal/AppraisalRequest';
import AppraisalView from './views/Appraisal/AppraisalView'
import AppraisalHomeUser from './views/Appraisal/AppraisalHomeUser';

//import Attendance
import AttendanceForm from './views/Attendance/attendanceForm';
import LeavePlanner from './views/Attendance/leavePlanner'
import AttendanceRecordsDetails from './views/Attendance/attendanceRecordsAll';
import AttendanceRecordsDetailsUser from './views/Attendance/attendanceRecordsAllUser';
import UpdateAttendanceRecord from './views/Attendance/attedanceRecordUpdate'

//import UserProfiles
import UserProfileHome from './views/UserProfiles/userProfileHome';
import UserProfileCreate from './views/UserProfiles/userProfileCreate';
import UserProfileUpdate from './views/UserProfiles/userProfileEdit';
import UserProfile from './views/UserProfiles/userProfile';
import UserProfileStats from './views/UserProfiles/Statistics/userProfilesStat';
import UserProfileMail from './views/UserProfiles/userProfileMail';


//import Goals
import GoalTable from './views/Goals/GoalTables/GoalTable';
import GoalTableUpdate from './views/Goals/GoalTables/GoalTableUpdate';
import GoalAssign from './views/Goals/GoalAssign/GoalAssign';
import GoalAssignUpdate from './views/Goals/GoalAssign/GoalAssignUpdate';
import UserStats from './views/Goals/Statitics/userStats';
import AdminStats from './views/Goals/Statitics/AdminStats';
import ViewGoalsHome from './views/Goals/GoalList/ViewGoals';


//import Training
import TrainingPanel from './views/Training/pages/TrainingPanel'
import AllCourses from './views/Training/pages/AllCourses'
import Lectures from './views/Training/pages/Lectures'
import LectureView from './views/Training/pages/LectureView'
import UpdateCourse from './views/Training/CourseUpdate'
import AllCoursesPanel from './views/Training/pages/AllCoursesPanel'
import MyCourses from './views/Training/pages/Mycourses'
import AssignCourses from './views/Training/pages/AssignCourses'

//import WOH
import WOHrequestcreate from "./views/WOH/WOHrequestForm"
import WOHrequestsAll from './views/WOH/WOHrequestsAll'
import WOHrequestUpdate from './views/WOH/WOHrequestUpdate'
import WOHrequestApproval from './views/WOH/WOHrequestApproval'
import WOHrequestRecordApprovalForm from './views/WOH/WOHrequestApprovalForm'
import WOHrequestsUserAll from './views/WOH/WOHrequestAllUser';
import WOHrequestUserUpdate from './views/WOH/WOHrequestUserUpdate';

//import leaves
import LeavesRequestcreate from "./views/Leaves/leavesRequestForm"
import LeavesRequestsAll from './views/Leaves/leavesRequestsAll'
import LeavesRequestUpdate from './views/Leaves/leavesRequestUpdate'
import LeavesRequestApproval from './views/Leaves/leavesRequestApproval'
import LeavesRequestApprovalForm from './views/Leaves/leavesRequestApprovalForm'
import LeavesRequestsUserAll from './views/Leaves/leavesRequestAllUser';
import LeavesRequestUserUpdate from './views/Leaves/leavesRequestUserUpdate';
import LeaveEntitlement from './views/Leaves/leaveEntitlement';
//import calendar
import EventCalendar from './views/calendar/eventCalendar';
import AddEventForm from './views/calendar/addEventForm';
import UpdateEventform from './views/calendar/updateEventForm'
import EventsAll from './views/calendar/eventAll';

//import who is in today
import InToday from './views/whoIsInToday/inToday';
import LeaveToday from './views/whoIsInToday/leaveToday'

import Private from './PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <br />
        <br />
        <div className="pages">
          <Routes>


            <Route path="/" element={<Private Component={Home} />} />
            <Route path="/userLogin" element={<Login />} />
            <Route path="/adminTiles" element={<Private Component={AdminTiles} />} />
            <Route path="/recordHistory" element={<Private Component={recordHistory} />} />
            <Route path="/fingerprint" element={<Private Component={Fingerprint} />} />

            {/* Appraisal Questions Routes */}
            <Route path="/appraisalquestions" element={<Private Component={AppraisalQuestionsHome} />} />
            <Route path="/appraisalquestions/:id" element={<Private Component={AppraisalQuestionUpdate} />} />
            <Route path="/appraisalform" element={<Private Component={AppraisalForm} />} />
            <Route path="/appraise" element={<Private Component={AppraisalFormAppraiser} />} />
            <Route path="/appraisalprocess" element={<Private Component={AppraisalProcess} />} />
            <Route path="/appraisalprocess/:id" element={<Private Component={AppraisalProcessUpdate} />} />
            <Route path="/admin/appraisal" element={<Private Component={AppraisalHomeAdmin} />} />
            <Route path="/user/appraisal" element={<Private Component={AppraisalHomeUser} />} />
            <Route path="/myappraisal" element={<Private Component={MyAppraisal} />} />
            <Route path="/viewmyappraisal" element={<Private Component={ViewMyAppraisal} />} />
            <Route path="/appraisalrequest" element={<Private Component={AppraisalRequest} />} />
            <Route path="/appraisalview/:id" element={<Private Component={AppraisalView} />} />


            {/* User Profile Routes */}
            <Route path="/userprofile/" element={<Private Component={UserProfileHome} />} />
            <Route path="/userprofile/create" element={<Private Component={UserProfileCreate} />} />
            <Route path="/userprofile/update" element={<Private Component={UserProfileUpdate} />} />
            <Route path="/userprofile/me" element={<Private Component={UserProfile} />} />
            <Route path="/userprofile/stat" element={<Private Component={UserProfileStats} />} />
            <Route path="/userprofile/mail" element={<Private Component={UserProfileMail} />} />
            
            {/* Attendance Route */}
            <Route path="/attendanceForm" element={<Private Component={AttendanceForm} />} />
            <Route path="/leavePlanner/:userId" element={<Private Component={LeavePlanner} />} />
            <Route path="/allAttendanceRecords" element={<Private Component={AttendanceRecordsDetails} />} />
            <Route path="/allAttendanceRecordsUser/:userId" element={<Private Component={AttendanceRecordsDetailsUser} />} />
            <Route path="/attendanceRecordUpdate/:id" element={<Private Component={UpdateAttendanceRecord} />} />

            {/* WOH routes */}
            <Route path="/createWOHrequest" element={<Private Component={WOHrequestcreate} />} />
            <Route path="/allWOHRecords" element={<Private Component={WOHrequestsAll} />} />
            <Route path="/WOHrequestUpdate/:id" element={<Private Component={WOHrequestUpdate} />} />
            <Route path="/WOHRecordsApproval" element={<Private Component={WOHrequestApproval} />} />
            <Route path="/WOHrequestApprovalForm/:id" element={<Private Component={WOHrequestRecordApprovalForm} />} />
            <Route path="/allUserWOHRecords/:userId" element={<Private Component={WOHrequestsUserAll} />} />
            <Route path="/WOHrequestUserUpdate/:id" element={<Private Component={WOHrequestUserUpdate} />} />

            {/* Goals Route */}
            <Route path="/viewGoals" element={<Private Component={GoalTable} />} />
            <Route path="/viewGoals/:id" element={<Private Component={GoalTableUpdate} />} />
            <Route path="/assignGoals" element={<Private Component={GoalAssign} />} />
            <Route path="/assignGoals/:id" element={<Private Component={GoalAssignUpdate} />} />
            <Route path="/AdminGoalStat/" element={<Private Component={AdminStats} />} />
            <Route path="/UserGoalStat/" element={<Private Component={UserStats} />} />
            <Route path="/EmployeeGoal" element={<Private Component={ViewGoalsHome} />} />

            {/* Training Route */}
            <Route path='/trainingpanel' element={<Private Component={TrainingPanel} />} />
            <Route path='/AllCourses' element={<Private Component={AllCourses} />} />
            <Route path='/CourseUpdate/:id' element={<Private Component={UpdateCourse} />} />
            <Route path='/Lectures/:id' element={<Private Component={Lectures} />} />
            <Route path='/LectureContent/:id' element={<Private Component={LectureView} />} />
            <Route path='/AllCoursesPanel' element={<Private Component={AllCoursesPanel} />} />
            <Route path='/MyCourses/:employeeId' element={<Private Component={MyCourses} />} />
            <Route path='/AssignCourses' element={<Private Component={AssignCourses} />} />

            {/* Leave routes */}
            <Route path="/createLeaveRequest" element={<Private Component={LeavesRequestcreate} />} />
            <Route path="/allLeaveRecords" element={<Private Component={LeavesRequestsAll} />} />
            <Route path="/leaveRequestUpdate/:id" element={<Private Component={LeavesRequestUpdate} />} />
            <Route path="/leaveRecordsApproval" element={<Private Component={LeavesRequestApproval} />} />
            <Route path="/leaveRequestApprovalForm/:id" element={<Private Component={LeavesRequestApprovalForm} />} />
            <Route path="/leaveRequestUserUpdate/:id" element={<Private Component={LeavesRequestUserUpdate} />} />
            <Route path="/allUserLeaveRecords/:userId" element={<Private Component={LeavesRequestsUserAll} />} />
            <Route path="/allLeaveEntRecords" element={<Private Component={LeaveEntitlement} />} />

            {/*calendar Route*/}
            <Route path="/eventCalendar" element={<Private Component={EventCalendar} />} />
            <Route path="/addEvent" element={<Private Component={AddEventForm} />} />
            <Route path="/updateEvent/:id" element={<Private Component={UpdateEventform} />} />
            <Route path="/allEvents" element={<Private Component={EventsAll} />} />

            {/* Who is in Today route */}
            <Route path="/whoIsInToday" element={<Private Component={InToday} />} />
            <Route path="/whoIsOnLeaveToday" element={<Private Component={LeaveToday} />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
