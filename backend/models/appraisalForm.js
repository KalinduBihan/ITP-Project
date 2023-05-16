const mongoose = require('mongoose')

const Schema = mongoose.Schema

const questionsSchema = new Schema({
    questionDescription:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required : true
    }
})

const appraisalFormSchema = new Schema({
    processId:{
        type:String,
        required:true
    },
    appraiser:{
        type:String,
        required:true
    },
    appraisee:{
        type:String,
        required:true
    },
    questions:[questionsSchema]
    
})

module.exports = mongoose.model('appraisalForm',appraisalFormSchema)
