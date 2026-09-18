const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserDetails, updateUserDetails, logout, getCurrentUser, changePassword, refreshAccessToken } = require('../controllers/auth.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', authenticate, getCurrentUser);

router.get('/:id', authenticate, authorize("admin"), getUserDetails);

router.put('/change-password', authenticate, changePassword);

router.put('/:id', authenticate, updateUserDetails);

router.post('/logout', logout);

router.post('/refresh', refreshAccessToken);

module.exports = router;