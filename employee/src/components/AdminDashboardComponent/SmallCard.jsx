import React from 'react';

const SmallCard = ({ heading, count }) => {
  return (
    <div className="ml-6 sm:m-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md p-4  w-48 sm:w-72 h-32  mt-2 sm:mt-4 mb-4">
      <h3 className=" text-sm sm:text-md font-semibold text-orange-600">{heading}</h3>
      <p className="text-3xl font-bold mt-2 text-gray-800">{count}</p>
    </div>
  );
};

export default SmallCard;
