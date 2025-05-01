import React from 'react';

const AdditionalInfoSection = ({ profile,editableProfile, isEditing, handleInputChange }) => {
    console.log("AdditionalInfoSection profile:", profile);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-700">Additional Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Work Type</label>
                    {isEditing ? (
                        <select
                            name="type"
                            value={editableProfile?.type || ''}
                            onChange={handleInputChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select</option>
                            <option value="wfh">WFH</option>
                            <option value="wfo">WFO</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    ) : (
                        <p className="text-gray-800">{profile?.type || 'N/A'}</p>
                    )}
                </div>

            
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Birthday</label>
                    {isEditing ? (
                        <input
                            type="date"
                            name="birthday"
                            value={
                                editableProfile?.birthday
                                    ? new Date(editableProfile.birthday).toISOString().split('T')[0]
                                    : ''
                            }
                            onChange={handleInputChange}
                            className="w-full border rounded px-3 py-2"
                        />

                    ) : (
                        <p className="text-gray-800">{profile?.birthday ? new Date(profile?.birthday).toLocaleDateString() : 'N/A'}
                        </p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="location"
                            value={editableProfile?.location || ''}
                            onChange={handleInputChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    ) : (
                        <p className="text-gray-800">{profile?.location || 'N/A'}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfoSection;
