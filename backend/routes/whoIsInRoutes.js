const express = require("express");

const {
  getEmployeesInToday,
} = require("../controllers/whoIsInTodayController");

const router = express.Router();

router.get("/allEmployeesToday", getEmployeesInToday);

module.exports = router;
