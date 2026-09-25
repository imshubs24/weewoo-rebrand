import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminFood = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const fetchFoodItems = async () => {
    try {
      const response = await api.get("/api/food?limit=50");
      setFoodItems(response.data.foodItems);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/category/");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFood = async (e) => {
    e.preventDefault();

    try {
      setIsAdding(true);

      if (editingFood) {
        const response = await api.put(`/api/food/${editingFood._id}`, {
          ...formData,
          price: Number(formData.price),
        });

        setFoodItems((prev) =>
          prev.map((food) =>
            food._id === editingFood._id
              ? response.data.food
              : food
          )
        );
      } else {
        const response = await api.post("/api/food/", {
          ...formData,
          price: Number(formData.price),
        });

        setFoodItems((prev) => [response.data.newFood, ...prev]);
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
      });

      setEditingFood(null);
      setIsAddFormOpen(false);

    } catch (error) {
      console.error("Failed to save food:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditClick = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      category: food.category?._id || food.category || "",
      price: food.price,
      image: food.image || "",
      description: food.description || "",
    });

    setIsAddFormOpen(true);
  };

  const handleDeleteFood = async (foodId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this food item?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/food/${foodId}`);

      setFoodItems((prev) =>
        prev.filter((food) => food._id !== foodId)
      );
    } catch (error) {
      console.error("Failed to delete food:", error);
    }
  };

  const handleAvailabilityToggle = async (food) => {
    try {
      const response = await api.put(`/api/food/${food._id}`, {
        isAvailable: !food.isAvailable,
      });

      setFoodItems((prev) =>
        prev.map((item) =>
          item._id === food._id
            ? { ...item, isAvailable: response.data.food.isAvailable }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update food availability:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Food</h1>
          <p className="mt-1 text-slate-500">Manage your food menu.</p>
        </div>

        <button onClick={() => setIsAddFormOpen(true)} className="px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">
          + Add Food
        </button>
      </div>

      {isAddFormOpen && (
        <div className="mb-6 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {editingFood ? "Edit Food" : "Add Food"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {editingFood ? "Update food details." : "Add a new item to your menu."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAddFormOpen(false);
                setEditingFood(null);
                setFormData({
                  name: "",
                  category: "",
                  price: "",
                  image: "",
                  description: "",
                });
              }}
              className="text-slate-400 hover:text-slate-700 text-2xl">
              &times;
            </button>
          </div>

          <form onSubmit={handleAddFood} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-red-500"
                placeholder="Food name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-red-500"
              >
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-red-500"
                placeholder="Price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-red-500"
                placeholder="Image URL"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-red-500 resize-none"
                placeholder="Food description"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddFormOpen(false);
                  setEditingFood(null);
                  setFormData({
                    name: "",
                    category: "",
                    price: "",
                    image: "",
                    description: "",
                  });
                }}
                disabled={isAdding}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isAdding}
                className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition disabled:opacity-60"
              >
                {isAdding ? "Saving..." : editingFood ? "Save Changes" : "Add Food"}
              </button>
            </div>
          </form>
        </div>
      )}

      {foodItems.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <p className="text-slate-500">No food items found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {foodItems.map((food) => (
            <div key={food._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              {food.image ? (
                <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                  No Image
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-lg text-slate-900">{food.name}</h2>
                    <p className="text-sm text-slate-500 mt-1">{food.category?.category}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAvailabilityToggle(food)}
                    className={`text-xs px-2.5 py-1 rounded-full transition ${food.isAvailable ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-red-50 text-red-500 hover:bg-red-100"}`}
                  >
                    {food.isAvailable ? "Available" : "Unavailable"}
                  </button>
                </div>

                <p className="mt-4 text-lg font-semibold text-red-500">
                  ₹{food.price}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleEditClick(food)}
                    className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteFood(food._id)}
                    className="flex-1 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFood;