const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appraisalResultSchema = new Schema({
    appraiseeId: {
        type: Schema.Types.ObjectId,
        ref: 'userProfiles'
    },
    processId: {
        type: Schema.Types.ObjectId,
        ref: 'appraisalProcess'
    },
    appraiserName: {
        type: String
    },
    total: {
        type: Number
    },
    result: [
        {
            name: {
                type: String,
            },
            marks: {
                type: Number,
            },
            _id: false
        }
    ],
})

module.exports = mongoose.model('appraisalResult', appraisalResultSchema)
