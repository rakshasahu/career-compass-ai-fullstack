const mongoose = require('mongoose');

/**
 * Skill Schema / Roadmap
 * Tracks skills the user wants to learn or is learning,
 * along with their proficiency and learning resources.
 */
const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'devops', 'data', 'design', 'soft-skills', 'other'],
      default: 'other',
    },
    proficiency: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner',
    },
    status: {
      type: String,
      enum: ['not-started', 'learning', 'practicing', 'mastered'],
      default: 'not-started',
    },
    resources: [
      {
        title: { type: String },
        url: { type: String },
        type: {
          type: String,
          enum: ['course', 'article', 'video', 'book', 'project', 'other'],
        },
      },
    ],
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', skillSchema);
