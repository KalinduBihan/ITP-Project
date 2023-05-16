const mongoose = require('mongoose');

const userProfilesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    identityNo: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    phoneOne: {
        type: String,
        required: true
    },
    phoneTwo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        unique: true,
        required: true
    },
    department: {
        type: String,
        required: false
    },
    userRole: {
        type: String,
        required: true
    },
    joinedDate: {
        type: String,
        required: false
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('userProfiles', userProfilesSchema);

