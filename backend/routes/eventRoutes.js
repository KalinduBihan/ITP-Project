const express = require('express')
const eventCreation = require('../models/events')


const {
    createEve,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent
} = require('../controllers/eventController')

const router = express.Router()

//GET all events
router.get('/all', getEvents)

//GET a single event
router.get('/single/:id', getEvent)

//POST a new event

router.post('/createEvent', createEve)

router.post('/', createEve)
//createEve


//DELETE an event
router.delete('/delete/:id', deleteEvent)
///delete

//UPDATE an event
router.patch('/update/:id', updateEvent)
///update

module.exports = router