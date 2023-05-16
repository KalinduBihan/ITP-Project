const express = require('express')

const { profileByGender,
    profileByRole
} = require('../controllers/userProfileStatController')
const router = express.Router()

// GET all Goals
router.get('/profGenderCount/', profileByGender)
router.get('/profRoleCount/', profileByRole)

module.exports = router