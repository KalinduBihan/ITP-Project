const mongoose = require('mongoose')

const Schema = mongoose.Schema


const leaveEntitlementSchema = new Schema({
    userId:{
        type:String,
        required : true
    },
    userName:{
        type:String,
    },
    fullDayAll:{
        type:Number,
        required : true,
        default: 14
    },
    halfDayAll:{
        type:Number,
        required : true,
        default: 14
    },
    shortLeaveAll:{
        type:Number,
        required : true,
        default: 14
    },
    fullDayTaken:{
        type:Number,
        default: 0
    },
    halfDayTaken:{
        type:Number,
        default: 0
    },
    shortLeaveTaken:{
        type:Number,
        default: 0
    }

})

module.exports = mongoose.model('leaveEntitlement',leaveEntitlementSchema)
