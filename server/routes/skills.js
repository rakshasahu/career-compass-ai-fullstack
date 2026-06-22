const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skills');

// All routes require authentication
router.use(protect);

// GET  /api/skills       — List all skills
router.get('/', getSkills);

// POST /api/skills       — Create a new skill
router.post('/', createSkill);

// PUT  /api/skills/:id   — Update a skill
router.put('/:id', updateSkill);

// DELETE /api/skills/:id — Delete a skill
router.delete('/:id', deleteSkill);

module.exports = router;
