export const CustomRadioGroup = ({ label, options, selectedValue, onChange }) => {
    return (
        <div className="w-full my-2">
            {/* Group Label */}
            {label && (
                <label className="block mb-2 text-base text-black">
                    {label} <span style={{ color: 'red' }}>*</span>
                </label>
            )}

            <div className="space-y-1.5">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            type="radio"
                            id={option.value}
                            name="customRadioGroup" // Ensure all radios belong to the same group
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={() => onChange(option.value)} // Pass the option value
                            className="w-4 h-5 mr-2 text-black focus:ring-sec"
                        />
                        <label htmlFor={option.value} className="text-base text-black">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
