const express=require('express')
const router = express.Router();
const {addNote,editNote,deleteNote}=require("../Controllers/logController");
const authenticate = require('../Middlewares/authenticate');
router.post("/addLog",authenticate,addNote)
router.put("/editLog/:id",authenticate,editNote)
router.delete("/deleteLog/:id",authenticate,deleteNote)
// router.get("/getLog");
module.exports=router;