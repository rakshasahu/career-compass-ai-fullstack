import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  HiChat,
  HiBriefcase,
  HiDocumentText,
  HiLightningBolt,
  HiFlag,
  HiMenu,
  HiX,
} from 'react-icons/hi';
import { FiTrendingUp, FiSun, FiMoon, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

/**
 * Landing Page
 *
 * Modern, animated landing page with feature highlights,
 * testimonials, and call-to-action sections.
 */
export default function Landing() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: HiChat,
      title: 'AI Career Mentor',
      description: 'Get personalized career advice, interview tips, and guidance from your AI mentor.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: HiBriefcase,
      title: 'Internship Tracker',
      description: 'Track applications, manage interviews, and land your dream internship.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: HiDocumentText,
      title: 'Resume Builder',
      description: 'Build professional resumes with easy-to-use templates and export options.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Skill Roadmap',
      description: 'Plan your learning journey with structured skill roadmaps and resources.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: HiFlag,
      title: 'Goal Tracker',
      description: 'Set career goals, track progress, and celebrate your achievements.',
      color: 'from-primary-500 to-accent-500',
    },
    {
      icon: HiLightningBolt,
      title: 'Smart Insights',
      description: 'Get data-driven insights about your career progress and next steps.',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── Navigation ────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CC</span>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Career <span className="gradient-text">Compass</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                How It Works
              </a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
              {user ? (
                <Link to="/dashboard" className="btn-primary text-sm">
                  Dashboard
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 animate-slide-down">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-sm font-medium text-gray-600 dark:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="block text-sm font-medium text-gray-600 dark:text-gray-400" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </a>
              {user ? (
                <Link to="/dashboard" className="block btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="block text-center btn-secondary" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/register" className="block text-center btn-primary" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero Section ──────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
              AI-Powered Career Guidance
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Your Personal
            <span className="block mt-2 gradient-text">Career Navigator</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 animate-fade-in">
            Navigate your career journey with AI-powered mentorship, smart goal tracking,
            internship management, and professional resume building — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
                Go to Dashboard
                <FiArrowRight className="ml-2" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary text-lg px-8 py-3">
                  Start Free
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '50K+', label: 'Goals Created' },
              { value: '5K+', label: 'Resumes Built' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ──────────────────────── */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to
              <span className="block gradient-text">Advance Your Career</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful tools designed to help you navigate every step of your career journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-hover p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="text-white" size={22} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get started in minutes and see results quickly.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up for free and set up your career profile in under 2 minutes.',
              },
              {
                step: '02',
                title: 'Set Your Goals',
                description: 'Define your career objectives and let our AI mentor guide you.',
              },
              {
                step: '03',
                title: 'Track & Grow',
                description: 'Manage internships, build resumes, learn skills, and track your progress.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-6 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ───────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-bg rounded-2xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Navigate Your Career?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Join thousands of professionals who are taking control of their career journey with AI-powered guidance.
            </p>
            {user ? (
              <Link to="/dashboard" className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">
                Go to Dashboard <FiArrowRight />
              </Link>
            ) : (
              <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors">
                Get Started Free <FiArrowRight />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────── */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">CC</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Career Compass AI
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Career Compass AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
