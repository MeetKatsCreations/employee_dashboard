// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Users, Briefcase, Award, Edit, Save, X, Plus, Check } from 'lucide-react';

const Profile = () => {
  // State for view/edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // State for modals
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  
  // Available designations for dropdown
  const availableDesignations = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager",
    "QA Engineer",
    "DevOps Engineer",
    "Data Scientist",
    "Project Manager",
    "Technical Lead",
    "Senior Frontend Developer",
    "Senior Backend Developer",
    "Senior Full Stack Developer"
  ];
  
  // Available skills for selection
  const availableSkills = [
    { id: "s1", name: "React" },
    { id: "s2", name: "Angular" },
    { id: "s3", name: "Vue.js" },
    { id: "s4", name: "JavaScript" },
    { id: "s5", name: "TypeScript" },
    { id: "s6", name: "HTML/CSS" },
    { id: "s7", name: "Node.js" },
    { id: "s8", name: "Express" },
    { id: "s9", name: "MongoDB" },
    { id: "s10", name: "SQL" },
    { id: "s11", name: "PostgreSQL" },
    { id: "s12", name: "GraphQL" },
    { id: "s13", name: "Docker" },
    { id: "s14", name: "Kubernetes" },
    { id: "s15", name: "AWS" },
    { id: "s16", name: "Git" },
    { id: "s17", name: "Tailwind CSS" },
    { id: "s18", name: "Redux" },
    { id: "s19", name: "Jest" },
    { id: "s20", name: "Python" }
  ];
  
  // State for user profile data
  const [profile, setProfile] = useState({
    id: "emp123",
    name: "Aman Yadav",
    email: "aman.yadav@company.com",
    phone: "000000000000",
    designation: "Senior Frontend Developer",
    department: "Engineering",
    joinDate: "2021-05-15",
    location: "Kanpur",
    profilePic: "/api/placeholder/400/400", // Placeholder for profile image
    bio: "I am the best",
    teams: [
      { id: 1, name: "Web Platform Team", period: "Jan 2023 - Present", role: "Lead Developer" },
      { id: 2, name: "Customer Dashboard Project", period: "May 2022 - Dec 2022", role: "Frontend Developer" },
      { id: 3, name: "Mobile App Redesign", period: "Jun 2021 - Apr 2022", role: "UI Developer" }
    ],
    skills: [
      { id: 1, name: "React" },
      { id: 2, name: "JavaScript" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "HTML/CSS" },
      { id: 5, name: "Tailwind CSS" },
      { id: 6, name: "Redux" }
    ]
  });

  // Copy of profile data for editing
  const [editableProfile, setEditableProfile] = useState({...profile});
  
  // State for selected skills in the modal
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Reset editable profile when toggling to edit mode
  useEffect(() => {
    if (isEditing) {
      setEditableProfile({...profile});
    }
  }, [isEditing, profile]);
  
  // Initialize selected skills when opening the modal
  useEffect(() => {
    if (showSkillsModal) {
      // Reset selected skills when opening modal
      setSelectedSkills([]);
    }
  }, [showSkillsModal]);

  // Function to handle editable profile changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({
      ...editableProfile,
      [name]: value
    });
  };

  // Function to save profile changes
  const saveChanges = () => {
    // Here you would typically call an API to update the user profile
    // For this example, we'll just update the local state
    
    // BACKEND API CALL WOULD GO HERE:
    // axios.put('/api/employees/profile', editableProfile)
    //   .then(response => {
    //     setProfile(response.data);
    //     setIsEditing(false);
    //   })
    //   .catch(error => console.error('Error updating profile:', error));
    
    setProfile(editableProfile);
    setIsEditing(false);
  };

  // Function to handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this file to your server
      // and update the profilePic URL accordingly
      
      // For demonstration, we'll just use a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableProfile({
          ...editableProfile,
          profilePic: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
  };
  
  // Function to remove a skill
  const removeSkill = (skillId) => {
    setEditableProfile({
      ...editableProfile,
      skills: editableProfile.skills.filter(skill => skill.id !== skillId)
    });
  };
  
  // Function to toggle skill selection in the modal
  const toggleSkillSelection = (skill) => {
    if (selectedSkills.some(s => s.id === skill.id)) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  // Function to add selected skills and close modal
  const addSelectedSkills = () => {
    // Get existing skill names
    const existingSkillNames = editableProfile.skills.map(s => s.name);
    
    // Filter out skills that already exist
    const newSkills = selectedSkills.filter(skill => !existingSkillNames.includes(skill.name));
    
    if (newSkills.length > 0) {
      // Get the highest ID currently used
      const highestId = Math.max(0, ...editableProfile.skills.map(s => s.id));
      
      // Create new skill objects with unique IDs
      const skillsToAdd = newSkills.map((skill, index) => ({
        id: highestId + index + 1,
        name: skill.name
      }));
      
      // Add new skills to the profile
      setEditableProfile({
        ...editableProfile,
        skills: [...editableProfile.skills, ...skillsToAdd]
      });
    }
    
    // Close the modal
    setShowSkillsModal(false);
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header with edit/save buttons */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Employee Profile</h1>
        <div>
          {isEditing ? (
            <div className="flex space-x-3">
              <button
                onClick={cancelEdit}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <X size={16} className="mr-2" />
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit size={16} className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Picture */}
            <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-blue-700">
              <div className="absolute left-0 right-0 -bottom-16 flex justify-center">
                <div className="relative">
                  <img 
                    src={isEditing ? editableProfile.profilePic : profile.profilePic} 
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                  {isEditing && (
                    <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700">
                      <Edit size={16} className="text-white" />
                      <input
                        type="file"
                        id="profilePic"
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 pb-8 px-6 text-center">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editableProfile.name}
                  onChange={handleInputChange}
                  className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-center w-full"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
              )}
              
              {isEditing ? (
                <div className="mt-1">
                  <select
                    name="designation"
                    value={editableProfile.designation}
                    onChange={handleInputChange}
                    className="text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none text-center w-full bg-transparent"
                  >
                    {availableDesignations.map((designation, index) => (
                      <option key={index} value={designation}>{designation}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="text-gray-600 mt-1">{profile.designation}</p>
              )}
              
              <div className="mt-6">
                <div className="flex items-center justify-center">
                  <Building size={18} className="text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={editableProfile.department}
                      onChange={handleInputChange}
                      className="text-gray-700 border-b border-gray-300 focus:border-blue-500 outline-none w-full"
                    />
                  ) : (
                    <span className="text-gray-700">{profile.department}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-center mt-2">
                  <Mail size={18} className="text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editableProfile.email}
                      onChange={handleInputChange}
                      className="text-gray-700 border-b border-gray-300 focus:border-blue-500 outline-none w-full"
                    />
                  ) : (
                    <span className="text-gray-700">{profile.email}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-center mt-2">
                  <Phone size={18} className="text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={editableProfile.phone}
                      onChange={handleInputChange}
                      className="text-gray-700 border-b border-gray-300 focus:border-blue-500 outline-none w-full"
                    />
                  ) : (
                    <span className="text-gray-700">{profile.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-center mt-2">
                  <User size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">Member since {new Date(profile.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Bio, Teams and Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={editableProfile.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </div>

          {/* Teams Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Users size={20} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Teams & Projects</h3>
            </div>
            
            <div className="space-y-4">
              {(isEditing ? editableProfile.teams : profile.teams).map((team) => (
                <div key={team.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{team.name}</h4>
                    <p className="text-sm text-gray-600">{team.period}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {team.role}
                    </span>
                  </div>
                </div>
              ))}

              {/* In a real app, you would have UI for adding/removing teams when in edit mode */}
              {isEditing && (
                <div className="text-center mt-4">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto">
                    <Plus size={16} className="mr-1" /> Add Team
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Award size={20} className="text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Skills & Expertise</h3>
              </div>
              
              {isEditing && (
                <button 
                  onClick={() => setShowSkillsModal(true)}
                  className="flex items-center text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Plus size={14} className="mr-1" /> Add Skills
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              {(isEditing ? editableProfile.skills : profile.skills).map((skill) => (
                <div 
                  key={skill.id} 
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    isEditing ? 'bg-blue-50 pr-2' : 'bg-gray-100'
                  }`}
                >
                  <span className="text-gray-800 font-medium">{skill.name}</span>
                  
                  {isEditing && (
                    <button 
                      onClick={() => removeSkill(skill.id)}
                      className="ml-2 p-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              
              {(isEditing ? editableProfile.skills : profile.skills).length === 0 && (
                <p className="text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Morphic Skills Selection Modal */}
      {showSkillsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setShowSkillsModal(false)}>
          {/* Backdrop with blur effect - clicking this will close the modal */}
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          
          {/* Modal content - stopPropagation prevents clicks from closing modal when clicking inside it */}
          <div 
            className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md border border-gray-200 relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Skills</h3>
              <button 
                onClick={() => setShowSkillsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Select skills to add to your profile:</p>
              
              <div className="max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg bg-white/80">
                <div className="space-y-2">
                  {availableSkills
                    .filter(skill => !editableProfile.skills.some(s => s.name === skill.name))
                    .map(skill => (
                      <div 
                        key={skill.id} 
                        className="flex items-center p-2 hover:bg-blue-50/70 rounded cursor-pointer"
                        onClick={() => toggleSkillSelection(skill)}
                      >
                        <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                          selectedSkills.some(s => s.id === skill.id) 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedSkills.some(s => s.id === skill.id) && (
                            <Check size={14} className="text-white" />
                          )}
                        </div>
                        <span>{skill.name}</span>
                      </div>
                    ))
                  }
                  
                  {availableSkills.filter(skill => !editableProfile.skills.some(s => s.name === skill.name)).length === 0 && (
                    <p className="text-gray-500 italic text-center py-4">All available skills have been added</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowSkillsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={addSelectedSkills}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={selectedSkills.length === 0}
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;