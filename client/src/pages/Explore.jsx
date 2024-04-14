import { useEffect, useState } from 'react';
import sample from '../assets/trending-food/burger.png'
import FoodPreferences from '../components/explore components/FoodPreferences';
import { useCart } from '../hooks/CartContext';

const Explore = () => {

    const { addToCart } = useCart();
    const [search, setSearch] = useState('');
    const [foodItems, setFoodItems] = useState([]);
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch('http://127.0.0.1:4000/api/food/getallfooditems', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`)
                return;
            }
            const data = await response.json();
            setFoodItems(data.foodItems);
        } catch (error) {
            console.error('Error: ', error);
        }

    };

    useEffect(() => {
        loadData();
    }, []);

    const foodOptions = [
        { option: 'Pizza' },
        { option: 'Burger' },
        { option: 'Indian' },
        { option: 'Dessert' },
    ]

    const foodTypes = [
        { title: 'Veg' },
        { title: 'Non-veg' },
    ]

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);
        const filteredItems = foodItems.filter(item => item.name.toLowerCase().includes(searchTerm));
        setFilteredFoodItems(filteredItems);
    };

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    // scroll windows to top whenver switched to new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <div className='min-h-96 h-auto w-full flex relative'>
                <FoodPreferences foodOptions={foodOptions} foodTypes={foodTypes} />
                <div className='min-h-dvh w-4/5 mx-auto py-2 flex flex-col gap-y-4'>
                    <div className='flex justify-center'>
                        <input
                            type="search"
                            placeholder='Search food...'
                            className='border border-black w-1/2 text-xl p-2 rounded-md outline-none'
                            onChange={handleSearch}
                            value={search} />
                    </div>
                    {
                        foodItems.length !== 0
                            ? <div className='w-auto grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 gap-y-10 gap-x-10'>
                                {
                                    (search ? filteredFoodItems : foodItems).map((item, index) => (
                                        <div key={index} className='shadow-xl border border-gray-200 h-[27rem] w-80 flex flex-col p-2 justify-start cursor-pointer'>
                                            <div className='flex justify-between'>
                                                <i className={`fa-solid fa-circle ${item.type ? 'text-green-700 border-green-700' : 'text-red-700 border-red-700'} border-2  flex items-center justify-center px-1`}></i>
                                                <p id='rating'><i className="fa-solid fa-star text-yellow-500"></i> {item.rating}</p>
                                            </div>
                                            <img src={sample} alt="sample.jpg" className='max-h-48 h-48 select-none self-center' />
                                            <div className='flex flex-col items-center gap-y-4 text-center'>
                                                <h1 className='font-medium text-lg text-slate-700'>{item.name}</h1>
                                                <p id='explore-item-desc' className='text-sm text-gray-500 px-5'>{item.description}</p>
                                                <p id='explore-item-price' className=''><span>&#x20B9;</span> {item.price}</p>
                                                <p className='border border-red-500 py-2 px-4 cursor-pointer hover:bg-red-500 hover:text-white duration-200 rounded-full select-none' onClick={() => handleAddToCart(item)}>ADD TO CART</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            : <div className='self-center w-12 h-12 border-8 border-t-white border-red-500 rounded-full animate-spin'></div>
                    }
                </div>
            </div>
        </>
    )
}

export default Explore
