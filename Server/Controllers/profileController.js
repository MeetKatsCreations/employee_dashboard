const users = require("../Models/userModel");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const cloudinary = require("../Middlewares/cloudinary")
const fs = require("fs")
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
const getPublicIdFromUrl = (url) => {
  if (typeof url !== "string") {
    console.error("Invalid profilePic URL:", url);
    return null;
  }

  const regex = /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/v\d+\/([^/]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
};

const updateProfile = async (req, res) => {

  const userId = req.userId;
  const updatedFields = req.body;
  const user = await users.findById(userId);


  if (updatedFields.skills && typeof updatedFields.skills === "string") {
    try {
      updatedFields.skills = JSON.parse(updatedFields.skills);
    } catch (e) {
      console.error("Error parsing skills:", e);
      return res.status(400).json({ message: "Invalid skills format" });
    }
  }

  if (updatedFields.teams && typeof updatedFields.teams === "string") {
    try {
      updatedFields.teams = JSON.parse(updatedFields.teams);
    } catch (e) {
      console.error("Error parsing teams:", e);
    }
  }
  if (req.file) {
    if (user.profilePic) {

      const publicId = getPublicIdFromUrl(user.profilePic);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_profiles",
      width: 400,
      crop: "scale",
    });

    updatedFields.profilePic = result.secure_url;

    fs.unlinkSync(req.file.path);
  }

  try {
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (updatedFields && typeof updatedFields === 'object') {
      for (let field of Object.keys(updatedFields)) {
        if (Object.prototype.hasOwnProperty.call(updatedFields, field)) {
          if (field === 'email' && updatedFields.email !== user.email) {
            const existingUser = await users.findOne({ email: updatedFields.email });
            if (existingUser) {
              return res.status(400).json({ message: 'Email already in use' });
            }
          }


          if (field === 'skills' && Array.isArray(updatedFields.skills)) {
            user.skills = updatedFields.skills.map(skill =>
              typeof skill === "string" ? skill : skill.name
            );
          } else {
            user[field] = updatedFields[field];
          }
        }
      }
      await user.save();

      res.status(200).json({ message: 'Profile updated successfully', user });
    } else {
      return res.status(400).json({ message: 'Invalid update data' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getAllEmployees = async (req, res) => {
  const role = req.role;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can view employee list.' });
  }

  try {
    const employees = await users.find({ role: 'employee' });
    res.status(200).json({ success: true, employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err });
  }
};
module.exports = { getProfile, updateProfile, getAllEmployees }
