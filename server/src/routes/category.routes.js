const express = require("express");
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const router = express.Router();

router.post("/", authenticate, authorize("admin"), createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.put("/:id", authenticate, authorize("admin"), updateCategory);

router.delete("/:id", authenticate, authorize("admin"), deleteCategory);

module.exports = router;