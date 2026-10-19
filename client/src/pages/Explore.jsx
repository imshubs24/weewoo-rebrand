import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Spinner from "../components/common/Spinner.jsx";
import api from "../services/api";

const Explore = () => {
    const { cartItems, addToCart } = useCart();

    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const limit = 12;

    // Fetch food items from the backend.
    // append = false means we are loading a fresh set of results.
    // append = true means we are loading the next page and adding the new items to the existing items.
    const loadFoodItems = async (pageNumber = 1, append = false) => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page: pageNumber,
                limit,
            });

            // Only add search to the request when the user has entered something.
            if (search.trim()) {
                params.append("search", search.trim());
            }

            // Only add category when one has been selected.
            if (selectedCategories.length > 0) {
                params.append("category", selectedCategories.join(","));
            }

            const response = await api.get(`/api/food?${params.toString()}`);

            const { foodItems: newFoodItems, pagination } = response.data;

            // For a new search/filter, replace the existing items.
            // For Load More, append the new items.
            setFoodItems((prev) =>
                append ? [...prev, ...newFoodItems] : newFoodItems
            );

            setHasMore(pagination.hasMore);
            setPage(pagination.page);
        } catch (error) {
            console.error("Failed to load food items:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await api.get("/api/category");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Failed to load food categories:", error);
        }
    };

    useEffect(() => {
        loadCategories();
        loadFoodItems(1, false);
    }, []);

    // Whenever search or category changes, start again from page 1.
    useEffect(() => {
        const timer = setTimeout(() => {
            loadFoodItems(1, false);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, selectedCategories]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    // Load the next page and append it to the existing food items.
    const handleLoadMore = () => {
        if (!loading && hasMore) {
            loadFoodItems(page + 1, true);
        }
    };

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    return (
        <>
            <main className="w-full bg-slate-50 min-h-screen">
                <section className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Explore WeeWoo</p>
                            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Find something delicious.</h1>
                            <p className="mt-3 text-slate-600">Browse our menu and discover your next favorite meal.</p>
                        </div>

                        <div className="mt-8 relative max-w-2xl">
                            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="search" placeholder="Search food..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition" />
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <button type="button" onClick={() => setSelectedCategories("")} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategories === "" ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                                All
                            </button>

                            {categories.map((category) => (
                                <button key={category._id} type="button" onClick={() => handleCategoryChange(category.category)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${selectedCategories.includes(category.category) ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                                    {category.category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {loading && foodItems.length === 0 ? (
                        <Spinner />
                    ) : foodItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <i className="fa-solid fa-utensils text-4xl text-slate-300"></i>
                            <h2 className="mt-4 text-xl font-semibold text-slate-800">No food items found</h2>
                            <p className="mt-2 text-slate-500">Try changing your search or category filter.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-slate-900">Our Menu</h2>
                                <p className="text-sm text-slate-500">{foodItems.length} items loaded</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {foodItems.map((item) => {
                                    const isInCart = cartItems.some((cartItem) => cartItem.id === item._id);

                                    return (
                                        <article key={item._id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                            <div className="relative h-52 bg-slate-100 flex items-center justify-center overflow-hidden">

                                                {item.image ? (
                                                    <img src={item.image} loading="lazy" alt={item.name} className="h-44 w-44 object-cover group-hover:scale-105 transition-transform duration-300 select-none" />
                                                ) : (
                                                    <div className="h-44 w-44 bg-slate-100 flex items-center justify-center text-slate-400 select-none">
                                                        No Image
                                                    </div>
                                                )}

                                                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-500"}`}>
                                                    {item.isAvailable ? "Available" : "Unavailable"}
                                                </span>
                                            </div>

                                            <div className="p-5">
                                                <p className="text-xs font-medium uppercase tracking-wider text-red-500">{item.category?.category}</p>

                                                <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.name}</h3>

                                                <p className="mt-2 text-sm text-slate-500 line-clamp-2 min-h-10">{item.description || "Delicious food prepared fresh for you."}</p>

                                                <div className="mt-5 flex items-center justify-between gap-3">
                                                    <p className="text-lg font-semibold text-slate-900">₹{item.price}</p>

                                                    {isInCart ? (
                                                        <button type="button" disabled className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                                                            <i className="fa-solid fa-check"></i>
                                                        </button>
                                                    ) : (
                                                        <button type="button" onClick={() => handleAddToCart(item)} disabled={!item.isAvailable} className="px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors">
                                                            Add to cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            {hasMore && (
                                <div className="flex justify-center mt-10">
                                    <button type="button" onClick={handleLoadMore} disabled={loading} className="px-7 py-3 rounded-lg border border-red-500 text-red-500 font-medium hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                        {loading ? "Loading..." : "Load More"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export default Explore;