const Book = require('../models/Book');
const Chapter = require('../models/Chapter');

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res, next) => {
  try {
    const { title, description, coverImage } = req.body;
    const book = await Book.create({
      title,
      description,
      coverImage,
      author: req.user._id,
    });
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all books (public)
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments();

    res.json({
      success: true,
      data: books,
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

// @desc    Get a single book with chapter list (but NOT full content)
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author', 'username profilePicture')
      .populate('chapters', 'title order'); // only meta, not content

    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    res.json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a chapter to a book
// @route   POST /api/books/:bookId/chapters
// @access  Private (only author)
const addChapter = async (req, res, next) => {
  try {
    const { title, content, order } = req.body;
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Check if user is the author
    if (book.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to add chapters to this book');
    }

    // Check if order is unique
    const existingChapter = await Chapter.findOne({ book: book._id, order });
    if (existingChapter) {
      res.status(400);
      throw new Error('Chapter order already exists. Please use a different order number.');
    }

    const chapter = await Chapter.create({
      book: book._id,
      title,
      content,
      order,
    });

    book.chapters.push(chapter._id);
    await book.save();

    res.status(201).json({ success: true, data: chapter });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single chapter (content only, no bulk)
// @route   GET /api/books/chapters/:chapterId
// @access  Public (but could be made private)
const getChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId)
      .populate('book', 'title author');

    if (!chapter) {
      res.status(404);
      throw new Error('Chapter not found');
    }

    res.json({ success: true, data: chapter });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBook, getBooks, getBookById, addChapter, getChapter };