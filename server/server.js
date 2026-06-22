require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// ─── Database Connection ───────────────────────────
connectDB();

// ─── Express App Setup ─────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/ai-mentor', require('./routes/aiMentor'));

// ─── Health Check ──────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ─── Global Error Handler ──────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ─── Start Server ──────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║     Career Compass AI - Backend API      ║
║     Server running on port ${PORT}         ║
║     Environment: ${process.env.NODE_ENV || 'development'}           ║
╚══════════════════════════════════════════╝
  `);
});
