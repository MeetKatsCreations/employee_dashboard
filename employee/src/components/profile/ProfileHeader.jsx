import { Edit, Save, X } from 'lucide-react';

const ProfileHeader = ({ isEditing, saveChanges, cancelEdit, setIsEditing }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Employee Profile</h1>
      <div>
        {isEditing ? (
          <div className="flex space-x-3">
            <button
              onClick={cancelEdit}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 hover:cursor-pointer"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
            <button
              onClick={saveChanges}
              className="flex items-center px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 hover:cursor-pointer"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500"
          >
            <Edit size={16} className="mr-2" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
