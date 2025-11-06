const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Content Reference
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },

  // Progress Tracking
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'bookmarked'],
    default: 'not-started'
  },

  // Completion Details
  completionPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  completedAt: {
    type: Date
  },
  startedAt: {
    type: Date
  },

  // Time Tracking
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },

  // Interaction Tracking
  viewCount: {
    type: Number,
    default: 0
  },
  isBookmarked: {
    type: Boolean,
    default: false
  },
  bookmarkedAt: {
    type: Date
  },

  // Quiz/Assessment Results
  quizAttempts: [{
    attemptedAt: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    totalQuestions: Number,
    correctAnswers: Number,
    timeTaken: Number // in seconds
  }],
  bestScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },

  // Notes
  notes: [{
    text: {
      type: String,
      maxlength: 1000
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Highlights
  highlights: [{
    text: String,
    color: {
      type: String,
      default: 'yellow'
    },
    position: {
      start: Number,
      end: Number
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Ratings & Feedback
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    maxlength: 500
  },
  ratedAt: {
    type: Date
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index for user + content (ensure one progress record per user per content)
progressSchema.index({ userId: 1, contentId: 1 }, { unique: true });

// Indexes for queries
progressSchema.index({ userId: 1, status: 1 });
progressSchema.index({ userId: 1, isBookmarked: 1 });
progressSchema.index({ userId: 1, lastAccessedAt: -1 });
progressSchema.index({ completedAt: -1 });

// Virtual for completion status
progressSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

// Method to mark as started
progressSchema.methods.markAsStarted = function() {
  if (!this.startedAt) {
    this.startedAt = new Date();
  }
  if (this.status === 'not-started') {
    this.status = 'in-progress';
  }
  this.lastAccessedAt = new Date();
  this.viewCount += 1;
};

// Method to mark as completed
progressSchema.methods.markAsCompleted = function() {
  this.status = 'completed';
  this.completionPercentage = 100;
  this.completedAt = new Date();
  this.lastAccessedAt = new Date();
};

// Method to update time spent
progressSchema.methods.addTimeSpent = function(seconds) {
  this.timeSpent += seconds;
  this.lastAccessedAt = new Date();
};

// Method to add quiz attempt
progressSchema.methods.addQuizAttempt = function(quizData) {
  const { score, totalQuestions, correctAnswers, timeTaken } = quizData;

  this.quizAttempts.push({
    score,
    totalQuestions,
    correctAnswers,
    timeTaken
  });

  // Update best score
  if (score > this.bestScore) {
    this.bestScore = score;
  }

  // Auto-complete if score is above 80%
  if (score >= 80) {
    this.markAsCompleted();
  }
};

// Method to toggle bookmark
progressSchema.methods.toggleBookmark = function() {
  this.isBookmarked = !this.isBookmarked;
  this.bookmarkedAt = this.isBookmarked ? new Date() : null;
};

// Method to add note
progressSchema.methods.addNote = function(noteText) {
  this.notes.push({
    text: noteText,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

// Static method to get user's overall progress
progressSchema.statics.getUserOverallProgress = async function(userId) {
  const result = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalContent: { $sum: 1 },
        completedContent: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        inProgressContent: {
          $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
        },
        bookmarkedContent: {
          $sum: { $cond: ['$isBookmarked', 1, 0] }
        },
        totalTimeSpent: { $sum: '$timeSpent' },
        averageScore: { $avg: '$bestScore' }
      }
    }
  ]);

  return result[0] || {
    totalContent: 0,
    completedContent: 0,
    inProgressContent: 0,
    bookmarkedContent: 0,
    totalTimeSpent: 0,
    averageScore: 0
  };
};

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
