const express = require('express')
const router = express.Router()
const {registerUser, getUser, userbyid, deleteuser, updateuser, userLogin} = require("../Controller/userController")

router.get("/", getUser);
router.post("/register", registerUser);
router.get("/:id", userbyid);
router.delete("/:id", deleteuser);
router.patch("/:id", updateuser);
router.post("/login", userLogin);

module.exports = router