const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  updateAvatar,
  updateSocialLinks,
  updateSkills,
  uploadResume,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Profile management routes
router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, updateAvatar);
router.put('/social-links', protect, updateSocialLinks);
router.put('/skills', protect, updateSkills);
router.post('/resume', protect, uploadResume);

module.exports = router; 