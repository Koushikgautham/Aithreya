const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default in queries
  },

  // Profile Information
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  avatar: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date
  },

  // Preferences
  preferredLanguage: {
    type: String,
    enum: ['en', 'hi', 'ta', 'te', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'or'],
    default: 'en'
  },
  darkMode: {
    type: Boolean,
    default: false
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
  },

  // Learning Profile
  educationLevel: {
    type: String,
    enum: ['school', 'undergraduate', 'postgraduate', 'professional', 'general'],
    default: 'general'
  },
  interests: [{
    type: String,
    enum: ['fundamental-rights', 'directive-principles', 'fundamental-duties', 'amendments', 'case-law', 'preamble', 'governance']
  }],

  // Gamification & Progress
  experiencePoints: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  badges: [{
    badgeId: String,
    name: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  streak: {
    current: {
      type: Number,
      default: 0
    },
    longest: {
      type: Number,
      default: 0
    },
    lastActiveDate: {
      type: Date
    }
  },

  // Account Status
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'educator', 'admin'],
    default: 'user'
  },

  // Firebase Integration
  firebaseUID: {
    type: String,
    sparse: true,
    unique: true
  },

  // Security
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,

  // Timestamps
  lastLoginAt: {
    type: Date
  },

}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ firebaseUID: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's progress
userSchema.virtual('progress', {
  ref: 'Progress',
  localField: '_id',
  foreignField: 'userId'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to update streak
userSchema.methods.updateStreak = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActive = this.streak.lastActiveDate ? new Date(this.streak.lastActiveDate) : null;
  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
  }

  const diffDays = lastActive ? Math.floor((today - lastActive) / (1000 * 60 * 60 * 24)) : null;

  if (diffDays === 0) {
    // Same day, no change
    return;
  } else if (diffDays === 1) {
    // Consecutive day
    this.streak.current += 1;
    this.streak.longest = Math.max(this.streak.longest, this.streak.current);
  } else {
    // Streak broken
    this.streak.current = 1;
  }

  this.streak.lastActiveDate = today;
};

// Method to add experience points and level up
userSchema.methods.addExperience = function(points) {
  this.experiencePoints += points;

  // Simple leveling: 100 XP per level
  const newLevel = Math.floor(this.experiencePoints / 100) + 1;
  if (newLevel > this.level) {
    this.level = newLevel;
    return { leveledUp: true, newLevel };
  }

  return { leveledUp: false };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
