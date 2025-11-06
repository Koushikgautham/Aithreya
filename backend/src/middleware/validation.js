const { body, validationResult } = require('express-validator');

/**
 * Middleware to handle validation results
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Validation rules for user registration
 */
const validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

  body('phoneNumber')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),

  body('preferredLanguage')
    .optional()
    .isIn(['en', 'hi', 'ta', 'te', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'or'])
    .withMessage('Invalid language code'),

  body('educationLevel')
    .optional()
    .isIn(['school', 'undergraduate', 'postgraduate', 'professional', 'general'])
    .withMessage('Invalid education level'),

  handleValidationErrors
];

/**
 * Validation rules for user login
 */
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  handleValidationErrors
];

/**
 * Validation rules for content creation
 */
const validateContent = [
  body('contentId')
    .trim()
    .notEmpty()
    .withMessage('Content ID is required'),

  body('contentType')
    .notEmpty()
    .withMessage('Content type is required')
    .isIn(['article', 'fundamental-right', 'directive-principle', 'fundamental-duty', 'preamble', 'amendment', 'schedule'])
    .withMessage('Invalid content type'),

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('content.en')
    .notEmpty()
    .withMessage('English content is required'),

  body('explanation.en')
    .notEmpty()
    .withMessage('English explanation is required'),

  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty level'),

  handleValidationErrors
];

/**
 * Validation rules for progress update
 */
const validateProgress = [
  body('status')
    .optional()
    .isIn(['not-started', 'in-progress', 'completed', 'bookmarked'])
    .withMessage('Invalid status'),

  body('completionPercentage')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Completion percentage must be between 0 and 100'),

  body('timeSpent')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Time spent must be a positive number'),

  handleValidationErrors
];

/**
 * Validation rules for quiz attempt
 */
const validateQuizAttempt = [
  body('score')
    .notEmpty()
    .withMessage('Score is required')
    .isInt({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100'),

  body('totalQuestions')
    .notEmpty()
    .withMessage('Total questions is required')
    .isInt({ min: 1 })
    .withMessage('Total questions must be a positive number'),

  body('correctAnswers')
    .notEmpty()
    .withMessage('Correct answers is required')
    .isInt({ min: 0 })
    .withMessage('Correct answers must be a non-negative number'),

  body('timeTaken')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Time taken must be a positive number'),

  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateContent,
  validateProgress,
  validateQuizAttempt,
  handleValidationErrors
};
