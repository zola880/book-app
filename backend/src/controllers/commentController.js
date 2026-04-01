const Comment = require('../models/Comment');
const Post = require('../models/Post');

// @desc    Add comment to a post
// @route   POST /api/comments/:postId
// @access  Private
const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    const comment = await Comment.create({
      post: post._id,
      user: req.user._id,
      text,
    });

    // Add comment reference to post
    post.comments.push(comment._id);
    await post.save();

    // Populate user info before sending
    await comment.populate('user', 'username profilePicture');

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comments for a post (paginated)
// @route   GET /api/comments/:postId
// @access  Private
const getComments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({ post: req.params.postId });

    res.json({
      success: true,
      data: comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, getComments };