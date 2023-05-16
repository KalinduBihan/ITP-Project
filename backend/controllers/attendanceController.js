const attendance = require("../models/attendanceRecords");
const leave = require("../models/leaveRecords");
const mongoose = require("mongoose");
const moment = require("moment");
//get all attendance records
const getAllAttendanceRecords = async (req, res) => {
  const attendanceRecords = await attendance.find({}).sort({ createdAt: -1 });
  res.status(200).json(attendanceRecords);
};

//get single attendance record
const getAttendanceRecord = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such record" });
  }

  const record = await attendance.findById(id);
  if (!record) {
    return res.status(404).json({ error: "No such record" });
  }
  res.status(200).json(record);
};

//Enter in time
const enterInTime = async (req, res) => {
  const { inTime, inTimeComment, userName } = req.body;
  const { userId } = req.params;

  const recordDate = new Date();
  const recordDatelocal = recordDate.toLocaleDateString("en-GB");

  const timeEntry = new Date();
  const recordTimelocal = timeEntry.toLocaleTimeString();

  try {
    const attendanceRecord = await attendance.create({
      userId: userId,
      recordDate: recordDatelocal,
      inTime: recordTimelocal,
      inTimeComment: inTimeComment,
      userName: userName,
    });
    res.status(200).json(attendanceRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//enter out time
const enterOutTime = async (req, res) => {
  const { outTime, outTimeComment } = req.body;
  const { userId } = req.params;

  const recordDate = new Date();
  const recordDatelocal = recordDate.toLocaleDateString("en-GB");

  const timeEntry = new Date();
  const recordTimelocal = timeEntry.toLocaleTimeString();

  //send outTime,totalTime,comment to DB
  const filter = { userId: userId, recordDate: recordDatelocal };
  const updateOutTime = {
    outTime: recordTimelocal,
    outTimeComment: outTimeComment,
  };

  try {
    //insert out time
    const attRec = await attendance.findOneAndUpdate(filter, updateOutTime);

    if (attRec) {
      const document = await attendance.findOne(filter);

      // Concatenate current date with time string
      const indateStr = new Date().toLocaleDateString() + " " + document.inTime;
      console.log(document.inTime);
      const indateObj = new Date(indateStr);
      console.log(indateObj);

      // Concatenate current date with time string
      const outdateStr =
        new Date().toLocaleDateString() + " " + document.outTime;
      console.log(document.outTime);
      const outdateObj = new Date(outdateStr);
      console.log(outdateObj);

      const dateCreated = new Date(indateObj);
      const dateUpdated = new Date(outdateObj);
      const timeDifferenceMs = dateUpdated.getTime() - dateCreated.getTime();
      console.log(timeDifferenceMs);
      const updateTotTime = { totalTime: timeDifferenceMs };
      await attendance.findOneAndUpdate(filter, updateTotTime);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get attendace records of single user
const getUserAllAttendanceRecords = async (req, res) => {
  const { userId } = req.params;
  const userAttendanceRecords = await attendance
    .find({ userId: userId })
    .sort({ createdAt: -1 });
  res.status(200).json(userAttendanceRecords);
};

//get number of attendace records of single user
const getNoOfAttendanceRecords = async (req, res) => {
  const { userId } = req.params;
  const numRecs = await attendance.find({ userId: userId });
  const count = numRecs.length;
  res.json({ count });
};

//delete single attendance record
const deleteAttendanceRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such record" });
  }
  const record = await attendance.findOneAndDelete({ _id: id });
  if (!record) {
    return res.status(404).json({ error: "No such record" });
  }
  res.status(200).json(record);
};

//update attendance record
const updateAttendanceRecord = async (req, res) => {
  const { id } = req.params;

  const { inTimeComment, outTimeComment } = req.body;
  let emptyFields = [];

  if (!inTimeComment) {
    emptyFields.push("Comment");
  }
  if (!outTimeComment) {
    emptyFields.push("Comment");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill all the fields : " + emptyFields,
      emptyFields,
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such record" });
  }
  const record = await attendance.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!record) {
    return res.status(404).json({ error: "No such record" });
  }
  res.status(200).json(record);
};
//check for the existance of a record
const checkAttRecord = async (req, res) => {
  var date = new Date();
  const recordDate = new Date(date.setDate(date.getDate() - 1))
  const recordDatelocal = recordDate.toLocaleDateString("en-GB");

  const { userId } = req.params;
  const Rec= await attendance.find({ userId: userId,recordDate:recordDatelocal });


  if (!Rec) {
    return res.status(404).json({ error: "No such record" });
  }
  res.status(200).json(Rec);

  // if (Rec.length==0) {
  //   console.log(Rec)
  //   return false
  // }
  // else{
  //   return true
  // }
};

//check for the existance of a leave record
const checkLeaveRecord = async (req, res) => {
  var date = new Date();
  const recordDate = new Date(date.setDate(date.getDate() - 1))
  const recordDatelocal = recordDate.toLocaleDateString("en-GB");

  const { userId } = req.params;
  const Rec= await leave.find({ userId: userId,recordDate:recordDatelocal });

  if (!Rec) {
    return res.status(404).json({ error: "No such record" });
  }
  res.status(200).json(Rec);
};

module.exports = {
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
};
