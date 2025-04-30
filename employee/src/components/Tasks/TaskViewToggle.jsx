import React from 'react';

const TaskViewToggle = ({ toggleView }) => {
  return (
    <div className="view-toggle ">
      <button onClick={() => toggleView('card')} className="view-button p-4 cursor-pointer">
        Card View
      </button>
      <button onClick={() => toggleView('list')} className="view-button cursor-pointer">
        List View
      </button>
    </div>
  );
};

export default TaskViewToggle;
