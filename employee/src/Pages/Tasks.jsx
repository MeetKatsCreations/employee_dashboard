import { useNotes } from "../Context/LogContext";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
const Tasks = () => {
  const { notes, loading, deleteNote, editNote, addNote } = useNotes();
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      editNote(editingId, newNote);
      setEditingId(null);
    } else {
      addNote(newNote);
    }
    setNewNote({ title: "", description: "" });
  };

  const handleEdit = (note) => {
    setNewNote({ title: note.title, description: note.description });
    setEditingId(note._id);
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow space-y-4 border border-orange-200"
      >
        <h2 className="text-xl font-bold text-orange-600">
          {editingId ? "Edit Note" : "Add a New Note"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-orange-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border border-orange-200 resize-none p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={newNote.description}
          onChange={(e) =>
            setNewNote({ ...newNote, description: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-all"
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {loading ? (
        <p className="text-orange-600 font-medium">Loading notes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-4 rounded shadow space-y-2 h-68 flex flex-col justify-between"
              >
                <div>
                  <div className="mt-2 h-12 overflow-y-auto break-words text-orange-500 font-bold">
                    {note.title}
                  </div>
                  <div className="text-gray-700 mt-2 h-28 overflow-y-auto break-words">
                    {note.description}
                  </div>
                  
                  {user?.role === "admin" && note.createdBy?.name && (
                    
                    <div className="text-sm text-gray-500 mt-1 italic">
                      Logged by: {note.createdBy.name}
                    </div>
                   )} 
                </div>

                <div className="flex gap-2 mt-2 justify-between">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>

            ))
          ) : (
            <p className="text-orange-500 text-lg">No notes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
