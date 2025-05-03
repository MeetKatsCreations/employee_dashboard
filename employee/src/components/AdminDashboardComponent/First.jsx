import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import dashboard_image from "../../assets/dashboard_image.jpg"
const First = () => {
    const { user } = useAuth();
    return (
        <div className="max-w-sm mx-4 mt-4  bg-white rounded-2xl shadow-lg overflow-hidden h-[410px]  w-[200px] sm:w-[300px]">
            <div className="h-48 w-full">
                <img
                    src={dashboard_image}
                    alt="Card Image"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className='text-lg text-orange-600'>Hello,{user.name || "Admin"}!</h2>
                <h3 className="text-sm sm:text-lg font-semibold mt-2 text-gray-800 ">The journey to success begins today,
                    With every small task you complete.
                    Don’t wait for the perfect moment,
                    Create it with each step you take</h3>
            </div>
        </div>
    );
};

export default First;
