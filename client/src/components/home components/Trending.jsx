import { useState } from 'react';
import sample from '../../assets/trending-food/burger.png'

const Trending = () => {

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const items = [
        { name: 'Burger', price: 12.00 },
        { name: 'Burger', price: 12.00 },
        { name: 'Burger', price: 12.00 },
        { name: 'Burger', price: 12.00 },
        { name: 'Burger', price: 12.00 },
        { name: 'Burger', price: 12.00 }
    ];

    const categories = [
        { name: 'DAILY' },
        { name: 'WEEKLY' },
        { name: 'MONTHLY' },
    ]

    return (
        <div className="min-h-dvh h-auto border-black w-[75%] flex flex-col items-center gap-y-10 select-none">
            <div id="trending-title" className="flex">
                <h1 className="text-6xl font-medium mt-20">TRENDING FOOD</h1>
            </div>
            <div id="trending-category" className="flex gap-x-14 font-semibold text-slate-500 relative">
                {categories.map((category, index) => (
                    <p key={index} className="cursor-pointer relative group">
                        {category.name}
                        <span
                            className="absolute w-full h-1 bg-red-500 left-0 -bottom-2 z-10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-linear">
                        </span>
                    </p>
                ))}
                <span className="absolute w-full h-1 bg-gray-200 -bottom-2"></span>
            </div>
            <div id="trending-items" className="w-full h-full mt-5 select-text px-40 max-xl:px-12 max-lg:px-2">
                <div className="grid grid-cols-3 place-items-center font-semibold">
                    {items.map((item, index) => (
                        <div key={index}
                            className={`flex flex-col gap-y-1 items-center ${hoveredIndex === index ? '-translate-y-12 shadow-xl' : ''} duration-200 ease-linear group relative w-11/12 h-auto pb-5`}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src={sample} alt="sample.jpg" className='size-60' />
                            <p className='text-lg text-slate-700'>{item.name}</p>
                            <p className='text-red-500'>$<span>{item.price.toFixed(2)}</span></p>
                            <div className={`flex flex-col gap-y-2 items-center justify-center text-base select-none`}>
                                <p className='opacity-0 group-hover:opacity-100 duration-300 py-1 px-2 flex items-center justify-center text-slate-700 gap-x-1 text-sm' >
                                    <span className='border border-red-500 hover:bg-red-500 hover:text-white px-2 py-1 cursor-pointer'>-</span>
                                    <span className='px-2 py-1'>0</span>
                                    <span className='border border-red-500 hover:bg-red-500 hover:text-white px-2 py-1 cursor-pointer'>+</span>
                                </p>
                                <p className='opacity-0 group-hover:opacity-100 duration-300 border border-red-500 py-2 px-4 cursor-pointer hover:bg-red-500 hover:text-white rounded-full'>ADD TO CART</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trending;
