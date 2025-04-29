const express = require("express");
const router = express.Router();
const authenticate = require("../Middlewares/authenticate");
const { getProfile,updateProfile, getAllEmployees } = require("../Controllers/profileController");
const { uploadSingle } = require("../Middlewares/multer");

router.get("/getProfile", authenticate, getProfile);
router.patch("/updateProfile", authenticate,uploadSingle, updateProfile); 
router.get("/getEmployees",authenticate,getAllEmployees)
module.exports = router;