const express = require('express')

const { 
    getAllGoalType,
    createGoalType,
    deleteGoalType
  
 } = require('../controllers/goalsTypeController')

const router = express.Router()

// GET all Goal Type
router.get('/', getAllGoalType)

// POST a new Goal Type
router.post('/', createGoalType)

// DELETE a Goal Type
router.delete('/:id',deleteGoalType)



module.exports = router