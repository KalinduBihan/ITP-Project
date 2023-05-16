const express = require('express')

const { 

    getGoalDetails
 } = require('../controllers/goalsViewController')

const router = express.Router()

// GET all Goal Type
router.get('/EmployeeGoal/:id', getGoalDetails)





module.exports = router