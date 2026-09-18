import { useEffect, useState } from "react";
import sample from "../assets/trending-food/burger.png";
import sample2 from "../assets/trending-food/pizza.png";
import FoodPreferences from "../components/explore/FoodPreferences.jsx";
import { useCart } from "../context/CartContext";
import { ToastContainer } from "react-toastify";
import Spinner from "../components/common/Spinner.jsx";
import api from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Explore = () => {

    const { cartItems, addToCart } = useCart();

    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const loadFoodItems = async () => {
        try {
            const response = await api.get("/api/food");
            setFoodItems(response.data.foodItems);
        } catch (error) {
            console.error('Failed to load food items: ', error);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await api.get("/api/category");
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Failed to load categories: ', error);
        }
    };

    useEffect(() => {
        loadFoodItems();
        loadCategories();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
    };

    const filteredFoodItems = foodItems.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(item.category?.category);

        return matchesSearch && matchesCategory;
    });

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    // scroll windows to top whenver switched to new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"
            />

            <div className="min-h-96 h-auto w-full flex relative">
                <FoodPreferences
                    foodOptions={categories}
                    onOptionsChange={handleCategoryChange}
                />

                <div className="min-h-dvh w-4/5 mx-auto py-2 flex flex-col gap-y-4 max-xl:w-[98%] max-md:w-full">

                    <div className="flex justify-center">
                        <input
                            type="search"
                            placeholder="Search food..."
                            className="border border-black w-1/2 text-xl p-2 rounded-md outline-none"
                            onChange={handleSearch}
                            value={search}
                        />
                    </div>

                    {foodItems.length === 0 ? (
                        <Spinner />
                    ) : filteredFoodItems.length === 0 ? (
                        <div className="flex justify-center items-center py-20">
                            <p className="text-xl text-gray-500">
                                No food items found.
                            </p>
                        </div>
                    ) : (
                        <div className="w-auto grid grid-cols-4 max-2xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:px-1 gap-y-5 gap-x-5 max-xl:gap-x-3">

                            {filteredFoodItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="shadow-xl border border-gray-200 h-[30rem] w-80 max-xl:w-full flex flex-col p-2 gap-y-2 justify-start"
                                >
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-500 capitalize">
                                            {item.category?.category}
                                        </p>

                                        <p className="text-sm">
                                            {item.isAvailable
                                                ? "Available"
                                                : "Unavailable"}
                                        </p>
                                    </div>

                                    <img
                                        src={
                                            item.category?.category === "burger"
                                                ? sample
                                                : sample2
                                        }
                                        alt={item.name}
                                        className="max-h-48 h-48 select-none self-center"
                                    />

                                    <div className="flex flex-col items-center gap-y-4 text-center">
                                        <h1 className="font-medium text-lg text-slate-700">
                                            {item.name}
                                        </h1>

                                        <p className="text-sm text-gray-500 px-5 h-16">
                                            {item.description}
                                        </p>

                                        <p>
                                            <span>&#x20B9;</span>{" "}
                                            {item.price}
                                        </p>

                                        {cartItems.some(
                                            (cartItem) =>
                                                cartItem.id === item._id
                                        ) ? (
                                            <p className="border border-red-500 py-2 px-4 cursor-pointer hover:bg-red-500 hover:text-white duration-200 rounded-full select-none">
                                                <i className="fa-solid fa-check"></i>
                                            </p>
                                        ) : (
                                            <p
                                                className="border border-red-500 py-2 px-4 cursor-pointer hover:bg-red-500 hover:text-white duration-200 rounded-full select-none"
                                                onClick={() =>
                                                    handleAddToCart(item)
                                                }
                                            >
                                                ADD TO CART
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Explore
