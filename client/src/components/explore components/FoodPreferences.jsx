import { useState } from "react";

const FoodPreferences = ({ foodOptions, foodTypes, onFoodTypesChange, onOptionsChange }) => {

    const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleFoodTypeChange = (event) => {
        const { value, checked } = event.target;
        const updatedFoodTypes = checked ? [...selectedFoodTypes, value] : selectedFoodTypes.filter(item => item !== value);
        setSelectedFoodTypes(updatedFoodTypes);
        onFoodTypesChange(updatedFoodTypes); // Callback to parent component
    };

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;
        const updatedOptions = checked ? [...selectedOptions, value] : selectedOptions.filter(item => item !== value);
        setSelectedOptions(updatedOptions);
        onOptionsChange(updatedOptions); // Callback to parent component
    };

    return (
        <>
            <div className='w-80 min-h-full h-auto border-r border-black p-2'>
                <div className="flex flex-col gap-y-5 fixed z-10">
                    <h1 className='text-xl'>Food Preferences</h1>
                    <div className='flex flex-col text-lg select-none'>
                        {
                            foodTypes.map((foodType, index) => (
                                <label key={index} className='flex gap-x-2'>
                                    <input type="checkbox"
                                        value={foodType.title}
                                        className='w-4'
                                        onChange={handleFoodTypeChange}
                                        checked={selectedFoodTypes.includes(foodType.title)}
                                    />
                                    {foodType.title.charAt(0).toUpperCase() + foodType.title.slice(1)}
                                </label>
                            ))
                        }
                    </div>
                    <div className='flex flex-col text-lg select-none'>
                        {
                            foodOptions.map((o, index) => (
                                <label key={index} className='flex gap-x-2'>
                                    <input
                                        type="checkbox"
                                        value={o.option}
                                        className='w-4'
                                        onChange={handleOptionChange}
                                        checked={selectedOptions.includes(o.option)}
                                    />
                                    {o.option.charAt(0).toUpperCase() + o.option.slice(1)}
                                </label>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodPreferences
