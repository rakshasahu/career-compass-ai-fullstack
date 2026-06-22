const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} = require('../controllers/internships');

// All routes require authentication
router.use(protect);

// GET  /api/internships       — List all internships
router.get('/', getInternships);

// POST /api/internships       — Create a new entry
router.post('/', createInternship);

// PUT  /api/internships/:id   — Update an entry
router.put('/:id', updateInternship);

// DELETE /api/internships/:id — Delete an entry
router.delete('/:id', deleteInternship);

module.exports = router;
