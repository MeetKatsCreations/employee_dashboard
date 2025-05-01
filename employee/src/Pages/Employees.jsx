import React from 'react';
import { useEffect } from 'react';
import { useTasks } from '../Context/TaskContext';
import { toast } from 'react-toastify';

const EmployeeList = () => {
    const { employees, loading,deleteEmployee ,fetchEmployees} = useTasks();
    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            const response = await deleteEmployee(id);
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        }
    };
    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">List of Employees</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {employees.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No employees found.</p>
                ) : (
                    employees.map((emp) => (
                        <div
                            key={emp._id}
                            className="bg-white rounded-2xl shadow-md  flex flex-col items-center text-center border-2 border-orange-200 min-h-min mt-4"
                        >
                           
                            <div className="w-full bg-orange-50 flex items-center flex-col rounded-t-2xl py-4">
                                
                                <h3 className="text-lg font-semibold">{emp.name}</h3>
                                <img
                                    src={emp.profilePic || 'https://via.placeholder.com/100'}
                                    alt={emp.name}
                                    className="w-24 h-24 rounded-full mt-4 object-cover border-2 border-amber-200"
                                />
                            </div>

                            <div className="flex flex-wrap w-full mt-6 p-4">
                                <div className="flex justify-between w-full h-12">
                                    <p className="text-md font-bold">Location</p>
                                    <p className="text-sm text-gray-600">{emp.location || 'N/A'}</p>
                                </div>
                                <div className="flex justify-between w-full h-12">
                                    <p className="text-md font-bold">Birthday</p>
                                    <p className="text-sm text-gray-600">{emp.Birthday || 'N/A'}</p>
                                </div>
                                <div className="flex justify-between w-full h-12">
                                    <p className="text-md font-bold">Department</p>
                                    <p className="text-sm text-gray-600">{emp.department || 'N/A'}</p>
                                </div>
                                <div className="flex justify-between w-full h-12">
                                    <p className="text-md font-bold">Contact</p>
                                    <p className="text-sm text-gray-600">{emp.contactNo || 'N/A'}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">📧 {emp.email || 'N/A'}</p>
                            <button
                                onClick={() => handleDelete(emp._id)}
                                className="mb-4 mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
