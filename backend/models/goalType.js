const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goalsTypeSchema = new Schema({
    goalType:{
        type:String,
        required : true
    },
    goalDescription:{
        type:Object,
        required:true
    }
})

module.exports = mongoose.model('goalsType',goalsTypeSchema)
