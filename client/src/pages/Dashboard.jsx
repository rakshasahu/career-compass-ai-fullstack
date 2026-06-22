import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { goalsAPI, internshipsAPI, skillsAPI } from '../api/axios';
import {
  HiChat,
  HiBriefcase,
  HiDocumentText,
  HiFlag,
  HiLightningBolt,
  HiArrowRight,
} from 'react-icons/hi';
import { FiTrendingUp } from 'react-icons/fi';

/**
 * Dashboard Page
 *
 * Main landing page after login. Shows overview of goals,
 * internships, skills, and quick actions.
 */
export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ goals: 0, internships: 0, skills: 0 });
  const [recentGoals, setRecentGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsRes, internshipsRes, skillsRes] = await Promise.all([
          goalsAPI.getAll(),
          internshipsAPI.getAll(),
          skillsAPI.getAll(),
        ]);
        setStats({
          goals: goalsRes.data.length,
          internships: internshipsRes.data.length,
          skills: skillsRes.data.length,
        });
        setRecentGoals(goalsRes.data.slice(0, 3));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const quickActions = [
    {
      title: 'Chat with AI Mentor',
      description: 'Get personalized career advice',
      icon: HiChat,
      path: '/ai-mentor',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Track Internships',
      description: 'Manage your applications',
      icon: HiBriefcase,
      path: '/internships',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Build Resume',
      description: 'Create professional resumes',
      icon: HiDocumentText,
      path: '/resume-builder',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Skill Roadmap',
      description: 'Plan your learning journey',
      icon: FiTrendingUp,
      path: '/skill-roadmap',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Goal Tracker',
      description: 'Track your career goals',
      icon: HiFlag,
      path: '/goals',
      color: 'from-primary-500 to-accent-500',
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here&apos;s an overview of your career journey.
        </p>
      </div>

      {/* Stats cards */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-slide-up">
          <div className="card-hover p-5">
            <div className="flex items-center justify-between mb-3">
              <HiFlag className="text-primary-500" size={24} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.goals}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Career Goals</p>
          </div>

          <div className="card-hover p-5">
            <div className="flex items-center justify-between mb-3">
              <HiBriefcase className="text-accent-500" size={24} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.internships}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Internships Tracked</p>
          </div>

          <div className="card-hover p-5">
            <div className="flex items-center justify-between mb-3">
              <FiTrendingUp className="text-green-500" size={24} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.skills}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Skills Learning</p>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="card-hover p-5 flex items-start gap-4 group"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}
              >
                <action.icon className="text-white" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {action.description}
                </p>
              </div>
              <HiArrowRight className="text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" size={16} />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent goals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Goals
          </h2>
          <Link to="/goals" className="text-sm text-primary-600 hover:text-primary-500 font-medium">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="card p-8 text-center text-gray-400">
            Loading goals...
          </div>
        ) : recentGoals.length > 0 ? (
          <div className="space-y-3">
            {recentGoals.map((goal) => (
              <div key={goal._id} className="card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      goal.status === 'completed'
                        ? 'bg-green-500'
                        : goal.status === 'in-progress'
                        ? 'bg-yellow-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {goal.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {goal.status} &middot; {goal.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {goal.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <HiFlag className="mx-auto text-gray-300 dark:text-gray-600 mb-3" size={36} />
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No goals yet. Start setting your career goals!
            </p>
            <Link to="/goals" className="btn-primary text-sm">
              Create Your First Goal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
