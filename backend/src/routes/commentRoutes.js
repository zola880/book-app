const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addComment, getComments } = require('../controllers/commentController');
const router = express.Router();

router.route('/:postId')
  .post(protect, addComment)
  .get(protect, getComments);

module.exports = router;