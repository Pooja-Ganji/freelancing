const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: String,
  company: String,
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

const portfolioSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    hero: {
      title: String,
      subtitle: String,
      backgroundImage: String,
      backgroundColor: {
        type: String,
        default: '#808080'
      },
      ctaText: {
        type: String,
        default: 'View My Work'
      },
      ctaLink: {
        type: String,
        default: '#projects'
      }
    },
    about: {
      title: {
        type: String,
        default: 'About Me'
      },
      bio: String,
      skills: [String],
      image: String
    },
    contact: {
      email: String,
      linkedin: String,
      github: String,
      phone: String,
      location: String
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    customDomain: String,
    testimonials: [testimonialSchema],
    isPublic: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    customization: {
      primaryColor: {
        type: String,
        default: '#3B82F6'
      },
      secondaryColor: {
        type: String,
        default: '#1E40AF'
      },
      fontFamily: {
        type: String,
        default: 'Inter'
      },
      layout: {
        type: String,
        enum: ['classic', 'modern', 'minimal'],
        default: 'modern'
      },
      spacing: {
        type: String,
        enum: ['comfortable', 'compact', 'spacious'],
        default: 'comfortable'
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema); 