import { useState } from 'react';
import sample from '../../assets/trending-food/burger.png'
import { useCart } from '../../context/CartContext';

const Trending = () => {

    const { addToCart } = useCart();

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [active, setActive] = useState('daily');

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleClick = (item) => {
        const lowerCaseItem = item.toLowerCase();
        setActive(lowerCaseItem);
    };

    const handleAddToCart = (item) => {
        console.log(item);
        addToCart(item);
    }

    const items = [
        { name: 'Classic Cheeseburger', price: 120 },
        { name: 'Bacon Avocado Burger', price: 160 },
        { name: 'Spicy Jalapeno Burger', price: 130 },
        { name: 'BBQ Ranch Burger', price: 150 },
        { name: 'Mushroom Swiss Burger', price: 145 },
        { name: 'Truffle Brie Burger', price: 160 }
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
                    <p key={index} className="cursor-pointer relative group" onClick={() => handleClick(category.name)}>
                        {category.name}
                        <span
                            className={` ${category.name.toLowerCase() === active ? 'scale-x-100' : 'scale-x-0'} absolute w-full h-1 bg-red-500 left-0 -bottom-2 z-10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-linear`}>
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
                            <p className='text-red-500'><span>&#x20B9;</span>{item.price}</p>
                            <div className={`flex flex-col gap-y-2 items-center justify-center text-base select-none`}>
                                <p className='opacity-0 group-hover:opacity-100 duration-300 border border-red-500 py-2 px-4 cursor-pointer hover:bg-red-500 hover:text-white rounded-full' onClick={() => handleAddToCart(item)}>ADD TO CART</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trending;
