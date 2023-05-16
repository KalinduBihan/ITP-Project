const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appraisalQuestionsSchema = new Schema({
    questionNo: {
        type: Number,
        unique: true
    },
    questionName: {
        type: String,
        required: true
    },
    questionDescription: {
        type: String,
        required: true
    },
    questionWeight: {
        type: Number,
        required: true
    }
})

appraisalQuestionsSchema.pre('save', async function (next) {
    const doc = this;
    if (doc.isNew) {
        const maxQuestionNo = await mongoose.model('appraisalquestions').findOne({}, { questionNo: 1 }).sort({ questionNo: -1 });
        if (maxQuestionNo) {
            doc.questionNo = maxQuestionNo.questionNo + 1;
        } else {
            doc.questionNo = 1;
        }
    }
    next();
});


module.exports = mongoose.model('appraisalquestions', appraisalQuestionsSchema)
