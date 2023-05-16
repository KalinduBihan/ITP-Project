    import axios from "axios";
    import './CSS/userProfileHome.css';
    import { Link, useNavigate } from "react-router-dom";
    import { useEffect, useState } from "react";
    import pdfMake from "pdfmake/build/pdfmake";
    import pdfFonts from "pdfmake/build/vfs_fonts";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    function UserProfileHome() {

    const navigate = useNavigate()

    const [userProfiles, setUsers] = useState([]);
    const [itCount, setItcount] = useState("");
    const [hrCount, setHrCount] = useState("");
    const [managementCount, setManagementCount] = useState("");

    useEffect(() => {        
        (async () => await Load())();
        (async () => await assignValues())();
        
    }, []);
    
    async function assignValues(){
      let userCount =  await getCount();
      setItcount(userCount.it);
      setHrCount(userCount.hr);
      setManagementCount(userCount.management);
    }

    async function getCount() {
      let itCount = 0;
      let hrCount = 0;
      let managementCount = 0;
  
      const users = await axios("http://localhost:4000/api/userProfile/getAll");
      const userList = users.data.data;
      userList.map((record) => {
        if (record.department == "IT") {
          itCount++;
        }
        else if(record.department == "HR"){
          hrCount++;
        }else if(record.department == "Management") {
          managementCount++;}
      });

      const count = {
        "it" :itCount,
        "hr" : hrCount,
        "management" : managementCount
      }
      console.log(count);
      return count;
      
    }

    async function Load() {
      // const response = await (await userProfiles.getAllUserProfiles()).data.data
        // const result = await (await userProfiles.getAllUserProfiles())
        const result = await axios.get("http://localhost:4000/api/userProfile/getAll");
        setUsers(result.data.data);
        console.log(result.data);
    }
    
    async function editUserProfile(userProfile) {
        navigate('/userprofile/update',{state:userProfile})
    }

    async function createuser(userProfile) {
        navigate('/userprofile/create',{state:userProfile})
    }
    
    async function analyzeuser(userProfile) {
      navigate('/userprofile/stat',{state:userProfile})
  }

  async function userMail(userProfile) {
    navigate('/userprofile/mail',{state:userProfile})
}

    async function DeleteEmployee(_id) {
        await axios.delete("http://localhost:4000/api/userProfile/remove/" + _id);
        alert("Employee deleted Successfully");
        Load();
    }

    const searchHandle = async (event) =>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:4000/api/userProfile/search/${key}`);
            result = await result.json()
            if(result){
                setUsers(result);
            }
        }else{
            Load();
        }
        
    }

    const styles = {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      };

    const generateReport = (records) => {
        console.log(records)
        const documentDefinition = {
          content: [
            { text: "Unicorn Solutions Users", style: "header"},
            {
              table: {
                headerRows: 1,
                widths: ['*','*','*','*','*','*','*','*'],
                body: [
                  [
                  { text: "Employee Id", style: 'tableHeader' },
                  { text: "Name", style: 'tableHeader' },
                  { text: "User Role", style: 'tableHeader' },
                  { text: "Department", style: 'tableHeader' },
                  { text: "Address", style: 'tableHeader' },
                  { text: "Email", style: 'tableHeader' },
                  { text: "Phone Nuumber 1", style: 'tableHeader' },
                  { text: "Phone Number 2", style: 'tableHeader' }
                ],
                ...records
                .filter((record) => {
                    return record;
                })
                .map((record) => [
                  record.employeeId,
                  record.name,
                  record.userRole,
                  record.department,
                  record.address,
                  record.email,
                  record.phoneOne,
                  record.phoneTwo
                ]), 
                ],
              },
            },
          ],
          styles: styles,
          pageSize: 'A3',
          pageSize: {
            width: 1500,
            height: 800
          }
        };
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.download("All-User-Details.pdf");
      };

        return(
          <><script></script><div class="homeContainer">
            <h1 class="userProfileHeading">User Profiles</h1>
            <div class="card">
              <div class="card-container-it">
              <img src={require('../../styles/userProfilesIcons/developer.png')} className="card-icon" />
                <h2>IT</h2>
                <p class="counter">{itCount}</p>
              </div>
              <div class="card-container-mgt">
              <img src={require('../../styles/userProfilesIcons/management.png')} className="card-icon" />
                <h2>Management</h2>
                <p lass="counter">{managementCount}</p>
              </div>
              <div class="card-container-hr">
              <img src={require('../../styles/userProfilesIcons/hr.png')} className="card-icon" />
                <h2>HR</h2>
                <p lass="counter">{hrCount}</p>
              </div>
            </div>
            <div class="userProfileHomeContainer">
              <div class="userProfileRegBtn">
                <button class="btn1" onClick={() => createuser()}>Register</button>
              </div>
              <div class="userProfileGenBtn">
                <button onClick={() => generateReport(userProfiles)}>Generate</button>
              </div>
              <div class="userProfileAnalyzeBtn">
                <button class="btn1" onClick={() => analyzeuser()}>Analyze</button>
              </div>
              <div class="userProfileMailBtn">
                <button class="btn1" onClick={() => userMail()}>Mail</button>
              </div>
              <div class="userProfileSearch">
                <input type="text" placeholder="Search" onChange={searchHandle} />
              </div>
            </div>
            <table class="userProfilesTable">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Employee Id</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Employee Role</th>
                  <th scope="col">Option</th>
                </tr>
              </thead>
              {userProfiles.map(function fn(userProfile, index) {
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{index + 1} </th>
                      <td>{userProfile.employeeId}</td>
                      <td>{userProfile.name}</td>
                      <td>{userProfile.department}</td>
                      <td>{userProfile.userRole}</td>
                      <td>
                        {/* <button
                          type="button"
                          class="userProfileEditBtn"
                          onClick={() => editUserProfile(userProfile)}
                        >Edit
                        </button> */}
                        <span className="material-symbols" onClick={() => editUserProfile(userProfile)}>
                          <FontAwesomeIcon icon={faEdit} color="#0f74c6" />
                        </span>
                        {/* <button
                          img src={require('../../styles/userProfilesIcons/bin.png')}  
                          type="button"
                          class="userProfileDeleteBtn"
                          onClick={() => DeleteEmployee(userProfile._id)}
                        >
                          Delete
                        </button> */}
                        <span className="material-symbols" onClick={() => DeleteEmployee(userProfile._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} color="#ff6666" />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div></>
        );
    }
    
    export default UserProfileHome;
    