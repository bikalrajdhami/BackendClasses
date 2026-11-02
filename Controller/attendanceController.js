
const Attendance = require("../Models/attendanceModel");
const HandleError = require("../utils/handleerror");


async function getattendance(req, res) {
  try {
    const attendance = await Attendance.find()
      .populate("student")
      .populate("attendanceclass")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched attendance data",
      attendance,
    });
  } catch (error) {
    console.error("Get attendance error:", error);
    return HandleError(res, error);
  }
}


async function createattendance(req, res) {
    try {
        const {
            student,
            attendanceclass,
            section,
            date,
            status
        } = req.body;

        // Check required fields
        if (!student || !attendanceclass || !section || !date || !status) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        // Create attendance record
        const attendance = await Attendance.create({
            student,
            attendanceclass,
            section,
            date,
            status
        });

        return res.status(201).json({
            success: true,
            message: "Successfully created Attendance",
            attendance
        });

    } catch (error) {
        return HandleError(res, error);
    }
}

async function attendancebyid(req, res){
 try {
    const {id} = req.params;
    const attendance = await Attendance.findById(id);

    if(!attendance){
        return res.status(404).json({
            success: false,
            message:"Students Attendance not found"
        })
    }
    return res.status(200).json({
        success: true,
        message:"Successfully fetched the attendance",
        attendance
    })
 } catch (error) {
    return HandleError(res, error);
 }
}

async function updateattendance(req, res){
    const {id} = req.params;
    const {student, attendanceclass, section, date, status}= req.body;
    try {
      const attendance = await Attendance.findByIdAndUpdate(id,{student, attendanceclass, section, date, status},
        {returnDocument: "after"}
      );
      if(!attendance){
        return res.status(404).json({
            success: false,
            message:"Attendance students not found"
        })
      }
      return res.status(200).json({
        success: true,
        message:"Succesfully update the students",
        attendance
      })
    } catch (error) {
        return HandleError(res, error);
    }
}

async function deleteattendance(req, res){
    const {id} = req.params;

    try {
       const attendance = await Attendance.findByIdAndDelete(id);
       if(!attendance){
        return res.status(404).json({
            success: false,
            message:"Sudents Attendance not found"
        })
       } 
       return res.status(200).json({
        success: true,
        message:"Successfully deleted the attendance of students"
       })
    } catch (error) {
        return HandleError(res, error)
    }
}
module.exports = { createattendance, getattendance, attendancebyid, updateattendance, deleteattendance};
