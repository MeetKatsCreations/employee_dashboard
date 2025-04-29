import { Award, Plus, X } from 'lucide-react';
const SkillsSection = ({ skills, isEditing, removeSkill, openSkillsModal }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Award size={20} className="text-orange-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Skills & Expertise</h3>
        </div>
        
        {isEditing && (
          <button 
            onClick={openSkillsModal}
            className="flex items-center text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
          >
            <Plus size={14} className="mr-1" /> Add Skills
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className={`px-4 py-2 rounded-lg flex items-center ${
              isEditing ? 'bg-orange-50 pr-2' : 'bg-gray-100'
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
        
        {skills.length === 0 && (
          <p className="text-gray-500 italic">No skills added yet</p>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;