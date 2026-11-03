const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const HandleError = require("../utils/handleerror")


// GET USER
async function getUser(req, res) {
  try {
    const user = await User.find();
    return res.status(200).json({
      success: true,
      message: "Sucessfully find User ",
      user
    })

  } catch (error) {
    return HandleError(res, error)
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

// UserBy Id
async function userbyid(req, res) {
  try {
    const { id } = req.params;
    console.log(id)
    const user = await User.findById(id);
    return res.status(200).json({
      sucess: true,
      message: "Successfully fetched the user",
      user
    })
  } catch (error) {
    return HandleError(res, error)
  }
}

//DeleteUser
async function deleteuser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted the user"
    });

  } catch (error) {
    return HandleError(res, error);
  }
}
// UpdateUser
async function updateuser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Hash password if provided
    let updateData = {
      name,
      email
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: 'after' }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated the user",
      user
    });

  } catch (error) {
    return HandleError(res, error);
  }
}


module.exports = {
  registerUser, getUser, userbyid, deleteuser, updateuser
};