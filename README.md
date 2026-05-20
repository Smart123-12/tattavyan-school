# Tattavyan Edutech - Luminous Academic ERP System

**🌍 Live Live Portal:** [https://smart123-12.github.io/tattavyan-school/](https://smart123-12.github.io/tattavyan-school/)

A high-fidelity, ultra-performance School ERP Portal designed strictly around the **Google Stitch "Luminous Academic Interface"** design tokens. This single-page application (SPA) is built purely using modern **HTML5, CSS3, and ES6 JavaScript**, providing lightning-fast rendering speeds and zero compile/build overhead.

---

## 🎨 Design System Highlights (Google Stitch Specs)

* **Academic HSL Palette**: Saturated corporate trust blue (`#004ac6`), digital indigo (`#4b41e1`), and clean high-contrast surface panels overlaid on a rich multi-gradient ambient backdrop.
* **Stateful Dark Mode / Light Mode Switch**: A premium header control button dynamically swaps HSL variables (`--background`, `--surface`, `--text-primary`, `--border`) with buttery smooth color transitions. Settings are saved to **local storage** and persist upon refresh!
* **Double-Layered Glassmorphism**: Cards and panels have translucent, semi-transparent backgrounds (`rgba(255, 255, 255, 0.7)`) with a white border at `40% opacity`, creating an elegant layered depth look.
* **Micro-Animations**: All interactive buttons, inputs, tabs, and dashboards use custom bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) for premium user response.

---

## 🔑 Demo Authentication Credentials

The portal features a fully active, stateful authentication layer. You can log in as any role using the following verified credentials:

| Role | Username | Password | Highlight Features |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@tattavyan.edu` | `admin123` | Analytics overview cards, Student list management, Teacher directory, Fees collection status tracking, Notice board broadcaster. |
| **Teacher** | `teacher@tattavyan.edu` | `teacher123` | Class Analytics overview, Attendance registry checklist, Assignment center (view worksheet submissions, score files, leave feedback), Gradebook ledger (assign term grades). |
| **Student** | `student@tattavyan.edu` | `student123` | **3D Flipped ID Card** (interactive), Grade progress analytics chart (SVG), report card center, class timetable grid, Homework download & file upload simulation pipeline. |

---

## ⚡ Heavy-Duty ERP Features

### 🔔 Dynamic Toast Notification Alerts
Every single administrative operation, session change, and student interaction has direct action feedback:
* Signing in displays a personalized greeting toast.
* Submitting coursework triggers dynamic upload queue timers followed by success notices.
* Committing class attendance records, updating term grade registers, and issuing secure billing fees clears trigger customized status bars that slide in smoothly from the screen margin.

### 👨‍🎓 Student Dashboard
* **3D Student ID Card**: Hovering over the card initiates a beautiful 3D flip animation showing the student details on the front, and emergency contacts, blood group, bus route, and barcoded enrollment on the back.
* **Interactive Timetables**: Weekday scheduler divided by day tabs. Click any day to see classroom schedules, teacher names, and hours.
* **Grade Progress Chart**: An elegant SVG-rendered curve plotting performance over multiple semesters.
* **Worksheet Submission Pipeline**: A drag-and-drop simulated file area with a linear loading progress bar.

### 👩‍🏫 Teacher Workspace
* **Daily Attendance Register**: Select division classes, view students, and instantly mark them `Present` or `Absent` with a single click.
* **Worksheet Scoring Center**: Open student-submitted homework documents, read timestamps, write custom text feedback, assign scores, and submit changes.
* **Gradebook Registry**: Manage student grade logs. Enter marks, auto-compute letter grades (A+, A, B, etc.), and append progress comments.

### 👑 Administrator Console
* **Modular Statistics Tiles**: View total student & teacher headcounts, collected fee totals, active divisions, and pending registrations.
* **Comprehensive Searchable Directories**: Instantly search, filter, and add new students or teachers to the system.
* **Notice Board Broadcaster**: Post announcements tagged by categories (e.g. *Academic*, *Exams*, *Activities*) that automatically filter down across all dashboards.

---

## 🛠️ Technology Stack
* **Core Layout**: Semantic HTML5 structures.
* **Styling**: Premium custom CSS utilizing advanced CSS variables, grid templates, backdrop-filters, and 3D transforms.
* **Iconography**: Embedded dual-tone Lucide SVGs via CDN.
* **State Management**: Zero dependencies. Vanilla ES6 JavaScript handling persistent data synchronization through `localStorage`.

---

## 🚀 Running the Project Locally

Since the application is built as a pure client-side SPA, there are no dependencies to install and no build processes to run:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Smart123-12/tattavyan-school.git
   cd tattavyan-school
   ```

2. **Open the App:**
   Simply double-click `index.html` to open it in your browser, or run a simple local server if you'd like to test custom origin behaviors:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```

3. **Enjoy!** Navigating to your local host port (e.g. `http://localhost:8000`) will load the Luminous Academic ERP instantly!
