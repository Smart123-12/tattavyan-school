import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, BookOpen, Key } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password, role);
      // Route based on role
      if (role === 'admin') navigate('/admin');
      if (role === 'teacher') navigate('/teacher');
      if (role === 'student') navigate('/student');
    } catch (err) {
      setError('Failed to sign in. Please check credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card glass-panel animate-fade-in">
        <div className="login-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div className="sidebar-logo" style={{ width: 64, height: 64, fontSize: 32 }}>
              <GraduationCap size={36} />
            </div>
          </div>
          <h1>Tattavyan Edutech</h1>
          <p>Smart School Management System</p>
        </div>

        {error && <div className="badge danger" style={{ marginBottom: 20, display: 'block', textAlign: 'center', background: 'rgba(255,0,0,0.1)', color: 'red' }}>{error}</div>}

        <div className="role-selector">
          <button 
            type="button"
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
          <button 
            type="button"
            className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
            onClick={() => setRole('teacher')}
          >
            Teacher
          </button>
          <button 
            type="button"
            className={`role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email / User ID</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', top: 14, left: 14, color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                className="form-control" 
                style={{ paddingLeft: 42 }}
                placeholder={`Enter ${role} ID (e.g. demo@${role}.com)`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={18} style={{ position: 'absolute', top: 14, left: 14, color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                className="form-control" 
                style={{ paddingLeft: 42 }}
                placeholder="Enter password (any password for demo)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: 12, padding: 16, fontSize: 16 }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              <strong>Demo Mode Active:</strong> You can enter any email and password to login securely.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
