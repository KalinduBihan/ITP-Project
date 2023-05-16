const appraisalModel = require('../models/appraisalQuestions')
const mongoose = require('mongoose')

// get all appraisal questions
const getAppraisalQuestions = async (req, res) => {
    const appraisalQuestions = await appraisalModel.find({}).sort({ createdAt: -1 })

    res.status(200).json(appraisalQuestions)
}

//get a single appraisal question
const getAppraisalQuestion = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal question' })
    }

    const appraisalQuestion = await appraisalModel.findById(id)

    if (!appraisalQuestion) {
        return res.status(400).json({ error: 'No such appraisal question' })
    }

    res.status(200).json(appraisalQuestion)
}

//create a new appraisal

const createAppraisalQuestion = async (req, res) => {
    const { name, description, weight } = req.body

    //add doc to db
    try {
        await appraisalModel.create({ questionName: name, questionDescription: description, questionWeight: weight })

        res.status(200).json({
            message: 'Appraisal question created successfully'
        })

    } catch (error) {
        res.status(400).json({
            message: 'Error creating appraisal question',
            error: error.message
        })
    }
}
//delete a workout
const deleteAppraisalQuestion = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal question' })
    }

    const appraisalQuestion = await appraisalModel.findOneAndDelete({ _id: id })

    if (!appraisalQuestion) {
        return res.status(400).json({ error: 'No such appraisal question' })
    }


    res.status(200).json(appraisalQuestion)

}
//update workout

const updateAppraisalQuestion = async (req, res) => {
    const { id } = req.params
    const { name, description, weight } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal question' })
    }
    const appraisalQuestion = await appraisalModel.findOneAndUpdate({ _id: id }, {
        questionName: name,
        questionDescription: description,
        questionWeight: weight
    })

    res.status(200).json(appraisalQuestion)
}


module.exports = {
    getAppraisalQuestions,
    getAppraisalQuestion,
    createAppraisalQuestion,
    deleteAppraisalQuestion,
    updateAppraisalQuestion
}