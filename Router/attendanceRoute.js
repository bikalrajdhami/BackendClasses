const express = require("express");
const { createattendance, getattendance, attendancebyid, updateattendance, deleteattendance } = require("../Controller/attendanceController");

const router = express.Router();

// Create Attendance
router.post("/", createattendance);

// get attendance
router.get("/", getattendance);

// get attendaceby id
router.get("/:id", attendancebyid);
// ypdate attendance
router.patch("/:id", updateattendance)

// delete attendance
router.delete("/:id", deleteattendance)
module.exports=router;