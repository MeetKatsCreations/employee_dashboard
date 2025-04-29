const AboutSection = ({ bio, isEditing, handleInputChange }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={bio}
            onChange={handleInputChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-gray-700">{bio}</p>
        )}
      </div>
    );
  };
  
  export default AboutSection;