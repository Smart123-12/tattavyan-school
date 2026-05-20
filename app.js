/**
 * Tattavyan School ERP - Single Page Application Engine
 * Strictly aligned with Google Stitch "Luminous Academic Interface" design system.
 */

// ==========================================
// 1. ADVANCED DATABASE DEFAULT SEEDING
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
  { id: '#HW1', class: '10-A', subject: 'Mathematics', title: 'Algebra proofs and quadratic equations worksheet', dueDate: '2026-05-25' },
  { id: '#HW2', class: '8-B', subject: 'Science', title: 'Chapter 4 Solar System space project reading guide', dueDate: '2026-05-26' },
  { id: '#HW3', class: '12-Sci', subject: 'Mathematics', title: 'Calculus derivatives worksheet and proofs', dueDate: '2026-05-28' }
];

const DEFAULT_NOTICES = [
  { id: '#N1', title: 'Annual Day Celebrations 2026', description: 'Tattavyan School is celebrating its Annual Day on 15th June. All students are invited to register for cultural performances.', date: 'Today', category: 'Activities' },
  { id: '#N2', title: 'Term-1 Exam Timetable Out', description: 'The official exam schedule has been posted on the main board. Please verify dates with your division teachers.', date: '2 days ago', category: 'Exams' },
  { id: '#N3', title: 'Calculus Seminar at Seminar Hall', description: 'An open seminar on practical calculus derivatives and analytical systems will be hosted in Seminar Hall A.', date: '3 days ago', category: 'Academic' }
];

const DEFAULT_ATTENDANCE = {
  "10-A_2026-05-19": { "#ST1024": "Present" },
  "8-B_2026-05-19": { "#ST1025": "Present" },
  "9-A_2026-05-19": { "#ST1027": "Absent" },
  "12-Sci_2026-05-19": { "#ST1026": "Present" }
};

const DEFAULT_GRADES = {
  "#ST1024": {
    "Math": { marks: 88, total: 100, grade: 'A', remarks: 'Very strong logical understanding. Great job!' },
    "Science": { marks: 92, total: 100, grade: 'A+', remarks: 'Superb laboratory worksheets, detailed reasoning.' },
    "English": { marks: 78, total: 100, grade: 'B', remarks: 'Needs slightly more focus on grammar conventions.' },
    "Computer": { marks: 95, total: 100, grade: 'A+', remarks: 'Outstanding coding syntax and problem solving!' }
  },
  "#ST1025": {
    "Math": { marks: 74, total: 100, grade: 'B', remarks: 'Good effort. Keep practicing algebra equations.' },
    "Science": { marks: 85, total: 100, grade: 'A', remarks: 'Engages wonderfully in science projects.' },
    "English": { marks: 90, total: 100, grade: 'A+', remarks: 'Exquisite composition and essays. Exceptionally written!' },
    "Computer": { marks: 80, total: 100, grade: 'A', remarks: 'Comfortable with algorithms, needs practice on structure.' }
  },
  "#ST1026": {
    "Math": { marks: 95, total: 100, grade: 'A+', remarks: 'Genius analytical skill, finishes ahead of schedule!' },
    "Science": { marks: 90, total: 100, grade: 'A', remarks: 'Active participation and solid critical thinker.' },
    "English": { marks: 85, total: 100, grade: 'A', remarks: 'Creative interpretations in literature sessions.' },
    "Computer": { marks: 98, total: 100, grade: 'A+', remarks: 'Brilliant algorithms, created an outstanding final project!' }
  },
  "#ST1027": {
    "Math": { marks: 62, total: 100, grade: 'C', remarks: 'Needs regular practice and remedial worksheet focus.' },
    "Science": { marks: 70, total: 100, grade: 'B-', remarks: 'Good vocabulary, needs stronger attention in lab sessions.' },
    "English": { marks: 82, total: 100, grade: 'A', remarks: 'Polished verbal participation, good writing mechanics.' },
    "Computer": { marks: 75, total: 100, grade: 'B', remarks: 'Shows good base knowledge, keep testing constructs.' }
  }
};

const DEFAULT_SUBMISSIONS = [
  { id: '#SUB1', hwId: '#HW1', studentId: '#ST1024', studentName: 'Aarav Patel', fileName: 'aarav_algebra_worksheet.pdf', uploadedAt: '2026-05-19', score: '9/10', feedback: 'Fantastic algebraic proof, Aarav. Step 4 was exceptionally well solved!', status: 'Graded' },
  { id: '#SUB2', hwId: '#HW2', studentId: '#ST1025', studentName: 'Diya Sharma', fileName: 'diya_solar_reading.docx', uploadedAt: '2026-05-18', score: '8/10', feedback: 'Well summarized reading notes. Outline the core factors slightly more next time.', status: 'Graded' }
];

