const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workOnHolidaySchema = new Schema({
    userId:{
        type:String,
    },
    userName:{
        type:String,
    },
    recordDate:{
        type:String,
    },
    requestedDate:{
        type:Date,
    },
    comment:{
        type:String,
    },
    status:{
        type:String,
        default: "Pending"
    }
})

module.exports = mongoose.model('workOnHoliday',workOnHolidaySchema)
