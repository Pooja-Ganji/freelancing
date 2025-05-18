const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores and hyphens']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      default: 'Freelancer',
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters'],
    },
    avatar: {
      type: String,
      default: 'https://www.gravatar.com/avatar/?d=mp',
    },
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      website: String,
    },
    skills: [{
      name: String,
      proficiency: {
        type: Number,
        min: 1,
        max: 5,
      },
    }],
    resumeUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema); 