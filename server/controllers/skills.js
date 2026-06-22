const Skill = require('../models/Skill');

/**
 * @desc    Get all skills for the authenticated user
 * @route   GET /api/skills
 * @access  Private
 */
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    console.error('Get skills error:', error.message);
    res.status(500).json({ message: 'Server error fetching skills' });
  }
};

/**
 * @desc    Create a new skill
 * @route   POST /api/skills
 * @access  Private
 */
const createSkill = async (req, res) => {
  try {
    const { name, category, proficiency, status, notes } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }

    const skill = await Skill.create({
      user: req.user._id,
      name,
      category: category || 'other',
      proficiency: proficiency || 'beginner',
      status: status || 'not-started',
      notes,
    });

    res.status(201).json(skill);
  } catch (error) {
    console.error('Create skill error:', error.message);
    res.status(500).json({ message: 'Server error creating skill' });
  }
};

/**
 * @desc    Update a skill
 * @route   PUT /api/skills/:id
 * @access  Private
 */
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, user: req.user._id });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    const fields = ['name', 'category', 'proficiency', 'status', 'notes', 'resources'];
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        skill[field] = req.body[field];
      }
    }

    const updated = await skill.save();
    res.json(updated);
  } catch (error) {
    console.error('Update skill error:', error.message);
    res.status(500).json({ message: 'Server error updating skill' });
  }
};

/**
 * @desc    Delete a skill
 * @route   DELETE /api/skills/:id
 * @access  Private
 */
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error.message);
    res.status(500).json({ message: 'Server error deleting skill' });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
