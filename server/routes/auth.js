const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getMe, updateProfile, updatePreferences } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

/**
 * Validation rules
 */
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// ─── Routes ────────────────────────────────────────

// POST /api/auth/register — Create a new account
router.post('/register', registerValidation, register);

// POST /api/auth/login — Sign in
router.post('/login', loginValidation, login);

// GET /api/auth/me — Get current user (protected)
router.get('/me', protect, getMe);

// PUT /api/auth/profile — Update profile (protected)
router.put('/profile', protect, updateProfile);

// PUT /api/auth/preferences — Update preferences (protected)
router.put('/preferences', protect, updatePreferences);

module.exports = router;
