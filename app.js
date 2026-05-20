/**
 * Tattavyan School ERP - Pure Standalone Vanilla JS Application Engine
 * Authored to look premium, run blazing fast, and execute 100% locally.
 */

// ==========================================
// 1. DEFAULT DATA SEED CONFIGURATION
// ==========================================
const DEFAULT_STUDENTS = [
  { id: '#ST1024', name: 'Aarav Patel', class: '10-A', parent: 'Suresh Patel', status: 'Active' },
  { id: '#ST1025', name: 'Diya Sharma', class: '8-B', parent: 'Rajesh Sharma', status: 'Active' },
  { id: '#ST1026', name: 'Rohan Desai', class: '12-Sci', parent: 'Amit Desai', status: 'Pending Fee' },
  { id: '#ST1027', name: 'Priya Singh', class: '9-A', parent: 'Vikram Singh', status: 'Active' }
];

const DEFAULT_TEACHERS = [
  { id: '#T101', name: 'Ravi Kumar', subject: 'Mathematics', experience: '5 Years' },
  { id: '#T102', name: 'Sneha Patel', subject: 'Science', experience: '3 Years' }
];

const DEFAULT_HOMEWORK = [
  { id: '#HW1', class: '10-A', subject: 'Mathematics', title: 'Algebra Worksheet', dueDate: '2026-05-22' },
  { id: '#HW2', class: '8-B', subject: 'Science', title: 'Chapter 4 Solar System Reading', dueDate: '2026-05-23' }
];

const DEFAULT_NOTICES = [
  { id: '#N1', title: 'Annual Day Celebrations', description: 'Tattavyan School is celebrating its Annual Day on 15th June. All students are invited to register for cultural performances.', date: 'Today' },
  { id: '#N2', title: 'Term-1 Exam Timetable Out', description: 'The exam schedule has been posted on the dashboard. Please verify dates with your teachers.', date: '2 days ago' },
  { id: '#N3', title: 'Staff Meeting at 4 PM', description: 'All teachers are requested to gather in the main conference hall for curriculum reviews.', date: '3 days ago' }
];

const DEFAULT_ATTENDANCE = {
  "10-A_2026-05-19": { "#ST1024": "Present" },
  "8-B_2026-05-19": { "#ST1025": "Present" },
  "9-A_2026-05-19": { "#ST1027": "Absent" },
  "12-Sci_2026-05-19": { "#ST1026": "Present" }
};

// ==========================================
// 2. CENTRAL STATE ENGINE
// ==========================================
const state = {
  // Session State
  currentUser: null,  // { email, name, role }
  userRole: null,     // 'admin' | 'teacher' | 'student'
  
  // Navigation State
  currentView: 'login', // 'login' | 'admin' | 'teacher' | 'student'
  currentTab: 'dashboard', // active tab inside layouts: 'dashboard' | 'students' | 'teachers' | 'fees' | 'notices' | 'attendance' | 'homework'
  
  // Database Arrays
  students: [],
  teachers: [],
  homework: [],
  notices: [],
  attendanceDb: {},
  
  // Local active selections (Student context)
  activeStudentId: '#ST1026', // Rohan Desai as default demo target
  
  // Modal controllers
  activeModal: null, // 'student' | 'teacher' | 'notice' | 'homework' | 'pay' | null
  
  // Form input builders
  forms: {
    login: { email: '', password: '', role: 'student', error: '' },
    student: { name: '', class: '10-A', parent: '', status: 'Active' },
    teacher: { name: '', subject: '', experience: '' },
    notice: { title: '', description: '' },
    homework: { class: '10-A', subject: 'Mathematics', title: '', dueDate: '' },
    payment: { cardholder: 'Rohan Desai', cardNo: '4321 8876 5432 1098', expiry: '09/29', cvv: '231', upiId: 'rohan@okaxis' }
  },

  // Active filters and search values
  filters: {
    studentSearch: '',
    studentFilter: 'All',
    feeSearch: '',
    feeFilter: 'All'
  },

  // Dynamic checkout portal animation
  checkout: {
    payMethod: 'card',
    isProcessing: false,
    processingStep: '',
    success: false
  },

  // Teacher dashboard interactive attendance
  attendanceControl: {
    selectedClass: '10-A',
    selectedDate: '2026-05-20',
    currentSheet: {}, // studentId -> status
    saveStatus: ''
  }
};

// ==========================================
// 3. STORAGE & LIFE-CYCLE SYNCS
// ==========================================
function initDatabase() {
  if (!localStorage.getItem('tattavyan_students')) {
    localStorage.setItem('tattavyan_students', JSON.stringify(DEFAULT_STUDENTS));
  }
  if (!localStorage.getItem('tattavyan_teachers')) {
    localStorage.setItem('tattavyan_teachers', JSON.stringify(DEFAULT_TEACHERS));
  }
  if (!localStorage.getItem('tattavyan_homework')) {
    localStorage.setItem('tattavyan_homework', JSON.stringify(DEFAULT_HOMEWORK));
  }
  if (!localStorage.getItem('tattavyan_notices')) {
    localStorage.setItem('tattavyan_notices', JSON.stringify(DEFAULT_NOTICES));
  }
  if (!localStorage.getItem('tattavyan_attendance')) {
    localStorage.setItem('tattavyan_attendance', JSON.stringify(DEFAULT_ATTENDANCE));
  }
  
  // Load databases into memory
  loadDatabases();

  // Load Session if saved
  const savedSession = localStorage.getItem('tattavyan_session');
  if (savedSession) {
    const session = JSON.parse(savedSession);
    state.currentUser = session.user;
    state.userRole = session.role;
    state.currentView = session.role;
    state.currentTab = 'dashboard';
    
    // Autofill matching student details if logging in as student
    matchStudentProfile();
  }
}

function loadDatabases() {
  state.students = JSON.parse(localStorage.getItem('tattavyan_students'));
  state.teachers = JSON.parse(localStorage.getItem('tattavyan_teachers'));
  state.homework = JSON.parse(localStorage.getItem('tattavyan_homework'));
  state.notices = JSON.parse(localStorage.getItem('tattavyan_notices'));
  state.attendanceDb = JSON.parse(localStorage.getItem('tattavyan_attendance'));
}

function saveDb(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  loadDatabases();
}

function matchStudentProfile() {
  if (state.userRole === 'student' && state.currentUser) {
    const emailPrefix = state.currentUser.email.split('@')[0].toLowerCase();
    
    // Seek matching record in database
    let matched = state.students.find(s => s.name.toLowerCase().includes(emailPrefix));
    if (!matched && emailPrefix === 'student') {
      matched = state.students.find(s => s.id === '#ST1026'); // Rohan Desai
    }
    if (matched) {
      state.activeStudentId = matched.id;
      state.forms.payment.cardholder = matched.name;
    }
  }
}

