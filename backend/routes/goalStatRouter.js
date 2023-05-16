const express = require('express')

const { goalByCategory,
        goalByStatus
} = require('../controllers/goalStatController')
const router = express.Router()

// GET all Goals
router.get('/goalCatCount/', goalByCategory)
router.get('/goalStatusCount/', goalByStatus)

module.exports = router