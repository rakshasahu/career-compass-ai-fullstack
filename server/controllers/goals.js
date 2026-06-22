const Goal = require('../models/Goal');

/**
 * @desc    Get all goals for the authenticated user
 * @route   GET /api/goals
 * @access  Private
 */
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    console.error('Get goals error:', error.message);
    res.status(500).json({ message: 'Server error fetching goals' });
  }
};

/**
 * @desc    Create a new goal
 * @route   POST /api/goals
 * @access  Private
 */
const createGoal = async (req, res) => {
  try {
    const { title, description, category, priority, deadline } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Goal title is required' });
    }

    const goal = await Goal.create({
      user: req.user._id,
      title,
      description,
      category,
      priority,
      deadline,
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error('Create goal error:', error.message);
    res.status(500).json({ message: 'Server error creating goal' });
  }
};

/**
 * @desc    Update a goal
 * @route   PUT /api/goals/:id
 * @access  Private
 */
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const { title, description, category, priority, status, progress, deadline } = req.body;

    if (title !== undefined) goal.title = title;
    if (description !== undefined) goal.description = description;
    if (category !== undefined) goal.category = category;
    if (priority !== undefined) goal.priority = priority;
    if (status !== undefined) {
      goal.status = status;
      if (status === 'completed') {
        goal.completedAt = new Date();
        goal.progress = 100;
      }
    }
    if (progress !== undefined) goal.progress = progress;
    if (deadline !== undefined) goal.deadline = deadline;

    const updated = await goal.save();
    res.json(updated);
  } catch (error) {
    console.error('Update goal error:', error.message);
    res.status(500).json({ message: 'Server error updating goal' });
  }
};

/**
 * @desc    Delete a goal
 * @route   DELETE /api/goals/:id
 * @access  Private
 */
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Delete goal error:', error.message);
    res.status(500).json({ message: 'Server error deleting goal' });
  }
};

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
