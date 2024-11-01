import { useState } from 'react';

function ToggleButton() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`
        px-6 py-3 rounded-lg font-semibold transition-colors duration-200
        ${isActive 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
      `}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}

export default ToggleButton;