const express = require('express');
const router = express.Router();
const {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  updateTheme,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateCustomization,
  getPublicPortfolio,
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/public/:username', getPublicPortfolio);

// Private routes (require authentication)
router.route('/')
  .get(protect, getPortfolio)
  .post(protect, createPortfolio);

// Update portfolio by ID
router.put('/:id', protect, updatePortfolio);

router.put('/theme', protect, updateTheme);
router.put('/customization', protect, updateCustomization);

// Testimonial routes
router.post('/testimonials', protect, addTestimonial);
router.route('/testimonials/:id')
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

module.exports = router; 