// ==========================================
// 4. GENERAL DOM RENDER HANDLER
// ==========================================
function updateUI() {
  const appContainer = document.getElementById('app');
  
  if (state.currentView === 'login') {
    appContainer.innerHTML = renderLoginView();
  } else {
    appContainer.innerHTML = renderDashboardLayout();
  }
  
  // Trigger Lucide Icon replacement
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ==========================================
// 5. VIEW ENGINES (HTML GENERATORS)
// ==========================================

// --- LOGIN VIEW ---
function renderLoginView() {
  const f = state.forms.login;
  return `
    <div class="login-page">
      <div class="login-card glass-panel animate-fade-in">
        <div class="login-header">
          <div style="display: flex; justify-content: center; margin-bottom: 16px;">
            <div class="sidebar-logo" style="width: 64px; height: 64px; font-size: 32px;">
              <i data-lucide="graduation-cap" style="width: 36px; height: 36px; color: white;"></i>
            </div>
          </div>
          <h1>Tattavyan Edutech</h1>
          <p>Luminous Academic ERP Portal</p>
        </div>

        ${f.error ? `
          <div class="badge danger animate-fade-in" style="width: 100%; padding: 12px; border-radius: 10px; margin-bottom: 20px; display: block; text-align: center;">
            ${f.error}
          </div>
        ` : ''}

        <div class="role-selector">
          <button type="button" class="role-btn ${f.role === 'admin' ? 'active' : ''}" onclick="setLoginRole('admin')">Admin</button>
          <button type="button" class="role-btn ${f.role === 'teacher' ? 'active' : ''}" onclick="setLoginRole('teacher')">Teacher</button>
          <button type="button" class="role-btn ${f.role === 'student' ? 'active' : ''}" onclick="setLoginRole('student')">Student</button>
        </div>

        <form id="loginForm" onsubmit="handleLoginSubmit(event)">
          <div class="form-group">
            <label class="form-label">Email / User ID</label>
            <div style="position: relative;">
              <i data-lucide="user" style="position: absolute; top: 16px; left: 18px; color: var(--text-muted); width: 18px; height: 18px;"></i>
              <input 
                type="text" 
                class="form-control" 
                style="padding-left: 48px;"
                placeholder="Enter your ${f.role} ID"
                value="${f.email}"
                oninput="state.forms.login.email = this.value"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div style="position: relative;">
              <i data-lucide="key" style="position: absolute; top: 16px; left: 18px; color: var(--text-muted); width: 18px; height: 18px;"></i>
              <input 
                type="password" 
                class="form-control" 
                style="padding-left: 48px;"
                placeholder="Enter password"
                value="${f.password}"
                oninput="state.forms.login.password = this.value"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            style="width: 100%; margin-top: 8px; padding: 15px; font-size: 16px;"
          >
            Sign in as ${f.role.charAt(0).toUpperCase() + f.role.slice(1)}
          </button>
          
          <div class="quick-login-panel">
            <div class="quick-login-title">Quick Demo Login</div>
            <div class="quick-login-grid">
              <button
                type="button"
                class="quick-login-btn"
                onclick="triggerQuickLogin('admin', 'admin@tattavyan.com', 'admin123')"
              >
                <i data-lucide="shield-check" style="width: 18px; height: 18px;"></i>
                <span>Admin</span>
              </button>
              <button
                type="button"
                class="quick-login-btn"
                onclick="triggerQuickLogin('teacher', 'teacher@tattavyan.com', 'teacher123')"
              >
                <i data-lucide="book-open" style="width: 18px; height: 18px;"></i>
                <span>Teacher</span>
              </button>
              <button
                type="button"
                class="quick-login-btn"
                onclick="triggerQuickLogin('student', 'student@tattavyan.com', 'student123')"
              >
                <i data-lucide="users" style="width: 18px; height: 18px;"></i>
                <span>Student</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}

// --- DASHBOARD LAYOUT WRAPPER ---
function renderDashboardLayout() {
  const role = state.userRole;
  const email = state.currentUser?.email || 'user@tattavyan.com';
  const name = email.split('@')[0].toUpperCase();
  const initial = name.charAt(0);
  
  // Navigation sidebar lists
  const links = {
    admin: [
      { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'students', name: 'Students', icon: 'users' },
      { id: 'teachers', name: 'Teachers', icon: 'book-open' },
      { id: 'fees', name: 'Fees Ledger', icon: 'credit-card' },
      { id: 'notices', name: 'Notices', icon: 'bell' }
    ],
    teacher: [
      { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'attendance', name: 'Attendance', icon: 'calendar' },
      { id: 'homework', name: 'Homework', icon: 'book-open' },
      { id: 'notices', name: 'Notices', icon: 'bell' }
    ],
    student: [
      { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'attendance', name: 'Attendance', icon: 'calendar' },
      { id: 'homework', name: 'Homework', icon: 'book-open' },
      { id: 'fees', name: 'Tuition Fees', icon: 'credit-card' },
      { id: 'notices', name: 'Notices', icon: 'bell' }
    ]
  };

  const navLinks = links[role] || [];
  
  let headerTitle = '';
  if (state.currentTab === 'dashboard') headerTitle = `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`;
  else if (state.currentTab === 'students') headerTitle = 'Student Enrollment Directory';
  else if (state.currentTab === 'teachers') headerTitle = 'Faculty Directory';
  else if (state.currentTab === 'fees') headerTitle = role === 'student' ? 'Online School Fees Checkout' : 'Financial Ledger overrides';
  else if (state.currentTab === 'notices') headerTitle = 'Bulletin Notice Board';
  else if (state.currentTab === 'attendance') headerTitle = role === 'teacher' ? 'Attendance Register' : 'My Attendance Logs';
  else if (state.currentTab === 'homework') headerTitle = role === 'teacher' ? 'Homework Assignments Manager' : 'My Academic Homework';

  return `
    <div class="app-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <i data-lucide="graduation-cap" style="width: 24px; height: 24px; color: white;"></i>
          </div>
          <div class="sidebar-title">Tattavyan</div>
        </div>
        
        <nav class="sidebar-nav">
          ${navLinks.map(link => {
            const active = state.currentTab === link.id;
            return `
              <button 
                class="nav-item ${active ? 'active' : ''}"
                onclick="setDashboardTab('${link.id}')"
              >
                <i data-lucide="${link.icon}" style="width: 20px; height: 20px; color: ${active ? 'white' : 'var(--text-secondary)'};"></i>
                <span>${link.name}</span>
              </button>
            `;
          }).join('')}
        </nav>

        <div style="padding: 24px 16px; border-top: 1px solid var(--border)">
          <button 
            onclick="handleLogout()" 
            class="nav-item" 
            style="width: 100%; background: transparent; border: none; text-align: left; color: var(--danger); display: flex; align-items: center; gap: 14px;"
          >
            <i data-lucide="log-out" style="width: 20px; height: 20px; color: var(--danger);"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Container -->
      <main class="main-content">
        <header class="topbar">
          <h1 class="topbar-title">${headerTitle}</h1>
          <div class="user-profile">
            <div style="text-align: right;">
              <p style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0;">${name}</p>
              <p style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin: 2px 0 0;">
                <span class="badge ${role === 'admin' ? 'danger' : role === 'teacher' ? 'warning' : 'success'}" style="padding: 2px 8px; font-size: 10px;">
                  ${role}
                </span>
              </p>
            </div>
            <div class="avatar">${initial}</div>
          </div>
        </header>

        <div class="page-content animate-fade-in">
          ${renderTabContent()}
        </div>
      </main>
    </div>

    <!-- GLOBAL MODAL RENDER SHEATH -->
    ${renderModalContent()}
  `;
}

// --- DYNAMIC CONTENT DISPATCHER ---
function renderTabContent() {
  const role = state.userRole;
  const tab = state.currentTab;

  if (role === 'admin') {
    if (tab === 'dashboard') return renderAdminOverview();
    if (tab === 'students') return renderAdminStudents();
    if (tab === 'teachers') return renderAdminTeachers();
    if (tab === 'fees') return renderAdminFees();
    if (tab === 'notices') return renderAdminNotices();
  }

  if (role === 'teacher') {
    if (tab === 'dashboard') return renderTeacherOverview();
    if (tab === 'attendance') return renderTeacherAttendance();
    if (tab === 'homework') return renderTeacherHomework();
    if (tab === 'notices') return renderTeacherNotices();
  }

  if (role === 'student') {
    if (tab === 'dashboard') return renderStudentOverview();
    if (tab === 'attendance') return renderStudentAttendance();
    if (tab === 'homework') return renderStudentHomework();
    if (tab === 'fees') return renderStudentFees();
    if (tab === 'notices') return renderStudentNotices();
  }

  return `<div>Page not found</div>`;
}

// ==========================================
// 6. MODULES (ADMIN DASHBOARD PANELS)
// ==========================================

function renderAdminOverview() {
  const paidCount = state.students.filter(s => s.status === 'Active').length;
  const pendingCount = state.students.filter(s => s.status !== 'Active').length;
  const revenueTotal = paidCount * 45000;

  return `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-info">
          <h3>Students Enrolled</h3>
          <p>${state.students.length}</p>
        </div>
        <div class="stat-icon primary">
          <i data-lucide="users" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Faculty Members</h3>
          <p>${state.teachers.length}</p>
        </div>
        <div class="stat-icon secondary">
          <i data-lucide="book-open" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Collections</h3>
          <p>₹${(revenueTotal / 100000).toFixed(2)}L</p>
        </div>
        <div class="stat-icon success">
          <i data-lucide="credit-card" style="width: 24px; height: 24px;"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>Notices Synced</h3>
          <p>${state.notices.length}</p>
        </div>
        <div class="stat-icon warning">
          <i data-lucide="bell" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
    </div>
    
    <div class="glass-panel" style="padding: 32px; margin-top: 24px;">
      <h2 style="font-size: 20px; margin-bottom: 12px; color: var(--primary);">Tattavyan Academic Management Console</h2>
      <p style="color: var(--text-secondary); max-width: 800px; font-size: 15px; line-height: 1.6;">
        Welcome to your administrative ERP command station. Here you hold centralized control of academic records. You can admit new students, register teaching staff, oversee term tuition invoices, and publish bulletin notices that sync across student and teacher accounts in real-time.
      </p>
    </div>
  `;
}

function renderAdminStudents() {
  const query = state.filters.studentSearch.toLowerCase();
  const filter = state.filters.studentFilter;
  
  const filteredList = state.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(query) || 
                          student.id.toLowerCase().includes(query) ||
                          student.class.toLowerCase().includes(query);
    if (filter === 'All') return matchesSearch;
    return matchesSearch && student.status === filter;
  });

  return `
    <div class="table-container">
      <div class="table-header" style="flex-direction: column; align-items: stretch; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <h2 style="font-size: 18px; color: var(--text-primary);">Student Registry</h2>
          <button class="btn btn-primary" onclick="openModal('student')" style="padding: 10px 18px; font-size: 13px;">
            <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Enroll Student
          </button>
        </div>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <div style="position: relative; flex: 1; min-width: 200px;">
            <i data-lucide="search" style="position: absolute; top: 12px; left: 14px; color: var(--text-muted); width: 16px; height: 16px;"></i>
            <input 
              type="text" 
              placeholder="Search by ID, name, class..." 
              value="${state.filters.studentSearch}"
              oninput="state.filters.studentSearch = this.value; updateUI()"
              class="form-control"
              style="padding: 10px 14px 10px 38px; font-size: 13px; height: 40px;"
            />
          </div>
          <select 
            onchange="state.filters.studentFilter = this.value; updateUI()"
            class="form-control"
            style="width: 160px; padding: 0 12px; font-size: 13px; height: 40px;"
          >
            <option value="All" ${filter === 'All' ? 'selected' : ''}>All Statuses</option>
            <option value="Active" ${filter === 'Active' ? 'selected' : ''}>Active / Paid</option>
            <option value="Pending Fee" ${filter === 'Pending Fee' ? 'selected' : ''}>Pending Fee</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
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
            ${filteredList.map(s => `
              <tr>
                <td style="font-weight: 600; color: var(--primary); font-family: 'Geist';">${s.id}</td>
                <td style="font-weight: 500;">${s.name}</td>
                <td>${s.class}</td>
                <td>${s.parent}</td>
                <td>
                  <span class="badge ${s.status === 'Active' ? 'success' : 'warning'}">
                    ${s.status === 'Active' ? 'Active / Paid' : 'Pending Fee'}
                  </span>
                </td>
                <td>
                  <button onclick="deleteStudent('${s.id}')" class="btn-icon danger" title="Remove Student">
                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
            ${filteredList.length === 0 ? `
              <tr>
                <td colSpan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
                  No students matching search criteria.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAdminTeachers() {
  return `
    <div class="table-container">
      <div class="table-header">
        <h2 style="font-size: 18px;">Faculty Roster</h2>
        <button class="btn btn-primary" onclick="openModal('teacher')" style="padding: 10px 18px; font-size: 13px;">
          <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Register Teacher
        </button>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Name</th>
              <th>Subject Specialization</th>
              <th>Professional Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${state.teachers.map(t => `
              <tr>
                <td style="font-weight: 600; color: var(--primary); font-family: 'Geist';">${t.id}</td>
                <td style="font-weight: 500;">${t.name}</td>
                <td><span class="badge primary">${t.subject}</span></td>
                <td>${t.experience}</td>
                <td>
                  <button onclick="deleteTeacher('${t.id}')" class="btn-icon danger" title="Delete Faculty">
                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
            ${state.teachers.length === 0 ? `
              <tr>
                <td colSpan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                  No faculty registered.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAdminFees() {
  const query = state.filters.feeSearch.toLowerCase();
  const filter = state.filters.feeFilter;

  const filteredList = state.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(query) || 
                          student.id.toLowerCase().includes(query) ||
                          student.class.toLowerCase().includes(query);
    if (filter === 'All') return matchesSearch;
    if (filter === 'Paid') return matchesSearch && student.status === 'Active';
    if (filter === 'Unpaid') return matchesSearch && student.status !== 'Active';
    return matchesSearch;
  });

  const paidCount = state.students.filter(s => s.status === 'Active').length;
  const unpaidCount = state.students.filter(s => s.status !== 'Active').length;

  return `
    <div class="table-container">
      <div class="table-header" style="flex-direction: column; align-items: stretch; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 18px;">Tuition Fees Ledger</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              Term 1 Academic Base invoice is set at <strong>₹45,000</strong> per student.
            </p>
          </div>
          <div style="display: flex; gap: 20px;">
            <div style="text-align: center;">
              <div style="font-size: 18px; font-weight: 700; color: var(--success);">${paidCount}</div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Paid</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 18px; font-weight: 700; color: var(--danger);">${unpaidCount}</div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Pending</div>
            </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <div style="position: relative; flex: 1; min-width: 200px;">
            <i data-lucide="search" style="position: absolute; top: 12px; left: 14px; color: var(--text-muted); width: 16px; height: 16px;"></i>
            <input 
              type="text" 
              placeholder="Search by student name, ID..." 
              value="${state.filters.feeSearch}"
              oninput="state.filters.feeSearch = this.value; updateUI()"
              class="form-control"
              style="padding: 10px 14px 10px 38px; font-size: 13px; height: 40px;"
            />
          </div>
          <select 
            onchange="state.filters.feeFilter = this.value; updateUI()"
            class="form-control"
            style="width: 180px; padding: 0 12px; font-size: 13px; height: 40px;"
          >
            <option value="All" ${filter === 'All' ? 'selected' : ''}>All Collections</option>
            <option value="Paid" ${filter === 'Paid' ? 'selected' : ''}>Status: Paid</option>
            <option value="Unpaid" ${filter === 'Unpaid' ? 'selected' : ''}>Status: Unpaid</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Student Details</th>
              <th>Class</th>
              <th>Total Term Invoice</th>
              <th>Payment Status</th>
              <th>Administrative Action</th>
            </tr>
          </thead>
          <tbody>
            ${filteredList.map(s => `
              <tr>
                <td>
                  <div style="font-weight: 600; color: var(--text-primary);">${s.name}</div>
                  <div style="font-size: 12px; color: var(--text-muted); font-family: 'Geist';">${s.id}</div>
                </td>
                <td>${s.class}</td>
                <td style="font-weight: 600;">₹45,000</td>
                <td>
                  <span class="badge ${s.status === 'Active' ? 'success' : 'danger'}">
                    ${s.status === 'Active' ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
                <td>
                  <button 
                    onclick="toggleStudentFeeStatus('${s.id}')"
                    class="btn ${s.status === 'Active' ? 'btn-outline' : 'btn-primary'}"
                    style="padding: 6px 12px; font-size: 12px; display: inline-flex; gap: 4px;"
                  >
                    ${s.status === 'Active' ? `
                      <i data-lucide="alert-triangle" style="width: 14px; height: 14px;"></i> Mark Unpaid
                    ` : `
                      <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i> Record Payment
                    `}
                  </button>
                </td>
              </tr>
            `).join('')}
            ${filteredList.length === 0 ? `
              <tr>
                <td colSpan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">No matching ledgers.</td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAdminNotices() {
  return `
    <div class="table-container">
      <div class="table-header">
        <div>
          <h2 style="font-size: 18px;">School Notices Bulletin</h2>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            Announcements posted here synchronize globally in real-time.
          </p>
        </div>
        <button class="btn btn-primary" onclick="openModal('notice')" style="padding: 10px 18px; font-size: 13px;">
          <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Post Bulletin
        </button>
      </div>

      <div style="padding: 32px;">
        ${state.notices.map(n => `
          <div class="notice-card animate-fade-in">
            <div style="flex: 1; padding-right: 16px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span class="badge primary" style="font-size: 10px; padding: 2px 8px;">Live</span>
                <span style="font-size: 12px; color: var(--text-muted); font-weight: 500;">${n.date}</span>
              </div>
              <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px;">${n.title}</h4>
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">${n.description}</p>
            </div>
            <button onclick="deleteNotice('${n.id}')" class="btn-icon danger" style="padding: 6px;" title="Delete Bulletin">
              <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        `).join('')}
        ${state.notices.length === 0 ? `
          <div style="text-align: center; padding: 40px; color: var(--text-muted);">
            No bulletins currently active. Publish the first notice.
          </div>
        ` : ''}
      </div>
    </div>
  `;
}


// ==========================================
// 7. MODULES (TEACHER DASHBOARD PANELS)
// ==========================================

function renderTeacherOverview() {
  return `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-info">
          <h3>Assigned Classes</h3>
          <p>3</p>
        </div>
        <div class="stat-icon primary">
          <i data-lucide="clock" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Total Students</h3>
          <p>${state.students.length}</p>
        </div>
        <div class="stat-icon secondary">
          <i data-lucide="users" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Homework Assigned</h3>
          <p>${state.homework.length}</p>
        </div>
        <div class="stat-icon warning">
          <i data-lucide="book-open" style="width: 24px; height: 24px;"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>Active Bulletins</h3>
          <p>${state.notices.length}</p>
        </div>
        <div class="stat-icon success">
          <i data-lucide="bell" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
    </div>

    <div class="dashboard-grid-2col">
      <div class="table-container">
        <div class="table-header">
          <h2 style="font-size: 18px;">My Schedule</h2>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Class Division</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: 600; color: var(--primary);">09:00 AM - 10:00 AM</td>
                <td>10-A</td>
                <td>Mathematics</td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: var(--primary);">11:00 AM - 12:00 PM</td>
                <td>8-B</td>
                <td>Science</td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: var(--primary);">01:30 PM - 02:30 PM</td>
                <td>12-Sci</td>
                <td>Mathematics</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <h2 style="font-size: 18px;">Recent Bulletins</h2>
        </div>
        <div style="padding: 24px; max-height: 280px; overflow-y: auto;">
          ${state.notices.slice(0, 3).map(n => `
            <div style="padding: 14px 18px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 12px; background: rgba(255,255,255,0.3);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <h4 style="font-size: 14px; font-weight: 600;">${n.title}</h4>
                <span style="font-size: 11px; color: var(--text-muted);">${n.date}</span>
              </div>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;">${n.description}</p>
            </div>
          `).join('')}
          ${state.notices.length === 0 ? `
            <p style="color: var(--text-muted); text-align: center;">No active bulletins.</p>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderTeacherAttendance() {
  const uniqueClasses = Array.from(new Set(state.students.map(s => s.class)));
  const selectedCls = state.attendanceControl.selectedClass;
  const selectedDate = state.attendanceControl.selectedDate;
  
  // Filter class list
  const classStudents = state.students.filter(s => s.class === selectedCls);
  
  // Prepare sheet
  const classKey = `${selectedCls}_${selectedDate}`;
  const savedRecord = state.attendanceDb[classKey] || {};
  
  const statusMsg = state.attendanceControl.saveStatus;

  return `
    <div class="table-container">
      <div class="table-header" style="flex-direction: column; align-items: stretch; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 18px;">Classroom Attendance Registry</h2>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
              Record or update student attendance reports.
            </p>
          </div>
          ${statusMsg ? `
            <div class="badge success animate-fade-in" style="display: inline-flex; gap: 6px; align-items: center;">
              <i data-lucide="check" style="width: 14px; height: 14px;"></i> ${statusMsg}
            </div>
          ` : ''}
        </div>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 150px;">
            <label class="form-label" style="font-size: 12px;">Class Division</label>
            <select 
              onchange="setAttendanceClass(this.value)" 
              class="form-control"
              style="height: 44px; padding: 0 14px;"
            >
              ${uniqueClasses.map(c => `
                <option value="${c}" ${selectedCls === c ? 'selected' : ''}>Class ${c}</option>
              `).join('')}
            </select>
          </div>

          <div style="flex: 1; min-width: 150px;">
            <label class="form-label" style="font-size: 12px;">Academic Date</label>
            <input 
              type="date" 
              value="${selectedDate}" 
              onchange="setAttendanceDate(this.value)" 
              class="form-control"
              style="height: 44px; padding: 0 14px;"
            />
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Class division</th>
              <th style="text-align: center;">Registry Status</th>
              <th style="text-align: right;">Attendance Sheet Toggles</th>
            </tr>
          </thead>
          <tbody>
            ${classStudents.map(student => {
              const currentStatus = state.attendanceControl.currentSheet[student.id] || savedRecord[student.id] || 'Present';
              return `
                <tr>
                  <td style="font-weight: 600; color: var(--primary); font-family: 'Geist';">${student.id}</td>
                  <td style="font-weight: 500;">${student.name}</td>
                  <td>${student.class}</td>
                  <td style="text-align: center;">
                    <span class="badge ${currentStatus === 'Present' ? 'success' : 'danger'}">
                      ${currentStatus}
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 8px;">
                      <button 
                        type="button" 
                        onclick="toggleSheetStatus('${student.id}', 'Present')"
                        class="btn ${currentStatus === 'Present' ? 'btn-primary' : 'btn-outline'}"
                        style="padding: 6px 12px; font-size: 12px;"
                      >
                        Present
                      </button>
                      <button 
                        type="button" 
                        onclick="toggleSheetStatus('${student.id}', 'Absent')"
                        class="btn ${currentStatus === 'Absent' ? 'btn-danger' : 'btn-outline'}"
                        style="padding: 6px 12px; font-size: 12px;"
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
            ${classStudents.length === 0 ? `
              <tr>
                <td colSpan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                  No students admitted in Division Class ${selectedCls}.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>

      ${classStudents.length > 0 ? `
        <div style="padding: 24px 32px; display: flex; justify-content: flex-end; background: rgba(0, 74, 198, 0.01);">
          <button 
            onclick="saveClassAttendance()" 
            class="btn btn-primary"
            style="display: inline-flex; gap: 8px; align-items: center;"
          >
            <i data-lucide="save" style="width: 16px; height: 16px;"></i> Save Attendance Records
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderTeacherHomework() {
  return `
    <div class="table-container">
      <div class="table-header">
        <h2 style="font-size: 18px;">Homework Assignments</h2>
        <button class="btn btn-primary" onclick="openModal('homework')" style="padding: 8px 16px; font-size: 13px;">
          <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Assign Homework
        </button>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Assignment Title</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${state.homework.map(h => `
              <tr>
                <td style="font-weight: 600;">${h.class}</td>
                <td><span class="badge primary">${h.subject}</span></td>
                <td>${h.title}</td>
                <td style="color: var(--text-secondary);">${h.dueDate}</td>
                <td>
                  <button onclick="deleteHomework('${h.id}')" class="btn-icon danger">
                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
            ${state.homework.length === 0 ? `
              <tr>
                <td colSpan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                  No homework currently assigned.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTeacherNotices() {
  return `
    <div class="table-container">
      <div class="table-header">
        <h2 style="font-size: 18px;">Publish School Notice</h2>
        <button class="btn btn-primary" onclick="openModal('notice')" style="padding: 8px 16px; font-size: 13px;">
          <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Publish Notice
        </button>
      </div>
      <div style="padding: 32px;">
        ${state.notices.map(n => `
          <div class="notice-card">
            <div>
              <div style="display: flex; align-items: center; gap: 8, margin-bottom: 4px;">
                <span class="badge primary" style="font-size: 10px; padding: 2px 8px;">Synched</span>
                <span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">${n.date}</span>
              </div>
              <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-top: 6px; margin-bottom: 4px;">${n.title}</h4>
              <p style="font-size: 14px; color: var(--text-secondary);">${n.description}</p>
            </div>
            <button onclick="deleteNotice('${n.id}')" class="btn-icon danger">
              <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        `).join('')}
        ${state.notices.length === 0 ? `
          <p style="color: var(--text-muted); text-align: center; padding: 40px;">No notices published.</p>
        ` : ''}
      </div>
    </div>
  `;
}


// ==========================================
// 8. MODULES (STUDENT DASHBOARD PANELS)
// ==========================================

function getStudentAttendanceMetrics(activeStudent) {
  const logs = [];
  let presentCount = 0;
  let totalMarked = 0;
  
  Object.entries(state.attendanceDb).forEach(([key, record]) => {
    const [cls, date] = key.split('_');
    if (cls === activeStudent.class) {
      const status = record[activeStudent.id];
      if (status) {
        totalMarked++;
        if (status === 'Present') presentCount++;
        logs.push({ date, status });
      }
    }
  });

  logs.sort((a, b) => new Date(b.date) - new Date(a.date));
  const rate = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 95;
  
  return { rate, logs, presentCount, totalMarked };
}

function renderStudentOverview() {
  const activeStudent = state.students.find(s => s.id === state.activeStudentId) || DEFAULT_STUDENTS[2];
  const metrics = getStudentAttendanceMetrics(activeStudent);
  const myHWList = state.homework.filter(h => h.class === activeStudent.class);

  return `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-info">
          <h3>Attendance Rate</h3>
          <p>${metrics.rate}%</p>
        </div>
        <div class="stat-icon success">
          <i data-lucide="check-circle" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>My Assignments</h3>
          <p>${myHWList.length}</p>
        </div>
        <div class="stat-icon warning">
          <i data-lucide="book-open" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>My Division</h3>
          <p style="font-size: 26px; font-weight: 700;">Class ${activeStudent.class}</p>
        </div>
        <div class="stat-icon primary">
          <i data-lucide="award" style="width: 24px; height: 24px;"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>School Notices</h3>
          <p>${state.notices.length}</p>
        </div>
        <div class="stat-icon secondary">
          <i data-lucide="bell" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
    </div>

    <div class="dashboard-grid-2col">
      <div class="table-container">
        <div class="table-header">
          <h2 style="font-size: 18px;">Pending Assignments</h2>
        </div>
        <div style="padding: 24px;">
          ${myHWList.map(hw => `
            <div style="padding: 16px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.3);">
              <div>
                <span class="badge primary" style="font-size: 9px; padding: 1px 6px; margin-bottom: 6px;">${hw.subject}</span>
                <h4 style="font-size: 14px; font-weight: 600; color: var(--text-primary);">${hw.title}</h4>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Due Date: ${hw.dueDate}</p>
              </div>
              <span class="badge warning">Pending</span>
            </div>
          `).join('')}
          ${myHWList.length === 0 ? `
            <div style="text-align: center; padding: 24px; color: var(--text-muted);">
              🎉 Excellent! No pending homework assigned for Class ${activeStudent.class}.
            </div>
          ` : ''}
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <h2 style="font-size: 18px;">Recent Notices Bulletin</h2>
        </div>
        <div style="padding: 24px; max-height: 280px; overflow-y: auto;">
          ${state.notices.map((n, idx) => `
            <div style="padding: 16px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 12px; background: ${idx === 0 ? 'rgba(0, 74, 198, 0.04)' : 'rgba(255,255,255,0.3)'}; border-left: ${idx === 0 ? '4px solid var(--primary)' : '1px solid var(--border)'};">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                ${idx === 0 ? `<span class="badge primary" style="font-size: 9px; padding: 1px 6px;">NEW</span>` : ''}
                <span style="font-size: 11px; color: var(--text-muted);">${n.date}</span>
              </div>
              <h4 style="font-size: 14px; font-weight: 600; color: var(--text-primary);">${n.title}</h4>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin-top: 4px;">${n.description}</p>
            </div>
          `).join('')}
          ${state.notices.length === 0 ? `
            <p style="color: var(--text-muted); text-align: center;">No school bulletins active.</p>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderStudentHomework() {
  const activeStudent = state.students.find(s => s.id === state.activeStudentId) || DEFAULT_STUDENTS[2];
  const myHWList = state.homework.filter(h => h.class === activeStudent.class);
  
  return `
    <div class="table-container">
      <div class="table-header">
        <h2 style="font-size: 18px;">Homework & Lesson Submissions</h2>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assignment Title</th>
              <th>Due Date</th>
              <th>Submission Status</th>
            </tr>
          </thead>
          <tbody>
            ${myHWList.map(h => `
              <tr>
                <td style="font-weight: 600;"><span class="badge primary">${h.subject}</span></td>
                <td>${h.title}</td>
                <td style="color: var(--text-secondary);">${h.dueDate}</td>
                <td><span class="badge warning">Pending</span></td>
              </tr>
            `).join('')}
            ${myHWList.length === 0 ? `
              <tr>
                <td colSpan="4" style="text-align: center; padding: 40px; color: var(--text-muted);">
                  No homework assignments assigned for Class ${activeStudent.class}.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderStudentNotices() {
  return `
    <div class="table-container">
      <div class="table-header">
        <h2 style="font-size: 18px;">Official Bulletins Board</h2>
      </div>
      <div style="padding: 32px;">
        ${state.notices.map(n => `
          <div style="padding: 20px 24px; border: 1px solid var(--border); border-radius: 14px; margin-bottom: 16px; background: rgba(255,255,255,0.45);">
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">Posted: ${n.date}</div>
            <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px;">${n.title}</h4>
            <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">${n.description}</p>
          </div>
        `).join('')}
        ${state.notices.length === 0 ? `
          <p style="color: var(--text-muted); text-align: center; padding: 40px;">No bulletins are currently active.</p>
        ` : ''}
      </div>
    </div>
  `;
}

function renderStudentFees() {
  const activeStudent = state.students.find(s => s.id === state.activeStudentId) || DEFAULT_STUDENTS[2];
  
  return `
    <div style="max-width: 800px; margin: 0 auto;">
      <div class="fee-card animate-fade-in" style="margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; position: relative; z-index: 1;">
          <div>
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; font-weight: 600;">Tattavyan School Tuition Dues</div>
            <h2 style="font-size: 32px; font-weight: 700; margin: 8px 0; fontFamily: 'Geist';">₹45,000.00</h2>
            <div style="font-size: 13px; opacity: 0.9;">Invoice Reference: #INV-TERM1-${activeStudent.id.replace('#', '')}</div>
          </div>
          <span class="badge" style="border: 1.5px solid white; color: white; background: ${activeStudent.status === 'Active' ? 'var(--success)' : 'var(--danger)'};">
            ${activeStudent.status === 'Active' ? 'PAID' : 'PENDING'}
          </span>
        </div>
        <div style="margin-top: 32px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1;">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; opacity: 0.7;">Student Name</div>
            <div style="font-size: 15px; font-weight: 600;">${activeStudent.name}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; text-transform: uppercase; opacity: 0.7;">Division</div>
            <div style="font-size: 15px; font-weight: 600;">Class ${activeStudent.class}</div>
          </div>
        </div>
      </div>

      <div class="table-container animate-fade-in" style="margin-bottom: 32px;">
        <div class="table-header">
          <h3 style="font-size: 16px;">Dues Itemized Invoice</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Fee Category Description</th>
                <th style="text-align: right;">Term Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Core Academic Tuition Fee</td>
                <td style="text-align: right; font-weight: 600;">₹38,000.00</td>
              </tr>
              <tr>
                <td>Laboratory & Digital Facility Access</td>
                <td style="text-align: right; font-weight: 600;">₹2,000.00</td>
              </tr>
              <tr>
                <td>Sports Complex & Clubs Subscription</td>
                <td style="text-align: right; font-weight: 600;">₹3,000.00</td>
              </tr>
              <tr>
                <td>Library Reference Desk Access</td>
                <td style="text-align: right; font-weight: 600;">₹2,000.00</td>
              </tr>
              <tr style="background: rgba(0,74,198,0.03);">
                <td style="font-weight: 700;">Total School Fees</td>
                <td style="text-align: right; font-weight: 700; color: var(--primary); font-size: 16px;">₹45,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end;">
        ${activeStudent.status === 'Active' ? `
          <div class="glass-panel" style="width: 100%; padding: 24px; text-align: center; display: flex; flexDirection: column; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--success-bg); color: var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
              <i data-lucide="check" style="width: 24px; height: 24px;"></i>
            </div>
            <div>
              <h4 style="font-size: 16px; font-weight: 600; color: var(--success);">All school dues cleared for this academic term!</h4>
              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Thank you. Transaction was logged under ID #TXN-SEC-${Date.now().toString().slice(-6)}.</p>
            </div>
            <button class="btn btn-outline" style="padding: 8px 16px; font-size: 12px; display: inline-flex; gap: 6px; margin-top: 8px;" onclick="alert('Digital fee receipt captured! Ready to print.')">
              <i data-lucide="file-text" style="width: 14px; height: 14px;"></i> Download Invoice Receipt
            </button>
          </div>
        ` : `
          <button class="btn btn-primary" style="padding: 14px 28px; font-size: 15px; display: inline-flex; gap: 8px; align-items: center;" onclick="openModal('pay')">
            <i data-lucide="credit-card" style="width: 18px; height: 18px;"></i> Checkout Secure Dues
          </button>
        `}
      </div>
    </div>
  `;
}

function renderStudentAttendance() {
  const activeStudent = state.students.find(s => s.id === state.activeStudentId) || DEFAULT_STUDENTS[2];
  const metrics = getStudentAttendanceMetrics(activeStudent);

  return `
    <div style="max-width: 800px; margin: 0 auto;">
      <div class="glass-panel animate-fade-in" style="padding: 28px; margin-bottom: 32px; display: flex; align-items: center; gap: 28px; flex-wrap: wrap;">
        <div style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid var(--success); display: flex; align-items: center; justify-content: center; color: var(--success); font-weight: 700; fontSize: 22px; background: var(--success-bg); flex-shrink: 0; margin: 0 auto;">
          ${metrics.rate}%
        </div>
        <div style="flex: 1; min-width: 250px; text-align: left;">
          <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary);">Attendance Academic Record</h3>
          <p style="font-size: 14px; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">
            Roster matches your registered division: <strong>Class ${activeStudent.class}</strong>. Out of ${metrics.totalMarked} academic sessions logged by teachers, you were marked Present on ${metrics.presentCount} dates.
          </p>
        </div>
      </div>

      <div class="table-container animate-fade-in">
        <div class="table-header">
          <h2 style="font-size: 18px;">Classroom Attendance Logs</h2>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Academic Date</th>
                <th>Academic division</th>
                <th>Status Badge</th>
              </tr>
            </thead>
            <tbody>
              ${metrics.logs.map(log => `
                <tr>
                  <td style="font-weight: 600;">${log.date}</td>
                  <td>Class ${activeStudent.class}</td>
                  <td>
                    <span class="badge ${log.status === 'Present' ? 'success' : 'danger'}">
                      ${log.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
              ${metrics.logs.length === 0 ? `
                <tr>
                  <td colSpan="3" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    No attendance logs recorded for division ${activeStudent.class} this term.
                  </td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 9. MODALS RENDER (DYNAMIC DIALOG SHEATH)
// ==========================================
function renderModalContent() {
  if (!state.activeModal) return '';

  const modal = state.activeModal;
  
  if (modal === 'student') {
    const s = state.forms.student;
    const classes = Array.from(new Set(state.students.map(std => std.class)));
    if (classes.length === 0) classes.push('10-A');
    
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 style="font-size: 18px; margin: 0;">Enroll New Student</h2>
            <button onclick="closeModal()" class="btn-icon"><i data-lucide="x" style="width: 20px; height: 20px;"></i></button>
          </div>
          <form onsubmit="handleNewStudentSubmit(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Student Full Name</label>
                <input type="text" required class="form-control" placeholder="e.g. Rahul Sharma" value="${s.name}" oninput="state.forms.student.name = this.value" />
              </div>
              <div class="form-group">
                <label class="form-label">Class Division</label>
                <input type="text" required class="form-control" placeholder="e.g. 10-A" value="${s.class}" oninput="state.forms.student.class = this.value" />
              </div>
              <div class="form-group">
                <label class="form-label">Parent / Guardian Name</label>
                <input type="text" required class="form-control" placeholder="e.g. Suresh Patel" value="${s.parent}" oninput="state.forms.student.parent = this.value" />
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Tuition Status</label>
                <select class="form-control" onchange="state.forms.student.status = this.value">
                  <option value="Active" ${s.status === 'Active' ? 'selected' : ''}>Active / Paid</option>
                  <option value="Pending Fee" ${s.status === 'Pending Fee' ? 'selected' : ''}>Pending Fee</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" onclick="closeModal()" class="btn btn-outline">Cancel</button>
              <button type="submit" class="btn btn-primary">Enroll Student</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (modal === 'teacher') {
    const t = state.forms.teacher;
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 style="font-size: 18px; margin: 0;">Register Faculty</h2>
            <button onclick="closeModal()" class="btn-icon"><i data-lucide="x" style="width: 20px; height: 20px;"></i></button>
          </div>
          <form onsubmit="handleNewTeacherSubmit(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Faculty Full Name</label>
                <input type="text" required class="form-control" placeholder="e.g. Sneha Patel" value="${t.name}" oninput="state.forms.teacher.name = this.value" />
              </div>
              <div class="form-group">
                <label class="form-label">Primary Subject</label>
                <input type="text" required class="form-control" placeholder="e.g. Chemistry" value="${t.subject}" oninput="state.forms.teacher.subject = this.value" />
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Experience Tenure</label>
                <input type="text" required class="form-control" placeholder="e.g. 5 Years" value="${t.experience}" oninput="state.forms.teacher.experience = this.value" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" onclick="closeModal()" class="btn btn-outline">Cancel</button>
              <button type="submit" class="btn btn-primary">Register Faculty</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (modal === 'notice') {
    const n = state.forms.notice;
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 style="font-size: 18px; margin: 0;">Post Bulletin Notice</h2>
            <button onclick="closeModal()" class="btn-icon"><i data-lucide="x" style="width: 20px; height: 20px;"></i></button>
          </div>
          <form onsubmit="handleNewNoticeSubmit(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Notice Title</label>
                <input type="text" required class="form-control" placeholder="e.g. Submission Deadline" value="${n.title}" oninput="state.forms.notice.title = this.value" />
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Announcement Description</label>
                <textarea required class="form-control" style="min-height: 120px;" placeholder="Write description details here..." oninput="state.forms.notice.description = this.value">${n.description}</textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" onclick="closeModal()" class="btn btn-outline">Cancel</button>
              <button type="submit" class="btn btn-primary">Post Announcement</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (modal === 'homework') {
    const hw = state.forms.homework;
    const classes = Array.from(new Set(state.students.map(std => std.class)));
    if (classes.length === 0) classes.push('10-A');

    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 style="font-size: 18px; margin: 0;">Assign Homework</h2>
            <button onclick="closeModal()" class="btn-icon"><i data-lucide="x" style="width: 20px; height: 20px;"></i></button>
          </div>
          <form onsubmit="handleNewHomeworkSubmit(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Designated Class Division</label>
                <select class="form-control" onchange="state.forms.homework.class = this.value">
                  ${classes.map(c => `<option value="${c}" ${hw.class === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Subject</label>
                <input type="text" required class="form-control" placeholder="e.g. Mathematics" value="${hw.subject}" oninput="state.forms.homework.subject = this.value" />
              </div>
              <div class="form-group">
                <label class="form-label">Homework Title/Topic</label>
                <input type="text" required class="form-control" placeholder="e.g. Algebra Worksheet" value="${hw.title}" oninput="state.forms.homework.title = this.value" />
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Due Date</label>
                <input type="date" required class="form-control" value="${hw.dueDate}" onchange="state.forms.homework.dueDate = this.value" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" onclick="closeModal()" class="btn btn-outline">Cancel</button>
              <button type="submit" class="btn btn-primary">Assign Homework</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (modal === 'pay') {
    const c = state.checkout;
    const f = state.forms.payment;
    
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 style="font-size: 18px; margin: 0;">Secure Dues Checkout</h2>
            <button onclick="${c.isProcessing ? 'void(0)' : 'closeModal()'}" class="btn-icon" ${c.isProcessing ? 'disabled style="opacity: 0.3;"' : ''}>
              <i data-lucide="x" style="width: 20px; height: 20px;"></i>
            </button>
          </div>
          
          ${c.success ? `
            <div class="modal-body" style="text-align: center; padding: 40px 24px;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--success-bg); color: var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <i data-lucide="check" style="width: 36px; height: 36px;"></i>
              </div>
              <h3 style="font-size: 20px; color: var(--success); font-weight: 600; margin-bottom: 8px;">Dues Paid Successfully!</h3>
              <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
                ₹45,000.00 term tuition fee has been processed securely. Your administrative enrollment record has been updated to Clear/Active.
              </p>
              <button type="button" onclick="closeModal(); setDashboardTab('fees');" class="btn btn-primary" style="padding: 10px 24px;">Return to Fees Ledger</button>
            </div>
          ` : `
            <form onsubmit="handleSecurePaymentSubmit(event)">
              <div class="modal-body">
                <div style="display: flex; gap: 12px; padding: 12px 16px; background: var(--primary-light); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 20px;">
                  <i data-lucide="shield-alert" style="width: 20px; height: 20px; color: var(--primary); flex-shrink: 0; margin-top: 2px;"></i>
                  <div style="font-size: 13px; color: var(--text-secondary);">
                    Checkout transaction is configured for secure mock testing. base term invoice is cleared at <strong>₹45,000.00</strong>.
                  </div>
                </div>

                <div class="role-selector" style="margin-bottom: 20px;">
                  <button type="button" class="role-btn ${c.payMethod === 'card' ? 'active' : ''}" onclick="setPaymentMethod('card')" ${c.isProcessing ? 'disabled' : ''}>Card Payment</button>
                  <button type="button" class="role-btn ${c.payMethod === 'upi' ? 'active' : ''}" onclick="setPaymentMethod('upi')" ${c.isProcessing ? 'disabled' : ''}>UPI ID / QR</button>
                </div>

                ${c.isProcessing ? `
                  <div style="display: flex; flex-direction: column; align-items: center; padding: 32px 0; gap: 16px;">
                    <div style="border: 4px solid rgba(0, 74, 198, 0.1); border-top: 4px solid #004ac6; border-radius: 50%; width: 36px; height: 36px; animation: spin 0.8s linear infinite;"></div>
                    <div style="font-size: 14px; color: var(--text-primary); font-weight: 600;">${c.processingStep}</div>
                  </div>
                ` : c.payMethod === 'card' ? `
                  <div class="form-group">
                    <label class="form-label">Cardholder Name</label>
                    <input type="text" required class="form-control" value="${f.cardholder}" oninput="state.forms.payment.cardholder = this.value" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Card Number</label>
                    <input type="text" required class="form-control" value="${f.cardNo}" oninput="state.forms.payment.cardNo = this.value" />
                  </div>
                  <div style="display: flex; gap: 16px;">
                    <div class="form-group" style="flex: 1;">
                      <label class="form-label">Expiry (MM/YY)</label>
                      <input type="text" required class="form-control" placeholder="MM/YY" value="${f.expiry}" oninput="state.forms.payment.expiry = this.value" />
                    </div>
                    <div class="form-group" style="flex: 1;">
                      <label class="form-label">CVV</label>
                      <input type="password" maxLength="3" required class="form-control" placeholder="***" value="${f.cvv}" oninput="state.forms.payment.cvv = this.value" />
                    </div>
                  </div>
                ` : `
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label">UPI ID Address</label>
                    <input type="text" required class="form-control" placeholder="e.g. rohan@okaxis" value="${f.upiId}" oninput="state.forms.payment.upiId = this.value" />
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">
                      UPI request invoice will be securely routed directly to your banking client.
                    </div>
                  </div>
                `}
              </div>

              ${!c.isProcessing ? `
                <div class="modal-footer">
                  <button type="button" onclick="closeModal()" class="btn btn-outline">Cancel</button>
                  <button type="submit" class="btn btn-primary">Pay ₹45,000.00</button>
                </div>
              ` : ''}
            </form>
          `}
        </div>
      </div>
    `;
  }

  return '';
}

// ==========================================
// 10. INTERACTION & EVENT CONTROLLERS
// ==========================================

// --- AUTH INTERACTIONS ---
window.setLoginRole = function(role) {
  state.forms.login.role = role;
  state.forms.login.error = '';
  updateUI();
};

window.triggerQuickLogin = function(role, email, pass) {
  state.forms.login.role = role;
  state.forms.login.email = email;
  state.forms.login.password = pass;
  state.forms.login.error = '';
  updateUI();
};

window.handleLoginSubmit = function(e) {
  e.preventDefault();
  
  const f = state.forms.login;
  const email = f.email.toLowerCase().trim();
  const password = f.password;
  const role = f.role;

  // Sync Seeding Creds
  const creds = {
    admin: { email: 'admin@tattavyan.com', pass: 'admin123' },
    teacher: { email: 'teacher@tattavyan.com', pass: 'teacher123' },
    student: { email: 'student@tattavyan.com', pass: 'student123' }
  };

  try {
    const match = creds[role];
    if (match) {
      if (email === match.email && password === match.pass) {
        state.currentUser = { email, displayName: `${role.charAt(0).toUpperCase() + role.slice(1)} User` };
        state.userRole = role;
        state.currentView = role;
        state.currentTab = 'dashboard';
        
        // Save Session
        localStorage.setItem('tattavyan_session', JSON.stringify({ user: state.currentUser, role: state.userRole }));
        
        // Setup matching student profile details
        matchStudentProfile();
        updateUI();
      } else {
        throw new Error(`Invalid password credential configured for ${role.toUpperCase()}.`);
      }
    } else {
      throw new Error("Invalid role credentials configuration.");
    }
  } catch (err) {
    f.error = err.message || 'Incorrect sign in credentials.';
    updateUI();
  }
};

window.handleLogout = function() {
  state.currentUser = null;
  state.userRole = null;
  state.currentView = 'login';
  state.currentTab = 'dashboard';
  state.forms.login.email = '';
  state.forms.login.password = '';
  state.forms.login.error = '';
  
  localStorage.removeItem('tattavyan_session');
  updateUI();
};

// --- NAVIGATION SWITCHERS ---
window.setDashboardTab = function(tabId) {
  state.currentTab = tabId;
  
  // Clean states for specific tabs
  if (tabId === 'attendance' && state.userRole === 'teacher') {
    state.attendanceControl.saveStatus = '';
    // Load attendance from database
    const classKey = `${state.attendanceControl.selectedClass}_${state.attendanceControl.selectedDate}`;
    const saved = state.attendanceDb[classKey] || {};
    
    // Copy saved statuses or Present to current sheet
    state.attendanceControl.currentSheet = {};
    const classStds = state.students.filter(s => s.class === state.attendanceControl.selectedClass);
    classStds.forEach(s => {
      state.attendanceControl.currentSheet[s.id] = saved[s.id] || 'Present';
    });
  }

  updateUI();
};

// --- ADMIN CONTROLLER ACTIONS ---
window.deleteStudent = function(studentId) {
  if (window.confirm('Are you sure you want to remove this student from Tattavyan?')) {
    const updated = state.students.filter(s => s.id !== studentId);
    saveDb('tattavyan_students', updated);
    updateUI();
  }
};

window.deleteTeacher = function(teacherId) {
  if (window.confirm('Are you sure you want to dismiss this faculty?')) {
    const updated = state.teachers.filter(t => t.id !== teacherId);
    saveDb('tattavyan_teachers', updated);
    updateUI();
  }
};

window.deleteNotice = function(noticeId) {
  if (window.confirm('Delete announcement notice from the academic board?')) {
    const updated = state.notices.filter(n => n.id !== noticeId);
    saveDb('tattavyan_notices', updated);
    updateUI();
  }
};

window.toggleStudentFeeStatus = function(studentId) {
  const updated = state.students.map(s => {
    if (s.id === studentId) {
      return {
        ...s,
        status: s.status === 'Active' ? 'Pending Fee' : 'Active'
      };
    }
    return s;
  });
  saveDb('tattavyan_students', updated);
  updateUI();
};

// --- TEACHER CONTROLLER ACTIONS ---
window.setAttendanceClass = function(classVal) {
  state.attendanceControl.selectedClass = classVal;
  state.attendanceControl.saveStatus = '';
  
  // Reload sheet
  const classKey = `${classVal}_${state.attendanceControl.selectedDate}`;
  const saved = state.attendanceDb[classKey] || {};
  state.attendanceControl.currentSheet = {};
  
  const classStds = state.students.filter(s => s.class === classVal);
  classStds.forEach(s => {
    state.attendanceControl.currentSheet[s.id] = saved[s.id] || 'Present';
  });
  
  updateUI();
};

window.setAttendanceDate = function(dateVal) {
  state.attendanceControl.selectedDate = dateVal;
  state.attendanceControl.saveStatus = '';
  
  // Reload sheet
  const classKey = `${state.attendanceControl.selectedClass}_${dateVal}`;
  const saved = state.attendanceDb[classKey] || {};
  state.attendanceControl.currentSheet = {};
  
  const classStds = state.students.filter(s => s.class === state.attendanceControl.selectedClass);
  classStds.forEach(s => {
    state.attendanceControl.currentSheet[s.id] = saved[s.id] || 'Present';
  });
  
  updateUI();
};

window.toggleSheetStatus = function(studentId, status) {
  state.attendanceControl.currentSheet[studentId] = status;
  state.attendanceControl.saveStatus = '';
  updateUI();
};

window.saveClassAttendance = function() {
  const selectedCls = state.attendanceControl.selectedClass;
  const selectedDate = state.attendanceControl.selectedDate;
  const classKey = `${selectedCls}_${selectedDate}`;
  
  const classStds = state.students.filter(s => s.class === selectedCls);
  
  // Make sure we have a status for all students in the class
  const classSheet = {};
  classStds.forEach(s => {
    classSheet[s.id] = state.attendanceControl.currentSheet[s.id] || 'Present';
  });

  const updatedDb = {
    ...state.attendanceDb,
    [classKey]: classSheet
  };

  state.attendanceDb = updatedDb;
  saveDb('tattavyan_attendance', updatedDb);
  
  state.attendanceControl.saveStatus = 'Attendance updated successfully!';
  updateUI();
  
  setTimeout(() => {
    state.attendanceControl.saveStatus = '';
    updateUI();
  }, 2500);
};

window.deleteHomework = function(hwId) {
  if (window.confirm('Delete this homework worksheet?')) {
    const updated = state.homework.filter(h => h.id !== hwId);
    saveDb('tattavyan_homework', updated);
    updateUI();
  }
};

// --- DYNAMIC DIALOG TRIGGERS ---
window.openModal = function(modalType) {
  state.activeModal = modalType;
  
  // Reset forms for clean overlay state
  if (modalType === 'student') {
    state.forms.student = { name: '', class: '10-A', parent: '', status: 'Active' };
  } else if (modalType === 'teacher') {
    state.forms.teacher = { name: '', subject: '', experience: '' };
  } else if (modalType === 'notice') {
    state.forms.notice = { title: '', description: '' };
  } else if (modalType === 'homework') {
    state.forms.homework = { class: '10-A', subject: 'Mathematics', title: '', dueDate: '2026-05-22' };
  } else if (modalType === 'pay') {
    state.checkout.isProcessing = false;
    state.checkout.success = false;
    state.checkout.processingStep = '';
  }
  
  updateUI();
};

window.closeModal = function() {
  state.activeModal = null;
  updateUI();
};

// --- FORM CAPTURES ---
window.handleNewStudentSubmit = function(e) {
  e.preventDefault();
  const s = state.forms.student;
  
  const newId = `#ST${1024 + state.students.length + Math.floor(Math.random() * 100)}`;
  const updated = [
    { id: newId, name: s.name, class: s.class, parent: s.parent, status: s.status },
    ...state.students
  ];
  
  saveDb('tattavyan_students', updated);
  closeModal();
};

window.handleNewTeacherSubmit = function(e) {
  e.preventDefault();
  const t = state.forms.teacher;
  
  const newId = `#T${101 + state.teachers.length + Math.floor(Math.random() * 10)}`;
  const updated = [
    { id: newId, name: t.name, subject: t.subject, experience: t.experience },
    ...state.teachers
  ];
  
  saveDb('tattavyan_teachers', updated);
  closeModal();
};

window.handleNewNoticeSubmit = function(e) {
  e.preventDefault();
  const n = state.forms.notice;
  
  const newId = `#N${Date.now().toString().slice(-4)}`;
  const updated = [
    { id: newId, title: n.title, description: n.description, date: 'Just now' },
    ...state.notices
  ];
  
  saveDb('tattavyan_notices', updated);
  closeModal();
};

window.handleNewHomeworkSubmit = function(e) {
  e.preventDefault();
  const hw = state.forms.homework;
  
  const newId = `#HW${Date.now().toString().slice(-4)}`;
  const updated = [
    { id: newId, class: hw.class, subject: hw.subject, title: hw.title, dueDate: hw.dueDate },
    ...state.homework
  ];
  
  saveDb('tattavyan_homework', updated);
  closeModal();
};

// --- SECURE PAYMENT OVERLAYS ---
window.setPaymentMethod = function(method) {
  state.checkout.payMethod = method;
  updateUI();
};

window.handleSecurePaymentSubmit = function(e) {
  e.preventDefault();
  
  const c = state.checkout;
  c.isProcessing = true;
  c.processingStep = 'Connecting to banking gateway...';
  updateUI();
  
  setTimeout(() => {
    c.processingStep = 'Authorizing dues clearance with merchant...';
    updateUI();
    
    setTimeout(() => {
      c.processingStep = 'Updating administrative academic records...';
      updateUI();
      
      setTimeout(() => {
        c.isProcessing = false;
        c.success = true;
        
        // Sync active student state inside LocalStorage
        const updated = state.students.map(s => {
          if (s.id === state.activeStudentId) {
            return {
              ...s,
              status: 'Active'
            };
          }
          return s;
        });
        
        saveDb('tattavyan_students', updated);
        updateUI();
      }, 1000);
    }, 1000);
  }, 1000);
};

// ==========================================
// 11. BOOTSTRAP INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initDatabase();
  updateUI();
});
