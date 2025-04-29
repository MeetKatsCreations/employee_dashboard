const express = require("express");
const router = express.Router();
const authenticate = require("../Middlewares/authenticate");
const { getProfile,updateProfile, getAllEmployees } = require("../Controllers/profileController");

router.get("/getProfile", authenticate, getProfile);
router.put("/updateProfile", authenticate, updateProfile);       
router.get("/getEmployees",authenticate,getAllEmployees)
module.exports = router;