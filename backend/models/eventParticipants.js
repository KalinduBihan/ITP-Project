const mongoose = require('mongoose')

const Schema = mongoose.Schema

const participantSchema = new Schema({
    participant:{
        type:String,
        required : true
    }
})

const eventParticipantsSchema = new Schema({
    eventId:{
        type:String,
        required : true
    },
    participants:[participantSchema]
})

module.exports = mongoose.model('eventParticipants',eventParticipantsSchema)
