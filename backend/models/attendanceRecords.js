const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceRecordsSchema = new Schema({
    userId:{
        type:String,
        required : true
    },
    userName:{
        type:String,
        required: true
    },
    recordDate:{
        type:String,
        required:true,
    },
    inTime:{
        type:String
    },
    inTimeComment:{
        type:String
    },
    outTime:{
        type:String,
        default:"TBA"
    },
    outTimeComment:{
        type:String,
        default:"TBA"
    },
    totalTime:{
        type:String,
        default:"TBA"
    },
},{timestamps:true})

module.exports = mongoose.model('attendanceRecords',attendanceRecordsSchema)
