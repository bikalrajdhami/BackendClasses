const express = require('express')
const router = express.Router()
const {registerUser, getUser} = require("../Controller/userController")

router.get("/", getUser);
router.post("/register", registerUser);

module.exports = router