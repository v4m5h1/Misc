import React from 'react';

const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    success: 'bg-green-500 hover:bg-green-600',
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-teal-500 hover:bg-teal-600',
    light: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    dark: 'bg-gray-800 hover:bg-gray-900',
};

const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    lg: 'px-6 py-3 text-lg',
    md: 'px-4 py-2', // default medium size
};

const CustomButton = ({
    label,
    onClick,
    type = 'button',
    customStyles = '',
    disabled = false,
    variant = 'primary',
    size = 'md',
    block = false, // for full-width buttons
    active = false, // to handle active state
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-md w-full font-bold flex items-center justify-center text-white transition duration-300 ease-in-out
                ${disabled ? 'bg-gray-400 cursor-not-allowed' : variantStyles[variant]}
                ${sizeStyles[size]} ${block ? 'w-full' : ''}
                ${active ? 'opacity-90' : ''}
                ${customStyles}`}
        >
            {label}
        </button>
    );
};

export default CustomButton;
