import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { authAPI } from '../api/axios';
import { FiSun, FiMoon, FiSave, FiLogOut } from 'react-icons/fi';

/**
 * Settings Page
 *
 * Manage app preferences including theme and notifications.
 */
export default function Settings() {
  const { user, logout, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(
    user?.preferences?.emailNotifications !== false
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSavePreferences = async () => {
    setSaving(true);
    setMessage('');

    try {
      await authAPI.updatePreferences({
        theme: isDark ? 'dark' : 'light',
        emailNotifications,
      });
      setMessage('Preferences saved successfully!');
    } catch (err) {
      setMessage('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Theme */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark/light theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isDark ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform flex items-center justify-center ${
                  isDark ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              >
                {isDark ? <FiMoon size={12} className="text-primary-600" /> : <FiSun size={12} className="text-yellow-500" />}
              </div>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your goals and activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600" />
            </label>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center justify-between">
          <button onClick={handleSavePreferences} disabled={saving} className="btn-primary">
            <FiSave className="mr-1.5" size={18} />
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('success')
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}>
            {message}
          </div>
        )}

        {/* Danger zone */}
        <div className="card p-6 border-red-200 dark:border-red-900/50">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Sign Out</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You will be redirected to the login page.
          </p>
          <button onClick={logout} className="btn-danger">
            <FiLogOut className="mr-1.5" size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
