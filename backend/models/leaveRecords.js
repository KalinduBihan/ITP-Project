const mongoose = require('mongoose')

const Schema = mongoose.Schema

const leaveRecordsSchema = new Schema({
    userId:{
        type:String,
        required : true
    },
    userName:{
        type:String,
        required : true
    },
    recordDate:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    },
    noOfDays:{
        type:Object,
        default: "TBA"
    },
    leaveType:{
        type:String,
    },
    comment:{
        type:String,
    },
    status:{
        type:String,
        default: "Pending"
    },
    relief:{
        type:String,
        required : true
    }
})

module.exports = mongoose.model('leaveRecords',leaveRecordsSchema)
