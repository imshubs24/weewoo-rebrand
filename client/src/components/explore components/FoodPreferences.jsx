

const FoodPreferences = ({ foodOptions, foodTypes }) => {
    return (
        <>
            <div className='w-80 min-h-full h-auto border-r border-black p-2'>
                <div className="flex flex-col gap-y-5 fixed z-10">
                    <h1 className='text-xl'>Food Preferences</h1>
                    <div className='flex flex-col text-lg select-none'>
                        {
                            foodTypes.map((foodType, index) => (
                                <label key={index} className='flex gap-x-2'>
                                    <input type="checkbox" value={foodType.title} className='w-4' />
                                    {foodType.title}
                                </label>
                            ))
                        }
                    </div>
                    <div className='flex flex-col text-lg select-none'>
                        {
                            foodOptions.map((o, index) => (
                                <label key={index} className='flex gap-x-2'>
                                    <input type="checkbox" value={o.option} className='w-4' />
                                    {o.option}
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
