const Course = require('../models/courseModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path")

//get all courses
const getAllCourses = async (req, res) => {
    const courses = await Course.find({}).sort({createdAt: -1})

    res.status(200).json(courses)
}

//get a single course
const getCourse = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }  

    const course = await Course.findById(id)

    if(!course){
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
}

//create a new course
const createCourse = async (req, res) => {
    const {name, courseCode, duration, description} = req.body
    console.log(req.file)
    let file = null

    let emptyFields = []

    if(!req.file){
        emptyFields.push('file')
    }else {
        file = req.file.path
    }

    if(!name){
        emptyFields.push('name')
    }
    if(!courseCode){
        emptyFields.push('courseCode') 
    }
    if(!duration){
        emptyFields.push('duration')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }

    //add documentat to db
    try{
        const course = await Course.create({name, courseCode, duration, description, file})
        res.status(200).json({course})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndDelete({_id: id})

    if(!course){
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
}

//update a course
const updateCourse = async (req, res) => {
    const { id } = req.params   
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!course){
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)    
}


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
}