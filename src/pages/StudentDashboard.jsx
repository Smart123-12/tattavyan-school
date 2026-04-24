import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Calendar, BookOpen, CheckCircle, Bell, CreditCard } from 'lucide-react';

const defaultHomework = [
  { id: '#HW1', class: '10-A', subject: 'Mathematics', title: 'Algebra Worksheet', dueDate: 'Tomorrow, 9:00 AM' },
  { id: '#HW2', class: '9-B', subject: 'Science', title: 'Chapter 4 Reading', dueDate: 'Wednesday' },
];

const defaultNotices = [
  { id: '#N1', title: 'Staff Meeting at 4 PM', description: 'All teachers are requested to gather in the main hall.', date: 'Today' },
  { id: '#N2', title: 'Submit Term Exam Papers', description: 'Deadline for submission is this Friday.', date: '2 days ago' },
];

export default function StudentDashboard() {
  const location = useLocation();
  const path = location.pathname;

  // Read data that may have been created by Teachers/Admins
  const [homework, setHomework] = useState(() => {
    const saved = localStorage.getItem('tattavyan_homework');
    return saved ? JSON.parse(saved) : defaultHomework;
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('tattavyan_notices');
    return saved ? JSON.parse(saved) : defaultNotices;
  });

  // Views
  const renderOverview = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info"><h3>Attendance Rate</h3><p>92%</p></div>
          <div className="stat-icon success"><CheckCircle size={24} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-info"><h3>Pending Homework</h3><p>{homework.length}</p></div>
          <div className="stat-icon warning"><BookOpen size={24} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-info"><h3>Upcoming Exams</h3><p>1</p></div>
          <div className="stat-icon primary"><Calendar size={24} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-info"><h3>New Notices</h3><p>{notices.length}</p></div>
          <div className="stat-icon secondary"><Bell size={24} /></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div className="table-container">
          <div className="table-header"><h2 style={{ fontSize: 18 }}>Recent Homework</h2></div>
          <div style={{ padding: 24 }}>
            {homework.slice(0, 3).map(hw => (
              <div key={hw.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ marginBottom: 4 }}>{hw.subject}: {hw.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Due: {hw.dueDate}</p>
                </div>
                <span className="badge warning">Pending</span>
              </div>
            ))}
            {homework.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No pending homework!</p>}
          </div>
        </div>

        <div className="table-container">
          <div className="table-header"><h2 style={{ fontSize: 18 }}>Recent Notices</h2></div>
          <div style={{ padding: 24 }}>
            {notices.slice(0, 3).map((n, idx) => (
              <div key={n.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, background: idx === 0 ? 'rgba(88, 101, 242, 0.05)' : 'transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {idx === 0 && <span className="badge primary">New</span>}
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{n.date}</span>
                </div>
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
      <div className="table-header"><h2 style={{ fontSize: 18 }}>My Homework Assignments</h2></div>
      <table>
        <thead><tr><th>Subject</th><th>Title</th><th>Due Date</th><th>Status</th></tr></thead>
        <tbody>
          {homework.map(h => (
            <tr key={h.id}>
              <td style={{ fontWeight: 500 }}>{h.subject}</td>
              <td>{h.title}</td>
              <td style={{ color: 'var(--text-secondary)' }}>{h.dueDate}</td>
              <td><span className="badge warning">Pending</span></td>
            </tr>
          ))}
          {homework.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No homework assigned.</td></tr>}
        </tbody>
      </table>
    </div>
  );

  const renderNotices = () => (
    <div className="table-container">
      <div className="table-header"><h2 style={{ fontSize: 18 }}>School Notices</h2></div>
      <div style={{ padding: 24 }}>
        {notices.map(n => (
          <div key={n.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{n.date}</div>
            <h4 style={{ marginBottom: 4 }}>{n.title}</h4>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n.description}</p>
          </div>
        ))}
        {notices.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No notices available.</p>}
      </div>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><CreditCard size={48} color="var(--text-secondary)" /></div>
      <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{title} Module</h2>
      <p style={{ color: 'var(--text-secondary)' }}>This module is currently under development. Check back later.</p>
    </div>
  );

  return (
    <Layout title="Student Dashboard">
      {path === '/student' && renderOverview()}
      {path === '/student/homework' && renderHomework()}
      {path === '/student/notices' && renderNotices()}
      {path === '/student/fees' && renderPlaceholder('Fee Management')}
      {path === '/student/attendance' && renderPlaceholder('Attendance')}
    </Layout>
  );
}
