import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Default seeding data
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

const defaultHomework = [
  { id: '#HW1', class: '10-A', subject: 'Mathematics', title: 'Algebra Worksheet', dueDate: '2026-05-22' },
  { id: '#HW2', class: '8-B', subject: 'Science', title: 'Chapter 4 Solar System Reading', dueDate: '2026-05-23' },
];

const defaultNotices = [
  { id: '#N1', title: 'Annual Day Celebrations', description: 'Tattavyan School is celebrating its Annual Day on 15th June. All students are invited to register for cultural performances.', date: 'Today' },
  { id: '#N2', title: 'Term-1 Exam Timetable Out', description: 'The exam schedule has been posted on the dashboard. Please verify dates with your teachers.', date: '2 days ago' },
  { id: '#N3', title: 'Staff Meeting at 4 PM', description: 'All teachers are requested to gather in the main conference hall for curriculum reviews.', date: '3 days ago' }
];

const defaultAttendance = {
  "10-A_2026-05-19": { "#ST1024": "Present" },
  "8-B_2026-05-19": { "#ST1025": "Present" },
  "9-A_2026-05-19": { "#ST1027": "Absent" },
  "12-Sci_2026-05-19": { "#ST1026": "Present" },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // DEMO MODE TOGGLE: Set to true if Firebase isn't configured yet
  const IS_DEMO_MODE = true;

  // Initialize shared localstorage databases
  useEffect(() => {
    if (!localStorage.getItem('tattavyan_students')) {
      localStorage.setItem('tattavyan_students', JSON.stringify(defaultStudents));
    }
    if (!localStorage.getItem('tattavyan_teachers')) {
      localStorage.setItem('tattavyan_teachers', JSON.stringify(defaultTeachers));
    }
    if (!localStorage.getItem('tattavyan_homework')) {
      localStorage.setItem('tattavyan_homework', JSON.stringify(defaultHomework));
    }
    if (!localStorage.getItem('tattavyan_notices')) {
      localStorage.setItem('tattavyan_notices', JSON.stringify(defaultNotices));
    }
    if (!localStorage.getItem('tattavyan_attendance')) {
      localStorage.setItem('tattavyan_attendance', JSON.stringify(defaultAttendance));
    }
  }, []);

  async function login(email, password, role) {
    if (IS_DEMO_MODE) {
      // Mock login for demo
      // Validation of demo credentials
      const formattedEmail = email.toLowerCase().trim();
      
      // Seed default credentials
      const adminCreds = { email: 'admin@tattavyan.com', pass: 'admin123', role: 'admin' };
      const teacherCreds = { email: 'teacher@tattavyan.com', pass: 'teacher123', role: 'teacher' };
      const studentCreds = { email: 'student@tattavyan.com', pass: 'student123', role: 'student' };

      let verifiedRole = role;

      // If user inputs specific email matching a demo user, enforce their password/role
      if (formattedEmail === adminCreds.email) {
        if (password !== adminCreds.pass) throw new Error('Incorrect password for Admin.');
        verifiedRole = 'admin';
      } else if (formattedEmail === teacherCreds.email) {
        if (password !== teacherCreds.pass) throw new Error('Incorrect password for Teacher.');
        verifiedRole = 'teacher';
      } else if (formattedEmail === studentCreds.email) {
        if (password !== studentCreds.pass) throw new Error('Incorrect password for Student.');
        verifiedRole = 'student';
      }

      const mockUser = { 
        uid: `demo-${verifiedRole}-123`, 
        email: formattedEmail, 
        displayName: `${verifiedRole.charAt(0).toUpperCase() + verifiedRole.slice(1)} User` 
      };
      
      setCurrentUser(mockUser);
      setUserRole(verifiedRole);
      localStorage.setItem('demoUser', JSON.stringify({ user: mockUser, role: verifiedRole }));
      return;
    }
    
    // Real Firebase Login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (userDoc.exists()) {
      setUserRole(userDoc.data().role);
    }
  }

  function logout() {
    if (IS_DEMO_MODE) {
      setCurrentUser(null);
      setUserRole(null);
      localStorage.removeItem('demoUser');
      return;
    }
    return signOut(auth);
  }

  useEffect(() => {
    if (IS_DEMO_MODE) {
      const saved = localStorage.getItem('demoUser');
      if (saved) {
        const { user, role } = JSON.parse(saved);
        setCurrentUser(user);
        setUserRole(role);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    login,
    logout,
    IS_DEMO_MODE
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
