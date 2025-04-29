import { Users, Plus } from 'lucide-react';

const TeamsSection = ({ teams, isEditing }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-4">
        <Users size={20} className="text-orange-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Teams & Projects</h3>
      </div>

      <div className="space-y-4">
        {Array.isArray(teams) && teams.map((team) => (
          <div key={team.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">{team.name}</h4>
              <p className="text-sm text-gray-600">{team.period}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                {team.role}
              </span>
            </div>
          </div>
        ))}

        {isEditing && (
          <div className="text-center mt-4">
            <button className="text-orange-600 hover:text-black flex items-center justify-center mx-auto">
              <Plus size={16} className="mr-1" /> Add Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsSection;
