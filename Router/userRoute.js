const express = require('express')
const router = express.Router()
const {registerUser, getUser, userbyid, deleteuser, updateuser} = require("../Controller/userController")

router.get("/", getUser);
router.post("/register", registerUser);
router.get("/:id", userbyid);
router.delete("/:id", deleteuser);
router.patch("/:id", updateuser);

module.exports = router