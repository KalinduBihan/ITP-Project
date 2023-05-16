const express = require('express')

const { 
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
    
 } = require('../controllers/goalsTableController')

const router = express.Router()

// GET all Goals
router.get('/goalTable/', getAllGoals)

// GET a single Goals
router.get('/goalTable/:id', getOneGoal)

// POST a new Goals
router.post('/goalTable/', createGoal)

// DELETE a Goals
router.delete('/goalTable/:id', deleteGoal)

// UPDATE a Goals
router.patch('/goalTable/:id',  updateGoal)

//GET all Goal Categories
router.get('/goalCategory/', getAllCategory)

//GET all Goal Titles
router.get('/goalTitle/', getAllTitles)

//GET all employees
router.get('/empAssign/', getAllEmployees)

//Get all emails
router.get('/empEmail/', getAllEmails)
//Get email by id
router.get('/emailByID/:employeeId', getUserEmailByEmployeeId)




module.exports = router