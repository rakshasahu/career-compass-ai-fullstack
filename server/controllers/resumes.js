const Resume = require('../models/Resume');

/**
 * @desc    Get all resumes for the authenticated user
 * @route   GET /api/resumes
 * @access  Private
 */
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error.message);
    res.status(500).json({ message: 'Server error fetching resumes' });
  }
};

/**
 * @desc    Get a single resume by ID
 * @route   GET /api/resumes/:id
 * @access  Private
 */
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error.message);
    res.status(500).json({ message: 'Server error fetching resume' });
  }
};

/**
 * @desc    Create a new resume
 * @route   POST /api/resumes
 * @access  Private
 */
const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    const resume = await Resume.create({
      user: req.user._id,
      title: title || 'My Resume',
      contact: {
        fullName: req.user.name || '',
        email: req.user.email || '',
      },
    });
    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error.message);
    res.status(500).json({ message: 'Server error creating resume' });
  }
};

/**
 * @desc    Update a resume
 * @route   PUT /api/resumes/:id
 * @access  Private
 */
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const fields = [
      'title', 'contact', 'summary', 'experience',
      'education', 'skills', 'projects', 'certifications', 'template',
    ];

    for (const field of fields) {
      if (req.body[field] !== undefined) {
        resume[field] = req.body[field];
      }
    }

    const updated = await resume.save();
    res.json(updated);
  } catch (error) {
    console.error('Update resume error:', error.message);
    res.status(500).json({ message: 'Server error updating resume' });
  }
};

/**
 * @desc    Delete a resume
 * @route   DELETE /api/resumes/:id
 * @access  Private
 */
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error.message);
    res.status(500).json({ message: 'Server error deleting resume' });
  }
};

module.exports = { getResumes, getResume, createResume, updateResume, deleteResume };
