const Internship = require('../models/Internship');

/**
 * @desc    Get all internships for the authenticated user
 * @route   GET /api/internships
 * @access  Private
 */
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(internships);
  } catch (error) {
    console.error('Get internships error:', error.message);
    res.status(500).json({ message: 'Server error fetching internships' });
  }
};

/**
 * @desc    Create a new internship entry
 * @route   POST /api/internships
 * @access  Private
 */
const createInternship = async (req, res) => {
  try {
    const { company, role, location, url, status, notes, salary, contactName, contactEmail } =
      req.body;

    if (!company || !role) {
      return res.status(400).json({ message: 'Company and role are required' });
    }

    const internship = await Internship.create({
      user: req.user._id,
      company,
      role,
      location,
      url,
      status,
      notes,
      salary,
      contactName,
      contactEmail,
    });

    res.status(201).json(internship);
  } catch (error) {
    console.error('Create internship error:', error.message);
    res.status(500).json({ message: 'Server error creating internship' });
  }
};

/**
 * @desc    Update an internship entry
 * @route   PUT /api/internships/:id
 * @access  Private
 */
const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    const fields = [
      'company', 'role', 'location', 'url', 'status',
      'applicationDate', 'notes', 'salary', 'contactName', 'contactEmail',
    ];

    for (const field of fields) {
      if (req.body[field] !== undefined) {
        internship[field] = req.body[field];
      }
    }

    const updated = await internship.save();
    res.json(updated);
  } catch (error) {
    console.error('Update internship error:', error.message);
    res.status(500).json({ message: 'Server error updating internship' });
  }
};

/**
 * @desc    Delete an internship entry
 * @route   DELETE /api/internships/:id
 * @access  Private
 */
const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    console.error('Delete internship error:', error.message);
    res.status(500).json({ message: 'Server error deleting internship' });
  }
};

module.exports = { getInternships, createInternship, updateInternship, deleteInternship };
