const mongoose = require('mongoose');

/**
 * Goal Schema
 * Tracks career goals with deadline and progress.
 */
const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Goal title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      enum: ['career', 'skill', 'education', 'networking', 'other'],
      default: 'career',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed', 'cancelled'],
      default: 'not-started',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    deadline: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
