const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserDetails, updateUserDetails } = require('../controllers/auth.controller');
const authenticate = require('../middleware/auth.middleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/getUserDetails', authenticate, getUserDetails);

router.put('/updateUserDetails', authenticate, updateUserDetails);

module.exports = router;