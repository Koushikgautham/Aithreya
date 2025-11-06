const express = require('express');
const router = express.Router();
const {
  getOverallProgress,
  getContentProgress,
  getAllProgress,
  updateProgress,
  startContent,
  completeContent,
  toggleBookmark,
  addQuizAttempt,
  addNote,
  getBookmarks
} = require('../controllers/progressController');
const { authenticate } = require('../middleware/auth');

// All progress routes require authentication
router.use(authenticate);

// General progress routes
router.get('/overview', getOverallProgress);
router.get('/bookmarks', getBookmarks);
router.get('/', getAllProgress);

// Content-specific progress routes
router.get('/content/:contentId', getContentProgress);
router.post('/:contentId', updateProgress);
router.post('/:contentId/start', startContent);
router.post('/:contentId/complete', completeContent);
router.post('/:contentId/bookmark', toggleBookmark);
router.post('/:contentId/quiz', addQuizAttempt);
router.post('/:contentId/notes', addNote);

module.exports = router;
