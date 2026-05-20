import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Calendar, BookOpen, CheckCircle, Bell, CreditCard, X, ShieldAlert, Award, FileText, Check, Loader2 } from 'lucide-react';

export default function StudentDashboard() {
  const location = useLocation();
  const path = location.pathname;
  const { currentUser } = useAuth();

  // Shared state loaded from localstorage
  const [students, setStudents] = useState([]);
  const [homework, setHomework] = useState([]);
  const [notices, setNotices] = useState([]);
  const [attendanceDb, setAttendanceDb] = useState({});

  // Active student mapping (Default to Rohan Desai #ST1026 for demo fee loop)
  const [activeStudent, setActiveStudent] = useState({
    id: '#ST1026',
    name: 'Rohan Desai',
    class: '12-Sci',
    parent: 'Amit Desai',
    status: 'Pending Fee'
  });

  // Modal checkout states
  const [showPayModal, setShowPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState('card');
  const [paymentForm, setPaymentForm] = useState({ cardholder: 'Rohan Desai', cardNo: '4321 8876 5432 1098', expiry: '09/29', cvv: '231', upiId: 'rohan@okaxis' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Load from local storage
  useEffect(() => {
    const loadedStudents = localStorage.getItem('tattavyan_students');
    const loadedHomework = localStorage.getItem('tattavyan_homework');
    const loadedNotices = localStorage.getItem('tattavyan_notices');
    const loadedAttendance = localStorage.getItem('tattavyan_attendance');

    let parsedStudents = [];
    if (loadedStudents) {
      parsedStudents = JSON.parse(loadedStudents);
      setStudents(parsedStudents);
    }
    if (loadedHomework) setHomework(JSON.parse(loadedHomework));
    if (loadedNotices) setNotices(JSON.parse(loadedNotices));
    if (loadedAttendance) setAttendanceDb(JSON.parse(loadedAttendance));

    // Try to match active student based on email/displayName or default to Rohan Desai
    if (parsedStudents.length > 0 && currentUser) {
      const emailPrefix = currentUser.email.split('@')[0].toLowerCase();
      // Match "aarav" -> Aarav Patel, "diya" -> Diya Sharma, "priya" -> Priya Singh, else Rohan Desai
      let matched = parsedStudents.find(s => s.name.toLowerCase().includes(emailPrefix));
      if (!matched && emailPrefix === 'student') {
        // Default student login is mapped to Rohan Desai for the full fee payment demonstration
        matched = parsedStudents.find(s => s.id === '#ST1026');
      }
      if (matched) {
        setActiveStudent(matched);
      }
    }
  }, [currentUser]);

  // Read active student's fresh state whenever students database updates in storage
  useEffect(() => {
    const freshRecord = students.find(s => s.id === activeStudent.id);
    if (freshRecord) {
      setActiveStudent(freshRecord);
    }
  }, [students]);

  // Sync students data back to storage
  const syncStudentsData = (updated) => {
    setStudents(updated);
    localStorage.setItem('tattavyan_students', JSON.stringify(updated));
  };

  // ---- ATTENDANCE LOG CALCULATIONS ----
  // Filter attendance database to find dates where this student's class was marked
  const attendanceLogs = [];
  let presentCount = 0;
  let totalMarked = 0;

  Object.entries(attendanceDb).forEach(([key, record]) => {
    const [cls, date] = key.split('_');
    if (cls === activeStudent.class) {
      const status = record[activeStudent.id];
      if (status) {
        totalMarked++;
        if (status === 'Present') presentCount++;
        attendanceLogs.push({ date, status });
      }
    }
  });

  // Sort logs by date descending
  attendanceLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const attendanceRate = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 95;

  // ---- DYNAMIC CORRESPONDING CONTENT ----
  // Homework filtered specifically by student's class!
  const myHomework = homework.filter(h => h.class === activeStudent.class);

  // ---- HANDLERS ----
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStep('Connecting to secure gateway...');
    
    setTimeout(() => {
      setProcessingStep('Authorizing payment with bank...');
      
      setTimeout(() => {
        setProcessingStep('Finalizing collection receipts...');
        
        setTimeout(() => {
          setIsProcessing(false);
          setPaymentSuccess(true);
          
          // Update status in local storage
          const updatedStudents = students.map(s => {
            if (s.id === activeStudent.id) {
              return { ...s, status: 'Active' };
            }
            return s;
          });
          syncStudentsData(updatedStudents);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // ---- VIEWS ----
  const renderOverview = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>My Attendance Rate</h3>
            <p>{attendanceRate}%</p>
          </div>
          <div className="stat-icon success">
            <CheckCircle size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Class Assignments</h3>
            <p>{myHomework.length}</p>
          </div>
          <div className="stat-icon warning">
            <BookOpen size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Division</h3>
            <p style={{ fontSize: 26, fontWeight: 700 }}>{activeStudent.class}</p>
          </div>
          <div className="stat-icon primary">
            <Award size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>School Notices</h3>
            <p>{notices.length}</p>
          </div>
          <div className="stat-icon secondary">
            <Bell size={24} />
          </div>
        </div>
      </div>

      <div className="dashboard-grid-2col">
        <div className="table-container">
          <div className="table-header">
            <h2 style={{ fontSize: 18 }}>My Pending Homework</h2>
          </div>
          <div style={{ padding: 24 }}>
            {myHomework.length > 0 ? myHomework.map(hw => (
              <div key={hw.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.3)' }}>
                <div>
                  <div style={{ display: 'inline-flex', gap: 6, marginBottom: 4 }}>
                    <span className="badge primary" style={{ fontSize: 9, padding: '1px 6px' }}>{hw.subject}</span>
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{hw.title}</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Due Date: {hw.dueDate}</p>
                </div>
                <span className="badge warning">Pending Submission</span>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                🎉 Great job! No pending homework assigned for Class {activeStudent.class}.
              </div>
            )}
          </div>
        </div>

        <div className="table-container">
          <div className="table-header">
            <h2 style={{ fontSize: 18 }}>Recent notices Bulletin</h2>
          </div>
          <div style={{ padding: 24, maxHeight: 300, overflowY: 'auto' }}>
            {notices.map((n, index) => (
              <div key={n.id} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, marginBottom: 12, background: index === 0 ? 'rgba(0, 74, 198, 0.04)' : 'rgba(255,255,255,0.3)', borderLeft: index === 0 ? '4px solid var(--primary)' : '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  {index === 0 && <span className="badge primary" style={{ fontSize: 9, padding: '1px 6px' }}>NEW</span>}
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.date}</span>
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.description}</p>
              </div>
            ))}
            {notices.length === 0 && (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No bulletins posted.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderHomework = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 style={{ fontSize: 18 }}>Homework & Lesson Submissions</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Assignment Title</th>
            <th>Due Date</th>
            <th>Status Badge</th>
          </tr>
        </thead>
        <tbody>
          {myHomework.map(h => (
            <tr key={h.id}>
              <td style={{ fontWeight: 600 }}><span className="badge primary">{h.subject}</span></td>
              <td>{h.title}</td>
              <td style={{ color: 'var(--text-secondary)' }}>{h.dueDate}</td>
              <td><span className="badge warning">Pending</span></td>
            </tr>
          ))}
          {myHomework.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No homework list found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderNotices = () => (
    <div className="table-container">
      <div className="table-header">
        <h2 style={{ fontSize: 18 }}>Official Bulletins & Advisories</h2>
      </div>
      <div style={{ padding: 32 }}>
        {notices.map(n => (
          <div key={n.id} style={{ padding: '20px 24px', border: '1px solid var(--border)', borderRadius: 14, marginBottom: 16, background: 'rgba(255,255,255,0.45)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Posted: {n.date}</div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{n.title}</h4>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.description}</p>
          </div>
        ))}
        {notices.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No notices are currently active.</p>
        )}
      </div>
    </div>
  );

  const renderFeesPortal = () => (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="fee-card animate-fade-in" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.8, fontWeight: 600 }}>Tattavyan Tuition Invoice</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: '8px 0', fontFamily: 'Geist' }}>₹45,000.00</h2>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Invoice ID: #INV-{activeStudent.id.replace('#', '')}-2026</div>
          </div>
          <span className={`badge ${activeStudent.status === 'Active' ? 'success' : 'danger'}`} style={{ border: '1.5px solid white', color: 'white', background: activeStudent.status === 'Active' ? 'var(--success)' : 'var(--danger)' }}>
            {activeStudent.status === 'Active' ? 'PAID / CLEAR' : 'OVERDUE DUES'}
          </span>
        </div>
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.7 }}>Student Name</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{activeStudent.name}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.7 }}>Designated Division</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Class {activeStudent.class}</div>
          </div>
        </div>
      </div>

      <div className="table-container animate-fade-in" style={{ marginBottom: 32 }}>
        <div className="table-header">
          <h3 style={{ fontSize: 16 }}>Dues Breakdown Description</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fee Category</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Core Academic Tuition Dues</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>₹38,000.00</td>
            </tr>
            <tr>
              <td>Laboratory & Digital Facility Access</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>₹2,000.00</td>
            </tr>
            <tr>
              <td>Sports Complex & Clubs Subscription</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>₹3,000.00</td>
            </tr>
            <tr>
              <td>Library Reference Desk Access</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>₹2,000.00</td>
            </tr>
            <tr style={{ background: 'rgba(0,74,198,0.03)' }}>
              <td style={{ fontWeight: 700 }}>Total Term Dues Invoice</td>
              <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--primary)', fontSize: 16 }}>₹45,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStudent.status === 'Active' ? (
          <div className="glass-panel" style={{ width: '100%', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContext: 'center', display: 'flex', justifyContent: 'center' }}>
              <CheckCircle size={28} style={{ alignSelf: 'center' }} />
            </div>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--success)' }}>All school dues cleared for Term 1!</h4>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Payment transaction ID #TXN-{Date.now().toString().slice(-6)} was captured securely.</p>
            </div>
            <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: 12, display: 'inline-flex', gap: 6, marginTop: 8 }} onClick={() => alert('Receipt generated successfully! Click to print.')}>
              <FileText size={14} /> Download Receipt PDF
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 15, display: 'flex', gap: 8 }} onClick={() => setShowPayModal(true)}>
            <CreditCard size={18} /> Make Online Payment
          </button>
        )}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: 28, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', fontWeight: 700, fontSize: 22, background: 'var(--success-bg)', flexShrink: 0 }}>
          {attendanceRate}%
        </div>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>Attendance Progress Report</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
            Classroom registry matches your division: <strong>Class {activeStudent.class}</strong>. Out of {totalMarked} dates recorded by your faculty, you were marked Present on {presentCount} dates.
          </p>
        </div>
      </div>

      <div className="table-container animate-fade-in">
        <div className="table-header">
          <h2 style={{ fontSize: 18 }}>Personal Attendance Log</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Academic Date</th>
              <th>Designated Division</th>
              <th>Status Badge</th>
            </tr>
          </thead>
          <tbody>
            {attendanceLogs.length > 0 ? attendanceLogs.map(log => (
              <tr key={log.date}>
                <td style={{ fontWeight: 600 }}>{log.date}</td>
                <td>Class {activeStudent.class}</td>
                <td>
                  <span className={`badge ${log.status === 'Present' ? 'success' : 'danger'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No active logs recorded yet for Division {activeStudent.class} on this academic term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <Layout title="Student Portal">
      {path === '/student' && renderOverview()}
      {path === '/student/homework' && renderHomework()}
      {path === '/student/notices' && renderNotices()}
      {path === '/student/fees' && renderFeesPortal()}
      {path === '/student/attendance' && renderAttendance()}

      {/* ONLINE PAYMENT CHECKOUT MODAL */}
      {showPayModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: 18, margin: 0 }}>Secure checkout Portal</h2>
              <button onClick={() => setShowPayModal(false)} className="btn-icon" disabled={isProcessing}><X size={20} /></button>
            </div>
            
            {paymentSuccess ? (
              <div className="modal-body" style={{ textAlign: 'center', padding: '40px 24px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Check size={36} />
                </div>
                <h3 style={{ fontSize: 20, color: 'var(--success)', fontWeight: 600, marginBottom: 8 }}>Dues Paid Successfully!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>
                  ₹45,000 tuition fee payment for {activeStudent.name} has been processed successfully. Your enrollment record is updated.
                </p>
                <button type="button" onClick={() => setShowPayModal(false)} className="btn btn-primary" style={{ padding: '10px 24px' }}>Return to Portal</button>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <div className="modal-body">
                  <div style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'var(--primary-light)', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: 20 }}>
                    <ShieldAlert size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      Total checkout transaction is capped at <strong>₹45,000.00</strong>. This is a mockup transaction for testing purposes.
                    </div>
                  </div>

                  {/* Payment method selector */}
                  <div className="role-selector" style={{ marginBottom: 20 }}>
                    <button type="button" className={`role-btn ${payMethod === 'card' ? 'active' : ''}`} onClick={() => setPayMethod('card')} disabled={isProcessing}>Card Payment</button>
                    <button type="button" className={`role-btn ${payMethod === 'upi' ? 'active' : ''}`} onClick={() => setPayMethod('upi')} disabled={isProcessing}>UPI QR</button>
                  </div>

                  {isProcessing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0', gap: 16 }}>
                      <Loader2 size={36} className="animate-spin" color="var(--primary)" />
                      <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 600 }}>{processingStep}</div>
                    </div>
                  ) : payMethod === 'card' ? (
                    <>
                      <div className="form-group">
                        <label className="form-label">Cardholder Name</label>
                        <input type="text" required value={paymentForm.cardholder} onChange={e => setPaymentForm({...paymentForm, cardholder: e.target.value})} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Credit Card Number</label>
                        <input type="text" required value={paymentForm.cardNo} onChange={e => setPaymentForm({...paymentForm, cardNo: e.target.value})} className="form-control" />
                      </div>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Expiry (MM/YY)</label>
                          <input type="text" required value={paymentForm.expiry} onChange={e => setPaymentForm({...paymentForm, expiry: e.target.value})} className="form-control" placeholder="MM/YY" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">CVV</label>
                          <input type="password" maxLength={3} required value={paymentForm.cvv} onChange={e => setPaymentForm({...paymentForm, cvv: e.target.value})} className="form-control" placeholder="***" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <div className="form-group">
                        <label className="form-label">Enter UPI ID</label>
                        <input type="text" required value={paymentForm.upiId} onChange={e => setPaymentForm({...paymentForm, upiId: e.target.value})} className="form-control" placeholder="e.g. name@okaxis" />
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                        UPI Request will be raised securely on your UPI App.
                      </div>
                    </div>
                  )}
                </div>

                {!isProcessing && (
                  <div className="modal-footer">
                    <button type="button" onClick={() => setShowPayModal(false)} className="btn btn-outline">Cancel</button>
                    <button type="submit" className="btn btn-primary">Pay ₹45,000.00</button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
