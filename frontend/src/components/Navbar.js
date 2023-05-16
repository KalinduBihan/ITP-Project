import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import auth from "../apis/modules/auth";

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);
  const loc = window.location.toString().includes("leavePlanner");

  const logout = async () => {
    await auth.logout();
    localStorage.clear();
    window.location = "/userLogin";
  };

  return (
    <section>
      <header className="navbar">
        <a href="/" className="nav-heading">
          Us-HRMS
        </a>
        <div>
          {loggedIn && (
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
          )}
        </div>
      </header>
      <br />
    </section>
  );
};

export default Navbar;
