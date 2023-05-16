import { useState } from "react"
import auth from '../apis/modules/auth'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("");

  const [showPassword, setshowPassword] = useState(false)

  const togglePassword = () => {
    setshowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let payload = {
        username: username,
        password: password
      }

      let respond = (await auth.login(payload)).data;
      localStorage.setItem("JWT", respond.token);

      if (respond.token) {
        window.location = "/";
      }

    } catch (error) {
      localStorage.clear();
      setError("Your user name or password is incorrect");
    }

  }

  return (
    <div className="main-body">
      {/* {user && (<span>{user.email}</span>)} */}
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="loginTopic">Log In</h1>
        <br />
        <label className="loginLabel">Username:</label>
        <input
        className="usernameBox"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label className="loginLabel">Password:</label>
        <input
          className="passwordBox"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />

        <input className="chkBox" type="checkbox" onClick={togglePassword} /> Show Password
        <br />
        <button className="loginBtn">Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Login