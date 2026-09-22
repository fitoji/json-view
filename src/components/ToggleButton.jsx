import { useState } from 'react';

function ToggleButton() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`
        px-6 py-3 rounded-lg font-semibold transition-colors duration-200
        ${isActive 
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}
      `}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}

export default ToggleButton;
