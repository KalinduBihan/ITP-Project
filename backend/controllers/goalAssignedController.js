const goalAssign = require('../models/goalsAssigned')

const mongoose = require('mongoose')


//get list of goals
const getAllgoalAssign = async (req, res) => {
    const goals = await goalAssign.find({}).sort({ createdAt: -1 })

    res.status(200).json(goals)
}


//get a single goal

const getOnegoalAssign = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'no such goal' })
    }
    const goals = await goalAssign.findById(id)

    if (!goals) {
        return res.status(404).json({
            error: 'no such goal'
        })
    }

    res.status(200).json(goals)
}


//create a new goal
const creategoalAssign = async (req, res) => {
    const {
        Employee,
        goalType,
        goalTitle,
        assignedDate,
        goalDeadline,
        status
    } = req.body


    //add goal to db
    try {

        const goals = goalAssign.create({
            Employee,
            goalType,
            goalTitle,
            assignedDate,
            goalDeadline,
            status
        })
        res.status(200).json(goals)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }


}

//delete a goal
const deletegoalAssign = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'no such goal' })
    }
    const goals = await goalAssign.findOneAndDelete({ _id: id })

    if (!goals) {
        return res.status(404).json({
            error: 'no such goal'
        })
    }

    res.status(200).json(goals)




}

//update a goal
const updategoalAssign = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'no such goal' })
    }
    const goals = await goalAssign.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!goals) {
        return res.status(404).json({
            error: 'no such goal'
        })
    }

    res.status(200).json(goals)


}

module.exports = {
    getAllgoalAssign,
    getOnegoalAssign,
    creategoalAssign,
    updategoalAssign,
    deletegoalAssign
}