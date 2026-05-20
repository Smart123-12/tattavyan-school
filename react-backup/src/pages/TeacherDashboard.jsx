import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Users, Calendar, BookOpen, Clock, Plus, Trash2, X, Check, AlertCircle, Save } from 'lucide-react';

export default function TeacherDashboard() {
  const location = useLocation();
  const path = location.pathname;

  // Shared state synced from localstorage
  const [students, setStudents] = useState([]);
  const [homework, setHomework] = useState([]);
  const [notices, setNotices] = useState([]);
  const [attendanceDb, setAttendanceDb] = useState({});

  // Form states
  const [showHWModal, setShowHWModal] = useState(false);
  const [newHW, setNewHW] = useState({ class: '10-A', subject: 'Mathematics', title: '', dueDate: '' });

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', description: '' });

  // Interactive Attendance States
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState('2026-05-20');
  const [currentAttendance, setCurrentAttendance] = useState({}); // studentId -> 'Present'/'Absent'
  const [saveStatus, setSaveStatus] = useState('');

  // Load from local storage
  useEffect(() => {
    const loadedStudents = localStorage.getItem('tattavyan_students');
    const loadedHomework = localStorage.getItem('tattavyan_homework');
    const loadedNotices = localStorage.getItem('tattavyan_notices');
    const loadedAttendance = localStorage.getItem('tattavyan_attendance');

    if (loadedStudents) setStudents(JSON.parse(loadedStudents));
    if (loadedHomework) setHomework(JSON.parse(loadedHomework));
    if (loadedNotices) setNotices(JSON.parse(loadedNotices));
    if (loadedAttendance) setAttendanceDb(JSON.parse(loadedAttendance));
  }, []);

  // When class or date changes, load attendance if it exists, otherwise default all to Present
  useEffect(() => {
    const classKey = `${selectedClass}_${selectedDate}`;
    const savedRecord = attendanceDb[classKey];
    
    // Filter students in this class
    const classStudents = students.filter(s => s.class === selectedClass);
    
    const initialAttendance = {};
    classStudents.forEach(s => {
      if (savedRecord && savedRecord[s.id]) {
        initialAttendance[s.id] = savedRecord[s.id];
      } else {
        initialAttendance[s.id] = 'Present'; // Default
      }
    });
    
    setCurrentAttendance(initialAttendance);
    setSaveStatus('');
  }, [selectedClass, selectedDate, students, attendanceDb]);

  // Sync state helpers
  const syncHomework = (updated) => {
    setHomework(updated);
    localStorage.setItem('tattavyan_homework', JSON.stringify(updated));
  };

  const syncNotices = (updated) => {
    setNotices(updated);
    localStorage.setItem('tattavyan_notices', JSON.stringify(updated));
  };

  const handleAddHW = (e) => {
    e.preventDefault();
    const newId = `#HW${Date.now().toString().slice(-4)}`;
    const updated = [{ id: newId, ...newHW }, ...homework];
    syncHomework(updated);
    setShowHWModal(false);
    setNewHW({ class: '10-A', subject: 'Mathematics', title: '', dueDate: '' });
  };

  const handleDeleteHW = (id) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      const updated = homework.filter(h => h.id !== id);
      syncHomework(updated);
    }
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    const newId = `#N${Date.now().toString().slice(-4)}`;
    const updated = [{ id: newId, title: newNotice.title, description: newNotice.description, date: 'Just now' }, ...notices];
    syncNotices(updated);
    setShowNoticeModal(false);
    setNewNotice({ title: '', description: '' });
  };

  const handleDeleteNotice = (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      const updated = notices.filter(n => n.id !== id);
      syncNotices(updated);
    }
  };

  // Toggle student attendance status
  const handleToggleAttendance = (studentId, status) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
    setSaveStatus('');
  };

  // Save Attendance to LocalStorage
  const handleSaveAttendance = () => {
    const classKey = `${selectedClass}_${selectedDate}`;
    const updatedDb = {
      ...attendanceDb,
      [classKey]: currentAttendance
    };
    setAttendanceDb(updatedDb);
    localStorage.setItem('tattavyan_attendance', JSON.stringify(updatedDb));
    setSaveStatus('Attendance saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Filter students in the selected class division
  const classStudents = students.filter(s => s.class === selectedClass);

  // Unique list of class divisions from students database
  const classes = Array.from(new Set(students.map(s => s.class)));

  // Views
  const renderOverview = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Today's Classes</h3>
            <p>3</p>
          </div>
          <div className="stat-icon primary">
            <Clock size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Assigned Students</h3>
            <p>{students.length}</p>
          </div>
          <div className="stat-icon secondary">
            <Users size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Homework Assigned</h3>
            <p>{homework.length}</p>
          </div>
          <div className="stat-icon warning">
            <BookOpen size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Bulletins Posted</h3>
            <p>{notices.length}</p>
          </div>
          <div className="stat-icon success">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      <div className="dashboard-grid-2col">
        <div className="table-container">
          <div className="table-header">
            <h2 style={{ fontSize: 18 }}>My Class Schedule</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Class</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--primary)' }}>09:00 AM - 10:00 AM</td>
                <td>10-A</td>
                <td>Mathematics</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--primary)' }}>11:00 AM - 12:00 PM</td>
                <td>8-B</td>
                <td>Science</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--primary)' }}>01:30 PM - 02:30 PM</td>
                <td>12-Sci</td>
                <td>Mathematics</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <div className="table-header">
            <h2 style={{ fontSize: 18 }}>Synced Bulletins</h2>
          </div>
          <div style={{ padding: 24, maxHeight: 300, overflowY: 'auto' }}>
            {notices.slice(0, 3).map(n => (
              <div key={n.id} style={{ padding: '14px 18px', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, background: 'rgba(255,255,255,0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600 }}>{n.title}</h4>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.date}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.description}</p>
              </div>
            ))}
            {notices.length === 0 && (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No current school notices.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderAttendance = () => (
    <div className="table-container">
      <div className="table-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 18 }}>Classroom Attendance Register</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>
              Record or edit attendance sheets for students below.
            </p>
          </div>
          {saveStatus && (
            <div className="badge success animate-fade-in" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <Check size={14} /> {saveStatus}
            </div>
          )}
        </div>

        {/* Dynamic Class & Date Selectors */}
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label className="form-label" style={{ fontSize: 12 }}>Select Class Division</label>
            <select 
              value={selectedClass} 
              onChange={e => setSelectedClass(e.target.value)} 
              className="form-control"
              style={{ height: 44, padding: '0 14px' }}
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>Class {cls}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label className="form-label" style={{ fontSize: 12 }}>Select Academic Date</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={e => setSelectedDate(e.target.value)} 
              className="form-control"
              style={{ height: 44, padding: '0 14px' }}
            />
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Designated Division</th>
            <th style={{ textAlign: 'center' }}>Status Indicator</th>
            <th style={{ textAlign: 'right' }}>Attendance Log Actions</th>
          </tr>
        </thead>
        <tbody>
          {classStudents.length > 0 ? classStudents.map(student => {
            const status = currentAttendance[student.id] || 'Present';
            return (
              <tr key={student.id}>
                <td style={{ fontWeight: 600, color: 'var(--primary)', fontFamily: 'Geist' }}>{student.id}</td>
                <td style={{ fontWeight: 500 }}>{student.name}</td>
                <td>{student.class}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`badge ${status === 'Present' ? 'success' : 'danger'}`}>
                    {status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 8 }}>
                    <button 
                      type="button" 
                      onClick={() => handleToggleAttendance(student.id, 'Present')}
                      className={`btn ${status === 'Present' ? 'btn-primary' : 'btn-outline'}`}
                      style={{ padding: '6px 12px', fontSize: 12 }}
                    >
                      Present
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleToggleAttendance(student.id, 'Absent')}
                      className={`btn ${status === 'Absent' ? 'btn-danger' : 'btn-outline'}`}
                      style={{ padding: '6px 12px', fontSize: 12 }}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            );
          }) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No students enrolled in Class {selectedClass}.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {classStudents.length > 0 && (
        <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'flex-end', background: 'rgba(0, 74, 198, 0.01)' }}>
          <button 
            onClick={handleSaveAttendance} 
            className="btn btn-primary"
            style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}
          >
            <Save size={16} /> Save Attendance Records
          </button>
        </div>
      )}
    </div>
  );

  const renderHomework = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 style={{ fontSize: 18 }}>Homework & Assignments</h2>
        <button 
          className="btn btn-primary" 
          style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }} 
          onClick={() => setShowHWModal(true)}
        >
          <Plus size={16} /> Assign Homework
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Subject</th>
            <th>Assignment Title</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homework.map(h => (
            <tr key={h.id}>
              <td style={{ fontWeight: 600 }}>{h.class}</td>
              <td><span className="badge primary">{h.subject}</span></td>
              <td>{h.title}</td>
              <td style={{ color: 'var(--text-secondary)' }}>{h.dueDate}</td>
              <td>
                <button 
                  onClick={() => handleDeleteHW(h.id)} 
                  className="btn-icon danger"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {homework.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No homework currently assigned.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderNotices = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 style={{ fontSize: 18 }}>Bulletin Notice Management</h2>
        <button 
          className="btn btn-primary" 
          style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }} 
          onClick={() => setShowNoticeModal(true)}
        >
          <Plus size={16} /> Add School Bulletin
        </button>
      </div>
      <div style={{ padding: 32 }}>
        {notices.map(n => (
          <div 
            key={n.id} 
            className="glass-panel" 
            style={{ 
              padding: '20px 24px', 
              borderRadius: 14, 
              marginBottom: 16, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              background: 'rgba(255,255,255,0.45)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="badge primary" style={{ fontSize: 10, padding: '2px 8px' }}>Synched</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.date}</span>
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{n.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{n.description}</p>
            </div>
            <button 
              onClick={() => handleDeleteNotice(n.id)} 
              className="btn-icon danger" 
              style={{ padding: 8 }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {notices.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No notices created.</p>
        )}
      </div>
    </div>
  );

  return (
    <Layout title="Teacher Portal">
      {path === '/teacher' && renderOverview()}
      {path === '/teacher/homework' && renderHomework()}
      {path === '/teacher/notices' && renderNotices()}
      {path === '/teacher/attendance' && renderAttendance()}

      {/* HW Modal */}
      {showHWModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: 18, margin: 0 }}>Assign Homework</h2>
              <button onClick={() => setShowHWModal(false)} className="btn-icon"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddHW}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Class</label>
                  <select 
                    value={newHW.class} 
                    onChange={e => setNewHW({...newHW, class: e.target.value})} 
                    className="form-control"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input type="text" required value={newHW.subject} onChange={e => setNewHW({...newHW, subject: e.target.value})} className="form-control" placeholder="e.g. Mathematics"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Homework Title/Topic</label>
                  <input type="text" required value={newHW.title} onChange={e => setNewHW({...newHW, title: e.target.value})} className="form-control" placeholder="e.g. Algebra Worksheet"/>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Due Date</label>
                  <input type="date" required value={newHW.dueDate} onChange={e => setNewHW({...newHW, dueDate: e.target.value})} className="form-control"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowHWModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Assign Homework</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Modal */}
      {showNoticeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: 18, margin: 0 }}>Post Announcement notice</h2>
              <button onClick={() => setShowNoticeModal(false)} className="btn-icon"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddNotice}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Notice Title</label>
                  <input type="text" required value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="form-control" placeholder="e.g. Term Exam Papers Submission"/>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Description</label>
                  <textarea required value={newNotice.description} onChange={e => setNewNotice({...newNotice, description: e.target.value})} className="form-control" style={{ minHeight: 100 }} placeholder="Write notice details..."/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowNoticeModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Post Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
