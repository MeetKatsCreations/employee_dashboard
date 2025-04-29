const Note=require("../Models/logModel")
const addNote = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;
    const role = req.rootUser.role;
    const name=req.rootUser.name;
    if (!title) {
        return res.status(422).json({ success: false, message: "Title is required" });
    }

    try {
        const newNote = new Note({
          createdBy: {
            userId,
            name,
            role
          },
          role,
          userId,
            title,
            description
        });

        await newNote.save();
        res.status(201).json({ success: true, message: "Note added successfully", note: newNote });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
const editNote = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.userId;
  
    try {
      const note = await Note.findById(id);
  
      if (!note) {
        return res.status(404).json({ success: false, message: "Note not found" });
      }
  
      if (note.userId.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
  
      
      note.title = title || note.title;
      note.description = description || note.description;
  
      await note.save();
  
      res.status(200).json({ success: true, message: "Note updated successfully", note });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };


  const deleteNote = async (req, res) => {
    try {
      const noteId = req.params.id;
      const userId = req.userId;
  
      
      const note = await Note.findById(noteId);
  
     
      if (!note) {
        return res.status(404).json({ success: false, message: "Note not found" });
      }
  
      
      if (note.userId.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: "Access denied: Not your note" });
      }
  
      
      await Note.findByIdAndDelete(noteId);
  
      res.status(200).json({ success: true, message: "Note deleted successfully" });
  
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
  };
  const getNotes = async (req, res) => {
    try {
      const userId = req.userId;
      const role = req.rootUser.role;
  
      let notes;
  
      if (role === "admin") {
        
        notes = await Note.find().sort({ createdAt: -1 }); 
      } else {
        
        notes = await Note.find({ userId }).sort({ createdAt: -1 });
      }
  
      res.status(200).json({ success: true, notes });
  
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
  };
module.exports={addNote,editNote,deleteNote,getNotes}
