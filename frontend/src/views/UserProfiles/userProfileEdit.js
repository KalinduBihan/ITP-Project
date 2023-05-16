import axios from "axios";
import './CSS/userProfileHome.css';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";



function UserProfileEdit() {
    
const [_id, setId] = useState("");
const [name, setName] = useState("");
const [identityNo, setidentityNo] = useState("");
const [address, setAddress] = useState("");
const [gender, setGender] = useState("");
const [age, setAge] = useState("");
const [phoneOne, setPhoneOne] = useState("");
const [phoneTwo, setPhoneTwo] = useState("");
const [email, setEmail] = useState("");
const [employeeId, setEmployeeId] = useState("");
const [department, setDepartment] = useState("");
const [userRole, setUserRole] = useState("");
const [joinedDate, setJoinedDate] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [userProfiles, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState("");
const location = useLocation()

const [errorName, setErrorName] = useState("");
const [errorIdentityNo, setErrorIdentityNo] = useState("");
const [errorAddress, setErrorAddress] = useState("");
const [errorAge, setErrorAge] = useState("");
const [errorEmployeeId, setErrorEmployeeId] = useState("");
const [errorPhoneOne, setErrorPhoneOne] = useState("");
const [errorPhoneTwo, setErrorPhoneTwo] = useState("");
const [errorEmail, setErrorEmail] = useState("");
const [errorUsername, setErrorUsername] = useState("");
const [errorPassword, setErrorPassword] = useState("");


useEffect(() => {
    setName(location.state.name);
    setidentityNo(location.state.identityNo);
    setAddress(location.state.address);
    setGender(location.state.gender);
    setAge(location.state.age);
    setPhoneOne(location.state.phoneOne);
    setPhoneTwo(location.state.phoneTwo);
    setEmail(location.state.email);
    setEmployeeId(location.state.employeeId);
    setDepartment(location.state.department);
    setUserRole(location.state.userRole);
    setJoinedDate(location.state.joinedDate);
    setUsername(location.state.username);
    setPassword(location.state.password);
    setId(location.state._id);
}, []);

async function update(event) {
    event.preventDefault(); 
    try {
    await axios.patch(
        "http://localhost:4000/api/userProfile/update/" + _id,
        {
        _id: _id,
        name: name, 
        identityNo: identityNo,
        gender: gender,
        age: age,
        phoneOne: phoneOne,
        phoneTwo: phoneTwo,
        email: email,
        employeeId: employeeId,
        department: department,
        userRole: userRole,
        joinedDate: joinedDate,
        username: username,
        password: password
        }
    );
    alert("Registation Updated");
    setId("");
    setName("");
    setidentityNo("");
    setAddress("");
    setGender("");
    setAge("");
    setPhoneOne("");
    setPhoneTwo("");
    setEmail("");
    setEmployeeId("");
    setDepartment("");
    setUserRole("");
    setJoinedDate("");
    setUsername("");
    setPassword("");
    } catch (err) {
    alert(err);
    }
}

function validateInput(event) {
    
    
    let errors = {};
    let errCount = 0;
    if (name == "") {
        setErrorName("Name is required");
        errCount++;
    }else{
        setErrorName("");
    }
    if (!identityNo) {
        setErrorIdentityNo("IdentityNo is required");
        errCount++;
    }else{
        setErrorIdentityNo("");
    }
    if (!address) {
        setErrorAddress("Address is required");
        errCount++;
    }else{
        setErrorAddress("");
    }
    if (!age) {
        setErrorAge("Age is required");
        errCount++;
    }
    if (isNaN(age) || parseInt(age) <= 0) {
        setErrorAge("Age must be a positive number");
        errCount++;
    }else{
        setErrorAge("");
    }
    if (!phoneOne) {
        setErrorPhoneOne("Phone Number 1 is required");
        errCount++;
    } else if (!/^\d{10}$/i.test(phoneOne)) {
        setErrorPhoneOne("Phone Number 1 must be a valid 10-digit number");
        errCount++;
    }else{
        setErrorPhoneOne("");
    }
    if (phoneTwo && !/^\d{10}$/i.test(phoneTwo)) {
        setErrorPhoneTwo("Phone Number 2 must be a valid 10-digit number");
        errCount++;
    }else{
        setErrorPhoneTwo("");
    }
    if (!email) {
        setErrorEmail("Email is required");
        errCount++;
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setErrorEmail("Invalid email");
        errCount++;
    }else{
        setErrorEmail("");
    }
    if (!employeeId) {
        setErrorEmployeeId("Employee Id is required");
        errCount++;
    }else{
        setErrorEmployeeId("");
    }
    if (!username) {
        setErrorUsername("Username Id is required");
        errCount++;
    }else{
        setErrorUsername("");
    }
    if (!password) {
        setErrorPassword("Password Id is required");
        errCount++;
    }else{
        setErrorPassword("");
    }
    if(errCount == 0){
        update(event);
    }
    
}

return(
    <div class="container1">
            <form>
            <h2 class = "userProfileHeading">User Profiles Creation</h2>
            <div class="content">
                <div class="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            value={name}
                            onChange={(event) => {
                            setName(event.target.value);
                            }}
                        />
                        <label class="errorlabel">{errorName}</label>
                    </div>
                    <div class="form-group">
                        <label>Identitiy No</label>
                        <input
                            type="text"
                            class="form-control"
                            id="identityNo"
                            value={identityNo}
                            onChange={(event) => {
                                setidentityNo(event.target.value);
                            }}
                            disabled
                        />
                        <label class="errorlabel">{errorIdentityNo}</label>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            class="form-control"
                            id="address"
                            value={address}
                            onChange={(event) => {
                            setAddress(event.target.value);
                            }}
                        />
                        <label class="errorlabel">{errorAddress}</label>
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <input
                            type="text"
                            class="form-control"
                            id="gender"
                            value={gender}
                            onChange={(event) => {
                            setGender(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            class="form-control"
                            id="age"
                            value={age}
                            onChange={(event) => {
                            setAge(event.target.value);
                            }}
                        />
                        <label class="errorlabel">{errorAge}</label>
                    </div>
                    <div class="form-group">
                        <label>Phone Number 1</label>
                        <input
                            type="text"
                            class="form-control"
                            id="phoneOne"
                            value={phoneOne}
                            onChange={(event) => {
                            setPhoneOne(event.target.value);
                            }}
                        />
                        <label class="errorlabel">{errorPhoneOne}</label>
                    </div>
                    <div class="form-group">
                        <label>Phone Number 2</label>
                        <input
                            type="text"
                            class="form-control"
                            id="phoneTwo"
                            value={phoneTwo}
                            onChange={(event) => {
                            setPhoneTwo(event.target.value);
                            }}
                        />
                        <label class="errorlabel">{errorPhoneTwo}</label>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            class="form-control"
                            id="email"
                            value={email}
                            onChange={(event) => {
                            setEmail(event.target.value);
                            }}
                        />
                        <label class="errorlabel">{errorEmail}</label>
                    </div>
                    <div class="form-group">
                        <label>Employee ID</label>
                        <input
                            type="text"
                            class="form-control"
                            id="employeeId"
                            value={employeeId}
                            onChange={(event) => {
                                setEmployeeId(event.target.value);
                            }}
                            disabled
                        />
                        <label class="errorlabel">{errorEmployeeId}</label>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            class="form-control"
                            id="department"
                            value={department}
                            onChange={(event) => {
                            setDepartment(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>User Role</label>
                        <input
                            type="text"
                            class="form-control"
                            id="userRole"
                            value={userRole}
                            onChange={(event) => {
                            setUserRole(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>Joined Date</label>
                        <input
                            type="text"
                            class="form-control"
                            id="joinedDate"
                            value={joinedDate}
                            onChange={(event) => {
                                setJoinedDate(event.target.value);
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <label class="errorlabel">{errorUsername}</label>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input
                            type="text"
                            class="form-control"
                            id="password"
                            value={password}
                            onChange={(event) => {
                            setPassword(event.target.value);
                            }}
                        />
                        <label class="errorlabel">{errorPassword}</label>
                    </div>
                 </div>
            </form>
            <div class="userProfileBtn">
                <button onClick={(event) => { validateInput(event); }}  >
                    Update
                </button>
            </div>
        </div>
)
}

export default UserProfileEdit;
