const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userInformationSchema = new Schema({
    _id:{
        type:String,
        required:true,
        unique: true
    },
    firstName:{
        type:String,
        required:true,
    },
    scondName:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:Object,
        required:true,
    },
    nationalIC:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    moblieNo:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    userRole:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    joinedDate:{
        type:Object,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('userInformation',userInformationSchema)
