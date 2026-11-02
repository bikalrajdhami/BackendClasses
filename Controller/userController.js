const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const HandleError = require("../utils/handleerror")


// GET USER
const getUser = async(req,res)=>{
    try {
        const user = await User.find();
        return res.status(202).json({
            success: true,
            message:"Sucessfully fetched User",
            user
        })
    } catch (error) {
        return HandleError(res, error);
    }
}
// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      // For now, only admin
      role: role || "admin",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



module.exports = {
  registerUser, getUser
};