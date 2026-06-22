import { useState, useEffect } from 'react';
import { goalsAPI } from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiFlag, HiPlus, HiTrash } from 'react-icons/hi';

/**
 * Goal Tracker Page
 *
 * CRUD interface for career goals with progress tracking.
 */
export default function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'career',
    priority: 'medium',
    deadline: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await goalsAPI.getAll();
      setGoals(res.data);
    } catch (err) {
      console.error('Fetch goals error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title) {
      setError('Goal title is required');
      return;
    }

    try {
      const res = await goalsAPI.create({
        ...formData,
        deadline: formData.deadline || undefined,
      });
      setGoals((prev) => [res.data, ...prev]);
      setFormData({ title: '', description: '', category: 'career', priority: 'medium', deadline: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create goal');
    }
  };

  const handleProgressUpdate = async (goal, newProgress) => {
    try {
      const res = await goalsAPI.update(goal._id, {
        progress: newProgress,
        status: newProgress === 100 ? 'completed' : newProgress > 0 ? 'in-progress' : 'not-started',
      });
      setGoals((prev) => prev.map((g) => (g._id === goal._id ? res.data : g)));
    } catch (err) {
      console.error('Progress update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this goal?')) return;
    try {
      await goalsAPI.delete(id);
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) return <LoadingSpinner message="Loading goals..." />;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Goal Tracker</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Set and track your career goals</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <HiPlus className="mr-1.5" size={18} />
          New Goal
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-slide-down">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Create New Goal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}
            <input
              placeholder="Goal title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Description"
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                <option value="career">Career</option>
                <option value="skill">Skill</option>
                <option value="education">Education</option>
                <option value="networking">Networking</option>
                <option value="other">Other</option>
              </select>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="input-field"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Goals list */}
      {goals.length === 0 ? (
        <div className="card p-12 text-center">
          <HiFlag className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No goals yet.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Create Your First Goal</button>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => (
            <div key={goal._id} className="card p-5 animate-fade-in">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        goal.status === 'completed' ? 'bg-green-500' :
                        goal.status === 'in-progress' ? 'bg-yellow-500' :
                        goal.status === 'cancelled' ? 'bg-red-500' :
                        'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                    <span className={`badge ${
                      goal.priority === 'urgent' ? 'badge-danger' :
                      goal.priority === 'high' ? 'badge-warning' :
                      'badge-info'
                    }`}>
                      {goal.priority}
                    </span>
                    <span className="text-xs text-gray-400 capitalize">{goal.category}</span>
                  </div>
                  {goal.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{goal.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Progress slider */}
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) => handleProgressUpdate(goal, parseInt(e.target.value))}
                      className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-primary-600"
                    />
                    <span className="text-xs font-medium text-gray-500 w-8 text-right">{goal.progress}%</span>
                  </div>

                  <select
                    value={goal.status}
                    onChange={(e) => handleProgressUpdate(goal, e.target.value === 'completed' ? 100 : goal.progress)}
                    className="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button onClick={() => handleDelete(goal._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <HiTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
