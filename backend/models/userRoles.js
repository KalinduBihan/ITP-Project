const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userRolesSchema = new Schema({
    roleName:{
        type:String,
        required : true,
        unique: true
    },
    permissions:[
        String
    ]
})

module.exports = mongoose.model('userRoles',userRolesSchema)
