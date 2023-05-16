const leave = require("../models/leaveRecords");
const leaveEntitlement = require("../models/leaveEntitlement")
const mongoose = require("mongoose");

//GET all leaves
const getAllLeaves = async (req, res) => {
  const leaveRec = await leave.find({}).sort({ createdAt: -1 });

  res.status(200).json(leaveRec);
};
//get all leave records to be approved
const getAllLeavesApproval = async (req, res) => {
  const leaves = await leave
    .find({ status: "Pending" })
    .sort({ createdAt: -1 });
  res.status(200).json(leaves);
};
//GET a single leave
const getSingleLeave = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such leave" });
  }

  const leaveRec = await leave.findById(id);

  if (!leave) {
    return res.status(404).json({ error: "No such leave" });
  }

  res.status(200).json(leaveRec);
};

//get all leave records of user
const getUserLeaveRecords = async(req,res)=>{
    const {userId} = req.params
    const leaveRecords = await leave.find({userId:userId}).sort({"createdAt":-1})
    res.status(200).json(leaveRecords)
}

//CREATE a new leave
const createLeaveRequest = async (req, res) => {
  const {
    userId,
    userName,
    startDate,
    endDate,
    noOfDays,
    leaveType,
    comment,
    relief
  } = req.body;

  const recordDate = new Date()
  const recordDatelocal = recordDate.toLocaleDateString('en-GB')

  //Add doc to db
  try {
    const leaveRec = await leave.create({
        userId:userId,
        userName:userName,
        recordDate:recordDatelocal,
        startDate:startDate,
        endDate:endDate,
        noOfDays:noOfDays,
        leaveType:leaveType,
        comment:comment,
        relief:relief
    });
    res.status(200).json(leaveRec);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a leave
const deleteLeaveRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id is invalid" });
  }

  const leaveRec = await leave.findOneAndDelete({ _id: id });

  if (!leave) {
    return res.status(404).json({ error: "No such leave" });
  }

  res.status(200).json(leaveRec);
};

//UPDATE a leave
const updateLeaveRecord = async (req, res) => {
  const { id } = req.params;

  const {
    empId,
    empName,
    recordDate,
    startDate,
    endDate,
    noOfDays,
    leaveType,
    comment,
    status,
    relief,
  } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such leave" });
  }
  const leaveRec = await leave.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!leaveRec) {
    return res.status(404).json({ error: "No such leave" });
  }
  else{
    console.log(req.body);
    if(status==="Accepted"){
      if(leaveType==="Full Day"){
        leaveEntitlement.findOneAndUpdate({ userId: empId },{ $inc: { fullDayTaken: 1 } })
      }
      else if(leaveType==="Half Day"){
        leaveEntitlement.findOneAndUpdate({ userId: empId },{ $inc: { halfDayTaken: 1 } })
      }
      else if(leaveType==="Short Leave"){
        leaveEntitlement.findOneAndUpdate({ userId: empId },{ $inc: { shortLeaveTaken: 1 } })
      }
    }
  }

  res.status(200).json(leaveRec);
};
//get leave entitlement
const getAllLeaveEntitlement = async (req,res)=>{
  const leaveRec = await leaveEntitlement.find({}).sort({ createdAt: -1 });
  res.status(200).json(leaveRec);
}

//CREATE a new leave ent
const createLeaveEntitlement = async (req, res) => {
  const {
    userId,
    userName,
    fullDayTaken
  } = req.body;
  //Add doc to db
  try {
    const leaveEnt = await leaveEntitlement.create({
        userId:userId,
        userName:userName,
        fullDayTaken:fullDayTaken
    });
    res.status(200).json(leaveEnt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//increment
const incrementLeaveEntRecord = async (req,res)=>{
  const {empId,leaveType,status} = req.body;

  console.log(req.body);
  try {
    if(status=="Accepted"){
      if(leaveType=="Full Day"){
        leaveEntitlement.findOneAndUpdate({ userId: empId },{ $inc: { fullDayTaken: 1 } })
      }
      else if(leaveType=="Half Day"){
        leaveEntitlement.findOneAndUpdate({ userId: empId },{ $inc: { halfDayTaken: 1 } })
      }
      else if(leaveType=="Short Leave"){
        leaveEntitlement.findOneAndUpdate({ userId: empId },{ $inc: { shortLeaveTaken: 1 } })
      }
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

//get all leave ent records of user
const getUserLeaveEntRecords = async(req,res)=>{
  const {userId} = req.params
  const leaveEntRecords = await leaveEntitlement.find({userId:userId}).sort({"createdAt":-1})
  res.status(200).json(leaveEntRecords)
}

module.exports = {
  getAllLeaves,
  getAllLeavesApproval,
  getSingleLeave,
  getUserLeaveRecords,
  createLeaveRequest,
  deleteLeaveRecord,
  updateLeaveRecord,
  getAllLeaveEntitlement,
  createLeaveEntitlement,
  incrementLeaveEntRecord,
  getUserLeaveEntRecords
};
