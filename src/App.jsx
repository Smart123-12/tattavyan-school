import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

function PrivateRoute({ children, allowedRoles }) {
  const { currentUser, userRole } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to their respective dashboard
    if (userRole === 'admin') return <Navigate to="/admin" replace />;
    if (userRole === 'teacher') return <Navigate to="/teacher" replace />;
    if (userRole === 'student' || userRole === 'parent') return <Navigate to="/student" replace />;
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function DefaultRoute() {
  const { currentUser, userRole } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (userRole === 'admin') return <Navigate to="/admin" replace />;
  if (userRole === 'teacher') return <Navigate to="/teacher" replace />;
  if (userRole === 'student' || userRole === 'parent') return <Navigate to="/student" replace />;
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin/*" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/teacher/*" element={
            <PrivateRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/student/*" element={
            <PrivateRoute allowedRoles={['student', 'parent']}>
              <StudentDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/" element={<DefaultRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
