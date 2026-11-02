
const express = require("express");
const router = express.Router();

const {
    createclass,
    getclass,
    classbyid,
    deleteclass,
    updateclass
} = require("../Controller/classController");

// Create a new class
router.post("/", createclass);

// Get all classes
router.get("/", getclass);

// Get a single class by ID
router.get("/:id", classbyid);

// Delete a class by ID
router.delete("/:id", deleteclass);

// Update a class by ID
router.patch("/:id", updateclass);

module.exports = router;
