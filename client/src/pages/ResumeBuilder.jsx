import { useState, useEffect } from 'react';
import { resumesAPI } from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiDocumentText, HiPlus, HiTrash, HiSave } from 'react-icons/hi';

/**
 * Resume Builder Page
 *
 * Create and manage professional resumes with sections
 * for experience, education, skills, and more.
 */
export default function ResumeBuilder() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await resumesAPI.getAll();
      setResumes(res.data);
      if (res.data.length > 0) setSelectedResume(res.data[0]);
    } catch (err) {
      console.error('Fetch resumes error:', err);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    try {
      const res = await resumesAPI.create({ title: `My Resume ${resumes.length + 1}` });
      setResumes((prev) => [res.data, ...prev]);
      setSelectedResume(res.data);
      setEditing(true);
    } catch (err) {
      console.error('Create resume error:', err);
    }
  };

  const updateResume = async () => {
    if (!selectedResume) return;
    try {
      const res = await resumesAPI.update(selectedResume._id, selectedResume);
      setResumes((prev) => prev.map((r) => (r._id === selectedResume._id ? res.data : r)));
      setSelectedResume(res.data);
      setEditing(false);
    } catch (err) {
      console.error('Update resume error:', err);
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm('Delete this resume?')) return;
    try {
      await resumesAPI.delete(id);
      const updated = resumes.filter((r) => r._id !== id);
      setResumes(updated);
      setSelectedResume(updated[0] || null);
    } catch (err) {
      console.error('Delete resume error:', err);
    }
  };

  const updateSection = (section, value) => {
    setSelectedResume((prev) => ({ ...prev, [section]: value }));
  };

  const addArrayItem = (section, template) => {
    setSelectedResume((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), { ...template }],
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setSelectedResume((prev) => {
      const items = [...(prev[section] || [])];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [section]: items };
    });
  };

  const removeArrayItem = (section, index) => {
    setSelectedResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  if (loading) return <LoadingSpinner message="Loading resumes..." />;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Builder</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create professional resumes</p>
        </div>
        <button onClick={createResume} className="btn-primary">
          <HiPlus className="mr-1.5" size={18} />
          New Resume
        </button>
      </div>

      {/* Resume selector */}
      {resumes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {resumes.map((r) => (
            <button
              key={r._id}
              onClick={() => { setSelectedResume(r); setEditing(false); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedResume?._id === r._id
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>
      )}

      {!selectedResume ? (
        <div className="card p-12 text-center">
          <HiDocumentText className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No resumes yet. Create your first one!</p>
          <button onClick={createResume} className="btn-primary">Create Resume</button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Contact section */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['fullName', 'email', 'phone', 'location', 'linkedin', 'website'].map((field) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    value={selectedResume.contact?.[field] || ''}
                    onChange={(e) => setSelectedResume((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, [field]: e.target.value },
                    }))}
                    className="input-field text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Summary</h2>
            <textarea
              rows={3}
              value={selectedResume.summary || ''}
              onChange={(e) => updateSection('summary', e.target.value)}
              className="input-field"
              placeholder="Write a brief professional summary..."
            />
          </div>

          {/* Experience */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h2>
              <button onClick={() => addArrayItem('experience', { company: '', role: '', startDate: '', endDate: '', current: false, description: '' })} className="btn-secondary text-xs px-3 py-1.5">
                <HiPlus className="mr-1" size={14} /> Add
              </button>
            </div>
            <div className="space-y-4">
              {(selectedResume.experience || []).map((exp, i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl relative">
                  <button onClick={() => removeArrayItem('experience', i)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><HiTrash size={16} /></button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input placeholder="Company" value={exp.company} onChange={(e) => updateArrayItem('experience', i, 'company', e.target.value)} className="input-field text-sm" />
                    <input placeholder="Role" value={exp.role} onChange={(e) => updateArrayItem('experience', i, 'role', e.target.value)} className="input-field text-sm" />
                    <input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateArrayItem('experience', i, 'startDate', e.target.value)} className="input-field text-sm" />
                    <input placeholder="End Date" value={exp.endDate} onChange={(e) => updateArrayItem('experience', i, 'endDate', e.target.value)} className="input-field text-sm" disabled={exp.current} />
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={exp.current} onChange={(e) => updateArrayItem('experience', i, 'current', e.target.checked)} id={`current-${i}`} />
                      <label htmlFor={`current-${i}`} className="text-sm text-gray-600 dark:text-gray-400">Current position</label>
                    </div>
                  </div>
                  <textarea placeholder="Description" rows={2} value={exp.description} onChange={(e) => updateArrayItem('experience', i, 'description', e.target.value)} className="input-field text-sm mt-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h2>
              <button onClick={() => addArrayItem('education', { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' })} className="btn-secondary text-xs px-3 py-1.5">
                <HiPlus className="mr-1" size={14} /> Add
              </button>
            </div>
            {(selectedResume.education || []).map((edu, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl relative mb-3">
                <button onClick={() => removeArrayItem('education', i)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><HiTrash size={16} /></button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input placeholder="Institution" value={edu.institution} onChange={(e) => updateArrayItem('education', i, 'institution', e.target.value)} className="input-field text-sm" />
                  <input placeholder="Degree" value={edu.degree} onChange={(e) => updateArrayItem('education', i, 'degree', e.target.value)} className="input-field text-sm" />
                  <input placeholder="Field of Study" value={edu.field} onChange={(e) => updateArrayItem('education', i, 'field', e.target.value)} className="input-field text-sm" />
                  <input placeholder="GPA" value={edu.gpa} onChange={(e) => updateArrayItem('education', i, 'gpa', e.target.value)} className="input-field text-sm" />
                  <input placeholder="Start Date" value={edu.startDate} onChange={(e) => updateArrayItem('education', i, 'startDate', e.target.value)} className="input-field text-sm" />
                  <input placeholder="End Date" value={edu.endDate} onChange={(e) => updateArrayItem('education', i, 'endDate', e.target.value)} className="input-field text-sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h2>
              <button onClick={() => addArrayItem('skills', { name: '', level: '' })} className="btn-secondary text-xs px-3 py-1.5">
                <HiPlus className="mr-1" size={14} /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(selectedResume.skills || []).map((skill, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                  <input value={skill.name} onChange={(e) => updateArrayItem('skills', i, 'name', e.target.value)} className="text-sm bg-transparent border-none outline-none w-20 text-gray-700 dark:text-gray-300" placeholder="Skill" />
                  <select value={skill.level} onChange={(e) => updateArrayItem('skills', i, 'level', e.target.value)} className="text-xs bg-transparent border-none outline-none text-gray-500">
                    <option value="">Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button onClick={() => removeArrayItem('skills', i)} className="text-gray-400 hover:text-red-500"><HiTrash size={14} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button onClick={updateResume} className="btn-primary">
              <HiSave className="mr-1.5" size={18} />
              Save Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
