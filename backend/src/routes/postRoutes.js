const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createPost,
  getFeed,
  getPostById,
  toggleLike,
} = require('../controllers/postController');
const router = express.Router();

router.route('/')
  .post(protect, createPost);

router.get('/feed', protect, getFeed);

router.route('/:id')
  .get(protect, getPostById);

router.post('/:id/like', protect, toggleLike);

module.exports = router;