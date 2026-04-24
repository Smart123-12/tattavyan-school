import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Users, BookOpen, CreditCard, Bell, Trash2, Plus, X } from 'lucide-react';

const defaultStudents = [
  { id: '#ST1024', name: 'Aarav Patel', class: '10-A', parent: 'Suresh Patel', status: 'Active' },
  { id: '#ST1025', name: 'Diya Sharma', class: '8-B', parent: 'Rajesh Sharma', status: 'Active' },
  { id: '#ST1026', name: 'Rohan Desai', class: '12-Sci', parent: 'Amit Desai', status: 'Pending Fee' },
  { id: '#ST1027', name: 'Priya Singh', class: '9-A', parent: 'Vikram Singh', status: 'Active' },
];

const defaultTeachers = [
  { id: '#T101', name: 'Ravi Kumar', subject: 'Mathematics', experience: '5 Years' },
  { id: '#T102', name: 'Sneha Patel', subject: 'Science', experience: '3 Years' },
];

export default function AdminDashboard() {
  const location = useLocation();
  const path = location.pathname;

  // ---- STATE ----
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('tattavyan_students');
    if (saved) return JSON.parse(saved);
    return defaultStudents;
  });

  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem('tattavyan_teachers');
    if (saved) return JSON.parse(saved);
    return defaultTeachers;
  });

  // Modal states
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', parent: '', status: 'Active' });

  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', experience: '' });

  // Persistence
  useEffect(() => {
    localStorage.setItem('tattavyan_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('tattavyan_teachers', JSON.stringify(teachers));
  }, [teachers]);

  // ---- HANDLERS ----
  const handleAddStudent = (e) => {
    e.preventDefault();
    const newId = `#ST${1024 + students.length + Math.floor(Math.random() * 100)}`;
    setStudents([{ id: newId, ...newStudent }, ...students]);
    setShowStudentModal(false);
    setNewStudent({ name: '', class: '', parent: '', status: 'Active' });
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Remove this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newId = `#T${101 + teachers.length + Math.floor(Math.random() * 10)}`;
    setTeachers([{ id: newId, ...newTeacher }, ...teachers]);
    setShowTeacherModal(false);
    setNewTeacher({ name: '', subject: '', experience: '' });
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('Remove this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  // ---- VIEWS ----
  const renderOverview = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Students</h3>
            <p>{1244 + students.length}</p>
          </div>
          <div className="stat-icon primary">
            <Users size={24} />
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Teachers</h3>
            <p>{84 + teachers.length}</p>
          </div>
          <div className="stat-icon secondary">
            <BookOpen size={24} />
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Fees Collection</h3>
            <p>₹4.2M</p>
          </div>
          <div className="stat-icon success">
            <CreditCard size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Active Notices</h3>
            <p>3</p>
          </div>
          <div className="stat-icon warning">
            <Bell size={24} />
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Welcome to Tattavyan Admin</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Use the sidebar to manage students, teachers, and other aspects of the school.</p>
      </div>
    </>
  );

  const renderStudents = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 style={{ fontSize: 18 }}>Manage Students</h2>
        <button 
          className="btn btn-primary" 
          style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => setShowStudentModal(true)}
        >
          <Plus size={16} /> Add Student
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Parent Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.parent}</td>
              <td>
                <span className={`badge ${student.status === 'Active' ? 'success' : 'warning'}`}>
                  {student.status}
                </span>
              </td>
              <td>
                <button 
                  onClick={() => handleDeleteStudent(student.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}
                  title="Remove Student"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                No students found.
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
        <h2 style={{ fontSize: 18 }}>Manage Teachers</h2>
        <button 
          className="btn btn-primary" 
          style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={() => setShowTeacherModal(true)}
        >
          <Plus size={16} /> Add Teacher
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.experience}</td>
              <td>
                <button 
                  onClick={() => handleDeleteTeacher(teacher.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}
                  title="Remove Teacher"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{title} Module</h2>
      <p style={{ color: 'var(--text-secondary)' }}>This module is currently under development. You will be able to manage {title.toLowerCase()} here soon.</p>
    </div>
  );

  return (
    <Layout title="Admin Dashboard">
      
      {/* Route the content based on path */}
      {path === '/admin' && renderOverview()}
      {path === '/admin/students' && renderStudents()}
      {path === '/admin/teachers' && renderTeachers()}
      {path === '/admin/fees' && renderPlaceholder('Fees')}
      {path === '/admin/notices' && renderPlaceholder('Notices')}

      {/* MODALS */}
      {showStudentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>Add New Student</h2>
              <button onClick={() => setShowStudentModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddStudent}>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Student Name</label><input type="text" required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Class</label><input type="text" required value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Parent Name</label><input type="text" required value={newStudent.parent} onChange={e => setNewStudent({...newStudent, parent: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '20px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Status</label><select value={newStudent.status} onChange={e => setNewStudent({...newStudent, status: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-main)' }}><option value="Active">Active</option><option value="Pending Fee">Pending Fee</option></select></div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}><button type="button" onClick={() => setShowStudentModal(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button><button type="submit" className="btn btn-primary" style={{ padding: '8px 16px' }}>Save Student</button></div>
            </form>
          </div>
        </div>
      )}

      {showTeacherModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>Add New Teacher</h2>
              <button onClick={() => setShowTeacherModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddTeacher}>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Teacher Name</label><input type="text" required value={newTeacher.name} onChange={e => setNewTeacher({...newTeacher, name: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Subject</label><input type="text" required value={newTeacher.subject} onChange={e => setNewTeacher({...newTeacher, subject: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ marginBottom: '20px' }}><label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Experience</label><input type="text" required value={newTeacher.experience} onChange={e => setNewTeacher({...newTeacher, experience: e.target.value})} placeholder="e.g. 5 Years" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}/></div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}><button type="button" onClick={() => setShowTeacherModal(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button><button type="submit" className="btn btn-primary" style={{ padding: '8px 16px' }}>Save Teacher</button></div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
