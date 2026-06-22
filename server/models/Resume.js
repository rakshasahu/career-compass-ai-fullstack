const mongoose = require('mongoose');

/**
 * Resume Schema
 * Stores resume data for the built-in resume builder.
 */
const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: 'My Resume',
      trim: true,
    },
    contact: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      website: { type: String, default: '' },
    },
    summary: {
      type: String,
      default: '',
    },
    experience: [
      {
        company: { type: String },
        role: { type: String },
        location: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        gpa: { type: String },
      },
    ],
    skills: [
      {
        name: { type: String },
        level: { type: String },
      },
    ],
    projects: [
      {
        name: { type: String },
        description: { type: String },
        url: { type: String },
        technologies: { type: String },
      },
    ],
    certifications: [
      {
        name: { type: String },
        issuer: { type: String },
        date: { type: String },
        url: { type: String },
      },
    ],
    template: {
      type: String,
      enum: ['modern', 'classic', 'minimal'],
      default: 'modern',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
