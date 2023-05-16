const mongoose = require('mongoose')

const Schema = mongoose.Schema

const approvalPersonelSchema = new Schema({
    userId:{
        type:String,
        required : true
    },
    approvalPerson1:{
        type:String,
        required : true
    },
    approvalPerson2:{
        type:String
    }
    
})

module.exports = mongoose.model('approvalPersonel',approvalPersonelSchema)
