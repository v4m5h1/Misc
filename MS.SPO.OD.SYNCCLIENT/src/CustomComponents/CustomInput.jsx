import React from 'react';

const CustomInput = ({ label, value, onChange, error, placeholder, type = 'text', name }) => {
    return (
        <div className="flex flex-col w-full my-1.5">
            {label && (
                <label className="mb-1 text-base text-black">
                    {label} <span style={{ color: 'red' }}>*</span>
                </label>
            )}
            <div
                className={`flex items-center w-full bg-white px-4 justify-center rounded-md border ${error ? 'border-red-500' : 'border-gray-200'
                    } focus-within:border-black`}
            >
                <input
                    value={value} // Bind value directly
                    onChange={(e) => onChange({ target: { name, value: e.target.value } })} // Handle change with provided function
                    id={name} // Use name for id
                    type={type} // Use passed type or default to text
                    placeholder={placeholder}
                    className="flex-grow py-2 text-base text-black bg-white border-none shadow-none outline-none placeholder:text-primary_lite placeholder:font-light"
                />
            </div>
            {error && <div className="text-red-600">{error}</div>} {/* Show error message */}
        </div>
    );
};

export default CustomInput;
