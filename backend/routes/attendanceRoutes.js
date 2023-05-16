const express = require("express");

const {
  getAllAttendanceRecords,
  getAttendanceRecord,
  enterInTime,
  enterOutTime,
  getUserAllAttendanceRecords,
  deleteAttendanceRecord,
  updateAttendanceRecord,
  getNoOfAttendanceRecords,
  checkAttRecord,
  checkLeaveRecord
} = require("../controllers/attendanceController");

const router = express.Router();
var { protect } = require("../controllers/userProfileController.js");

// get All Attendance Records
router.get("/allAttendanceRecords", getAllAttendanceRecords);

// get one Attendance Record
router.get("/attendanceRecords/:id", getAttendanceRecord);

//enter in time
router.post("/attendanceRecords/inTime/:userId", enterInTime);

//enter out time
router.patch("/attendanceRecords/outTime/:userId", enterOutTime);

//get all the attendance records of one user
router.get("/userAttendanceRecords/:userId", getUserAllAttendanceRecords);

//get all the attendance records of one user
router.get("/userNoOfAttendanceRecords/:userId", getNoOfAttendanceRecords);

//delete an attendance record
router.delete("/deleteAttendanceRecords/:id", deleteAttendanceRecord);

//update an attendance record
router.patch("/updateAttendanceRecord/:id", updateAttendanceRecord);

//check records
router.get("/checkAttRecord/:userId",checkAttRecord);
router.get("/checkLeaveRecord/:userId",checkLeaveRecord);

module.exports = router;
