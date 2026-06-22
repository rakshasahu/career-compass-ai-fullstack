import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AIMentor from './pages/AIMentor';
import Internships from './pages/Internships';
import ResumeBuilder from './pages/ResumeBuilder';
import SkillRoadmap from './pages/SkillRoadmap';
import GoalTracker from './pages/GoalTracker';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Landing page has its own navbar; auth pages have no sidebar
  const isLanding = location.pathname === '/';
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {!isLanding && !isAuthPage && user && <Navbar />}

      <div className="flex">
        {/* Sidebar — only on authenticated pages */}
        {!isLanding && !isAuthPage && user && (
          <Sidebar />
        )}

        {/* Main content area */}
        <main
          className={`flex-1 min-h-screen transition-all duration-300 ${
            !isLanding && !isAuthPage && user ? 'ml-64 pt-16' : ''
          }`}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route
              path="/ai-mentor"
              element={<ProtectedRoute><AIMentor /></ProtectedRoute>}
            />
            <Route
              path="/internships"
              element={<ProtectedRoute><Internships /></ProtectedRoute>}
            />
            <Route
              path="/resume-builder"
              element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>}
            />
            <Route
              path="/skill-roadmap"
              element={<ProtectedRoute><SkillRoadmap /></ProtectedRoute>}
            />
            <Route
              path="/goals"
              element={<ProtectedRoute><GoalTracker /></ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />
            <Route
              path="/settings"
              element={<ProtectedRoute><Settings /></ProtectedRoute>}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
