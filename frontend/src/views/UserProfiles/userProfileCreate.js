import axios from "axios";
import './CSS/userProfileForm.css';
import { useEffect, useState } from "react";


export default function UserProfileCreate() {
    
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
const [errorUserRole, setErrorUserRole] = useState("");

async function save(event) {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:4000/api/userProfile/create", {
            name: name, 
            identityNo: identityNo,
            address: address,
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
        });
        if (response.status === 200) {
            alert("Employee Registration Successful");
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
        } else {
            alert("Employee Registration Failed");
        }
    } catch (err) {
        console.error(err);
        alert("Employee Registration Failed");
    }
}

async function validateInput(event) {
    
    
    let errors = {};
    let errCount = 0;
    const users = await axios("http://localhost:4000/api/userProfile/getAll");
    const userList = users.data.data;

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
    if (!age == "") {
        if (isNaN(age) || parseInt(age) <= 0) {
            setErrorAge("Age must be a positive number");
            errCount++;
        }else{
            setErrorAge("");
        }
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
        userList.map((record) => {
            if(record.employeeId === employeeId){
                console.log("wdewwefwewc")
                alert("Employee is already exists");
                errCount++;
            }else{
                setErrorEmployeeId("");
            }
        })
    }
    
    if (!userRole) {
        setErrorUserRole("User role Id is required");
        errCount++;
    }else{
        setErrorUserRole("");
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
    console.log({errCount})
    if(errCount == 0){
        save(event);
    }
    
}
    return(
        <div class="container1">
            <form>
            <h2 class = "userProfileHeading" >User Profiles Creation</h2>
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
                        />
                        <label class="errorlabel">{errorEmployeeId}</label>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <select name="department" id="department" class = "form-control" onChange={(event) => {
                            setDepartment(event.target.value);
                            }}>
                            <option value="none" selected disabled hidden>Select an Option</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Management">Management</option>
                        </select>
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
                        <label class="errorlabel">{errorUserRole}</label>
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
                    Register
                </button>
            </div>
        </div>
    );
}




