"use client";

import React, { useState } from 'react';

interface ToggleSwitchProps {
  id?: string;
  defaultState?: boolean;
  onChange?: (isOn: boolean) => void;
  className?: string;
}

export default function ToggleSwitch({ 
  id = 'toggle-switch',
  defaultState = false,
  onChange,
  className = ''
}: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(defaultState);

  
  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onChange?.(newState);
  };

  return (
    <div 
      id={id} 
      className={`toggle-x ${isOn ? 'on' : 'off'} ${className}`}
      onClick={handleToggle}
    >
      <span></span>
    </div>
  );
} 