import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Key, ShieldCheck, Users, BookOpen } from 'lucide-react';

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
      setError(err.message || 'Failed to sign in. Please check credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (selectedRole, defaultEmail, defaultPass) => {
    setRole(selectedRole);
    setEmail(defaultEmail);
    setPassword(defaultPass);
    setError('');
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
          <p>Luminous Academic ERP Portal</p>
        </div>

        {error && (
          <div className="badge danger animate-fade-in" style={{ width: '100%', padding: '12px', borderRadius: '10px', marginBottom: 20, display: 'block', textAlign: 'center' }}>
            {error}
          </div>
        )}

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
              <User size={18} style={{ position: 'absolute', top: 16, left: 18, color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="form-control" 
                style={{ paddingLeft: 48 }}
                placeholder={`Enter your ${role} ID`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={18} style={{ position: 'absolute', top: 16, left: 18, color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                className="form-control" 
                style={{ paddingLeft: 48 }}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: 8, padding: 15, fontSize: 16 }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>
          
          <div className="quick-login-panel">
            <div className="quick-login-title">Quick Demo Login</div>
            <div className="quick-login-grid">
              <button
                type="button"
                className="quick-login-btn"
                onClick={() => handleQuickLogin('admin', 'admin@tattavyan.com', 'admin123')}
              >
                <ShieldCheck size={16} />
                <span>Admin</span>
              </button>
              <button
                type="button"
                className="quick-login-btn"
                onClick={() => handleQuickLogin('teacher', 'teacher@tattavyan.com', 'teacher123')}
              >
                <BookOpen size={16} />
                <span>Teacher</span>
              </button>
              <button
                type="button"
                className="quick-login-btn"
                onClick={() => handleQuickLogin('student', 'student@tattavyan.com', 'student123')}
              >
                <Users size={16} />
                <span>Student</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
