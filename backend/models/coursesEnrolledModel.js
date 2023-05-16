const mongoose = require('mongoose');

const Schema = mongoose.Schema

const enrolledourseSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    courseCode:{
        type:String,
        required:true
    },
}, {timestamps: true});

module.exports = mongoose.model('MyCourse', enrolledourseSchema)
