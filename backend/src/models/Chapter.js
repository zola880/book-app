const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique order per book
ChapterSchema.index({ book: 1, order: 1 }, { unique: true });

module.exports = mongoose.model('Chapter', ChapterSchema);