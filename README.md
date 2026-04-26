# Tattavyan Edutech - Smart School Management System

A modern, responsive, and fully functional School Management System built with React, Vite, and custom CSS. This application provides role-based access for Admins, Teachers, and Students, each with their own dedicated dashboards to manage and view school activities.

## 🚀 Live Demo Features

The application operates in a demo mode utilizing local state and `localStorage` to simulate a fully functional backend. It features dynamic routing and role-based authentication.

### Role-Based Dashboards:

1. **Admin Dashboard**
   - Overview of total students, teachers, and current notices.
   - Manage Users (Add/Remove Teachers and Students).
   - Post system-wide announcements and notices.
   - View revenue and attendance statistics.

2. **Teacher Dashboard**
   - View assigned classes and upcoming schedule.
   - Manage student attendance.
   - Upload and manage homework and assignments.
   - View notices from administration.

3. **Student Dashboard**
   - View personal attendance records.
   - Check pending assignments and submitted homework grades.
   - View school notices and announcements.
   - See daily class timetable.

## 🛠️ Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Custom Vanilla CSS (with modern variables, glassmorphism, and responsive design)
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **State Management:** React Context API & LocalStorage

## 🔐 Demo Authentication

The application has a built-in demo authentication system. You can log in as any role using any dummy credentials.

- **Admin Login:** Select "Admin" role -> Enter any email/password.
- **Teacher Login:** Select "Teacher" role -> Enter any email/password.
- **Student Login:** Select "Student" role -> Enter any email/password.

## 💻 Running the Project Locally

Follow these steps to run the project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Smart123-12/tattavyan-school.git
   cd tattavyan-school/tattavyan_edutech
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` (or the port specified in your terminal) to view the application.

## 🎨 Design Philosophy

The UI/UX is built with a focus on modern web aesthetics:
- **Glassmorphism:** Elegant, semi-transparent panels and sidebars.
- **Responsive:** Fully responsive layout that works across desktops, tablets, and mobile devices.
- **Dynamic Animations:** Smooth transitions and hover effects for better user engagement.

## 📝 License

This project is created for demonstration and educational purposes.
