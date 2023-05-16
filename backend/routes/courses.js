const multer = require('multer');
const upload = require('../middleware/multerTraining')
const express = require('express');

const {
    createCourse,
    getAllCourses,
    getCourse,
    deleteCourse,
    updateCourse
} = require('../controllers/courseController');

const router = express.Router();

//GET all courses
router.get('/', getAllCourses);

//GET a single course
router.get('/:id', getCourse);

//POST a new course
//router.post('/', createCourse).post(upload.single('file'), createCourse)
router.route('/').get(getCourse).post(upload.single('file'), createCourse)

//DELETE a course
router.delete('/:id', deleteCourse)

//UPDATE a course
router.patch('/:id', updateCourse)

module.exports = router;