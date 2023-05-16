var userProfiles = require('../models/userProfiles.js');


module.exports.createUserProfileService = (userDetails) => {
    return new Promise(function myFn(resolve, reject) {

        var userProfileData = new userProfiles();
        userProfileData.name = userDetails.name;
        userProfileData.identityNo = userDetails.identityNo;
        userProfileData.address = userDetails.address;
        userProfileData.gender = userDetails.gender;
        userProfileData.age = userDetails.age;
        userProfileData.phoneOne = userDetails.phoneOne;
        userProfileData.phoneTwo = userDetails.phoneTwo;
        userProfileData.email = userDetails.email;
        userProfileData.employeeId = userDetails.employeeId;
        userProfileData.department = userDetails.department;
        userProfileData.userRole = userDetails.userRole;
        userProfileData.joinedDate = userDetails.joinedDate;
        userProfileData.username = userDetails.username;
        userProfileData.password = userDetails.password;

        userProfileData.save().then(function (result) {
            resolve(result);
        }).catch(function (error) {
            reject(false);
        });
    });
}

module.exports.getUserProfileFromDBService = () => {

    return new Promise(function checkURL(resolve, reject) {
        userProfiles.find().then(function (result) {
            resolve(result);
        }).catch(function (error) {
            reject(false);
        });
    });
}

module.exports.updateUserProfileDBService = (id, userDetails) => {

    return new Promise(function myFn(resolve, reject) {
        userProfiles.findByIdAndUpdate(id, userDetails).then(function (result) {
            resolve(true);
        }).catch(function (error) {
            reject(false);
        });
    });
}

module.exports.removeUserProfileDBService = (id) => {

    return new Promise(function myFn(resolve, reject) {
        userProfiles.findByIdAndDelete(id).then(function (result) {
            resolve(true);
        }).catch(function (error) {
            reject(false);
        });
    });
}

