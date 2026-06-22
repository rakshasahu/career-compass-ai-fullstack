const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goals');

// All routes require authentication
router.use(protect);

// GET  /api/goals       — List all goals
router.get('/', getGoals);

// POST /api/goals       — Create a new goal
router.post('/', createGoal);

// PUT  /api/goals/:id   — Update a goal
router.put('/:id', updateGoal);

// DELETE /api/goals/:id — Delete a goal
router.delete('/:id', deleteGoal);

module.exports = router;
