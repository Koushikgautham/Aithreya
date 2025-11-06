const { Content } = require('../models');

/**
 * @desc    Get all content with filters
 * @route   GET /api/v1/content
 * @access  Public
 */
const getAllContent = async (req, res) => {
  try {
    const {
      contentType,
      difficulty,
      part,
      search,
      language = 'en',
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (contentType) {
      query.contentType = contentType;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (part) {
      query['part.number'] = part;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    let contents;
    let total;

    // Handle search
    if (search) {
      contents = await Content.searchContent(search, {
        contentType,
        difficulty,
        limit: parseInt(limit)
      });
      total = contents.length;
    } else {
      contents = await Content.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('relatedArticles', 'title articleNumber')
        .populate('relatedCases', 'caseName citation');

      total = await Content.countDocuments(query);
    }

    // Format content based on language
    const localizedContents = contents.map(content => ({
      ...content.toObject(),
      localizedContent: content.getLocalizedContent(language)
    }));

    res.status(200).json({
      success: true,
      count: contents.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: { contents: localizedContents }
    });

  } catch (error) {
    console.error('Get all content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
};

/**
 * @desc    Get single content by ID
 * @route   GET /api/v1/content/:id
 * @access  Public
 */
const getContentById = async (req, res) => {
  try {
    const { language = 'en' } = req.query;

    const content = await Content.findById(req.params.id)
      .populate('relatedArticles', 'title articleNumber contentType')
      .populate('relatedCases', 'caseName citation year');

    if (!content || !content.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Increment view count
    content.views += 1;
    await content.save();

    // Get localized content
    const localizedContent = content.getLocalizedContent(language);

    res.status(200).json({
      success: true,
      data: {
        content: {
          ...content.toObject(),
          localizedContent
        }
      }
    });

  } catch (error) {
    console.error('Get content by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
};

/**
 * @desc    Get content by article number
 * @route   GET /api/v1/content/article/:articleNumber
 * @access  Public
 */
const getContentByArticleNumber = async (req, res) => {
  try {
    const { language = 'en' } = req.query;

    const content = await Content.findOne({
      articleNumber: req.params.articleNumber,
      isActive: true
    })
      .populate('relatedArticles', 'title articleNumber')
      .populate('relatedCases', 'caseName citation');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Increment view count
    content.views += 1;
    await content.save();

    const localizedContent = content.getLocalizedContent(language);

    res.status(200).json({
      success: true,
      data: {
        content: {
          ...content.toObject(),
          localizedContent
        }
      }
    });

  } catch (error) {
    console.error('Get content by article number error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
};

/**
 * @desc    Get fundamental rights
 * @route   GET /api/v1/content/fundamental-rights
 * @access  Public
 */
const getFundamentalRights = async (req, res) => {
  try {
    const { language = 'en' } = req.query;

    const rights = await Content.find({
      contentType: 'fundamental-right',
      isActive: true
    }).sort({ articleNumber: 1 });

    const localizedRights = rights.map(right => ({
      ...right.toObject(),
      localizedContent: right.getLocalizedContent(language)
    }));

    res.status(200).json({
      success: true,
      count: rights.length,
      data: { rights: localizedRights }
    });

  } catch (error) {
    console.error('Get fundamental rights error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fundamental rights',
      error: error.message
    });
  }
};

/**
 * @desc    Get directive principles
 * @route   GET /api/v1/content/directive-principles
 * @access  Public
 */
const getDirectivePrinciples = async (req, res) => {
  try {
    const { language = 'en' } = req.query;

    const principles = await Content.find({
      contentType: 'directive-principle',
      isActive: true
    }).sort({ articleNumber: 1 });

    const localizedPrinciples = principles.map(principle => ({
      ...principle.toObject(),
      localizedContent: principle.getLocalizedContent(language)
    }));

    res.status(200).json({
      success: true,
      count: principles.length,
      data: { principles: localizedPrinciples }
    });

  } catch (error) {
    console.error('Get directive principles error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch directive principles',
      error: error.message
    });
  }
};

/**
 * @desc    Get fundamental duties
 * @route   GET /api/v1/content/fundamental-duties
 * @access  Public
 */
const getFundamentalDuties = async (req, res) => {
  try {
    const { language = 'en' } = req.query;

    const duties = await Content.find({
      contentType: 'fundamental-duty',
      isActive: true
    }).sort({ articleNumber: 1 });

    const localizedDuties = duties.map(duty => ({
      ...duty.toObject(),
      localizedContent: duty.getLocalizedContent(language)
    }));

    res.status(200).json({
      success: true,
      count: duties.length,
      data: { duties: localizedDuties }
    });

  } catch (error) {
    console.error('Get fundamental duties error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fundamental duties',
      error: error.message
    });
  }
};

/**
 * @desc    Get preamble
 * @route   GET /api/v1/content/preamble
 * @access  Public
 */
const getPreamble = async (req, res) => {
  try {
    const { language = 'en' } = req.query;

    const preamble = await Content.findOne({
      contentType: 'preamble',
      isActive: true
    });

    if (!preamble) {
      return res.status(404).json({
        success: false,
        message: 'Preamble not found'
      });
    }

    const localizedPreamble = preamble.getLocalizedContent(language);

    res.status(200).json({
      success: true,
      data: {
        preamble: {
          ...preamble.toObject(),
          localizedContent: localizedPreamble
        }
      }
    });

  } catch (error) {
    console.error('Get preamble error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch preamble',
      error: error.message
    });
  }
};

/**
 * @desc    Search content
 * @route   GET /api/v1/content/search
 * @access  Public
 */
const searchContent = async (req, res) => {
  try {
    const { q, contentType, difficulty, limit = 20, language = 'en' } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const results = await Content.searchContent(q, {
      contentType,
      difficulty,
      limit: parseInt(limit)
    });

    const localizedResults = results.map(content => ({
      ...content.toObject(),
      localizedContent: content.getLocalizedContent(language)
    }));

    res.status(200).json({
      success: true,
      count: results.length,
      data: { results: localizedResults }
    });

  } catch (error) {
    console.error('Search content error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};

/**
 * @desc    Create new content (Admin only)
 * @route   POST /api/v1/content
 * @access  Private/Admin
 */
const createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: { content }
    });

  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create content',
      error: error.message
    });
  }
};

/**
 * @desc    Update content (Admin only)
 * @route   PUT /api/v1/content/:id
 * @access  Private/Admin
 */
const updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: { content }
    });

  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update content',
      error: error.message
    });
  }
};

/**
 * @desc    Delete content (Admin only)
 * @route   DELETE /api/v1/content/:id
 * @access  Private/Admin
 */
const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully'
    });

  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete content',
      error: error.message
    });
  }
};

module.exports = {
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
};
