const mongoose = require('mongoose');

/**
 * Internship Schema
 * Tracks internship applications, status, and related details.
 */
const internshipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    location: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['saved', 'applied', 'interviewing', 'offered', 'rejected', 'accepted'],
      default: 'saved',
    },
    applicationDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    salary: {
      type: String,
      default: '',
    },
    contactName: {
      type: String,
      default: '',
    },
    contactEmail: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Internship', internshipSchema);
