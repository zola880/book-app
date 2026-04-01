const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', BookSchema);