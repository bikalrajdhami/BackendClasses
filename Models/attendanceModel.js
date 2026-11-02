
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    attendanceclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },

    section: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["Present", "Absent", "Late", "Leave"],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
