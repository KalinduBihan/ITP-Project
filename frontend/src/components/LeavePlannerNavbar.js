import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import auth from "../apis/modules/auth";

const LeavePlannerNavbar = () => {
  const { loggedIn } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [isManager,setIsManager] = useState();

  const userId = user?.employeeId;
  const userRole = user?.userRole

  const logout = async () => {
    await auth.logout();
    localStorage.clear();
    window.location = "/userLogin";
  };

  useEffect(()=>{
    if(userRole=="Manager"){
      setIsManager(true)
    }
    else{
      setIsManager(false)
    }
  })

  return (
    <section>
      <header className="navbar">
        <a href="/" className="nav-heading">
          Us-HRMS
        </a>
        <nav>
          <ul className="nav_links_ul">
            <li className="nav_links_li">
              <a className="whoIsIn" href="/whoIsInToday">
                Who is in
              </a>
            </li>
            <div className="dropdown">
              <li className="nav_links_li ">
                <button className="nav_links_btn apply">Apply</button>
                <div className="dropdownContent">
                  <a className="nav_links_a" href="/createLeaveRequest">
                    Leave
                  </a>
                  <br />
                  <a className="nav_links_a" href="/createWOHrequest">
                    Work on Holiday
                  </a>
                  <br />
                </div>
              </li>
            </div>
            <div className="dropdown">
              <li className="nav_links_li">
                <button className="nav_links_btn">History</button>
                <div className="dropdownContent">
                  <a
                    className="nav_links_a"
                    href={"/allAttendanceRecordsUser/" + userId}
                  >
                    Attendance
                  </a>
                  <br />
                  <a
                    className="nav_links_a"
                    href={"/allUserLeaveRecords/" + userId}
                  >
                    Leave
                  </a>
                  <br />
                  <a
                    className="nav_links_a"
                    href={"/allUserWOHRecords/" + userId}
                  >
                    Work On Holiday
                  </a>
                  <br />
                </div>
              </li>
            </div>
            {isManager ? (
              <div className="dropdown">
                <li className="nav_links_li">
                  <button className="nav_links_btn">Approve</button>
                  <div className="dropdownContent">
                    <a className="nav_links_a" href="/leaveRecordsApproval">
                      Leave
                    </a>
                    <br />
                    <a className="nav_links_a" href="/WOHRecordsApproval">
                      Work On Holiday
                    </a>
                    <br />
                  </div>
                </li>
              </div>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <div>
          <a href="/" className="nav-item">
            Home
          </a>
          <a href="/userprofile/me" className="nav-item">
            <i className="fa-solid fa-user fa-xl"></i>
          </a>
          <a className="nav-item">
            <i
              className="fa fa-sign-out logoutBtn"
              title="LogOut"
              onClick={logout}
            ></i>
          </a>
        </div>
      </header>
      <br />
    </section>
  );
};

export default LeavePlannerNavbar;
