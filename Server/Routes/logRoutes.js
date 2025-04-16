const express=require('express')
const router = express.Router();
const {addNote,editNote,deleteNote,getNotes}=require("../Controllers/logController");
const authenticate = require('../Middlewares/authenticate');
router.post("/addLog",authenticate,addNote)
router.put("/editLog/:id",authenticate,editNote)
router.delete("/deleteLog/:id",authenticate,deleteNote)
router.get("/getNotes", authenticate, getNotes);

module.exports=router;