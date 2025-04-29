import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const token = localStorage.getItem("userToken");

  const fetchProfile = async () => {
    const token=localStorage.getItem('userToken');
      if(!token)return;
    try {
      
      const res = await axios.get("http://localhost:5000/profile/getProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = res.data.user;

      const transformedData = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.contactNo || '',
        designation: userData.title || '',
        department: userData.department || '',
        joinDate:userData.joinDate,
        role: userData.role || 'employee',
        bio: userData.about || '',
        teams: userData.teams || [],
        skills: (userData.skills || []).map((skill, idx) => ({ id: idx + 1, name: skill })),
        profilePic: userData.profilePic || '/api/placeholder/400/400', 
      };

      setProfile(transformedData);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };
  const updateProfile = async (updatedData) => {
    try {
      const formData = new FormData();

      
      
      if (updatedData.name) formData.append("name", updatedData.name);
      if (updatedData.email) formData.append("email", updatedData.email);
      if (updatedData.phone) formData.append("contactNo", updatedData.phone);
      if (updatedData.bio) formData.append("about", updatedData.bio);
      if (updatedData.designation) formData.append("title", updatedData.designation);
      if (updatedData.department) formData.append("department", updatedData.department);
      if (updatedData.teams) formData.append("teams", JSON.stringify(updatedData.teams));
  
      if (updatedData.skills && updatedData.skills.length > 0) {
        const skills = updatedData.skills.map((skill) =>
          typeof skill === "string" ? skill : skill.name
        );
        formData.append("skills", JSON.stringify(skills));
      }
  
      
      if (updatedData.profilePicFile instanceof File) {
        formData.append("profilePic", updatedData.profilePicFile);
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      console.log("Payload (FormData) being sent to backend:", formData);
  
      await axios.patch("http://localhost:5000/profile/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };
  
  



  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};
