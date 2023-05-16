import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import auth from "../apis/modules/auth";

const userProfilePageNavbar = () => {
  const { loggedIn } = useContext(AuthContext);

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
        <nav>
          <ul class="nav_links">
            <li>
              <a href="#">Analyze</a>
            </li>
          </ul>
        </nav>
        <div>
          <a href="/" className="nav-item">
            Home
          </a>
          <a href="" className="nav-item">
            <i className="fa-solid fa-user fa-xl"></i>
          </a>
          <a className="nav-item">
            <i className="fa fa-sign-out logoutBtn" title="LogOut" onClick={logout}></i>
          </a>
        </div>
      </header>
      <br/>
    </section>
  );
};

export default userProfilePageNavbar;
