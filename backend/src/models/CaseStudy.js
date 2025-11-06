const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  // Case Identification
  caseId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  caseName: {
    type: String,
    required: true,
    trim: true
  },
  citation: {
    type: String,
    required: true,
    trim: true
  },

  // Case Details
  court: {
    type: String,
    required: true,
    enum: ['Supreme Court', 'High Court', 'District Court', 'Other']
  },
  year: {
    type: Number,
    required: true
  },
  judges: [{
    type: String
  }],

  // Content
  summary: {
    en: {
      type: String,
      required: true
    },
    hi: String,
    ta: String,
    te: String
  },
  facts: {
    en: String,
    hi: String,
    ta: String,
    te: String
  },
  issues: [{
    type: String
  }],
  judgment: {
    en: String,
    hi: String,
    ta: String,
    te: String
  },
  significance: {
    en: String,
    hi: String,
    ta: String,
    te: String
  },

  // Related Constitutional Content
  relatedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }],
  relatedRights: [{
    type: String
  }],
  keywords: [{
    type: String,
    lowercase: true
  }],

  // External Links
  sourceUrl: {
    type: String
  },
  pdfUrl: {
    type: String
  },

  // Categorization
  category: {
    type: String,
    enum: ['landmark', 'important', 'reference'],
    default: 'reference'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },

  // Status
  isActive: {
    type: Boolean,
    default: true
  },

  // Analytics
  views: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

// Indexes
caseStudySchema.index({ caseId: 1 });
caseStudySchema.index({ caseName: 'text', keywords: 'text' });
caseStudySchema.index({ year: -1 });
caseStudySchema.index({ category: 1 });

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

module.exports = CaseStudy;
