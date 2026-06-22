import { useState, useEffect } from 'react';
import { skillsAPI } from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiTrendingUp, FiPlus, FiTrash2 } from 'react-icons/fi';

const STATUS_BADGES = {
  'not-started': 'badge-info',
  learning: 'badge-warning',
  practicing: 'badge-warning',
  mastered: 'badge-success',
};

/**
 * Skill Roadmap Page
 *
 * Manage skills the user is learning, with proficiency tracking.
 */
export default function SkillRoadmap() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'other', proficiency: 'beginner', notes: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await skillsAPI.getAll();
      setSkills(res.data);
    } catch (err) {
      console.error('Fetch skills error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name) { setError('Skill name is required'); return; }

    try {
      const res = await skillsAPI.create(formData);
      setSkills((prev) => [res.data, ...prev]);
      setFormData({ name: '', category: 'other', proficiency: 'beginner', notes: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create skill');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const res = await skillsAPI.update(id, updates);
      setSkills((prev) => prev.map((s) => (s._id === id ? res.data : s)));
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await skillsAPI.delete(id);
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) return <LoadingSpinner message="Loading skills roadmap..." />;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skill Roadmap</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Plan and track your skill development</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <FiPlus className="mr-1.5" size={18} />
          Add Skill
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-slide-down">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">New Skill</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input placeholder="Skill name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" />
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="devops">DevOps</option>
                <option value="data">Data</option>
                <option value="design">Design</option>
                <option value="soft-skills">Soft Skills</option>
                <option value="other">Other</option>
              </select>
              <select value={formData.proficiency} onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })} className="input-field">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <textarea placeholder="Notes / Resources" rows={2} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="input-field" />
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {skills.length === 0 ? (
        <div className="card p-12 text-center">
          <FiTrendingUp className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No skills added yet.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Add Your First Skill</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill._id} className="card p-5 animate-fade-in">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{skill.category}</span>
                    <span className={STATUS_BADGES[skill.status] || 'badge-info'}>{skill.status}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(skill._id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                  <FiTrash2 size={16} />
                </button>
              </div>

              {/* Proficiency bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Proficiency</span>
                  <span className="capitalize">{skill.proficiency}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      skill.proficiency === 'expert' ? 'w-full bg-green-500' :
                      skill.proficiency === 'advanced' ? 'w-3/4 bg-blue-500' :
                      skill.proficiency === 'intermediate' ? 'w-1/2 bg-yellow-500' :
                      'w-1/4 bg-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Quick status update */}
              <div className="flex items-center gap-2">
                <select
                  value={skill.status}
                  onChange={(e) => handleUpdate(skill._id, { status: e.target.value })}
                  className="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-full"
                >
                  <option value="not-started">Not Started</option>
                  <option value="learning">Learning</option>
                  <option value="practicing">Practicing</option>
                  <option value="mastered">Mastered</option>
                </select>
                <select
                  value={skill.proficiency}
                  onChange={(e) => handleUpdate(skill._id, { proficiency: e.target.value })}
                  className="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-full"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
