const users = require("../Models/userModel");
const validator=require("validator")
const bcrypt=require("bcryptjs")
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await users.findById(userId).select("-password -cpassword"); 

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};
const updateProfile = async (req, res) => {
    try {
      const userId = req.userId;
      const { name, newPassword,currentPassword,cpassword,email } = req.body;
  
      const user = await users.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
        
      if (name) user.name = name;
      if (email && email !== user.email) {
        if (!validator.isEmail(email)) {
          return res.status(400).json({ success: false, message: "Invalid email format" });
        }
  
        const existingUser = await users.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ success: false, message: "Email already in use" });
        }
  
        user.email = email;
      }

      if (currentPassword || newPassword || cpassword) {
        if (!currentPassword || !newPassword || !cpassword) {
          return res.status(400).json({ success: false, message: "Provide all password fields" });
        }
  
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: "Current password is incorrect" });
        }
  
        if (newPassword !== cpassword) {
          return res.status(400).json({ success: false, message: "New passwords do not match" });
        }
  
        if (newPassword.length < 6) {
          return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }
  
        
        user.password = newPassword;
        user.cpassword = cpassword;
      }
  
      await user.save();
  
      res.status(200).json({ success: true, message: "Profile updated successfully" });
  
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
  };
module.exports={getProfile,updateProfile}
