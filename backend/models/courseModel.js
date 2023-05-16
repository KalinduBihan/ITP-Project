const mongoose = require('mongoose');

const Schema = mongoose.Schema

const courseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    courseCode:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    file: {
        type:String,
        required:[true, 'Provide an image'],
    }
}, {timestamps: true});

module.exports = mongoose.model('Course', courseSchema)