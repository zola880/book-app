const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      author: req.user._id,
      title,
      content,
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Get feed (posts from users you follow + your own)
// @route   GET /api/posts/feed
// @access  Private
const getFeed = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user._id);
    const followingIds = user.following.map(id => id.toString());
    followingIds.push(req.user._id.toString());

    const posts = await Post.find({ author: { $in: followingIds } })
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ author: { $in: followingIds } });

    res.json({
      success: true,
      data: posts,
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

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Private
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profilePicture')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username profilePicture' },
      });

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Like / Unlike a post
// @route   POST /api/posts/:id/like
// @access  Private
const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    const alreadyLiked = post.likes.includes(req.user._id);
    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
      await post.save();
      res.json({ success: true, message: 'Post unliked', liked: false });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      res.json({ success: true, message: 'Post liked', liked: true });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createPost, getFeed, getPostById, toggleLike };
