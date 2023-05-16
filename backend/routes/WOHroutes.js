const express = require("express");
const router = express.Router();

const {
  getAllWorkOnHolidayRecords,
  getWorkOnHolidayRecord,
  createWorkOnHolidayRequest,
  getUserAllWorkOnHolidayRecords,
  deleteWorkOnHolidayRecord,
  updateWorkOnHolidayRecord,
  getAllWorkOnHolidayRecordsApproval
} = require("../controllers/WOHcontroller");


// get All WorkOnHoliday Records
router.get("/allWorkOnHolidayRecords",getAllWorkOnHolidayRecords)

// get All WorkOnHoliday Records to be approved
router.get("/allWorkOnHolidayRecordsApproval",getAllWorkOnHolidayRecordsApproval)

// get one WorkOnHoliday Record
router.get("/workOnHolidayRecord/:id",getWorkOnHolidayRecord)

//create new WorkOnHoliday request
router.post("/createWorkOnHolidayRequest/:userId",createWorkOnHolidayRequest)

//get all the WorkOnHoliday records of one user
router.get("/userAllWorkOnHolidayRecords/:userId",getUserAllWorkOnHolidayRecords)

//delete an WorkOnHoliday record
router.delete("/deleteWorkOnHolidayRecord/:id",deleteWorkOnHolidayRecord)

//update an WorkOnHoliday record
router.patch("/updateWorkOnHolidayRecord/:id",  updateWorkOnHolidayRecord)

module.exports = router
