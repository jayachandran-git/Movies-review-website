const express = require('express');
const router = express.Router();
const {registerUser, loginUser, userProfile, logout} = require('../controllers/userController');
const {auth} = require('../middleware/auth')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, userProfile);
router.post('/logout', logout);


module.exports = router;