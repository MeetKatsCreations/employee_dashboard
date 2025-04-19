import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const { user } = useAuth(); 
    const token = localStorage.getItem('userToken'); 
  
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/log/getNotes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (res.data.success) {
          setNotes(res.data.notes);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (user) {
        fetchNotes();
      } else {
        setLoading(false);
      }
    }, [user]);

    const addNote = async (note) => {
        try {
          const token = localStorage.getItem("userToken"); 
      
          const res = await axios.post("http://localhost:5000/log/addLog", note, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
      
          setNotes((prev) => [res.data.note, ...prev]);
        } catch (err) {
          console.error("Add Note Error:", err);
        }
      };

      const editNote = async (id, updatedData) => {
        try {
          const token = localStorage.getItem("userToken");
      
          const res = await axios.put(`http://localhost:5000/log/editLog/${id}`, updatedData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          setNotes((prevNotes) =>
            prevNotes.map((note) => (note._id === id ? res.data.note : note))
          );
        } catch (err) {
          console.error("Edit Note Error:", err);
        }
      };
      

      const deleteNote = async (id) => {
        try {
          const token = localStorage.getItem("userToken");
      
          await axios.delete(`http://localhost:5000/log/deleteLog/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        } catch (err) {
          console.error("Delete Note Error:", err);
        }
      };
      

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, loading, addNote, editNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
