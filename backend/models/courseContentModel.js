const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseContentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: [true, 'Provide content'],
    },
    courseId:{
        type: Schema.Types.ObjectId,
        ref: 'courses'
    }
}, {timestamps: true});

module.exports = mongoose.model('CourseContent', courseContentSchema)