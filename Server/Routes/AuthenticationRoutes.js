const express=require('express')
const router = express.Router();
const {loginUser, registerUser,validUser}=require("../Controllers/AuthController")
const authenticate=require("../Middlewares/authenticate")
router.post("/login",loginUser);
router.post("/register",registerUser)
router.get("/validuser",authenticate, validUser);
module.exports=router;