const EnrolledCourse = require('../models/coursesEnrolledModel');
const CourseModel = require('../models/courseModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path")

//enrolling to a course
const enrollingCourse = async (req, res) => {
    const {employeeId,name,courseCode,duration,description,file} = req.body
    console.log(req.body)

    let emptyFields = []



    if(!employeeId){
        emptyFields.push('employeeId')
    }
    if(!courseCode){
        emptyFields.push('courseCode') 
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }

    const enrolledRows = await EnrolledCourse.find({employeeId: employeeId, courseCode: courseCode});
    if(enrolledRows.length > 0){
        res.status(400).json({error: "You are already enrolled"})
    }
    else{
        try {
            const enrolledCourse = await EnrolledCourse.create({employeeId,courseCode})
            res.status(200).json({enrolledCourse})
          } catch(error) {
            console.log(error);
            res.status(400).json({error: "Something went wrong"})
          }
    }

    
      
}

const getEnrollCourse = async (req, res) => {
    const { id } = req.params;

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: 'employee not found'})
    // }

    const enrolledRows = await EnrolledCourse.find({employeeId: id});
    if(enrolledRows.length === 0){
        return res.status(400).json({error: "You have no enrollments"})
    }
    else{

        let courseCodes = []

        enrolledRows.forEach((enrolledRow)=>{
            courseCodes.push(enrolledRow.courseCode)
        })

        const enrolledCourses = await CourseModel.find({courseCode: {$in: courseCodes}});

        return res.status(200).json(enrolledCourses)
    }


}


module.exports = {
    enrollingCourse,
    getEnrollCourse
}
