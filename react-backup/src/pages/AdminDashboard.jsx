import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Users, BookOpen, CreditCard, Bell, Trash2, Plus, X, Search, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const location = useLocation();
  const path = location.pathname;

  // ---- STATE ----
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [notices, setNotices] = useState([]);

  // Modal states
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', parent: '', status: 'Active' });

  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', experience: '' });

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', description: '' });

  // Filters & Searches
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilter, setStudentFilter] = useState('All');
  
  const [feeSearch, setFeeSearch] = useState('');
  const [feeFilter, setFeeFilter] = useState('All');

  // Load from LocalStorage
  useEffect(() => {
    const loadedStudents = localStorage.getItem('tattavyan_students');
    const loadedTeachers = localStorage.getItem('tattavyan_teachers');
    const loadedNotices = localStorage.getItem('tattavyan_notices');

    if (loadedStudents) setStudents(JSON.parse(loadedStudents));
    if (loadedTeachers) setTeachers(JSON.parse(loadedTeachers));
    if (loadedNotices) setNotices(JSON.parse(loadedNotices));
  }, []);

  // Sync back to LocalStorage
  const updateStudentsInStorage = (updatedList) => {
    setStudents(updatedList);
    localStorage.setItem('tattavyan_students', JSON.stringify(updatedList));
  };

  const updateTeachersInStorage = (updatedList) => {
    setTeachers(updatedList);
    localStorage.setItem('tattavyan_teachers', JSON.stringify(updatedList));
  };

  const updateNoticesInStorage = (updatedList) => {
    setNotices(updatedList);
    localStorage.setItem('tattavyan_notices', JSON.stringify(updatedList));
  };

  // ---- HANDLERS ----
  const handleAddStudent = (e) => {
    e.preventDefault();
    const newId = `#ST${1024 + students.length + Math.floor(Math.random() * 100)}`;
    const updated = [{ id: newId, ...newStudent }, ...students];
    updateStudentsInStorage(updated);
    setShowStudentModal(false);
    setNewStudent({ name: '', class: '', parent: '', status: 'Active' });
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      const updated = students.filter(s => s.id !== id);
      updateStudentsInStorage(updated);
    }
  };

  const handleToggleFeeStatus = (id) => {
    const updated = students.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'Active' ? 'Pending Fee' : 'Active'
        };
      }
      return s;
    });
    updateStudentsInStorage(updated);
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newId = `#T${101 + teachers.length + Math.floor(Math.random() * 10)}`;
    const updated = [{ id: newId, ...newTeacher }, ...teachers];
    updateTeachersInStorage(updated);
    setShowTeacherModal(false);
    setNewTeacher({ name: '', subject: '', experience: '' });
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to remove this teacher?')) {
      const updated = teachers.filter(t => t.id !== id);
      updateTeachersInStorage(updated);
    }
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    const newId = `#N${Date.now().toString().slice(-4)}`;
    const updated = [{ id: newId, title: newNotice.title, description: newNotice.description, date: 'Just now' }, ...notices];
    updateNoticesInStorage(updated);
    setShowNoticeModal(false);
    setNewNotice({ title: '', description: '' });
  };

  const handleDeleteNotice = (id) => {
    if (window.confirm('Delete this notice from the school bulletin board?')) {
      const updated = notices.filter(n => n.id !== id);
      updateNoticesInStorage(updated);
    }
  };

  // ---- CALCULATED METRICS ----
  const paidStudentsCount = students.filter(s => s.status === 'Active').length;
  const pendingStudentsCount = students.filter(s => s.status !== 'Active').length;
  const collectionTotal = paidStudentsCount * 45000;

  // ---- VIEWS ----
  const renderOverview = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Students Enrolled</h3>
            <p>{students.length}</p>
          </div>
          <div className="stat-icon primary">
            <Users size={24} />
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Faculty Members</h3>
            <p>{teachers.length}</p>
          </div>
          <div className="stat-icon secondary">
            <BookOpen size={24} />
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Fee Collections</h3>
            <p>₹{(collectionTotal / 100000).toFixed(2)}L</p>
          </div>
          <div className="stat-icon success">
            <CreditCard size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Active Bulletins</h3>
            <p>{notices.length}</p>
          </div>
          <div className="stat-icon warning">
            <Bell size={24} />
          </div>
        </div>
      </div>
      
      <div className="glass-panel" style={{ padding: '32px', marginTop: '24px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary)' }}>Tattavyan Academic Management</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', fontSize: '15px' }}>
          Welcome back to the Admin Dashboard. Here you have holistic oversight of school operations. You can admit new students, register teachers, regulate fee collections, and issue notifications that are synced across all student and teacher accounts in real-time.
        </p>
      </div>
    </>
  );

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          student.id.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          student.class.toLowerCase().includes(studentSearch.toLowerCase());
    
    if (studentFilter === 'All') return matchesSearch;
    return matchesSearch && student.status === studentFilter;
  });

  const renderStudents = () => (
    <div className="table-container">
      <div className="table-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, color: 'var(--text-primary)' }}>Student Enrollment Registry</h2>
          <button 
            className="btn btn-primary" 
            style={{ padding: '10px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setShowStudentModal(true)}
          >
            <Plus size={16} /> Add Student
          </button>
        </div>
        
        {/* Search & Filter Controls */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', top: 12, left: 14, color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by ID, name, or class..." 
              value={studentSearch}
              onChange={e => setStudentSearch(e.target.value)}
              className="form-control"
              style={{ padding: '10px 14px 10px 38px', fontSize: 13, height: 40 }}
            />
          </div>
          <select 
            value={studentFilter} 
            onChange={e => setStudentFilter(e.target.value)} 
            className="form-control"
            style={{ width: 150, padding: '0 12px', fontSize: 13, height: 40 }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active / Paid</option>
            <option value="Pending Fee">Pending Fee</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Parent / Guardian</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? filteredStudents.map((student) => (
            <tr key={student.id}>
              <td style={{ fontWeight: 600, color: 'var(--primary)', fontFamily: 'Geist' }}>{student.id}</td>
              <td style={{ fontWeight: 500 }}>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.parent}</td>
              <td>
                <span className={`badge ${student.status === 'Active' ? 'success' : 'warning'}`}>
                  {student.status === 'Active' ? 'Active / Paid' : 'Pending Fee'}
                </span>
              </td>
              <td>
                <button 
                  onClick={() => handleDeleteStudent(student.id)}
                  className="btn-icon danger"
                  title="Remove Student"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No students match the criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderTeachers = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 style={{ fontSize: 18 }}>Faculty Roster</h2>
        <button 
          className="btn btn-primary" 
          style={{ padding: '10px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => setShowTeacherModal(true)}
        >
          <Plus size={16} /> Register Teacher
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Faculty Name</th>
            <th>Primary Subject</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td style={{ fontWeight: 600, color: 'var(--primary)', fontFamily: 'Geist' }}>{teacher.id}</td>
              <td style={{ fontWeight: 500 }}>{teacher.name}</td>
              <td>
                <span className="badge primary">{teacher.subject}</span>
              </td>
              <td>{teacher.experience}</td>
              <td>
                <button 
                  onClick={() => handleDeleteTeacher(teacher.id)}
                  className="btn-icon danger"
                  title="Remove Teacher"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No teachers registered.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const filteredFeeStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(feeSearch.toLowerCase()) || 
                          student.id.toLowerCase().includes(feeSearch.toLowerCase()) ||
                          student.class.toLowerCase().includes(feeSearch.toLowerCase());
    
    if (feeFilter === 'All') return matchesSearch;
    if (feeFilter === 'Paid') return matchesSearch && student.status === 'Active';
    if (feeFilter === 'Unpaid') return matchesSearch && student.status !== 'Active';
    return matchesSearch;
  });

  const renderFeesBoard = () => (
    <div className="table-container">
      <div className="table-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 18 }}>Finance & Fee Collections Ledger</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0' }}>
              Base term tuition fee is set to <strong>₹45,000</strong> per student.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--success)' }}>{paidStudentsCount}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Paid</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--danger)' }}>{pendingStudentsCount}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pending</div>
            </div>
          </div>
        </div>
        
        {/* Search / Filters */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', top: 12, left: 14, color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by student name or class..." 
              value={feeSearch}
              onChange={e => setFeeSearch(e.target.value)}
              className="form-control"
              style={{ padding: '10px 14px 10px 38px', fontSize: 13, height: 40 }}
            />
          </div>
          <select 
            value={feeFilter} 
            onChange={e => setFeeFilter(e.target.value)} 
            className="form-control"
            style={{ width: 160, padding: '0 12px', fontSize: 13, height: 40 }}
          >
            <option value="All">All Fee Statuses</option>
            <option value="Paid">Status: Paid</option>
            <option value="Unpaid">Status: Unpaid</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Class</th>
            <th>Tuition Invoice</th>
            <th>Status</th>
            <th>Payment Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeeStudents.length > 0 ? filteredFeeStudents.map((s) => (
            <tr key={s.id}>
              <td>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Geist' }}>{s.id}</div>
              </td>
              <td>{s.class}</td>
              <td style={{ fontWeight: 600 }}>₹45,000</td>
              <td>
                <span className={`badge ${s.status === 'Active' ? 'success' : 'danger'}`}>
                  {s.status === 'Active' ? 'Paid' : 'Unpaid'}
                </span>
              </td>
              <td>
                <button 
                  onClick={() => handleToggleFeeStatus(s.id)}
                  className={`btn ${s.status === 'Active' ? 'btn-outline' : 'btn-primary'}`}
                  style={{ padding: '6px 12px', fontSize: 12, display: 'inline-flex', gap: 4 }}
                >
                  {s.status === 'Active' ? (
                    <>
                      <AlertTriangle size={14} /> Mark Unpaid
                    </>
                  ) : (
                    <>
                      <CheckCircle size={14} /> Record Payment
                    </>
                  )}
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No records match.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderNoticesBoard = () => (
    <div className="table-container">
      <div className="table-header">
        <div>
          <h2 style={{ fontSize: 18 }}>Bulletin Board Notices</h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Announcements posted here are instantly visible to students, parents, and teachers.
          </p>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ padding: '10px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => setShowNoticeModal(true)}
        >
          <Plus size={16} /> Post Announcement
        </button>
      </div>
      <div style={{ padding: 32 }}>
        {notices.length > 0 ? notices.map(n => (
          <div 
            key={n.id} 
            className="glass-panel animate-fade-in" 
            style={{ 
              padding: '20px 24px', 
              borderRadius: '14px', 
              marginBottom: '16px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              background: 'rgba(255, 255, 255, 0.45)'
            }}
          >
            <div style={{ flex: 1, paddingRight: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span className="badge primary" style={{ fontSize: 10, padding: '2px 8px' }}>Active</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{n.date}</span>
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{n.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.description}</p>
            </div>
            <button 
              onClick={() => handleDeleteNotice(n.id)} 
              className="btn-icon danger" 
              style={{ padding: 6 }}
              title="Delete Notice"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No notices posted. Make your first announcement!
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout title="Admin Portal">
      {/* Dynamic Navigation routing */}
      {path === '/admin' && renderOverview()}
      {path === '/admin/students' && renderStudents()}
      {path === '/admin/teachers' && renderTeachers()}
      {path === '/admin/fees' && renderFeesBoard()}
      {path === '/admin/notices' && renderNoticesBoard()}

      {/* STUDENT MODAL */}
      {showStudentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: 18, margin: 0 }}>Enroll New Student</h2>
              <button onClick={() => setShowStudentModal(false)} className="btn-icon"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddStudent}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Student Full Name</label>
                  <input type="text" required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="form-control" placeholder="e.g. Aarav Patel"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Class Division</label>
                  <input type="text" required value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} className="form-control" placeholder="e.g. 10-A"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Parent / Guardian Name</label>
                  <input type="text" required value={newStudent.parent} onChange={e => setNewStudent({...newStudent, parent: e.target.value})} className="form-control" placeholder="e.g. Suresh Patel"/>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Tuition Payment Status</label>
                  <select value={newStudent.status} onChange={e => setNewStudent({...newStudent, status: e.target.value})} className="form-control">
                    <option value="Active">Active / Paid</option>
                    <option value="Pending Fee">Pending Fee</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowStudentModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Enroll Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEACHER MODAL */}
      {showTeacherModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: 18, margin: 0 }}>Register New Teacher</h2>
              <button onClick={() => setShowTeacherModal(false)} className="btn-icon"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddTeacher}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Teacher Full Name</label>
                  <input type="text" required value={newTeacher.name} onChange={e => setNewTeacher({...newTeacher, name: e.target.value})} className="form-control" placeholder="e.g. Sneha Patel"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Primary Subject Specialization</label>
                  <input type="text" required value={newTeacher.subject} onChange={e => setNewTeacher({...newTeacher, subject: e.target.value})} className="form-control" placeholder="e.g. Physics"/>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Professional Experience</label>
                  <input type="text" required value={newTeacher.experience} onChange={e => setNewTeacher({...newTeacher, experience: e.target.value})} className="form-control" placeholder="e.g. 5 Years"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowTeacherModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Register Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NOTICE MODAL */}
      {showNoticeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: 18, margin: 0 }}>Post Bulletin Notice</h2>
              <button onClick={() => setShowNoticeModal(false)} className="btn-icon"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddNotice}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Announcement Title</label>
                  <input type="text" required value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="form-control" placeholder="e.g. Term Exam Papers Submission"/>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Bulletin Description</label>
                  <textarea required value={newNotice.description} onChange={e => setNewNotice({...newNotice, description: e.target.value})} className="form-control" style={{ minHeight: 120 }} placeholder="Write notice details here..."/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowNoticeModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Post Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
