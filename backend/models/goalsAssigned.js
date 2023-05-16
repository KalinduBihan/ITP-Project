const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goalsAssignedSchema = new Schema({
    Employee:{
        type:String,
        required : true
    },
    goalType:{
        type:String,
        required:false
    },
    goalTitle:{
        type:String,
        required:true
    },
    assignedDate:{
        type:Object,
        required:true
    },
    goalDeadline:{
        type:Object,
        required:false 
    },
    status:{
        type:String,
        required:true,
        default:"ongoing"
        
    }
})

module.exports = mongoose.model('goalsAssigned',goalsAssignedSchema)
