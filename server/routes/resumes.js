const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
} = require('../controllers/resumes');

// All routes require authentication
router.use(protect);

// GET  /api/resumes       — List all resumes
router.get('/', getResumes);

// GET  /api/resumes/:id   — Get a single resume
router.get('/:id', getResume);

// POST /api/resumes       — Create a new resume
router.post('/', createResume);

// PUT  /api/resumes/:id   — Update a resume
router.put('/:id', updateResume);

// DELETE /api/resumes/:id — Delete a resume
router.delete('/:id', deleteResume);

module.exports = router;
