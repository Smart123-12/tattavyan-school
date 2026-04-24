import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Bell, 
  LogOut, 
  CreditCard,
  GraduationCap
} from 'lucide-react';

export default function Layout({ children, title }) {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Students', path: '/admin/students', icon: <Users size={20} /> },
    { name: 'Teachers', path: '/admin/teachers', icon: <BookOpen size={20} /> },
    { name: 'Fees', path: '/admin/fees', icon: <CreditCard size={20} /> },
    { name: 'Notices', path: '/admin/notices', icon: <Bell size={20} /> },
  ];

  const teacherLinks = [
    { name: 'Dashboard', path: '/teacher', icon: <LayoutDashboard size={20} /> },
    { name: 'Attendance', path: '/teacher/attendance', icon: <Calendar size={20} /> },
    { name: 'Homework', path: '/teacher/homework', icon: <BookOpen size={20} /> },
    { name: 'Notices', path: '/teacher/notices', icon: <Bell size={20} /> },
  ];

  const studentLinks = [
    { name: 'Dashboard', path: '/student', icon: <LayoutDashboard size={20} /> },
    { name: 'Attendance', path: '/student/attendance', icon: <Calendar size={20} /> },
    { name: 'Homework', path: '/student/homework', icon: <BookOpen size={20} /> },
    { name: 'Fees', path: '/student/fees', icon: <CreditCard size={20} /> },
    { name: 'Notices', path: '/student/notices', icon: <Bell size={20} /> },
  ];

  let links = [];
  if (userRole === 'admin') links = adminLinks;
  else if (userRole === 'teacher') links = teacherLinks;
  else if (userRole === 'student') links = studentLinks;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <GraduationCap size={24} />
          </div>
          <div className="sidebar-title">Tattavyan</div>
        </div>
        
        <nav className="sidebar-nav">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '24px 16px', borderTop: '1px solid var(--border)' }}>
          <button 
            onClick={handleLogout} 
            className="nav-item" 
            style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left', color: 'var(--danger)' }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <h1 className="topbar-title">{title}</h1>
          <div className="user-profile">
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{currentUser?.email?.split('@')[0] || 'User'}</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'capitalize', margin: 0 }}>{userRole}</p>
            </div>
            <div className="avatar">
              {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        <div className="page-content animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
