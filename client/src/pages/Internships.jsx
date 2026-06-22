import { useState, useEffect } from 'react';
import { internshipsAPI } from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiBriefcase, HiPlus, HiTrash, HiExternalLink } from 'react-icons/hi';

const STATUS_COLORS = {
  saved: 'badge-info',
  applied: 'badge-warning',
  interviewing: 'badge-warning',
  offered: 'badge-success',
  rejected: 'badge-danger',
  accepted: 'badge-success',
};

/**
 * Internships Page
 *
 * Track and manage internship applications with status updates.
 */
export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ company: '', role: '', location: '', url: '', notes: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await internshipsAPI.getAll();
      setInternships(res.data);
    } catch (err) {
      console.error('Fetch internships error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.company || !formData.role) {
      setError('Company and role are required');
      return;
    }

    try {
      const res = await internshipsAPI.create(formData);
      setInternships((prev) => [res.data, ...prev]);
      setFormData({ company: '', role: '', location: '', url: '', notes: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create internship');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await internshipsAPI.update(id, {
        status,
        applicationDate: status === 'applied' ? new Date().toISOString() : undefined,
      });
      setInternships((prev) => prev.map((i) => (i._id === id ? res.data : i)));
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this internship entry?')) return;
    try {
      await internshipsAPI.delete(id);
      setInternships((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) return <LoadingSpinner message="Loading internships..." />;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Internship Tracker</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track your internship applications
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <HiPlus className="mr-1.5" size={18} />
          Add Internship
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-slide-down">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">New Internship</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="company"
                placeholder="Company *"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input-field"
              />
              <input
                name="role"
                placeholder="Role *"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="input-field"
              />
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-field"
              />
              <input
                name="url"
                placeholder="Application URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="input-field"
              />
            </div>
            <textarea
              name="notes"
              placeholder="Notes"
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field"
            />
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {internships.length === 0 ? (
        <div className="card p-12 text-center">
          <HiBriefcase className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No internships tracked yet.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Add Your First Internship</button>
        </div>
      ) : (
        <div className="space-y-3">
          {internships.map((internship) => (
            <div key={internship._id} className="card p-5 animate-fade-in">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {internship.role}
                    </h3>
                    <span className={STATUS_COLORS[internship.status] || 'badge-info'}>
                      {internship.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {internship.company}
                    {internship.location ? ` · ${internship.location}` : ''}
                  </p>
                  {internship.notes && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {internship.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Quick status update */}
                  <select
                    value={internship.status}
                    onChange={(e) => handleStatusUpdate(internship._id, e.target.value)}
                    className="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offered">Offered</option>
                    <option value="rejected">Rejected</option>
                    <option value="accepted">Accepted</option>
                  </select>

                  {internship.url && (
                    <a
                      href={internship.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      <HiExternalLink size={18} />
                    </a>
                  )}

                  <button
                    onClick={() => handleDelete(internship._id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
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
