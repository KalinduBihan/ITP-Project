const goalsTable = require('../models/goalsTable')
var userProfiles = require('../models/userProfiles.js');

const mongoose = require('mongoose')


//get list of goals
const getAllGoals = async (req, res) => {
    const goals = await goalsTable.find({}).sort({ createdAt: -1 })

    res.status(200).json(goals)
}


//get a single goal

const getOneGoal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'no such goal' })
    }
    const goals = await goalsTable.findById(id)

    if (!goals) {
        return res.status(404).json({
            error: 'no such goal'
        })
    }

    res.status(200).json(goals)
}


//create a new goal
const createGoal = async (req, res) => {
    const {
        goalType,
        goalCategory,
        goalDeadline,
        description,
        submissions
    } = req.body


    //add goal to db
    try {

        const goals = goalsTable.create({
            goalType,
            goalCategory,
            goalDeadline,
            description,
            submissions
        })
        res.status(200).json(goals)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }


}

//delete a goal
const deleteGoal = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'no such goal' })
    }
    const goals = await goalsTable.findOneAndDelete({ _id: id })

    if (!goals) {
        return res.status(404).json({
            error: 'no such goal'
        })
    }

    res.status(200).json(goals)




}

//update a goal
const updateGoal = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'no such goal' })
    }
    const goals = await goalsTable.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!goals) {
        return res.status(404).json({
            error: 'no such goal'
        })
    }

    res.status(200).json(goals)


}

//get all Categories
const getAllCategory = async (req, res) => {
    try {
      const goals = await goalsTable.find({}, { goalCategory: 1 })
  
      res.status(200).json(goals)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

//get all goal Titles
const getAllTitles = async (req, res) => {
    try {
      const goals = await goalsTable.find({}, { goalType: 1 })
  
      res.status(200).json(goals)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  //get all Employees
  const getAllEmployees = async (req, res) => {
    try {
      const goals = await userProfiles.find({}, { employeeId: 1 })
  
      res.status(200).json(goals)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  //get all emails
  const getAllEmails = async (req, res) => {
    try {
      const goals = await userProfiles.find({}, { email : 1 })  
      res.status(200).json(goals)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  //get Employee email by ID

  const getUserEmailByEmployeeId = async (req,res) => {
    
    const { employeeId } = req.params;

    try {
      const user = await userProfiles.findOne({ employeeId });
      if (user) {
        res.status(200).json({ email: user.email });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      // Handle any potential errors
      console.error('Error retrieving user email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

module.exports = {
    getAllGoals,
    getOneGoal,
    createGoal,
    updateGoal,
    deleteGoal,
    getAllCategory,
    getAllTitles,
    getAllEmployees,
    getAllEmails,
    getUserEmailByEmployeeId
}