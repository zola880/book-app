const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createBook,
  getBooks,
  getBookById,
  addChapter,
  getChapter,
} = require('../controllers/bookController');
const router = express.Router();

router.route('/')
  .post(protect, createBook)
  .get(getBooks);

router.route('/:id')
  .get(getBookById);

router.route('/:bookId/chapters')
  .post(protect, addChapter);

router.route('/chapters/:chapterId')
  .get(getChapter);

module.exports = router;