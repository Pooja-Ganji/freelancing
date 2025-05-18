const asyncHandler = require('express-async-handler');
const Portfolio = require('../models/portfolioModel');
const User = require('../models/userModel');
const Project = require('../models/projectModel');

// @desc    Get user's portfolio
// @route   GET /api/portfolios
// @access  Private
const getPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({ user: req.user.id });

  if (!portfolio) {
    res.status(404);
    throw new Error('Portfolio not found');
  }

  res.status(200).json(portfolio);
});

// @desc    Get public portfolio by username
// @route   GET /api/portfolios/public/:username
// @access  Public
const getPublicPortfolio = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const portfolio = await Portfolio.findOne({ user: user._id }).populate('user', 'name username');

  if (!portfolio) {
    res.status(404);
    throw new Error('Portfolio not found');
  }

  if (!portfolio.isPublic) {
    res.status(403);
    throw new Error('This portfolio is private');
  }

  // Increment views
  portfolio.views += 1;
  await portfolio.save();

  // Get user's projects
  const projects = await Project.find({ user: user._id });

  res.status(200).json({
    portfolio,
    projects
  });
});

// @desc    Create portfolio
// @route   POST /api/portfolios
// @access  Private
const createPortfolio = asyncHandler(async (req, res) => {
  const portfolioExists = await Portfolio.findOne({ user: req.user.id });

  if (portfolioExists) {
    res.status(400);
    throw new Error('Portfolio already exists');
  }

  const portfolio = await Portfolio.create({
    user: req.user.id,
    ...req.body,
  });

  res.status(201).json(portfolio);
});

// @desc    Update portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
const updatePortfolio = asyncHandler(async (req, res) => {
  try {
    // Get portfolio by ID from params
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      // If portfolio not found by ID, try to find by user ID
      const userPortfolio = await Portfolio.findOne({ user: req.user.id });
      
      if (!userPortfolio) {
        res.status(404);
        throw new Error('Portfolio not found');
      }
      
      // Update the portfolio found by user ID
      const updatedPortfolio = await Portfolio.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true }
      );
      
      return res.status(200).json(updatedPortfolio);
    }

    // Check if user owns the portfolio
    if (portfolio.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to update this portfolio');
    }

    // Update the portfolio found by ID
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error('Portfolio update error:', error);
    res.status(error.status || 500);
    throw error;
  }
});

// @desc    Update portfolio theme
// @route   PUT /api/portfolios/theme
// @access  Private
const updateTheme = asyncHandler(async (req, res) => {
  const { theme } = req.body;

  if (!theme) {
    res.status(400);
    throw new Error('Please provide a theme');
  }

  const portfolio = await Portfolio.findOne({ user: req.user.id });

  if (!portfolio) {
    res.status(404);
    throw new Error('Portfolio not found');
  }

  portfolio.theme = theme;
  const updatedPortfolio = await portfolio.save();

  res.status(200).json(updatedPortfolio);
});

// @desc    Add testimonial
// @route   POST /api/portfolios/testimonials
// @access  Private
const addTestimonial = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({ user: req.user.id });

  if (!portfolio) {
    res.status(404);
    throw new Error('Portfolio not found');
  }

  portfolio.testimonials.push(req.body);
  const updatedPortfolio = await portfolio.save();

  res.status(200).json(updatedPortfolio);
});

// @desc    Update testimonial
// @route   PUT /api/portfolios/testimonials/:id
// @access  Private
const updateTestimonial = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({ user: req.user.id });

  if (!portfolio) {
    res.status(404);
    throw new Error('Portfolio not found');
  }

  const testimonialIndex = portfolio.testimonials.findIndex(
    (t) => t._id.toString() === req.params.id
  );

  if (testimonialIndex === -1) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  portfolio.testimonials[testimonialIndex] = {
    ...portfolio.testimonials[testimonialIndex],
    ...req.body,
  };

  const updatedPortfolio = await portfolio.save();
  res.status(200).json(updatedPortfolio);
});

// @desc    Delete testimonial
// @route   DELETE /api/portfolios/testimonials/:id
// @access  Private
const deleteTestimonial = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({ user: req.user.id });

  if (!portfolio) {
    res.status(404);
    throw new Error('Portfolio not found');
  }

  portfolio.testimonials = portfolio.testimonials.filter(
    (t) => t._id.toString() !== req.params.id
  );

  const updatedPortfolio = await portfolio.save();
  res.status(200).json(updatedPortfolio);
});

// @desc    Update portfolio customization
// @route   PUT /api/portfolios/customization
// @access  Private
const updateCustomization = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({ user: req.user.id });

  if (!portfolio) {
    res.status(404);
    throw new Error('Portfolio not found');
  }

  portfolio.customization = {
    ...portfolio.customization,
    ...req.body,
  };

  const updatedPortfolio = await portfolio.save();
  res.status(200).json(updatedPortfolio);
});

module.exports = {
  getPortfolio,
  getPublicPortfolio,
  createPortfolio,
  updatePortfolio,
  updateTheme,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateCustomization,
}; 