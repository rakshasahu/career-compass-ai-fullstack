const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { chat } = require('../controllers/aiMentor');

// POST /api/ai-mentor/chat — Send a message to the AI Mentor
router.post('/chat', protect, chat);

module.exports = router;
