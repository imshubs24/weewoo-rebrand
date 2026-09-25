import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    image: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/category/");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();

    try {
      setIsAdding(true);

      if (editingCategory) {
        const response = await api.put(
          `/api/category/${editingCategory._id}`,
          formData
        );

        setCategories((prev) =>
          prev.map((category) =>
            category._id === editingCategory._id
              ? response.data.category
              : category
          )
        );
      } else {
        const response = await api.post("/api/category/", formData);

        setCategories((prev) => [...prev, response.data.category]);
      }

      setFormData({
        category: "",
        image: "",
      });

      setEditingCategory(null);
      setIsAddFormOpen(false);
    } catch (error) {
      console.error("Failed to save category:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);

    setFormData({
      category: category.category,
      image: category.image || "",
    });

    setIsAddFormOpen(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/category/${categoryId}`);

      setCategories((prev) =>
        prev.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  useEffect(() => {
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
          <h1 className="text-3xl font-semibold text-slate-900">Categories</h1>
          <p className="mt-1 text-slate-500">Manage food categories.</p>
        </div>

        <button onClick={() => setIsAddFormOpen(true)} className="px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">
          + Add Category
        </button>
      </div>

      {isAddFormOpen && (
        <div className="mb-6 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {editingCategory ? "Update category details." : "Create a new food category."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAddFormOpen(false);
                setEditingCategory(null);
                setFormData({
                  category: "",
                  image: "",
                });
              }}
              className="text-slate-400 hover:text-slate-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSaveCategory} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-red-500"
                placeholder="Category name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-red-500"
                placeholder="Image URL"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddFormOpen(false);
                  setEditingCategory(null);
                  setFormData({
                    category: "",
                    image: "",
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
                {isAdding ? "Saving..." : editingCategory ? "Save Changes" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <p className="text-slate-500">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white border border-slate-200 rounded-xl p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-lg text-slate-900">
                    {category.category}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {category.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <span className={`text-xs px-2.5 py-1 rounded-full ${category.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => handleEditClick(category)}
                  className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteCategory(category._id)}
                  className="flex-1 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;