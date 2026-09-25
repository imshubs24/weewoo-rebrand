const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const { getDashboardStats } = require("../controllers/admin.controller");

router.get("/dashboard", authenticate, authorize("admin"), getDashboardStats);

module.exports = router;