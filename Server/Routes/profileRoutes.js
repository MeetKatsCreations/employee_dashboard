const express = require("express");
const router = express.Router();
const authenticate = require("../Middlewares/authenticate");
const { getProfile,updateProfile } = require("../Controllers/profileController");

router.get("/getProfile", authenticate, getProfile);
router.patch("/updateProfile", authenticate, updateProfile);       

module.exports = router;