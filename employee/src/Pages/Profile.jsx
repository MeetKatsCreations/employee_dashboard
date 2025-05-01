import { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileCard from '../components/profile/ProfileCard';
import AboutSection from '../components/profile/AboutSection';
import TeamsSection from '../components/profile/TeamsSection';
import SkillsSection from '../components/profile/SkillsSection';
import SkillsModal from '../components/profile/SkillsModal';
import AdditionalInfoSection from '../components/profile/AdditionalInfoSection';
import { toast } from 'react-toastify'
const Profile = () => {
  const { profile, updateProfile, loading } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [editableProfile, setEditableProfile] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);


  useEffect(() => {
    if (isEditing && profile) {
      setEditableProfile({ ...profile });
    }
  }, [isEditing, profile]);


  useEffect(() => {
    if (showSkillsModal) {
      setSelectedSkills([]);
    }
  }, [showSkillsModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({
      ...editableProfile,
      [name]: value,
    });
  };

  const saveChanges = () => {
    const updatedFields = {};

    for (let key in editableProfile) {
      if (editableProfile[key] !== profile[key]) {
        updatedFields[key] = editableProfile[key];
      }
    }
    if (updatedFields.birthday) {
      const birthdayDate = new Date(updatedFields.birthday);
      if (birthdayDate > new Date()) {
        toast.error('Birthday cannot be in the future');
        return;
      }
    }
    if (updatedFields.location && updatedFields.location.trim().length === 0) {
      toast.error('Location cannot be empty');
      return;
    }
    if (editableProfile.profilePicFile) {
      updatedFields.profilePicFile = editableProfile.profilePicFile;
    }
    if (Object.keys(updatedFields).length > 0) {
      updateProfile(updatedFields);
    }

    setIsEditing(false);
  };


  const cancelEdit = () => {
    setIsEditing(false);
    setEditableProfile(profile);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableProfile((prev) => ({
          ...prev,
          profilePic: reader.result,
          profilePicFile: file,
        }));
        console.log("Updated profilePicFile:", file);
      };
      reader.readAsDataURL(file);
    }
  };



  const removeSkill = (skillId) => {
    setEditableProfile({
      ...editableProfile,
      skills: editableProfile.skills.filter((skill) => skill.id !== skillId),
    });
  };

  const toggleSkillSelection = (skill) => {
    if (selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const addSelectedSkills = () => {
    const existingSkillNames = editableProfile.skills.map((s) => s.name);
    const newSkills = selectedSkills.filter((skill) => !existingSkillNames.includes(skill.name));

    if (newSkills.length > 0) {
      const highestId = Math.max(0, ...editableProfile.skills.map((s) => s.id));
      const skillsToAdd = newSkills.map((skill, index) => ({
        id: highestId + index + 1,
        name: skill.name,
      }));

      setEditableProfile({
        ...editableProfile,
        skills: [...editableProfile.skills, ...skillsToAdd],
      });
    }

    setShowSkillsModal(false);
  };

  const availableSkills = [
    { id: 's1', name: 'React' },
    { id: 's2', name: 'Angular' },
    { id: 's3', name: 'Vue.js' },
    { id: 's4', name: 'JavaScript' },
    { id: 's5', name: 'TypeScript' },
    { id: 's6', name: 'HTML/CSS' },
    { id: 's7', name: 'Node.js' },
    { id: 's8', name: 'Express' },
    { id: 's9', name: 'MongoDB' },
    { id: 's10', name: 'SQL' },
    { id: 's11', name: 'PostgreSQL' },
    { id: 's12', name: 'GraphQL' },
    { id: 's13', name: 'Docker' },
    { id: 's14', name: 'Kubernetes' },
    { id: 's15', name: 'AWS' },
    { id: 's16', name: 'Git' },
    { id: 's17', name: 'Tailwind CSS' },
    { id: 's18', name: 'Redux' },
    { id: 's19', name: 'Jest' },
    { id: 's20', name: 'Python' },
  ];

  const availableDesignations = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Product Manager',
    'QA Engineer',
    'DevOps Engineer',
    'Data Scientist',
    'Project Manager',
    'Technical Lead',
    'Senior Frontend Developer',
    'Senior Backend Developer',
    'Senior Full Stack Developer',
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!profile) {
    return <div>Error: Profile data is not available</div>;
  }
  if (isEditing && !editableProfile) {
    return <div>Loading editable profile...</div>;
  }
  return (
    <div className='bg-orange-50 min-h-screen'>
      <div className="py-8 px-4 md:px-8 max-w-6xl mx-auto">
        <ProfileHeader
          isEditing={isEditing}
          saveChanges={saveChanges}
          cancelEdit={cancelEdit}
          setIsEditing={setIsEditing}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <ProfileCard
            profile={profile}
            editableProfile={editableProfile}
            isEditing={isEditing}
            handleProfilePicChange={handleProfilePicChange}
            handleInputChange={handleInputChange}
            availableDesignations={availableDesignations}
          />


          <div className="lg:col-span-2 space-y-6">
            <AboutSection
              bio={isEditing ? editableProfile?.bio ?? '' : profile?.bio ?? ''}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />

            {/* <TeamsSection
            teams={isEditing ? editableProfile?.teams ?? [] : profile?.teams ?? []}
            isEditing={isEditing}
          /> */}

            <SkillsSection
              skills={isEditing ? editableProfile.skills : profile.skills}
              isEditing={isEditing}
              removeSkill={removeSkill}
              openSkillsModal={() => setShowSkillsModal(true)}
            />
            <AdditionalInfoSection
              profile={profile}
              editableProfile={editableProfile}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>


        {showSkillsModal && (
          <SkillsModal
            availableSkills={availableSkills}
            editableProfile={editableProfile}
            selectedSkills={selectedSkills}
            toggleSkillSelection={toggleSkillSelection}
            addSelectedSkills={addSelectedSkills}
            closeModal={() => setShowSkillsModal(false)}
          />
        )}
      </div>
    </div>

  );
};

export default Profile;
