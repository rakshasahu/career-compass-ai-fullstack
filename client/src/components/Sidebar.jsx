import { NavLink } from 'react-router-dom';
import {
  HiHome,
  HiChat,
  HiBriefcase,
  HiDocumentText,
  HiLightningBolt,
  HiFlag,
} from 'react-icons/hi';
import { FiTrendingUp } from 'react-icons/fi';

/**
 * Sidebar Navigation
 *
 * Persistent sidebar on authenticated pages.
 * Collapsible on mobile via a toggle in Navbar.
 */

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HiHome },
  { path: '/ai-mentor', label: 'AI Mentor', icon: HiChat },
  { path: '/internships', label: 'Internships', icon: HiBriefcase },
  { path: '/resume-builder', label: 'Resume Builder', icon: HiDocumentText },
  { path: '/skill-roadmap', label: 'Skill Roadmap', icon: FiTrendingUp },
  { path: '/goals', label: 'Goal Tracker', icon: HiFlag },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-colors duration-300">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Quick tip section */}
      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-100 dark:border-primary-800/30">
        <p className="text-xs font-medium text-primary-700 dark:text-primary-400 mb-1">
          💡 Pro Tip
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Set daily career goals and track your progress with the Goal Tracker!
        </p>
      </div>
    </aside>
  );
}
