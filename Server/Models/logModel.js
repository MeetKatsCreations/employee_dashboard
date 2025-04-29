const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: {
    
    name: { type: String, required: true },
   
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: { type: String, enum: ["admin", "employee"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
