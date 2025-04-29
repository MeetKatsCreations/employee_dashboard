import { Building, Mail, Phone, User, Edit } from 'lucide-react';

const ProfileCard = ({
  profile,
  editableProfile,
  isEditing,
  handleProfilePicChange,
  handleInputChange,
  availableDesignations
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-300 rounded-xl shadow-md overflow-hidden">
      
        <div className="relative w-full h-48 bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300">
          <div className="absolute left-0 right-0 -bottom-16 flex justify-center">
            <div className="relative">
              <img
                src={
                  isEditing
                    ? editableProfile.profilePic
                    : profile.profilePic
                      ? `${profile.profilePic}?${new Date().getTime()}`
                      : "/default-profile.png"
                }
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
              <span className="text-gray-700">
                Member since {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }) : 'N/A'}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;