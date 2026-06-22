# 🧭 Career Compass AI

> Your personal AI-powered career navigator — track goals, manage internships, build resumes, and get AI mentorship.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

| Feature | Description |
|---|---|
| **🤖 AI Career Mentor** | Chat with an AI mentor for career advice, interview tips, and guidance |
| **📋 Internship Tracker** | Track job applications, manage statuses, and organize your search |
| **📄 Resume Builder** | Create professional resumes with an easy-to-use builder |
| **🗺️ Skill Roadmap** | Plan and track skill development with proficiency levels |
| **🎯 Goal Tracker** | Set career goals, track progress, and celebrate achievements |
| **👤 Profile** | Manage your professional profile and preferences |
| **🌙 Dark/Light Mode** | Toggle between themes for comfortable viewing |

---

## 🚀 Tech Stack

### Frontend
- **React 18** with **Vite** for blazing-fast development
- **Tailwind CSS 3** for responsive, utility-first styling
- **React Router v6** for client-side routing
- **Axios** for API communication
- **React Icons** for beautiful icons

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **JWT** for secure authentication
- **bcryptjs** for password hashing
- **express-validator** for request validation

---

## 📁 Project Structure

```
career-compass-ai/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── api/                # API service layer
│   │   ├── components/         # Shared components
│   │   ├── contexts/           # React contexts (Auth, Theme)
│   │   └── pages/              # Page components
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/                     # Express.js backend
│   ├── config/                 # Database configuration
│   ├── controllers/            # Route controllers
│   ├── middleware/              # Auth middleware
│   ├── models/                 # Mongoose models
│   ├── routes/                 # Express routes
│   ├── server.js               # Entry point
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** v18+ and **npm** (or **bun**)
- **MongoDB** running locally or a cloud instance (Atlas)

### 1. Clone & Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/career-compass
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
AI_API_KEY=
CLIENT_URL=http://localhost:5173
```

> **Note:** `AI_API_KEY` is optional. If left empty, the AI Mentor uses intelligent mock responses so the app works without external APIs.

### 3. Start the Application

#### Option A: Start both servers (requires two terminals)

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

#### Option B: Using the provided scripts

```bash
# Start backend
npm run server

# Start frontend (in another terminal)
npm run client
```

The backend runs on **http://localhost:5000** and the frontend on **http://localhost:5173**.

### 4. Open the App

Visit **http://localhost:5173** in your browser. Create an account and start exploring!

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| PUT | `/api/auth/preferences` | Update preferences | Yes |
| GET | `/api/goals` | List all goals | Yes |
| POST | `/api/goals` | Create a goal | Yes |
| PUT | `/api/goals/:id` | Update a goal | Yes |
| DELETE | `/api/goals/:id` | Delete a goal | Yes |
| GET | `/api/internships` | List internships | Yes |
| POST | `/api/internships` | Create internship | Yes |
| PUT | `/api/internships/:id` | Update internship | Yes |
| DELETE | `/api/internships/:id` | Delete internship | Yes |
| GET | `/api/skills` | List skills | Yes |
| POST | `/api/skills` | Create skill | Yes |
| PUT | `/api/skills/:id` | Update skill | Yes |
| DELETE | `/api/skills/:id` | Delete skill | Yes |
| GET | `/api/resumes` | List resumes | Yes |
| GET | `/api/resumes/:id` | Get resume | Yes |
| POST | `/api/resumes` | Create resume | Yes |
| PUT | `/api/resumes/:id` | Update resume | Yes |
| DELETE | `/api/resumes/:id` | Delete resume | Yes |
| POST | `/api/ai-mentor/chat` | Chat with AI mentor | Yes |
| GET | `/api/health` | Health check | No |

---

## 🔐 Authentication

The app uses **JWT (JSON Web Tokens)** for authentication:

1. Register or login to receive a token
2. The token is stored in `localStorage`
3. All API requests automatically include the token in the `Authorization: Bearer <token>` header
4. Tokens expire after 7 days (configurable via `JWT_EXPIRES_IN`)

---

## 🌙 Dark Mode

Toggle between light and dark mode from the navbar. Your preference is saved in `localStorage` and persists across sessions. The app also respects your system's `prefers-color-scheme` setting on first visit.

---

## 🤖 AI Mentor

The AI Mentor provides contextual career advice. To use a real AI (e.g., OpenAI), set the `AI_API_KEY` in your `.env` file. The controller in `server/controllers/aiMentor.js` includes commented-out integration code.

Without an API key, the mentor returns intelligent mock responses covering:
- Resume writing tips
- Interview preparation
- Career change guidance
- Skill development roadmaps
- Internship search strategies

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/career-compass-ai/issues).

---

<p align="center">Made with ❤️ for career growth</p>
