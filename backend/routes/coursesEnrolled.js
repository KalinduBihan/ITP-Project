
const multer = require('multer');
const upload = require('../middleware/multerTraining');
const express = require('express');

const {
    enrollingCourse,
    getEnrollCourse
} = require('../controllers/coursesEnrolledController');

const router = express.Router();

router.get('/:id', getEnrollCourse);

router.route('/enrollCourse').post(enrollingCourse)

module.exports = router;
