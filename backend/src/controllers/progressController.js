const { Progress } = require('../models');

/**
 * @desc    Get user's overall progress
 * @route   GET /api/v1/progress/overview
 * @access  Private
 */
const getOverallProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const overview = await Progress.getUserOverallProgress(userId);

    res.status(200).json({
      success: true,
      data: { overview }
    });

  } catch (error) {
    console.error('Get overall progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch overall progress',
      error: error.message
    });
  }
};

/**
 * @desc    Get progress for specific content
 * @route   GET /api/v1/progress/content/:contentId
 * @access  Private
 */
const getContentProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.params;

    const progress = await Progress.findOne({ userId, contentId })
      .populate('contentId', 'title articleNumber contentType');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress not found for this content'
      });
    }

    res.status(200).json({
      success: true,
      data: { progress }
    });

  } catch (error) {
    console.error('Get content progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content progress',
      error: error.message
    });
  }
};

/**
 * @desc    Get all user's progress with filters
 * @route   GET /api/v1/progress
 * @access  Private
 */
const getAllProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, isBookmarked, page = 1, limit = 20 } = req.query;

    const query = { userId };

    if (status) {
      query.status = status;
    }

    if (isBookmarked !== undefined) {
      query.isBookmarked = isBookmarked === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const progress = await Progress.find(query)
      .populate('contentId', 'title articleNumber contentType difficulty estimatedReadTime')
      .sort({ lastAccessedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Progress.countDocuments(query);

    res.status(200).json({
      success: true,
      count: progress.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: { progress }
    });

  } catch (error) {
    console.error('Get all progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress',
      error: error.message
    });
  }
};

/**
 * @desc    Update or create progress for content
 * @route   POST /api/v1/progress/:contentId
 * @access  Private
 */
const updateProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.params;
    const { status, completionPercentage, timeSpent } = req.body;

    let progress = await Progress.findOne({ userId, contentId });

    if (!progress) {
      // Create new progress record
      progress = await Progress.create({
        userId,
        contentId,
        status: status || 'in-progress'
      });
      progress.markAsStarted();
    } else {
      // Update existing progress
      if (status) {
        progress.status = status;
      }

      if (completionPercentage !== undefined) {
        progress.completionPercentage = completionPercentage;
      }

      if (timeSpent) {
        progress.addTimeSpent(timeSpent);
      }
    }

    // Auto-complete if 100%
    if (progress.completionPercentage >= 100) {
      progress.markAsCompleted();
    }

    await progress.save();

    // Populate content details
    await progress.populate('contentId', 'title articleNumber contentType');

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      data: { progress }
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress',
      error: error.message
    });
  }
};

/**
 * @desc    Mark content as started
 * @route   POST /api/v1/progress/:contentId/start
 * @access  Private
 */
const startContent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.params;

    let progress = await Progress.findOne({ userId, contentId });

    if (!progress) {
      progress = await Progress.create({ userId, contentId });
    }

    progress.markAsStarted();
    await progress.save();

    await progress.populate('contentId', 'title articleNumber contentType');

    res.status(200).json({
      success: true,
      message: 'Content started',
      data: { progress }
    });

  } catch (error) {
    console.error('Start content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start content',
      error: error.message
    });
  }
};

/**
 * @desc    Mark content as completed
 * @route   POST /api/v1/progress/:contentId/complete
 * @access  Private
 */
const completeContent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.params;

    let progress = await Progress.findOne({ userId, contentId });

    if (!progress) {
      progress = await Progress.create({ userId, contentId });
    }

    progress.markAsCompleted();
    await progress.save();

    // Award experience points to user
    await req.user.addExperience(10);
    await req.user.save();

    await progress.populate('contentId', 'title articleNumber contentType');

    res.status(200).json({
      success: true,
      message: 'Content completed successfully',
      data: { progress }
    });

  } catch (error) {
    console.error('Complete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete content',
      error: error.message
    });
  }
};

/**
 * @desc    Toggle bookmark for content
 * @route   POST /api/v1/progress/:contentId/bookmark
 * @access  Private
 */
const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.params;

    let progress = await Progress.findOne({ userId, contentId });

    if (!progress) {
      progress = await Progress.create({ userId, contentId });
    }

    progress.toggleBookmark();
    await progress.save();

    await progress.populate('contentId', 'title articleNumber contentType');

    res.status(200).json({
      success: true,
      message: progress.isBookmarked ? 'Content bookmarked' : 'Bookmark removed',
      data: { progress }
    });

  } catch (error) {
    console.error('Toggle bookmark error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle bookmark',
      error: error.message
    });
  }
};

/**
 * @desc    Add quiz attempt
 * @route   POST /api/v1/progress/:contentId/quiz
 * @access  Private
 */
const addQuizAttempt = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.params;
    const { score, totalQuestions, correctAnswers, timeTaken } = req.body;

    let progress = await Progress.findOne({ userId, contentId });

    if (!progress) {
      progress = await Progress.create({ userId, contentId });
    }

    progress.addQuizAttempt({ score, totalQuestions, correctAnswers, timeTaken });
    await progress.save();

    // Award experience based on score
    const xpEarned = Math.floor(score / 10);
    const levelUp = await req.user.addExperience(xpEarned);
    await req.user.save();

    await progress.populate('contentId', 'title articleNumber contentType');

    res.status(200).json({
      success: true,
      message: 'Quiz attempt recorded',
      data: {
        progress,
        xpEarned,
        levelUp: levelUp.leveledUp,
        newLevel: levelUp.newLevel
      }
    });

  } catch (error) {
    console.error('Add quiz attempt error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record quiz attempt',
      error: error.message
    });
  }
};

/**
 * @desc    Add note to content
 * @route   POST /api/v1/progress/:contentId/notes
 * @access  Private
 */
const addNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contentId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Note text is required'
      });
    }

    let progress = await Progress.findOne({ userId, contentId });

    if (!progress) {
      progress = await Progress.create({ userId, contentId });
    }

    progress.addNote(text);
    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: { progress }
    });

  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add note',
      error: error.message
    });
  }
};

/**
 * @desc    Get bookmarked content
 * @route   GET /api/v1/progress/bookmarks
 * @access  Private
 */
const getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 20 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookmarks = await Progress.find({ userId, isBookmarked: true })
      .populate('contentId', 'title articleNumber contentType difficulty')
      .sort({ bookmarkedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Progress.countDocuments({ userId, isBookmarked: true });

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: { bookmarks }
    });

  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookmarks',
      error: error.message
    });
  }
};

module.exports = {
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
};
