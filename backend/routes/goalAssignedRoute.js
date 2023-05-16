const express = require('express')

const { 
    getAllgoalAssign,
    getOnegoalAssign,
    creategoalAssign,
    updategoalAssign,
    deletegoalAssign
  
 } = require('../controllers/goalAssignedController')

const router = express.Router()

// GET all GoalAssigneds
router.get('/goalAssign/',getAllgoalAssign)

// GET a single GoalAssigned
router.get('/goalAssign/:id', getOnegoalAssign)

// POST a new GoalAssigned
router.post('/goalAssign/', creategoalAssign)

// DELETE a GoalAssigned
router.delete('/goalAssign/:id',deletegoalAssign)

// UPDATE a GoalAssigned
router.patch('/goalAssign/:id', updategoalAssign)

module.exports = router