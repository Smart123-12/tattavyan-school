import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // DEMO MODE TOGGLE: Set to true if Firebase isn't configured yet
  const IS_DEMO_MODE = true;

  async function login(email, password, role) {
    if (IS_DEMO_MODE) {
      // Mock login for demo
      const mockUser = { uid: 'demo-user-123', email, displayName: `${role} User` };
      setCurrentUser(mockUser);
      setUserRole(role);
      localStorage.setItem('demoUser', JSON.stringify({ user: mockUser, role }));
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
