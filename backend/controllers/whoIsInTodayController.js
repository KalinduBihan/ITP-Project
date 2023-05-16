const attendance = require("../models/attendanceRecords");
const leave = require("../models/leaveRecords");

const mongoose = require("mongoose");

const getEmployeesInToday = async (req,res) => {
  const today = new Date();
  const todayLocal = today.toLocaleDateString("en-GB");
  const attendanceRecords = await attendance
    .find({ recordDate: todayLocal })
    .sort({ createdAt: -1 });
  
  res.status(200).json(attendanceRecords);
};

// const getEmployeesOnLeaveToday = async () => {
//   const today = new Date();
//   const todayLocal = today.toLocaleDateString("en-GB");
//   const attendanceRecords = await leave
//     .find({ $gt: ISODate(todayLocal), $lt: ISODate("2020-01-24") })
//     .sort({ createdAt: -1 });
//   res.status(200).json(attendanceRecords);
// };

const getEmployeesOnLeaveToday = async (req, res) => {
  const today = new Date();

  const leaveRec = await leave.find({}).sort({ createdAt: -1 });

  res.status(200).json(leaveRec);
};

    


module.exports = {
  getEmployeesInToday,
};