const SCHEDULES = {
  "10-A": {
    "Monday": [
      { time: "09:00 AM - 10:00 AM", subject: "Mathematics", room: "Room 102", teacher: "Ravi Kumar", type: "math" },
      { time: "10:15 AM - 11:15 AM", subject: "Science", room: "Lab A", teacher: "Sneha Patel", type: "science" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "English", room: "Room 102", teacher: "Mabel D'Souza", type: "english" }
    ],
    "Tuesday": [
      { time: "09:00 AM - 10:00 AM", subject: "Science", room: "Lab A", teacher: "Sneha Patel", type: "science" },
      { time: "10:15 AM - 11:15 AM", subject: "Computer Science", room: "IT Lab 1", teacher: "Jayesh Shah", type: "computer" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Mathematics", room: "Room 102", teacher: "Ravi Kumar", type: "math" }
    ],
    "Wednesday": [
      { time: "09:00 AM - 10:00 AM", subject: "English", room: "Room 102", teacher: "Mabel D'Souza", type: "english" },
      { time: "10:15 AM - 11:15 AM", subject: "Mathematics", room: "Room 102", teacher: "Ravi Kumar", type: "math" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Science", room: "Room 102", teacher: "Sneha Patel", type: "science" }
    ],
    "Thursday": [
      { time: "09:00 AM - 10:00 AM", subject: "Computer Science", room: "IT Lab 1", teacher: "Jayesh Shah", type: "computer" },
      { time: "10:15 AM - 11:15 AM", subject: "English", room: "Room 102", teacher: "Mabel D'Souza", type: "english" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Mathematics", room: "Room 102", teacher: "Ravi Kumar", type: "math" }
    ],
    "Friday": [
      { time: "09:00 AM - 10:00 AM", subject: "Mathematics", room: "Room 102", teacher: "Ravi Kumar", type: "math" },
      { time: "10:15 AM - 11:15 AM", subject: "Science", room: "Lab A", teacher: "Sneha Patel", type: "science" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Computer Science", room: "IT Lab 1", teacher: "Jayesh Shah", type: "computer" }
    ]
  },
  "8-B": {
    "Monday": [
      { time: "09:00 AM - 10:00 AM", subject: "Science", room: "Lab B", teacher: "Sneha Patel", type: "science" },
      { time: "10:15 AM - 11:15 AM", subject: "English", room: "Room 82", teacher: "Mabel D'Souza", type: "english" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Mathematics", room: "Room 82", teacher: "Ravi Kumar", type: "math" }
    ],
    "Tuesday": [
      { time: "09:00 AM - 10:00 AM", subject: "Mathematics", room: "Room 82", teacher: "Ravi Kumar", type: "math" },
      { time: "10:15 AM - 11:15 AM", subject: "Science", room: "Lab B", teacher: "Sneha Patel", type: "science" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Computer Science", room: "IT Lab 2", teacher: "Jayesh Shah", type: "computer" }
    ],
    "Wednesday": [
      { time: "09:00 AM - 10:00 AM", subject: "Computer Science", room: "IT Lab 2", teacher: "Jayesh Shah", type: "computer" },
      { time: "10:15 AM - 11:15 AM", subject: "Mathematics", room: "Room 82", teacher: "Ravi Kumar", type: "math" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "English", room: "Room 82", teacher: "Mabel D'Souza", type: "english" }
    ],
    "Thursday": [
      { time: "09:00 AM - 10:00 AM", subject: "English", room: "Room 82", teacher: "Mabel D'Souza", type: "english" },
      { time: "10:15 AM - 11:15 AM", subject: "Science", room: "Room 82", teacher: "Sneha Patel", type: "science" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Mathematics", room: "Room 82", teacher: "Ravi Kumar", type: "math" }
    ],
    "Friday": [
      { time: "09:00 AM - 10:00 AM", subject: "Mathematics", room: "Room 82", teacher: "Ravi Kumar", type: "math" },
      { time: "10:15 AM - 11:15 AM", subject: "Computer Science", room: "IT Lab 2", teacher: "Jayesh Shah", type: "computer" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Science", room: "Lab B", teacher: "Sneha Patel", type: "science" }
    ]
  },
  "12-Sci": {
    "Monday": [
      { time: "09:00 AM - 10:00 AM", subject: "Computer Science", room: "IT Lab 1", teacher: "Jayesh Shah", type: "computer" },
      { time: "10:15 AM - 11:15 AM", subject: "Mathematics", room: "Room 121", teacher: "Ravi Kumar", type: "math" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Science", room: "Lab C", teacher: "Sneha Patel", type: "science" }
    ],
    "Tuesday": [
      { time: "09:00 AM - 10:00 AM", subject: "Science", room: "Lab C", teacher: "Sneha Patel", type: "science" },
      { time: "10:15 AM - 11:15 AM", subject: "Mathematics", room: "Room 121", teacher: "Ravi Kumar", type: "math" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "English", room: "Room 121", teacher: "Mabel D'Souza", type: "english" }
    ],
    "Wednesday": [
      { time: "09:00 AM - 10:00 AM", subject: "English", room: "Room 121", teacher: "Mabel D'Souza", type: "english" },
      { time: "10:15 AM - 11:15 AM", subject: "Computer Science", room: "IT Lab 1", teacher: "Jayesh Shah", type: "computer" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Mathematics", room: "Room 121", teacher: "Ravi Kumar", type: "math" }
    ],
    "Thursday": [
      { time: "09:00 AM - 10:00 AM", subject: "Mathematics", room: "Room 121", teacher: "Ravi Kumar", type: "math" },
      { time: "10:15 AM - 11:15 AM", subject: "Science", room: "Lab C", teacher: "Sneha Patel", type: "science" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Computer Science", room: "IT Lab 1", teacher: "Jayesh Shah", type: "computer" }
    ],
    "Friday": [
      { time: "09:00 AM - 10:00 AM", subject: "Science", room: "Lab C", teacher: "Sneha Patel", type: "science" },
      { time: "10:15 AM - 11:15 AM", subject: "English", room: "Room 121", teacher: "Mabel D'Souza", type: "english" },
      { time: "11:15 AM - 11:45 AM", subject: "Lunch Break", room: "Cafeteria", teacher: "None", type: "break" },
      { time: "12:00 PM - 01:00 PM", subject: "Mathematics", room: "Room 121", teacher: "Ravi Kumar", type: "math" }
    ]
  }
};

// ==========================================
// 2. CENTRAL STATE ENGINE
// ==========================================
const state = {
  currentUser: null,
  userRole: null,     // 'admin' | 'teacher' | 'student'
  currentView: 'login', 
  currentTab: 'dashboard', 
  
  // Database Tables (Sync with LocalStorage)
  students: [],
  teachers: [],
  homework: [],
  notices: [],
  attendanceDb: {},
  grades: {},
  submissions: [],
  
  // Selections
  activeStudentId: '#ST1026', 
  selectedNoticeFilter: 'All', 
  activeTimetableDay: 'Monday',
  
  // Modals & Action Controllers
  activeModal: null, 
  modalData: null,   // Holds temporary context data for modals (e.g. grading/upload hw details)
  
  forms: {
    login: { email: '', password: '', role: 'student', error: '' },
    student: { name: '', class: '10-A', parent: '', status: 'Active' },
    teacher: { name: '', subject: '', experience: '' },
    notice: { title: '', description: '', category: 'Academic' },
    homework: { class: '10-A', subject: 'Mathematics', title: '', dueDate: '' },
    payment: { cardholder: 'Rohan Desai', cardNo: '4321 8876 5432 1098', expiry: '09/29', cvv: '231', upiId: 'rohan@okaxis' },
    gradebook: { studentId: '#ST1024', math: 85, science: 85, english: 85, computer: 85, remarks: '' },
    upload: { file: null }
  },

  filters: {
    studentSearch: '',
    studentFilter: 'All',
    feeSearch: '',
    feeFilter: 'All'
  },

  checkout: {
    payMethod: 'card',
    isProcessing: false,
    processingStep: '',
    success: false
  },

  attendanceControl: {
    selectedClass: '10-A',
    selectedDate: '2026-05-20',
    currentSheet: {}, 
    saveStatus: ''
  },
  
  uploadSim: {
    isUploading: false,
    progress: 0,
    dummyFile: null
  },
  
  gradebookSubmitStatus: '',
  darkMode: false
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
  if (!localStorage.getItem('tattavyan_grades')) {
    localStorage.setItem('tattavyan_grades', JSON.stringify(DEFAULT_GRADES));
  }
  if (!localStorage.getItem('tattavyan_submissions')) {
    localStorage.setItem('tattavyan_submissions', JSON.stringify(DEFAULT_SUBMISSIONS));
  }
  
  loadDatabases();

  // Load Dark Mode State
  const savedDarkMode = localStorage.getItem('tattavyan_dark_mode') === 'true';
  state.darkMode = savedDarkMode;
  if (savedDarkMode) {
    document.body.classList.add('dark-theme');
  }

  // Load Session if saved
  const savedSession = localStorage.getItem('tattavyan_session');
  if (savedSession) {
    const session = JSON.parse(savedSession);
    state.currentUser = session.user;
    state.userRole = session.role;
    state.currentView = session.role;
    state.currentTab = 'dashboard';
    matchStudentProfile();
  }
}

function loadDatabases() {
  state.students = JSON.parse(localStorage.getItem('tattavyan_students'));
  state.teachers = JSON.parse(localStorage.getItem('tattavyan_teachers'));
  state.homework = JSON.parse(localStorage.getItem('tattavyan_homework'));
  state.notices = JSON.parse(localStorage.getItem('tattavyan_notices'));
  state.attendanceDb = JSON.parse(localStorage.getItem('tattavyan_attendance'));
  state.grades = JSON.parse(localStorage.getItem('tattavyan_grades'));
  state.submissions = JSON.parse(localStorage.getItem('tattavyan_submissions'));
}

function saveDb(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  loadDatabases();
}

function matchStudentProfile() {
  if (state.userRole === 'student' && state.currentUser) {
    const emailPrefix = state.currentUser.email.split('@')[0].toLowerCase();
    let matched = state.students.find(s => s.name.toLowerCase().includes(emailPrefix));
    if (!matched && emailPrefix === 'student') {
      matched = state.students.find(s => s.id === '#ST1026'); // default Rohan Desai
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
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ==========================================
// 5. VIEW ENGINES (HTML GENERATORS)
// ==========================================

// --- LOGIN SCREEN ---
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
          <h1>Tattavyan School ERP</h1>
          <p>Luminous Academic Control Center</p>
        </div>

        ${f.error ? `
          <div class="badge danger animate-fade-in" style="width: 100%; padding: 12px; border-radius: var(--radius-sm); margin-bottom: 20px; display: block; text-align: center;">
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
            <label class="form-label">Email / Username</label>
            <div style="position: relative;">
              <i data-lucide="user" style="position: absolute; top: 16px; left: 18px; color: var(--text-muted); width: 18px; height: 18px;"></i>
              <input 
                type="text" 
                class="form-control" 
                style="padding-left: 48px;"
                placeholder="Enter your ${f.role} email"
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

// --- MASTER DASHBOARD LAYOUT WRAPPER ---
function renderDashboardLayout() {
  const role = state.userRole;
  const email = state.currentUser?.email || 'user@tattavyan.com';
  const name = email.split('@')[0].toUpperCase();
  const initial = name.charAt(0);
  
  const links = {
    admin: [
      { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'students', name: 'Enroll Directory', icon: 'users' },
      { id: 'teachers', name: 'Faculty Roster', icon: 'book-open' },
      { id: 'fees', name: 'Tuition Ledger', icon: 'credit-card' },
      { id: 'notices', name: 'Announcements', icon: 'bell' }
    ],
    teacher: [
      { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'attendance', name: 'Attendance Register', icon: 'calendar-check' },
      { id: 'homework', name: 'Homework Manager', icon: 'book-open' },
      { id: 'submissions', name: 'Worksheet Center', icon: 'file-text' },
      { id: 'gradebook', name: 'Gradebook Entry', icon: 'award' },
      { id: 'notices', name: 'Announcements', icon: 'bell' }
    ],
    student: [
      { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'attendance', name: 'My Attendance', icon: 'calendar-check' },
      { id: 'homework', name: 'My Homework', icon: 'book-open' },
      { id: 'reportcard', name: 'Academic Transcript', icon: 'award' },
      { id: 'fees', name: 'Tuition Dues', icon: 'credit-card' },
      { id: 'notices', name: 'Announcements', icon: 'bell' }
    ]
  };

  const navLinks = links[role] || [];
  
  let headerTitle = '';
  if (state.currentTab === 'dashboard') headerTitle = `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`;
  else if (state.currentTab === 'students') headerTitle = 'Student Enrollment Directory';
  else if (state.currentTab === 'teachers') headerTitle = 'Faculty Member Directory';
  else if (state.currentTab === 'fees') headerTitle = role === 'student' ? 'Tuition Fees Portal' : 'Tuition Fees Overrides';
  else if (state.currentTab === 'notices') headerTitle = 'School Announcements Bulletins';
  else if (state.currentTab === 'attendance') headerTitle = role === 'teacher' ? 'Attendance Registrar' : 'My Roster Attendance';
  else if (state.currentTab === 'homework') headerTitle = role === 'teacher' ? 'Homework Assignments Manager' : 'Pending Assignments Roster';
  else if (state.currentTab === 'submissions') headerTitle = 'Student Homework Submissions Center';
  else if (state.currentTab === 'gradebook') headerTitle = 'Term Performance Gradebook Registrar';
  else if (state.currentTab === 'reportcard') headerTitle = 'Digital Report Card & Academic Transcript';

  return `
    <div class="app-container">
      <!-- Sidebar -->
      <aside class="sidebar animate-slide-in">
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

        <div style="padding: 24px 16px; border-top: 1px solid var(--border-dark)">
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

      <!-- Main Panel Wrapper -->
      <main class="main-content">
        <header class="topbar">
          <h1 class="topbar-title headline-md">${headerTitle}</h1>
          <div class="topbar-actions" style="display: flex; align-items: center; gap: 16px;">
            <!-- Premium Theme Switcher -->
            <button onclick="toggleTheme()" class="theme-toggle-btn" aria-label="Toggle Theme" style="background: var(--surface-container-low); border: 1px solid var(--border-dark); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: var(--text-primary); transition: var(--transition);">
              <i data-lucide="${state.darkMode ? 'sun' : 'moon'}" style="width: 20px; height: 20px;"></i>
            </button>
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
          </div>
        </header>

        <div class="page-content">
          ${renderTabContent()}
        </div>
      </main>
    </div>

    <!-- Modals Layer Sheath -->
    ${renderModalContent()}
  `;
}

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
    if (tab === 'submissions') return renderTeacherSubmissions();
    if (tab === 'gradebook') return renderTeacherGradebook();
    if (tab === 'notices') return renderTeacherNotices();
  }

  if (role === 'student') {
    if (tab === 'dashboard') return renderStudentOverview();
    if (tab === 'attendance') return renderStudentAttendance();
    if (tab === 'homework') return renderStudentHomework();
    if (tab === 'reportcard') return renderStudentReportCard();
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
    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-info">
          <h3>Enrolled Rosters</h3>
          <p>${state.students.length}</p>
        </div>
        <div class="stat-icon primary">
          <i data-lucide="users" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Faculty Roster</h3>
          <p>${state.teachers.length}</p>
        </div>
        <div class="stat-icon secondary">
          <i data-lucide="book-open" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Collected Fees</h3>
          <p>₹${(revenueTotal / 100000).toFixed(2)}L</p>
        </div>
        <div class="stat-icon success">
          <i data-lucide="credit-card" style="width: 24px; height: 24px;"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>Synced Bulletins</h3>
          <p>${state.notices.length}</p>
        </div>
        <div class="stat-icon warning">
          <i data-lucide="bell" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
    </div>
    
    <div class="dashboard-grid-2col animate-fade-in">
      <!-- Simulated Analytics Chart Card -->
      <div class="table-container" style="padding: 24px;">
        <div class="table-header" style="padding: 0 0 16px; margin-bottom: 20px; background: transparent;">
          <h2 style="font-size: 16px; font-weight: 700;">Grade Performance Distributions</h2>
        </div>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px;">
              <span>A+ / Excellent Academic Standings</span>
              <span>45% of Students</span>
            </div>
            <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 45%;"></div></div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px;">
              <span>A / Outstanding Academic Standings</span>
              <span>35% of Students</span>
            </div>
            <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 35%; background: var(--secondary);"></div></div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px;">
              <span>B / Average Standings</span>
              <span>15% of Students</span>
            </div>
            <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 15%; background: var(--tertiary);"></div></div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px;">
              <span>C / Remedial Needs</span>
              <span>5% of Students</span>
            </div>
            <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 5%; background: var(--danger);"></div></div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Board -->
      <div class="table-container" style="padding: 24px;">
        <div class="table-header" style="padding: 0 0 16px; margin-bottom: 12px; background: transparent;">
          <h2 style="font-size: 16px; font-weight: 700;">Central Administrator Overview</h2>
        </div>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
          Welcome to the centralized admin panel. Here you manage academic directories, record financial fee overrides, and post notices synchronized globally across all accounts in real-time. Use shortcuts below:
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="setDashboardTab('students')" style="padding: 10px 18px; font-size: 13px;">Enroll Registry</button>
          <button class="btn btn-secondary" onclick="setDashboardTab('teachers')" style="padding: 10px 18px; font-size: 13px;">Faculty Register</button>
          <button class="btn btn-outline" onclick="setDashboardTab('fees')" style="padding: 10px 18px; font-size: 13px;">Tuition Overrides</button>
        </div>
      </div>
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
    <div class="table-container animate-fade-in">
      <div class="table-header" style="flex-direction: column; align-items: stretch; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <h2 style="font-size: 18px; color: var(--text-primary);">Registered Student Registry</h2>
          <button class="btn btn-primary" onclick="openModal('student')" style="padding: 10px 18px; font-size: 13px;">
            <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Enroll New Student
          </button>
        </div>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <div style="position: relative; flex: 1; min-width: 200px;">
            <i data-lucide="search" style="position: absolute; top: 12px; left: 14px; color: var(--text-muted); width: 16px; height: 16px;"></i>
            <input 
              type="text" 
              placeholder="Search by ID, name, division..." 
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
              <th>Student Name</th>
              <th>Division Class</th>
              <th>Parent / Guardian</th>
              <th>Status</th>
              <th>Ledger Override</th>
            </tr>
          </thead>
          <tbody>
            ${filteredList.map(s => `
              <tr>
                <td style="font-weight: 700; color: var(--primary); font-family: 'Geist';">${s.id}</td>
                <td style="font-weight: 600;">${s.name}</td>
                <td>Class ${s.class}</td>
                <td>${s.parent}</td>
                <td>
                  <span class="badge ${s.status === 'Active' ? 'success' : 'warning'}">
                    ${s.status === 'Active' ? 'Active / Paid' : 'Pending Fee'}
                  </span>
                </td>
                <td>
                  <button onclick="deleteStudent('${s.id}')" class="btn-icon danger" title="Remove Student Records">
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
    <div class="table-container animate-fade-in">
      <div class="table-header">
        <h2 style="font-size: 18px;">Faculty Members Directory</h2>
        <button class="btn btn-primary" onclick="openModal('teacher')" style="padding: 10px 18px; font-size: 13px;">
          <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Register Faculty
        </button>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Faculty Name</th>
              <th>Subject Specialization</th>
              <th>Experience Tenure</th>
              <th>Ledger Overrides</th>
            </tr>
          </thead>
          <tbody>
            ${state.teachers.map(t => `
              <tr>
                <td style="font-weight: 700; color: var(--primary); font-family: 'Geist';">${t.id}</td>
                <td style="font-weight: 600;">${t.name}</td>
                <td><span class="badge primary">${t.subject}</span></td>
                <td>${t.experience}</td>
                <td>
                  <button onclick="deleteTeacher('${t.id}')" class="btn-icon danger" title="Dismiss Faculty Member">
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
    <div class="table-container animate-fade-in">
      <div class="table-header" style="flex-direction: column; align-items: stretch; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 18px;">Term Financial Tuition Ledger</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              School base term invoice is fixed at <strong>₹45,000.00</strong> per student.
            </p>
          </div>
          <div style="display: flex; gap: 20px;">
            <div style="text-align: center;">
              <div style="font-size: 18px; font-weight: 700; color: var(--success); font-family: 'Geist';">${paidCount}</div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Paid Accounts</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 18px; font-weight: 700; color: var(--danger); font-family: 'Geist';">${unpaidCount}</div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Pending Dues</div>
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
            <option value="Paid" ${filter === 'Paid' ? 'selected' : ''}>Status: Cleared / Paid</option>
            <option value="Unpaid" ${filter === 'Unpaid' ? 'selected' : ''}>Status: Pending Dues</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Student Details</th>
              <th>Class division</th>
              <th>Total Term Invoice</th>
              <th>Payment Status</th>
              <th>Administrative Override Action</th>
            </tr>
          </thead>
          <tbody>
            ${filteredList.map(s => `
              <tr>
                <td>
                  <div style="font-weight: 700; color: var(--text-primary);">${s.name}</div>
                  <div style="font-size: 12px; color: var(--text-muted); font-family: 'Geist';">${s.id}</div>
                </td>
                <td>Class ${s.class}</td>
                <td style="font-weight: 600;">₹45,000.00</td>
                <td>
                  <span class="badge ${s.status === 'Active' ? 'success' : 'danger'}">
                    ${s.status === 'Active' ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
                <td>
                  <button 
                    onclick="toggleStudentFeeStatus('${s.id}')"
                    class="btn ${s.status === 'Active' ? 'btn-secondary' : 'btn-primary'}"
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
  return renderNoticeBoardSection(true);
}

// ==========================================
// 7. MODULES (TEACHER DASHBOARD PANELS)
// ==========================================
function renderTeacherOverview() {
  return `
    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-info">
          <h3>My Classes</h3>
          <p>3</p>
        </div>
        <div class="stat-icon primary">
          <i data-lucide="clock" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Total Enrolled</h3>
          <p>${state.students.length}</p>
        </div>
        <div class="stat-icon secondary">
          <i data-lucide="users" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Assigned Worksheets</h3>
          <p>${state.homework.length}</p>
        </div>
        <div class="stat-icon warning">
          <i data-lucide="book-open" style="width: 24px; height: 24px;"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>Worksheets Submitted</h3>
          <p>${state.submissions.length}</p>
        </div>
        <div class="stat-icon success">
          <i data-lucide="file-text" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
    </div>

    <!-- Dynamic Timetable Calendar Widget -->
    ${renderTimetableWidget("Ravi Kumar")}
  `;
}

function renderTeacherAttendance() {
  const uniqueClasses = Array.from(new Set(state.students.map(s => s.class)));
  const selectedCls = state.attendanceControl.selectedClass;
  const selectedDate = state.attendanceControl.selectedDate;
  
  const classStudents = state.students.filter(s => s.class === selectedCls);
  const classKey = `${selectedCls}_${selectedDate}`;
  const savedRecord = state.attendanceDb[classKey] || {};
  const statusMsg = state.attendanceControl.saveStatus;

  return `
    <div class="table-container animate-fade-in">
      <div class="table-header" style="flex-direction: column; align-items: stretch; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 18px;">Classroom Attendance Registry</h2>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
              Select division class and date to log student records.
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
                  <td style="font-weight: 700; color: var(--primary); font-family: 'Geist';">${student.id}</td>
                  <td style="font-weight: 600;">${student.name}</td>
                  <td>Class ${student.class}</td>
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
                  No students enrolled in Division Class ${selectedCls}.
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
    <div class="table-container animate-fade-in">
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
                <td style="font-weight: 700;">Class ${h.class}</td>
                <td><span class="badge primary">${h.subject}</span></td>
                <td style="font-weight: 600;">${h.title}</td>
                <td style="color: var(--text-secondary); font-family: 'Geist';">${h.dueDate}</td>
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
                  No homework worksheets assigned.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// --- [NEW TAB] WORKSHEET CENTER (TEACHER VIEW SUBMISSIONS) ---
function renderTeacherSubmissions() {
  return `
    <div class="table-container animate-fade-in">
      <div class="table-header">
        <div>
          <h2 style="font-size: 18px;">Student Homework Submissions Center</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Grade submitted documents and write constructive feedback.
          </p>
        </div>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Student Details</th>
              <th>Worksheet Details</th>
              <th>Submitted Document</th>
              <th>Score / Grade</th>
              <th>Feedback & Remarks</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${state.submissions.map(sub => {
              const hw = state.homework.find(h => h.id === sub.hwId) || { title: 'Chapter Assignment', subject: 'General' };
              return `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--text-primary);">${sub.studentName}</div>
                    <div style="font-size: 12px; color: var(--text-muted); font-family: 'Geist';">${sub.studentId}</div>
                  </td>
                  <td>
                    <span class="badge primary" style="font-size: 10px; margin-bottom: 4px;">${hw.subject}</span>
                    <div style="font-size: 14px; font-weight: 600;">${hw.title}</div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" onclick="alert('Downloading student worksheet file: ${sub.fileName}')" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--secondary);">
                      <i data-lucide="download" style="width: 14px; height: 14px;"></i> ${sub.fileName}
                    </a>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Uploaded: ${sub.uploadedAt}</div>
                  </td>
                  <td>
                    <span class="badge ${sub.status === 'Graded' ? 'success' : 'warning'}">
                      ${sub.status === 'Graded' ? sub.score : 'Pending Score'}
                    </span>
                  </td>
                  <td style="max-width: 260px; font-size: 13px; color: var(--text-secondary); line-height: 1.4;">
                    ${sub.feedback || '<span style="color: var(--text-muted); font-style: italic;">No feedback comments recorded.</span>'}
                  </td>
                  <td style="text-align: right;">
                    <button 
                      class="btn btn-primary" 
                      style="padding: 6px 12px; font-size: 12px; display: inline-flex; gap: 4px;"
                      onclick="openGradingModal('${sub.id}')"
                    >
                      <i data-lucide="edit-3" style="width: 12px; height: 12px;"></i> ${sub.status === 'Graded' ? 'Re-grade' : 'Grade Submission'}
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
            ${state.submissions.length === 0 ? `
              <tr>
                <td colSpan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
                  No student worksheets submitted yet.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// --- [NEW TAB] GRADEBOOK REGISTER (TEACHER VIEW) ---
function renderTeacherGradebook() {
  const selectedStudent = state.students.find(s => s.id === state.forms.gradebook.studentId) || state.students[0];
  const gForm = state.forms.gradebook;
  const statusMsg = state.gradebookSubmitStatus;

  return `
    <div class="dashboard-grid-2col animate-fade-in">
      <!-- Select & Input Ranks -->
      <div class="table-container" style="padding: 28px;">
        <div class="table-header" style="padding: 0 0 16px; margin-bottom: 24px; background: transparent; justify-content: space-between;">
          <h2 style="font-size: 18px; font-weight: 700;">Performance Ledger</h2>
          ${statusMsg ? `
            <span class="badge success animate-fade-in">${statusMsg}</span>
          ` : ''}
        </div>
        <form onsubmit="handleGradebookSubmit(event)">
          <div class="form-group">
            <label class="form-label">Select Student Registry</label>
            <select class="form-control" onchange="setGradebookStudent(this.value)">
              ${state.students.map(s => `
                <option value="${s.id}" ${gForm.studentId === s.id ? 'selected' : ''}>${s.name} (${s.id} - Class ${s.class})</option>
              `).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label">Mathematics Score (Max 100)</label>
              <input type="number" min="0" max="100" class="form-control" value="${gForm.math}" oninput="state.forms.gradebook.math = Number(this.value)" required />
            </div>
            <div class="form-group">
              <label class="form-label">Science Score (Max 100)</label>
              <input type="number" min="0" max="100" class="form-control" value="${gForm.science}" oninput="state.forms.gradebook.science = Number(this.value)" required />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label">English Literature Score (Max 100)</label>
              <input type="number" min="0" max="100" class="form-control" value="${gForm.english}" oninput="state.forms.gradebook.english = Number(this.value)" required />
            </div>
            <div class="form-group">
              <label class="form-label">Computer Science Score (Max 100)</label>
              <input type="number" min="0" max="100" class="form-control" value="${gForm.computer}" oninput="state.forms.gradebook.computer = Number(this.value)" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Faculty Remarks & Comments</label>
            <textarea class="form-control" style="min-height: 80px;" placeholder="Remarks on student understanding, discipline and homework guides..." oninput="state.forms.gradebook.remarks = this.value">${gForm.remarks}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
            <button type="submit" class="btn btn-primary" style="display: inline-flex; gap: 8px;">
              <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i> Submit Grades
            </button>
          </div>
        </form>
      </div>

      <!-- Current Grade Summary Sheet -->
      <div class="table-container" style="padding: 28px;">
        <div class="table-header" style="padding: 0 0 16px; margin-bottom: 20px; background: transparent;">
          <h2 style="font-size: 18px; font-weight: 700;">Recorded Academic Transcript</h2>
        </div>
        
        <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: rgba(0, 74, 198, 0.03); border-radius: var(--radius-md); border: 1px solid var(--border-dark); margin-bottom: 24px;">
          <div class="avatar" style="width: 52px; height: 52px; font-size: 20px;">${selectedStudent.name.charAt(0)}</div>
          <div>
            <h4 style="font-size: 16px; font-weight: 700;">${selectedStudent.name}</h4>
            <p style="font-size: 13px; color: var(--text-secondary);">Student ID: <span class="font-geist" style="font-weight: 600;">${selectedStudent.id}</span> | Division: Class ${selectedStudent.class}</p>
          </div>
        </div>

        <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary);">Current Subject Grades</h3>
        
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${Object.entries(state.grades[selectedStudent.id] || {}).map(([subject, info]) => `
            <div style="padding: 12px 16px; border: 1px solid var(--border-dark); border-radius: var(--radius-md); background: white; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="badge primary" style="font-size: 10px; margin-bottom: 2px;">${subject}</span>
                <div style="font-size: 13px; color: var(--text-secondary); max-width: 220px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" title="${info.remarks}">
                  ${info.remarks}
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 16px; font-weight: 700; color: var(--primary); font-family: 'Geist';">${info.marks}/100</div>
                <span class="badge ${['A+', 'A'].includes(info.grade) ? 'success' : info.grade.startsWith('B') ? 'warning' : 'danger'}" style="font-size: 9px; padding: 1px 6px;">
                  Grade: ${info.grade}
                </span>
              </div>
            </div>
          `).join('')}
          ${!state.grades[selectedStudent.id] ? `
            <div style="text-align: center; padding: 24px; color: var(--text-muted); font-style: italic;">
              No transcript records registered for this student yet.
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderTeacherNotices() {
  return renderNoticeBoardSection(true);
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
  
  // Calculate average performance marks
  const studentGrades = state.grades[activeStudent.id] || {};
  let totalMarks = 0;
  let totalSubjects = 0;
  Object.values(studentGrades).forEach(g => {
    totalMarks += g.marks;
    totalSubjects++;
  });
  const avgMarks = totalSubjects > 0 ? Math.round(totalMarks / totalSubjects) : 88;

  return `
    <div class="stats-grid animate-fade-in">
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
          <h3>Assigned Worksheets</h3>
          <p>${myHWList.length}</p>
        </div>
        <div class="stat-icon warning">
          <i data-lucide="book-open" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-info">
          <h3>Average Grade</h3>
          <p style="font-family: 'Geist';">${avgMarks}%</p>
        </div>
        <div class="stat-icon primary">
          <i data-lucide="award" style="width: 24px; height: 24px;"></i>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>Synced Bulletins</h3>
          <p>${state.notices.length}</p>
        </div>
        <div class="stat-icon secondary">
          <i data-lucide="bell" style="width: 24px; height: 24px;"></i>
        </div>
      </div>
    </div>

    <div class="dashboard-grid-2col animate-fade-in">
      <!-- 3D Rotating ID Card -->
      <div class="table-container" style="padding: 28px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 20px; align-self: flex-start;">Digital Student ID Card</h3>
        
        <div class="id-card-wrapper">
          <div class="id-card" id="studentIdCard" onclick="toggleIdCardFlip()">
            <!-- Front of ID Card -->
            <div class="id-card-front">
              <div class="id-card-header">
                <div class="id-logo-section">
                  <div class="id-logo-icon"><i data-lucide="graduation-cap" style="width: 16px; height: 16px; color: white;"></i></div>
                  <span style="font-weight: 800; font-size: 13px; color: var(--primary);">TATTAVYAN</span>
                </div>
                <span class="badge primary" style="font-size: 9px; padding: 2px 8px;">Student ID</span>
              </div>
              <div class="id-card-body">
                <div style="background: linear-gradient(135deg, var(--primary-light), var(--secondary-light)); border: 1.5px solid white; border-radius: var(--radius-md); padding: 2px; box-shadow: var(--shadow-sm);">
                  <div class="avatar" style="width: 72px; height: 72px; border-radius: var(--radius-md); font-size: 28px;">${activeStudent.name.charAt(0)}</div>
                </div>
                <div class="id-info">
                  <h4 style="font-weight: 700; color: var(--text-primary);">${activeStudent.name}</h4>
                  <p style="font-family: 'Geist'; font-weight: 600; color: var(--primary); margin: 2px 0;">Class Division: ${activeStudent.class}</p>
                  <p style="font-size: 11px; color: var(--text-muted);">Enrollment: ${activeStudent.id}</p>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="id-barcode">TTVN${activeStudent.id.replace('#', '')}</div>
                <span style="font-size: 10px; font-weight: 600; color: var(--text-muted); display: inline-flex; align-items: center; gap: 4px;">
                  <i data-lucide="rotate-cw" style="width: 12px; height: 12px;"></i> Click to Flip
                </span>
              </div>
            </div>
            
            <!-- Back of ID Card -->
            <div class="id-card-back">
              <div class="id-card-header">
                <span style="font-weight: 800; font-size: 13px; color: #eeefff;">EMERGENCY CONTACTS</span>
                <span class="badge success" style="font-size: 9px; padding: 2px 8px; border: 1px solid rgba(255,255,255,0.15); color: white; background: var(--success);">Valid</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin: 12px 0; font-size: 12px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #c3c6d7;">Parent/Guardian:</span>
                  <span style="font-weight: 600;">${activeStudent.parent}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #c3c6d7;">Blood Group:</span>
                  <span style="font-weight: 600; color: #ff8b8b;">B+ Positive</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #c3c6d7;">Transport Route:</span>
                  <span style="font-weight: 600;">Bus Route #14 (Desk Track)</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #c3c6d7;">Emergency Cell:</span>
                  <span style="font-weight: 600; font-family: 'Geist';">+91 99887 76655</span>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="id-barcode">SECURE ACCESS CARD</div>
                <span style="font-size: 10px; font-weight: 600; color: #c3c6d7; display: inline-flex; align-items: center; gap: 4px;">
                  <i data-lucide="rotate-cw" style="width: 12px; height: 12px;"></i> Click to Flip
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timetable Scheduler Preview -->
      <div class="table-container" style="padding: 28px;">
        <div class="table-header" style="padding: 0 0 16px; margin-bottom: 20px; background: transparent;">
          <h2 style="font-size: 16px; font-weight: 700;">Daily Roster Schedule</h2>
        </div>
        ${renderTimetableWidget(activeStudent.class)}
      </div>
    </div>
  `;
}

function renderStudentAttendance() {
  const activeStudent = state.students.find(s => s.id === state.activeStudentId) || DEFAULT_STUDENTS[2];
  const metrics = getStudentAttendanceMetrics(activeStudent);

  return `
    <div style="max-width: 800px; margin: 0 auto;" class="animate-fade-in">
      <div class="glass-panel" style="padding: 28px; margin-bottom: 32px; display: flex; align-items: center; gap: 28px; flex-wrap: wrap;">
        <div style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid var(--success); display: flex; align-items: center; justify-content: center; color: var(--success); font-weight: 700; font-size: 22px; background: var(--success-bg); flex-shrink: 0; margin: 0 auto; font-family: 'Geist';">
          ${metrics.rate}%
        </div>
        <div style="flex: 1; min-width: 250px; text-align: left;">
          <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary);">Roster Attendance Log</h3>
          <p style="font-size: 14px; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">
            Register matches your active enrolled division: <strong>Class ${activeStudent.class}</strong>. Out of ${metrics.totalMarked} academic sessions logged by teachers, you were marked Present on ${metrics.presentCount} dates.
          </p>
        </div>
      </div>

      <div class="table-container">
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
                  <td style="font-weight: 600; font-family: 'Geist';">${log.date}</td>
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

// --- STUDENT HOMEWORK & WORKSHEETS UPLOADS ---
function renderStudentHomework() {
  const activeStudent = state.students.find(s => s.id === state.activeStudentId) || DEFAULT_STUDENTS[2];
  const myHWList = state.homework.filter(h => h.class === activeStudent.class);
  
  return `
    <div class="table-container animate-fade-in">
      <div class="table-header">
        <div>
          <h2 style="font-size: 18px;">Homework & Lesson Submissions</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Upload completed worksheets and view faculty grades and comments.
          </p>
        </div>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assignment Title</th>
              <th>Due Date</th>
              <th>Submission Status</th>
              <th>Grade / Score</th>
              <th style="text-align: right;">Worksheet Action</th>
            </tr>
          </thead>
          <tbody>
            ${myHWList.map(h => {
              const sub = state.submissions.find(s => s.hwId === h.id && s.studentId === activeStudent.id);
              return `
                <tr>
                  <td style="font-weight: 700;"><span class="badge primary">${h.subject}</span></td>
                  <td style="font-weight: 600; max-width: 250px;">${h.title}</td>
                  <td style="color: var(--text-secondary); font-family: 'Geist';">${h.dueDate}</td>
                  <td>
                    <span class="badge ${sub ? 'success' : 'warning'}">
                      ${sub ? 'Submitted' : 'Pending Upload'}
                    </span>
                  </td>
                  <td>
                    ${sub && sub.status === 'Graded' ? `
                      <span class="badge success" style="font-family: 'Geist';">${sub.score}</span>
                    ` : sub ? `
                      <span class="badge primary">Awaiting Grade</span>
                    ` : `
                      <span class="badge danger">N/A</span>
                    `}
                  </td>
                  <td style="text-align: right;">
                    ${sub ? `
                      <button 
                        class="btn btn-secondary" 
                        style="padding: 6px 12px; font-size: 12px; display: inline-flex; gap: 4px;"
                        onclick="openSubmissionFeedbackModal('${sub.id}')"
                      >
                        <i data-lucide="eye" style="width: 12px; height: 12px;"></i> View Details
                      </button>
                    ` : `
                      <button 
                        class="btn btn-primary" 
                        style="padding: 6px 12px; font-size: 12px; display: inline-flex; gap: 4px;"
                        onclick="openHomeworkUploadModal('${h.id}')"
                      >
                        <i data-lucide="upload-cloud" style="width: 12px; height: 12px;"></i> Submit Worksheet
                      </button>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
            ${myHWList.length === 0 ? `
              <tr>
                <td colSpan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
                  No homework worksheets assigned for Class ${activeStudent.class}.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// --- [NEW TAB] DIGITAL ACADEMIC TRANSCRIPT & REPORT CARD ---
function renderStudentReportCard() {
  const activeStudent = state.students.find(s => s.id === state.activeStudentId) || DEFAULT_STUDENTS[2];
  const sGrades = state.grades[activeStudent.id] || {};
  
  // Computations
  let subjectCount = 0;
  let totalScore = 0;
  Object.values(sGrades).forEach(g => {
    totalScore += g.marks;
    subjectCount++;
  });
  
  const percentage = subjectCount > 0 ? Math.round(totalScore / subjectCount) : 0;
  let overallGrade = 'N/A';
  let gpaVal = '0.00';
  
  if (subjectCount > 0) {
    if (percentage >= 95) { overallGrade = 'A+'; gpaVal = '4.00'; }
    else if (percentage >= 90) { overallGrade = 'A'; gpaVal = '3.85'; }
    else if (percentage >= 85) { overallGrade = 'A-'; gpaVal = '3.65'; }
    else if (percentage >= 80) { overallGrade = 'B+'; gpaVal = '3.30'; }
    else if (percentage >= 70) { overallGrade = 'B'; gpaVal = '3.00'; }
    else if (percentage >= 60) { overallGrade = 'C'; gpaVal = '2.00'; }
    else { overallGrade = 'D'; gpaVal = '1.00'; }
  }

  return `
    <div class="report-card-container animate-fade-in">
      <div class="report-watermark">TATTAVYAN</div>
      
      <div class="report-header">
        <h2 style="font-size: 24px; color: var(--primary); letter-spacing: 1px;">TATTAVYAN EDUTECH ACADEMY</h2>
        <p style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; margin-top: 4px;">Official Academic Transcript Report</p>
      </div>

      <div class="report-summary-block">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 8px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px;">
            <div><span style="color: var(--text-secondary); font-weight: 600;">Student Name:</span> <strong style="color: var(--text-primary);">${activeStudent.name}</strong></div>
            <div><span style="color: var(--text-secondary); font-weight: 600;">Class Division:</span> <strong>Class ${activeStudent.class}</strong></div>
            <div><span style="color: var(--text-secondary); font-weight: 600;">Student Roster ID:</span> <strong class="font-geist">${activeStudent.id}</strong></div>
            <div><span style="color: var(--text-secondary); font-weight: 600;">Term Semester:</span> <strong>Semester 1, 2026</strong></div>
          </div>
        </div>
        <div class="report-gpa-ring">
          <span style="font-family: 'Geist'; font-size: 28px; font-weight: 900; color: var(--primary); line-height: 1;">${gpaVal}</span>
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-top: 2px;">Cumulative GPA</span>
        </div>
      </div>

      <!-- Subject Marks Ledger -->
      <div class="table-container" style="box-shadow: none; border-radius: var(--radius-lg); margin-bottom: 32px;">
        <table style="background: transparent;">
          <thead>
            <tr style="background: rgba(0, 74, 198, 0.02);">
              <th>Course Subject</th>
              <th>Marks Secured</th>
              <th>Max Marks</th>
              <th>Grade Rank</th>
              <th>Faculty Evaluation Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(sGrades).map(([subject, info]) => `
              <tr>
                <td style="font-weight: 700; color: var(--primary);">${subject}</td>
                <td style="font-weight: 700; font-family: 'Geist';">${info.marks}</td>
                <td style="font-family: 'Geist'; color: var(--text-muted);">${info.total}</td>
                <td>
                  <span class="badge ${['A+', 'A'].includes(info.grade) ? 'success' : info.grade.startsWith('B') ? 'warning' : 'danger'}" style="font-size: 11px; padding: 2px 8px;">
                    ${info.grade}
                  </span>
                </td>
                <td style="font-size: 13px; color: var(--text-secondary); max-width: 280px; line-height: 1.4;">${info.remarks}</td>
              </tr>
            `).join('')}
            ${subjectCount === 0 ? `
              <tr>
                <td colSpan="5" style="text-align: center; padding: 40px; color: var(--text-muted); font-style: italic;">
                  No subject grading files synced under enrollment roster ${activeStudent.id} yet.
                </td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      </div>

      <!-- Overall Performance indicators -->
      ${subjectCount > 0 ? `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; background: rgba(0, 74, 198, 0.02); padding: 20px; border-radius: var(--radius-lg); border: 1.5px solid var(--border-dark);">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; margin-bottom: 6px;">
              <span>Cumulative Percentage Progression</span>
              <span class="font-geist">${percentage}%</span>
            </div>
            <div class="progress-bar-track"><div class="progress-bar-fill" style="width: ${percentage}%;"></div></div>
          </div>
          <div style="display: flex; justify-content: space-around; align-items: center; text-align: center;">
            <div>
              <div style="font-size: 18px; font-weight: 800; color: var(--success); font-family: 'Geist';">${overallGrade}</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Overall Grade</div>
            </div>
            <div>
              <div style="font-size: 18px; font-weight: 800; color: var(--primary);">${subjectCount}</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Graded Courses</div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Report Signatures -->
      <div class="report-signatures">
        <div>
          <div class="signature-line" style="transform: rotate(-2deg);">Ravi Kumar</div>
          <div class="signature-label">Class Teacher</div>
        </div>
        <div>
          <div class="signature-line" style="font-family: 'Courier New', monospace; font-weight: 700; font-size: 14px;">TTVN_SEC_SIGN</div>
          <div class="signature-label">Registrar Office</div>
        </div>
        <div>
          <div class="signature-line" style="transform: rotate(1deg); color: var(--primary);">Dr. Amit Shah</div>
          <div class="signature-label">Principal</div>
        </div>
      </div>
    </div>
  `;
}

function renderStudentFees() {
  const activeStudent = state.students.find(s => s.id === state.activeStudentId) || DEFAULT_STUDENTS[2];
  return `
    <div style="max-width: 800px; margin: 0 auto;" class="animate-fade-in">
      <div class="fee-card animate-fade-in" style="margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; position: relative; z-index: 1;">
          <div>
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; font-weight: 600;">Tattavyan School Tuition Dues</div>
            <h2 style="font-size: 32px; font-weight: 700; margin: 8px 0; font-family: 'Geist';">₹45,000.00</h2>
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
          <div class="glass-panel" style="width: 100%; padding: 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--success-bg); color: var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
              <i data-lucide="check" style="width: 24px; height: 24px;"></i>
            </div>
            <div>
              <h4 style="font-size: 16px; font-weight: 700; color: var(--success);">All school dues cleared for this academic term!</h4>
              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Thank you. Transaction was logged under ID #TXN-SEC-${Date.now().toString().slice(-6)}.</p>
            </div>
            <button class="btn btn-outline" style="padding: 8px 16px; font-size: 12px; display: inline-flex; gap: 6px; margin-top: 8px;" onclick="alert('Digital fee receipt downloaded!')">
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

function renderStudentNotices() {
  return renderNoticeBoardSection(false);
}

// ==========================================
// 9. DYNAMIC SUBcomponents
// ==========================================

// --- SCHEDULE TIMETABLE CALENDAR WIDGET ---
function renderTimetableWidget(classOrTeacher) {
  const day = state.activeTimetableDay;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  let classKey = '10-A';
  if (classOrTeacher === '8-B' || classOrTeacher === '12-Sci') {
    classKey = classOrTeacher;
  }
  
  const daySchedule = SCHEDULES[classKey]?.[day] || [];
  
  return `
    <div class="animate-fade-in" style="width:100%;">
      <div class="day-tab-container">
        ${days.map(d => `
          <button 
            type="button" 
            class="day-tab-btn ${day === d ? 'active' : ''}" 
            onclick="setTimetableActiveDay('${d}')"
          >${d}</button>
        `).join('')}
      </div>

      <div class="timetable-grid">
        ${daySchedule.map(s => `
          <div class="timetable-card ${s.type}">
            <div class="timetable-time">${s.time}</div>
            <div class="timetable-title">${s.subject}</div>
            <div class="timetable-details">
              <span style="display: flex; align-items: center; gap: 4px; margin-top: 6px;">
                <i data-lucide="map-pin" style="width: 12px; height: 12px;"></i> ${s.room}
              </span>
              <span style="display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                <i data-lucide="user" style="width: 12px; height: 12px;"></i> ${s.teacher}
              </span>
            </div>
          </div>
        `).join('')}
        ${daySchedule.length === 0 ? `
          <div style="text-align: center; padding: 24px; color: var(--text-muted); grid-column: 1 / -1;">
            No classes scheduled on ${day}.
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// --- NOTICE BOARD WITH CATEGORIES AND FILTER CHIPS ---
function renderNoticeBoardSection(isAdmin = false) {
  const currentCategory = state.selectedNoticeFilter;
  const categories = ["All", "Academic", "Exams", "Activities"];
  
  const filteredNotices = state.notices.filter(n => {
    if (currentCategory === 'All') return true;
    return n.category === currentCategory;
  });

  return `
    <div class="table-container animate-fade-in">
      <div class="table-header" style="flex-direction: column; align-items: stretch; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h2 style="font-size: 18px;">School Announcement Bulletin Board</h2>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Announcements published globally in real-time.</p>
          </div>
          ${isAdmin ? `
            <button class="btn btn-primary" onclick="openModal('notice')" style="padding: 10px 18px; font-size: 13px;">
              <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Post Announcement Notice
            </button>
          ` : ''}
        </div>

        <!-- Filter Chips -->
        <div class="notice-filter-bar">
          ${categories.map(cat => `
            <button 
              type="button" 
              class="notice-filter-chip ${currentCategory === cat ? 'active' : ''}" 
              onclick="setNoticeBoardCategory('${cat}')"
            >${cat}</button>
          `).join('')}
        </div>
      </div>

      <div style="padding: 32px;">
        ${filteredNotices.map((n, idx) => `
          <div class="notice-card animate-fade-in">
            <div style="flex: 1; padding-right: 16px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span class="badge ${n.category === 'Exams' ? 'danger' : n.category === 'Academic' ? 'primary' : 'warning'}" style="font-size: 10px; padding: 2px 8px;">
                  ${n.category || 'General'}
                </span>
                <span style="font-size: 12px; color: var(--text-muted); font-weight: 500;">Posted: ${n.date}</span>
              </div>
              <h4 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">${n.title}</h4>
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">${n.description}</p>
            </div>
            ${isAdmin ? `
              <button onclick="deleteNotice('${n.id}')" class="btn-icon danger" style="padding: 6px;" title="Delete Bulletin">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
              </button>
            ` : ''}
          </div>
        `).join('')}
        ${filteredNotices.length === 0 ? `
          <div style="text-align: center; padding: 40px; color: var(--text-muted); font-style: italic;">
            No bulletins currently posted under category "${currentCategory}".
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ==========================================
// 10. MODALS RENDER (DYNAMIC DIALOG SHEATH)
// ==========================================
function renderModalContent() {
  if (!state.activeModal) return '';
  const modal = state.activeModal;
  
  if (modal === 'student') {
    const s = state.forms.student;
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
              <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-control" onchange="state.forms.notice.category = this.value">
                  <option value="Academic">Academic</option>
                  <option value="Exams">Exams</option>
                  <option value="Activities">Activities</option>
                </select>
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
                <input type="text" required class="form-control" placeholder="e.g. Algebra proofs worksheet" value="${hw.title}" oninput="state.forms.homework.title = this.value" />
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
                <div style="display: flex; gap: 12px; padding: 12px 16px; background: var(--primary-light); border: 1px solid var(--border-dark); border-radius: 12px; margin-bottom: 20px;">
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

  // --- [NEW MODAL] SIMULATED HOMEWORK UPLOAD ---
  if (modal === 'hwUpload') {
    const hw = state.modalData;
    const sim = state.uploadSim;
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 style="font-size: 18px; margin: 0;">Submit Completed Worksheet</h2>
            <button onclick="${sim.isUploading ? 'void(0)' : 'closeModal()'}" class="btn-icon" ${sim.isUploading ? 'disabled' : ''}><i data-lucide="x" style="width: 20px; height: 20px;"></i></button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom: 20px;">
              <span class="badge primary" style="font-size: 10px; margin-bottom: 6px;">${hw.subject}</span>
              <h4 style="font-size: 16px; font-weight: 700;">${hw.title}</h4>
              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Due Date Limit: ${hw.dueDate}</p>
            </div>

            ${sim.isUploading ? `
              <div class="upload-progress-container animate-fade-in">
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 8px;">
                  <span>Uploading worksheet document...</span>
                  <span class="font-geist">${sim.progress}%</span>
                </div>
                <div class="progress-bar-track"><div class="progress-bar-fill" style="width: ${sim.progress}%;"></div></div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px; font-style: italic;">Connecting secure media pipeline...</div>
              </div>
            ` : `
              <div class="upload-dropzone" onclick="triggerSimulatedFileUpload()">
                <i data-lucide="upload-cloud" style="width: 44px; height: 44px; color: var(--primary); margin-bottom: 12px;"></i>
                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Click to Select Worksheet</h4>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Accepts PDF, DOCX, JPG files (Max 10MB)</p>
              </div>
            `}
          </div>
          ${!sim.isUploading ? `
            <div class="modal-footer">
              <button type="button" onclick="closeModal()" class="btn btn-outline">Cancel</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // --- [NEW MODAL] VIEW SUBMISSION FEEDBACK DETAILS ---
  if (modal === 'viewFeedback') {
    const sub = state.modalData;
    const hw = state.homework.find(h => h.id === sub.hwId) || { title: 'Chapter Assignment', subject: 'General' };
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 style="font-size: 18px; margin: 0;">Submission Evaluation Details</h2>
            <button onclick="closeModal()" class="btn-icon"><i data-lucide="x" style="width: 20px; height: 20px;"></i></button>
          </div>
          <div class="modal-body">
            <div style="padding-bottom: 16px; border-bottom: 1px solid var(--border-dark); margin-bottom: 16px;">
              <span class="badge primary" style="font-size: 10px; margin-bottom: 4px;">${hw.subject}</span>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${hw.title}</h4>
            </div>

            <div style="margin-bottom: 20px;">
              <h5 style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">Submitted Document File</h5>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(0, 74, 198, 0.03); border: 1px solid var(--border-dark); border-radius: var(--radius-md);">
                <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);"><i data-lucide="file-text" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 6px; color: var(--secondary);"></i> ${sub.fileName}</span>
                <span style="font-size: 11px; color: var(--text-muted);">${sub.uploadedAt}</span>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <h5 style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">Grade & Performance Score</h5>
              <span class="badge success" style="font-size: 14px; font-family: 'Geist'; font-weight: 700; padding: 6px 16px;">
                ${sub.status === 'Graded' ? sub.score : 'Awaiting Faculty Evaluation'}
              </span>
            </div>

            <div style="margin-bottom: 0;">
              <h5 style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">Faculty Review comments</h5>
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; background: #faf8ff; border: 1px solid var(--border-dark); border-radius: var(--radius-md); padding: 14px; font-style: italic;">
                ${sub.feedback || 'Your worksheet is registered successfully. Faculty remarks will appear once grading clears.'}
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" onclick="closeModal()" class="btn btn-primary">Done</button>
          </div>
        </div>
      </div>
    `;
  }

  // --- [NEW MODAL] TEACHER EVALUATION GRADING INTERFACE ---
  if (modal === 'teacherGrading') {
    const sub = state.modalData;
    const hw = state.homework.find(h => h.id === sub.hwId) || { title: 'Chapter Assignment' };
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 style="font-size: 18px; margin: 0;">Evaluate Submitted Worksheet</h2>
            <button onclick="closeModal()" class="btn-icon"><i data-lucide="x" style="width: 20px; height: 20px;"></i></button>
          </div>
          <form onsubmit="handleTeacherGradingSubmit(event)">
            <div class="modal-body">
              <div style="margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--border-dark);">
                <div style="font-size: 13px; font-weight: 700; color: var(--primary);">${sub.studentName} (${sub.studentId})</div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">${hw.title}</h4>
              </div>

              <div class="form-group">
                <label class="form-label">Simulation Document Access</label>
                <a href="javascript:void(0)" onclick="alert('Opening secure document viewer')" class="btn btn-secondary" style="width: 100%; font-size: 13px;">
                  <i data-lucide="eye" style="width: 16px; height: 16px;"></i> Click to Review Student File (${sub.fileName})
                </a>
              </div>

              <div class="form-group">
                <label class="form-label">Secured Score (e.g. 9/10, 95%, A+)</label>
                <input type="text" required class="form-control" placeholder="e.g. 9/10" id="gradeScoreInput" value="${sub.score || ''}" />
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Feedback Review remarks</label>
                <textarea required class="form-control" style="min-height: 100px;" placeholder="Provide comments and review indicators..." id="gradeFeedbackInput">${sub.feedback || ''}</textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" onclick="closeModal()" class="btn btn-outline">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit Evaluation</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  return '';
}

// ==========================================
// 11. INTERACTION & EVENT CONTROLLERS
// ==========================================

// --- AUTH ACTIONS ---
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
        
        localStorage.setItem('tattavyan_session', JSON.stringify({ user: state.currentUser, role: state.userRole }));
        matchStudentProfile();
        updateUI();
        showToast(`Successfully logged in as ${role.charAt(0).toUpperCase() + role.slice(1)}! Welcome back 👋`, 'success');
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
  showToast('Logged out successfully. See you next time! 🙋‍♂️', 'info');
};

// --- NAVIGATION & DYNAMIC CONTROLS ---
window.setDashboardTab = function(tabId) {
  state.currentTab = tabId;
  
  // Custom setups for specific views
  if (tabId === 'attendance' && state.userRole === 'teacher') {
    state.attendanceControl.saveStatus = '';
    const classKey = `${state.attendanceControl.selectedClass}_${state.attendanceControl.selectedDate}`;
    const saved = state.attendanceDb[classKey] || {};
    
    state.attendanceControl.currentSheet = {};
    const classStds = state.students.filter(s => s.class === state.attendanceControl.selectedClass);
    classStds.forEach(s => {
      state.attendanceControl.currentSheet[s.id] = saved[s.id] || 'Present';
    });
  }
  
  if (tabId === 'gradebook' && state.userRole === 'teacher') {
    state.gradebookSubmitStatus = '';
    // Load student gradebook forms
    setGradebookStudent(state.forms.gradebook.studentId);
  }

  updateUI();
};

window.setNoticeBoardCategory = function(cat) {
  state.selectedNoticeFilter = cat;
  updateUI();
};

window.setTimetableActiveDay = function(day) {
  state.activeTimetableDay = day;
  updateUI();
};

// --- 3D ID CARD ROTATIONS ---
window.toggleIdCardFlip = function() {
  const card = document.getElementById('studentIdCard');
  if (card) {
    card.classList.toggle('flipped');
  }
};

// --- SIMULATED UPLOAD ACTIONS ---
window.openHomeworkUploadModal = function(hwId) {
  const hw = state.homework.find(h => h.id === hwId);
  state.modalData = hw;
  state.uploadSim.isUploading = false;
  state.uploadSim.progress = 0;
  state.uploadSim.dummyFile = null;
  openModal('hwUpload');
};

window.triggerSimulatedFileUpload = function() {
  const sim = state.uploadSim;
  sim.isUploading = true;
  sim.progress = 0;
  updateUI();
  showToast('Uploading assignment worksheet... 📤', 'warning');

  const interval = setInterval(() => {
    sim.progress += 10;
    updateUI();
    
    if (sim.progress >= 100) {
      clearInterval(interval);
      
      // Seed submission in database
      const hw = state.modalData;
      const activeStudent = state.students.find(s => s.id === state.activeStudentId);
      
      const newSub = {
        id: `#SUB${Date.now().toString().slice(-4)}`,
        hwId: hw.id,
        studentId: activeStudent.id,
        studentName: activeStudent.name,
        fileName: `${activeStudent.name.toLowerCase().replace(' ', '_')}_worksheet_proof.pdf`,
        uploadedAt: new Date().toISOString().split('T')[0],
        score: '',
        feedback: '',
        status: 'Pending'
      };

      const updated = [newSub, ...state.submissions];
      state.submissions = updated;
      saveDb('tattavyan_submissions', updated);
      showToast('Assignment worksheet uploaded and recorded! 🎉', 'success');
      
      setTimeout(() => {
        closeModal();
      }, 500);
    }
  }, 150);
};

window.openSubmissionFeedbackModal = function(subId) {
  const sub = state.submissions.find(s => s.id === subId);
  state.modalData = sub;
  openModal('viewFeedback');
};

// --- GRADEBOOK REGISTRAR ACTIONS ---
window.setGradebookStudent = function(studentId) {
  state.forms.gradebook.studentId = studentId;
  const sGrades = state.grades[studentId] || {};
  
  state.forms.gradebook.math = sGrades["Math"]?.marks || 80;
  state.forms.gradebook.science = sGrades["Science"]?.marks || 80;
  state.forms.gradebook.english = sGrades["English"]?.marks || 80;
  state.forms.gradebook.computer = sGrades["Computer"]?.marks || 80;
  state.forms.gradebook.remarks = sGrades["Math"]?.remarks || '';
  
  updateUI();
};

window.handleGradebookSubmit = function(e) {
  e.preventDefault();
  const gf = state.forms.gradebook;
  
  const calculateGrade = (m) => {
    if (m >= 95) return 'A+';
    if (m >= 90) return 'A';
    if (m >= 80) return 'B+';
    if (m >= 70) return 'B';
    if (m >= 60) return 'C';
    return 'D';
  };

  const updatedStudentGrades = {
    "Math": { marks: gf.math, total: 100, grade: calculateGrade(gf.math), remarks: gf.remarks || 'Good mathematical proof comprehension.' },
    "Science": { marks: gf.science, total: 100, grade: calculateGrade(gf.science), remarks: gf.remarks || 'Fascinating science project engagement.' },
    "English": { marks: gf.english, total: 100, grade: calculateGrade(gf.english), remarks: gf.remarks || 'Expressive composition mechanics.' },
    "Computer": { marks: gf.computer, total: 100, grade: calculateGrade(gf.computer), remarks: gf.remarks || 'Solid computational logic constructs.' }
  };

  const updatedDb = {
    ...state.grades,
    [gf.studentId]: updatedStudentGrades
  };

  state.grades = updatedDb;
  saveDb('tattavyan_grades', updatedDb);
  
  state.gradebookSubmitStatus = 'Grades updated!';
  showToast(`Performance grades updated successfully for student ${gf.studentId}! 📝`, 'success');
  updateUI();
  
  setTimeout(() => {
    state.gradebookSubmitStatus = '';
    updateUI();
  }, 2500);
};

// --- TEACHER SUBMISSIONS EVALUATION ---
window.openGradingModal = function(subId) {
  const sub = state.submissions.find(s => s.id === subId);
  state.modalData = sub;
  openModal('teacherGrading');
};

window.handleTeacherGradingSubmit = function(e) {
  e.preventDefault();
  const sub = state.modalData;
  const scoreVal = document.getElementById('gradeScoreInput').value;
  const feedbackVal = document.getElementById('gradeFeedbackInput').value;

  const updated = state.submissions.map(s => {
    if (s.id === sub.id) {
      return {
        ...s,
        score: scoreVal,
        feedback: feedbackVal,
        status: 'Graded'
      };
    }
    return s;
  });

  state.submissions = updated;
  saveDb('tattavyan_submissions', updated);
  showToast(`Grading report sheet submitted for ${sub.studentName}! 🎓`, 'success');
  closeModal();
};

// --- ADMIN DIRECTORY ACTIONS ---
window.deleteStudent = function(studentId) {
  if (window.confirm('Are you sure you want to remove this student from Tattavyan?')) {
    const updated = state.students.filter(s => s.id !== studentId);
    saveDb('tattavyan_students', updated);
    updateUI();
    showToast('Student successfully removed from school roster.', 'danger');
  }
};

window.deleteTeacher = function(teacherId) {
  if (window.confirm('Are you sure you want to dismiss this faculty?')) {
    const updated = state.teachers.filter(t => t.id !== teacherId);
    saveDb('tattavyan_teachers', updated);
    updateUI();
    showToast('Faculty member dismissed from directory.', 'danger');
  }
};

window.deleteNotice = function(noticeId) {
  if (window.confirm('Delete announcement notice from the academic board?')) {
    const updated = state.notices.filter(n => n.id !== noticeId);
    saveDb('tattavyan_notices', updated);
    updateUI();
    showToast('Announcement removed from notices bulletin.', 'warning');
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

// --- TEACHER ATTENDANCE SHEET ACTIONS ---
window.setAttendanceClass = function(classVal) {
  state.attendanceControl.selectedClass = classVal;
  state.attendanceControl.saveStatus = '';
  
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
  showToast('Attendance registry successfully saved & synced! 📅', 'success');
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

// --- DYNAMIC DIALOG LAYERS ACTIONS ---
window.openModal = function(modalType) {
  state.activeModal = modalType;
  
  if (modalType === 'student') {
    state.forms.student = { name: '', class: '10-A', parent: '', status: 'Active' };
  } else if (modalType === 'teacher') {
    state.forms.teacher = { name: '', subject: '', experience: '' };
  } else if (modalType === 'notice') {
    state.forms.notice = { title: '', description: '', category: 'Academic' };
  } else if (modalType === 'homework') {
    state.forms.homework = { class: '10-A', subject: 'Mathematics', title: '', dueDate: '2026-05-25' };
  } else if (modalType === 'pay') {
    state.checkout.isProcessing = false;
    state.checkout.success = false;
    state.checkout.processingStep = '';
  }
  
  updateUI();
};

window.closeModal = function() {
  state.activeModal = null;
  state.modalData = null;
  updateUI();
};

// --- CRUD FORMS CAPTURES ---
window.handleNewStudentSubmit = function(e) {
  e.preventDefault();
  const s = state.forms.student;
  
  const newId = `#ST${1024 + state.students.length + Math.floor(Math.random() * 100)}`;
  const updated = [
    { id: newId, name: s.name, class: s.class, parent: s.parent, status: s.status },
    ...state.students
  ];
  
  saveDb('tattavyan_students', updated);
  showToast(`Student ${s.name} enrolled successfully! 🎓`, 'success');
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
  showToast(`Faculty member ${t.name} added to roster!`, 'success');
  closeModal();
};

window.handleNewNoticeSubmit = function(e) {
  e.preventDefault();
  const n = state.forms.notice;
  
  const newId = `#N${Date.now().toString().slice(-4)}`;
  const updated = [
    { id: newId, title: n.title, description: n.description, date: 'Just now', category: n.category },
    ...state.notices
  ];
  
  saveDb('tattavyan_notices', updated);
  showToast('New announcement posted successfully! 🔔', 'success');
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
  showToast('New assignment worksheet posted successfully!', 'success');
  closeModal();
};

// --- SECURE PAYMENT OVERLAYS ACTIONS ---
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
  showToast('Processing secure tuition fees payment... 💳', 'warning');
  
  setTimeout(() => {
    c.processingStep = 'Authorizing dues clearance with merchant...';
    updateUI();
    
    setTimeout(() => {
      c.processingStep = 'Updating administrative academic records...';
      updateUI();
      
      setTimeout(() => {
        c.isProcessing = false;
        c.success = true;
        
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
        showToast('Tuition fee payment cleared! Status set to ACTIVE. 🎉', 'success');
        updateUI();
      }, 1000);
    }, 1000);
  }, 1000);
};

// ==========================================
// 12. PREMIUM SYSTEMS (TOASTS & THEME TOGGLE)
// ==========================================
window.showToast = function(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} animate-slide-in-right`;
  
  let icon = 'info';
  let color = '#4b41e1';
  if (type === 'success') {
    icon = 'check-circle';
    color = '#10b981';
  } else if (type === 'warning') {
    icon = 'alert-triangle';
    color = '#f59e0b';
  } else if (type === 'danger') {
    icon = 'x-circle';
    color = '#ba1a1a';
  }
  
  toast.style.cssText = `
    background: var(--surface-solid);
    color: var(--text-primary);
    border-left: 4px solid ${color};
    padding: 16px 20px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    min-width: 280px;
    max-width: 380px;
    backdrop-filter: blur(12px);
    pointer-events: auto;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  
  toast.innerHTML = `
    <i data-lucide="${icon}" style="width: 20px; height: 20px; color: ${color}; flex-shrink: 0;"></i>
    <span style="flex-grow: 1;">${message}</span>
    <button onclick="this.parentElement.remove()" style="background: transparent; color: var(--text-muted); border: none; padding: 4px; display: flex; align-items: center; cursor: pointer;">
      <i data-lucide="x" style="width: 16px; height: 16px;"></i>
    </button>
  `;
  
  container.appendChild(toast);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons({
      attrs: {
        class: 'lucide'
      },
      nameAttr: 'data-lucide',
      node: toast
    });
  }
  
  // Fade out and remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
};

window.toggleTheme = function() {
  state.darkMode = !state.darkMode;
  localStorage.setItem('tattavyan_dark_mode', state.darkMode);
  if (state.darkMode) {
    document.body.classList.add('dark-theme');
    showToast('Switched to Dark Mode 🌙', 'success');
  } else {
    document.body.classList.remove('dark-theme');
    showToast('Switched to Light Mode ☀️', 'success');
  }
  updateUI();
};

// ==========================================
// 13. INITIALIZATION BOOTSTRAP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initDatabase();
  updateUI();
});
