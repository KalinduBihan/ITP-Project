import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './CSS/userProfile.css';
import { useEffect, useState } from "react";


const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [image,setImage] = useState("");

  function convertToBase64(e){
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result ); 
        };
        reader.onerror = error => {
            console.log("Error: " + error);
        };
  }

  return (
    <div>
        
        <div>
        <form>
            
            <h2 class = "userProfileHeading">My Profile</h2>
            <div class="profile-content">
            <div class="profileImg">
            {image ==""|| image==null?"": <img width={150} height={150} align = "center" src={image}/>}
            
            
            {/* <button onClick={uploadImage}>Upload</button> */}
        </div>
        <input accept="image/*" type="file" onChange={convertToBase64}></input>
                <div class="profile-form">
                    <h3>Name</h3>
                        <label>{user?.name}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Identity Number</h3>
                        <label>{user?.identityNo}</label>
        
                    </div>
                    <div class="profile-form">
                    <h3>Address</h3>
                        <label>{user?.address}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Gender</h3>
                        <label>{user?.gender}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Age</h3>
                        <label>{user?.age}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Phone Number 1</h3>
                        <label>{user?.phoneOne}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Phone Number 2</h3>
                        <label>{user?.phoneTwo}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Email</h3>
                        <label>{user?.email}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Username</h3>
                        <label>{user?.employeeId}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Username</h3>
                        <label>{user?.department}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>User Role</h3>
                        <label>{user?.userRole}</label>
                        
                    </div>
                    <div class="profile-form">
                    <h3>Joined Date</h3>
                        <label>{user?.joinedDate}</label>
                        
                    </div>
                 </div>
            </form>
            </div>
    </div>
  );
};

export default UserProfile;