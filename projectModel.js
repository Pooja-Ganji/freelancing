const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a project title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
    },
    technologies: [{
      type: String,
    }],
    images: [{
      url: String,
      caption: String,
    }],
    githubUrl: String,
    liveUrl: String,
    featured: {
      type: Boolean,
      default: false,
    },
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema); 