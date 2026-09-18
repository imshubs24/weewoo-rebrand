import { useState } from "react";

const FoodPreferences = ({ foodOptions, onOptionsChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;

        const updatedOptions = checked
            ? [...selectedOptions, value]
            : selectedOptions.filter((item) => item !== value);

        setSelectedOptions(updatedOptions);
        onOptionsChange(updatedOptions);
    };

    return (
        <div className="w-64 min-h-full h-auto border-r border-black p-2 max-xl:hidden">
            <div className="flex flex-col gap-y-5 fixed z-10">

                <h1 className="text-xl">
                    Food Preferences
                </h1>

                <div className="flex flex-col text-lg select-none">
                    {foodOptions.map((option) => (
                        <label
                            key={option._id}
                            className="flex gap-x-2"
                        >
                            <input
                                type="checkbox"
                                value={option.category}
                                onChange={handleOptionChange}
                                checked={selectedOptions.includes(option.category)}
                            />

                            {option.category.charAt(0).toUpperCase() + option.category.slice(1)}
                        </label>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FoodPreferences;