const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile (authenticated user)
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.username = req.body.username || user.username;
    user.bio = req.body.bio || user.bio;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Follow a user
// @route   POST /api/users/:id/follow
// @access  Private
const followUser = async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      res.status(404);
      throw new Error('User not found');
    }

    if (userToFollow._id.toString() === currentUser._id.toString()) {
      res.status(400);
      throw new Error('You cannot follow yourself');
    }

    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();
    }

    res.json({ success: true, message: 'User followed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Unfollow a user
// @route   DELETE /api/users/:id/follow
// @access  Private
const unfollowUser = async (req, res, next) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      res.status(404);
      throw new Error('User not found');
    }

    if (currentUser.following.includes(userToUnfollow._id)) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userToUnfollow._id.toString()
      );
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
      await currentUser.save();
      await userToUnfollow.save();
    }

    res.json({ success: true, message: 'User unfollowed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile, followUser, unfollowUser };