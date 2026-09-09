const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserDetails, updateUserDetails } = require('../controllers/user.controller');
const auth = require('../middleware/authentication');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/getUserDetails', auth, getUserDetails);
router.patch('/updateUserDetails', auth, updateUserDetails);

module.exports = router;