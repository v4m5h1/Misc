import React, { useState } from 'react';

const ToggleSwitch = ({ isChecked, onToggle }) => {
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only" // Hide the default checkbox
                    checked={isChecked}
                    onChange={onToggle}
                />
                <div className={`block w-14 h-6 bg-gray-300 ${isChecked ? 'bg-primary' : 'bg-gray-200'} rounded-full`}></div>
                <div
                    className={`absolute left-1 top-1 w-6 h-4 rounded-full transition-transform duration-200 ease-in-out ${isChecked ? 'transform translate-x-full bg-gray-400' : 'bg-white'
                        }`}
                ></div>
            </div>
        </label>
    );
};

export default ToggleSwitch;
