const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentById,
  getContentByArticleNumber,
  getFundamentalRights,
  getDirectivePrinciples,
  getFundamentalDuties,
  getPreamble,
  searchContent,
  createContent,
  updateContent,
  deleteContent
} = require('../controllers/contentController');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllContent);
router.get('/search', searchContent);
router.get('/fundamental-rights', getFundamentalRights);
router.get('/directive-principles', getDirectivePrinciples);
router.get('/fundamental-duties', getFundamentalDuties);
router.get('/preamble', getPreamble);
router.get('/article/:articleNumber', getContentByArticleNumber);
router.get('/:id', getContentById);

// Admin routes
router.post('/', authenticate, authorize('admin'), createContent);
router.put('/:id', authenticate, authorize('admin'), updateContent);
router.delete('/:id', authenticate, authorize('admin'), deleteContent);

module.exports = router;
