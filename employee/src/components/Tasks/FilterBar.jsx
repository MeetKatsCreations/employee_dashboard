import React from 'react';

const FilterBar = ({ handleFilterChange }) => {
  const statuses = ['all', 'not started', 'ongoing', 'completed'];

  return (
    <div className="flex md:items-center space-y-4 mt-24 md:mt-0 md:space-x-4 flex-col my-4 md:flex-row">
      {statuses.map((status) => {
        const label = status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1);
        return (
          <button
            key={status}
            onClick={() => handleFilterChange(status === 'all' ? '' : status)}
            className={`text-black px-4 py-2  w-32 p-y-2 rounded-full font-semibold shadow-sm hover:brightness-110 border-2 border-amber-500`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
