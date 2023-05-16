const mongoose = require('mongoose')

const Schema = mongoose.Schema

const calendarSchema = new Schema({
    eventName:{
        type:String,
    },
    eventDate:{
        type:Date,
    },
    comment:{
        type:String,
    },
    eventType:{
        type:String,
    }
})

module.exports = mongoose.model('calendar',calendarSchema)
