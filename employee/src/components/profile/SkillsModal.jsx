import { X, Check } from 'lucide-react';

const SkillsModal = ({ 
  availableSkills, 
  editableProfile, 
  selectedSkills, 
  toggleSkillSelection, 
  addSelectedSkills, 
  closeModal 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={closeModal}>

      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      <div 
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md border border-gray-200 relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Add Skills</h3>
          <button 
            onClick={closeModal}
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
                    className="flex items-center p-2 hover:bg-orange-50/70 rounded cursor-pointer"
                    onClick={() => toggleSkillSelection(skill)}
                  >
                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                      selectedSkills.some(s => s.id === skill.id) 
                        ? 'bg-orange-500 border-orange-500' 
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
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 hover:cursor-pointer hover:text-black"
          >
            Cancel
          </button>
          <button 
            onClick={addSelectedSkills}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-300 hover:cursor-pointer hover:text-black disabled:bg-orange-300"
            disabled={selectedSkills.length === 0}
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;
