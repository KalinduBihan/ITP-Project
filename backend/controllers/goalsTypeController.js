const goalTypes = require('../models/goalType')

const mongoose = require('mongoose')


//get list of goals
const getAllGoalType = async (req, res) => {
    const goals = await goalTypes.find({}).sort({ createdAt: -1 })

    res.status(200).json(goals)
}


//create a new goal
const createGoalType = async (req, res) => {
    const { goalType ,goalDescription} = req.body


    //add goal to db
    try {

        const goals = goalTypes.create({ goalType, goalDescription})
        res.status(200).json(goals)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }


}

//delete a goal
const deleteGoalType = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'no such goal' })
    }
    const goals = await goalTypes.findOneAndDelete({ _id: id })

    if (!goals) {
        return res.status(404).json({
            error: 'no such goal'
        })
    }

    res.status(200).json(goal)




}


module.exports = {
    getAllGoalType,
    createGoalType,
    deleteGoalType
}