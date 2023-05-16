const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goalsTableSchema = new Schema({
    goalType:{
        type:String,
        required : true
    },
    
    goalCategory:{
        type:String,
        required:true
    },

    goalDeadline:{
        type:Object,
        required:false,
        default:"none"  
    },

    description:{
        type:String,
        required:true
 
    },

    submissions:{
        type:String,
        required:false,
        default:'false'
    }
    


})

module.exports = mongoose.model('goalsTable',goalsTableSchema)
