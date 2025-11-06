const mongoose = require('mongoose');

// Base content schema for all constitutional content
const contentSchema = new mongoose.Schema({
  // Identification
  contentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  contentType: {
    type: String,
    required: true,
    enum: ['article', 'fundamental-right', 'directive-principle', 'fundamental-duty', 'preamble', 'amendment', 'schedule']
  },

  // Content Details
  title: {
    type: String,
    required: true,
    trim: true
  },
  shortTitle: {
    type: String,
    trim: true
  },
  articleNumber: {
    type: String,
    trim: true
  },

  // Multilingual Content
  content: {
    en: {
      type: String,
      required: true
    },
    hi: String,
    ta: String,
    te: String,
    kn: String,
    ml: String,
    mr: String,
    gu: String,
    bn: String,
    pa: String,
    or: String
  },

  // Simplified Explanation
  explanation: {
    en: {
      type: String,
      required: true
    },
    hi: String,
    ta: String,
    te: String,
    kn: String,
    ml: String,
    mr: String,
    gu: String,
    bn: String,
    pa: String,
    or: String
  },

  // Additional Information
  keyPoints: [{
    type: String
  }],
  keywords: [{
    type: String,
    lowercase: true
  }],

  // Part and Chapter Organization
  part: {
    number: String,
    title: String
  },
  chapter: {
    number: String,
    title: String
  },

  // Related Content
  relatedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }],
  relatedCases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CaseStudy'
  }],

  // Learning Metadata
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedReadTime: {
    type: Number, // in minutes
    default: 5
  },

  // Media
  audioUrl: {
    type: String
  },
  videoUrl: {
    type: String
  },
  imageUrl: {
    type: String
  },

  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },

  // Analytics
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance and search
contentSchema.index({ contentId: 1 });
contentSchema.index({ contentType: 1 });
contentSchema.index({ articleNumber: 1 });
contentSchema.index({ keywords: 1 });
contentSchema.index({ 'part.number': 1 });
contentSchema.index({ difficulty: 1 });
contentSchema.index({ isActive: 1 });

// Text search index for multilingual search
contentSchema.index({
  title: 'text',
  'content.en': 'text',
  'explanation.en': 'text',
  keywords: 'text'
});

// Virtual for formatted article reference
contentSchema.virtual('reference').get(function() {
  if (this.articleNumber) {
    return `Article ${this.articleNumber}`;
  }
  return this.title;
});

// Method to get content in specific language
contentSchema.methods.getLocalizedContent = function(language = 'en') {
  return {
    title: this.title,
    content: this.content[language] || this.content.en,
    explanation: this.explanation[language] || this.explanation.en,
    contentType: this.contentType,
    articleNumber: this.articleNumber
  };
};

// Static method to search content
contentSchema.statics.searchContent = async function(query, filters = {}) {
  const searchQuery = {
    isActive: true,
    $text: { $search: query }
  };

  if (filters.contentType) {
    searchQuery.contentType = filters.contentType;
  }

  if (filters.difficulty) {
    searchQuery.difficulty = filters.difficulty;
  }

  return this.find(searchQuery)
    .select({ score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .limit(filters.limit || 20);
};

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
