
const Class = require("../Models/classModel");
const Handleerror = require("../utils/handleerror");

// Get all classes
async function getclass(req, res) {
    try {
        const classes = await Class.find();

        return res.status(200).json({
            success: true,
            message: "Successfully fetched classes",
            classes
        });
    } catch (error) {
        return Handleerror(res, error);
    }
}

// Create a new class
async function createclass(req, res) {
    try {
        const {
            classname,
            acdemicyear,
            grade,
            studentcapacity,
            classteacher,
            section,
            classstatus
        } = req.body;

        if (
            !classname ||
            acdemicyear == null ||
            !grade ||
            studentcapacity == null ||
            !classteacher ||
            !section ||
            !classstatus
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const newClass = await Class.create({
            classname,
            acdemicyear,
            grade,
            studentcapacity,
            classteacher,
            section,
            classstatus
        });
        
        return res.status(201).json({
            success: true,
            message: "Successfully created class",
            Class: newClass
        });
       
    } catch (error) {
        return Handleerror(res, error);
    }
}

// Get class by ID
async function classbyid(req, res) {
    try {
        const { id } = req.params;
        const classData = await Class.findById(id);

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: "Class not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetched class",
            Class: classData
        });
    } catch (error) {
        return Handleerror(res, error);
    }
}

// Delete class by ID
async function deleteclass(req, res) {
    try {
        const { id } = req.params;
        const classData = await Class.findByIdAndDelete(id);

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: "Class not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully deleted class",
            Class: classData
        });
    } catch (error) {
        return Handleerror(res, error);
    }
}

// Update class by ID
async function updateclass(req, res) {
    try {
        const { id } = req.params;

        const {
            classname,
            acdemicyear,
            grade,
            studentcapacity,
            classteacher,
            classstatus,
            section
        } = req.body;

        const classData = await Class.findByIdAndUpdate(
            id,
            {
                classname,
                acdemicyear,
                grade,
                studentcapacity,
                classteacher,
                classstatus,
                section
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: "No class found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully updated the class",
            Class: classData
        });
    } catch (error) {
        return Handleerror(res, error);
    }
}

module.exports = {
    createclass,
    getclass,
    classbyid,
    deleteclass,
    updateclass
};
