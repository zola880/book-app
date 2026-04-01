const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
} = require('../controllers/userController');
const router = express.Router();

router.route('/:id')
  .get(protect, getUserProfile);

router.route('/profile')
  .put(protect, updateUserProfile);

router.route('/:id/follow')
  .post(protect, followUser)
  .delete(protect, unfollowUser);

module.exports = router;