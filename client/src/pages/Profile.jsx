import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { HiUser, HiSave } from 'react-icons/hi';

/**
 * Profile Page
 *
 * View and edit user profile information.
 */
export default function Profile() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    bio: user?.bio || '',
    location: user?.location || '',
    phone: user?.phone || '',
    currentRole: user?.currentRole || '',
    yearsOfExperience: user?.yearsOfExperience || 0,
    education: user?.education || '',
    skills: user?.skills?.join(', ') || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const data = {
      ...formData,
      yearsOfExperience: Number(formData.yearsOfExperience),
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
    };

    const result = await updateUser(data);
    setSaving(false);

    if (result.success) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage(result.message || 'Failed to update profile');
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center text-white text-xl font-bold">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('success')
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline</label>
              <input name="headline" value={formData.headline} onChange={handleChange} placeholder="e.g., Full Stack Developer" className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea name="bio" rows={3} value={formData.bio} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <input name="location" value={formData.location} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="input-field" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Career Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Role</label>
              <input name="currentRole" value={formData.currentRole} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years of Experience</label>
              <input name="yearsOfExperience" type="number" min="0" value={formData.yearsOfExperience} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Education</label>
              <input name="education" value={formData.education} onChange={handleChange} placeholder="e.g., B.S. Computer Science" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills (comma-separated)</label>
              <input name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, Python" className="input-field" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary">
            <HiSave className="mr-1.5" size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
