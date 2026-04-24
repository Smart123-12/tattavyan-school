import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Users, Calendar, BookOpen, Clock, Plus, Trash2, X } from 'lucide-react';

const defaultHomework = [
  { id: '#HW1', class: '10-A', subject: 'Mathematics', title: 'Algebra Worksheet', dueDate: 'Tomorrow, 9:00 AM' },
  { id: '#HW2', class: '9-B', subject: 'Science', title: 'Chapter 4 Reading', dueDate: 'Wednesday' },
];

const defaultNotices = [
  { id: '#N1', title: 'Staff Meeting at 4 PM', description: 'All teachers are requested to gather in the main hall.', date: 'Today' },
  { id: '#N2', title: 'Submit Term Exam Papers', description: 'Deadline for submission is this Friday.', date: '2 days ago' },
];

export default function TeacherDashboard() {
  const location = useLocation();
  const path = location.pathname;

  // States
  const [homework, setHomework] = useState(() => {
    const saved = localStorage.getItem('tattavyan_homework');
    return saved ? JSON.parse(saved) : defaultHomework;
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('tattavyan_notices');
    return saved ? JSON.parse(saved) : defaultNotices;
  });

  // Modal States
  const [showHWModal, setShowHWModal] = useState(false);
  const [newHW, setNewHW] = useState({ class: '', subject: '', title: '', dueDate: '' });

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', description: '' });

  // Effects
  useEffect(() => {
    localStorage.setItem('tattavyan_homework', JSON.stringify(homework));
  }, [homework]);

  useEffect(() => {
    localStorage.setItem('tattavyan_notices', JSON.stringify(notices));
  }, [notices]);

  // Handlers
  const handleAddHW = (e) => {
    e.preventDefault();
    const newId = `#HW${Date.now().toString().slice(-4)}`;
    setHomework([{ id: newId, ...newHW }, ...homework]);
    setShowHWModal(false);
    setNewHW({ class: '', subject: '', title: '', dueDate: '' });
  };

  const handleDeleteHW = (id) => {
    if(window.confirm('Delete this homework?')) setHomework(homework.filter(h => h.id !== id));
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    const newId = `#N${Date.now().toString().slice(-4)}`;
    setNotices([{ id: newId, title: newNotice.title, description: newNotice.description, date: 'Just now' }, ...notices]);
    setShowNoticeModal(false);
    setNewNotice({ title: '', description: '' });
  };

  const handleDeleteNotice = (id) => {
    if(window.confirm('Delete this notice?')) setNotices(notices.filter(n => n.id !== id));
  };

  // Views
  const renderOverview = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info"><h3>Today's Classes</h3><p>4</p></div>
          <div className="stat-icon primary"><Clock size={24} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-info"><h3>Total Students</h3><p>120</p></div>
          <div className="stat-icon secondary"><Users size={24} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-info"><h3>Active Homework</h3><p>{homework.length}</p></div>
          <div className="stat-icon warning"><BookOpen size={24} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-info"><h3>Attendance Marked</h3><p>85%</p></div>
          <div className="stat-icon success"><Calendar size={24} /></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div className="table-container">
          <div className="table-header"><h2 style={{ fontSize: 18 }}>Today's Schedule</h2></div>
          <table>
            <thead><tr><th>Time</th><th>Class</th><th>Subject</th></tr></thead>
            <tbody>
              <tr><td>09:00 AM</td><td>10-A</td><td>Mathematics</td></tr>
              <tr><td>11:00 AM</td><td>9-B</td><td>Physics</td></tr>
              <tr><td>01:30 PM</td><td>12-Sci</td><td>Mathematics</td></tr>
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <div className="table-header">
            <h2 style={{ fontSize: 18 }}>Recent Notices</h2>
          </div>
          <div style={{ padding: 24 }}>
            {notices.slice(0, 3).map(n => (
              <div key={n.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12 }}>
                <h4 style={{ marginBottom: 4 }}>{n.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n.description}</p>
              </div>
            ))}
            {notices.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No notices yet.</p>}
          </div>
        </div>
      </div>
    </>
  );

  const renderHomework = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 style={{ fontSize: 18 }}>Manage Homework</h2>
        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setShowHWModal(true)}>
          <Plus size={16} /> Assign Homework
        </button>
      </div>
      <table>
        <thead><tr><th>Class</th><th>Subject</th><th>Title</th><th>Due Date</th><th>Actions</th></tr></thead>
        <tbody>
          {homework.map(h => (
            <tr key={h.id}>
              <td>{h.class}</td>
              <td>{h.subject}</td>
              <td>{h.title}</td>
              <td>{h.dueDate}</td>
              <td>
                <button onClick={() => handleDeleteHW(h.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
          {homework.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No homework assigned.</td></tr>}
        </tbody>
      </table>
    </div>
  );

  const renderNotices = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 style={{ fontSize: 18 }}>Manage Notices</h2>
        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setShowNoticeModal(true)}>
          <Plus size={16} /> Add Notice
        </button>
      </div>
      <div style={{ padding: 24 }}>
        {notices.map(n => (
          <div key={n.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{n.date}</div>
              <h4 style={{ marginBottom: 4 }}>{n.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n.description}</p>
            </div>
            <button onClick={() => handleDeleteNotice(n.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: 8 }}><Trash2 size={16} /></button>
          </div>
        ))}
        {notices.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No notices created.</p>}
      </div>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{title} Module</h2>
      <p style={{ color: 'var(--text-secondary)' }}>This module is currently under development.</p>
    </div>
  );

  return (
    <Layout title="Teacher Dashboard">
      {path === '/teacher' && renderOverview()}
      {path === '/teacher/homework' && renderHomework()}
      {path === '/teacher/notices' && renderNotices()}
      {path === '/teacher/attendance' && renderPlaceholder('Attendance')}

      {/* HW Modal */}
      {showHWModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>Assign Homework</h2>
              <button onClick={() => setShowHWModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddHW}>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Class</label><input type="text" required value={newHW.class} onChange={e => setNewHW({...newHW, class: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Subject</label><input type="text" required value={newHW.subject} onChange={e => setNewHW({...newHW, subject: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Title/Topic</label><input type="text" required value={newHW.title} onChange={e => setNewHW({...newHW, title: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '20px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Due Date</label><input type="text" required value={newHW.dueDate} onChange={e => setNewHW({...newHW, dueDate: e.target.value})} placeholder="e.g. Tomorrow" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}><button type="button" onClick={() => setShowHWModal(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button><button type="submit" className="btn btn-primary" style={{ padding: '8px 16px' }}>Assign</button></div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Modal */}
      {showNoticeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>Add Notice</h2>
              <button onClick={() => setShowNoticeModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddNotice}>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Title</label><input type="text" required value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '20px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Description</label><textarea required value={newNotice.description} onChange={e => setNewNotice({...newNotice, description: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', minHeight: '80px' }}/></div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}><button type="button" onClick={() => setShowNoticeModal(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button><button type="submit" className="btn btn-primary" style={{ padding: '8px 16px' }}>Post Notice</button></div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
