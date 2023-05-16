const express = require("express")
const router = express.Router()

const {
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
} = require("../controllers/leaveController");

// get All Leave Records
router.get("/allLeaveRecords", getAllLeaves);

// get All Leave Records to be approved
router.get("/allLeaveRecordsApproval", getAllLeavesApproval);

// get one Leave Record
router.get("/LeaveRecord/:id", getSingleLeave);

//create new Leave request
router.post("/createLeaveRequest", createLeaveRequest);

//get all the Leave records of one user
router.get("/userAllLeaveRecords/:userId", getUserLeaveRecords);

//delete an Leave record
router.delete("/deleteLeaveRecord/:id", deleteLeaveRecord);

//update an Leave record
router.patch("/updateLeaveRecord/:id", updateLeaveRecord);

// get All Leave entitlement Records
router.get("/allLeaveEntitlementRecords", getAllLeaveEntitlement);

//create new Leave request
router.post("/createLeaveEnt", createLeaveEntitlement);

//update leave ent record
router.patch("/updateLeaveEntRecord", incrementLeaveEntRecord);

//get all the Leave ent records of one user
router.get("/userAllLeaveEntRecords/:userId", getUserLeaveEntRecords);

module.exports = router
