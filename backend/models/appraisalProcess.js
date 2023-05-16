const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appraisalProcessSchema = new Schema({
    processName: {
        type: String,
        required: true
    },
    processBy: {
        type: String,
        required: true
    },
    appraisee: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "on going"
    },
    dueDate: {
        type: String,
        required: true
    },
    appraiseeId: {
        type: Schema.Types.ObjectId,
        ref: 'userProfiles'
    },
    appraisers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'userProfiles'
            },
            status: {
                type: String,
                default: "pending"
            },
            _id: false
        }
    ],
    rows: [
        {
            type: Schema.Types.ObjectId,
            ref: 'appraisalquestions'
        }
    ]
})

module.exports = mongoose.model('appraisalProcess', appraisalProcessSchema)
