import React, { useState } from 'react';
import { BookOpen, Users, Calendar, MapPin, Upload, MessageSquare, BarChart3, FileText } from 'lucide-react';
import { teacherClasses, students } from './mockData';
import './TeacherDashboardOverview.css';

const TeacherClassesView = () => {
    const [selectedClass, setSelectedClass] = useState(null);

    const getClassStudents = (classId) => {
        const classInfo = teacherClasses.find(c => c.id === classId);
        return students.filter(s => s.class === classInfo.grade);
    };

    return (
        <div className="teacher-dashboard-overview">
            <div className="overview-header">
                <div>
                    <h1 className="page-title">My Classes</h1>
                    <p className="page-subtitle">Manage your classes, view rosters, and track performance</p>
                </div>
            </div>

            {!selectedClass ? (
                // Classes Grid View
                <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {teacherClasses.map((classItem) => (
                        <div key={classItem.id} className="dashboard-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedClass(classItem)}>
                            <div className="card-header">
                                <h3 className="card-title">{classItem.subject}</h3>
                                <span className="badge" style={{ backgroundColor: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
                                    {classItem.grade}
                                </span>
                            </div>
                            <div className="card-body">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <Users size={16} color="#6b7280" />
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>{classItem.students} Students</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <Calendar size={16} color="#6b7280" />
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>{classItem.schedule}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <MapPin size={16} color="#6b7280" />
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>{classItem.room}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                                    <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                                        <FileText size={14} /> View Roster
                                    </button>
                                    <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                                        <BarChart3 size={14} /> Stats
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Detailed Class View
                <div>
                    <button
                        onClick={() => setSelectedClass(null)}
                        className="btn-secondary"
                        style={{ marginBottom: '20px' }}
                    >
                        ← Back to Classes
                    </button>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <div>
                                <h2 className="card-title">{selectedClass.subject} - {selectedClass.grade}</h2>
                                <p style={{ color: '#6b7280', fontSize: '14px' }}>{selectedClass.schedule} • {selectedClass.room}</p>
                            </div>
                            <button className="btn-primary">
                                <Upload size={16} /> Upload Material
                            </button>
                        </div>
                        <div className="card-body">
                            {/* Quick Stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{selectedClass.students}</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Total Students</div>
                                </div>
                                <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>95.5%</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Avg Attendance</div>
                                </div>
                                <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>78.2</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Avg Score</div>
                                </div>
                            </div>

                            {/* Student Roster */}
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Student Roster</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Roll No</th>
                                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Student Name</th>
                                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Attendance</th>
                                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Avg Score</th>
                                            <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getClassStudents(selectedClass.id).map((student) => (
                                            <tr key={student.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                                <td style={{ padding: '12px' }}>{student.rollNo}</td>
                                                <td style={{ padding: '12px', fontWeight: '500' }}>{student.name}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <span style={{
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        fontSize: '12px',
                                                        backgroundColor: student.attendance >= 90 ? '#d1fae5' : '#fef3c7',
                                                        color: student.attendance >= 90 ? '#065f46' : '#92400e'
                                                    }}>
                                                        {student.attendance}%
                                                    </span>
                                                </td>
                                                <td style={{ padding: '12px' }}>{student.avgScore}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <button className="btn-secondary" style={{ fontSize: '12px', padding: '4px 8px' }}>
                                                        View Profile
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Class Announcements */}
                            <div style={{ marginTop: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Class Announcements</h3>
                                    <button className="btn-primary">
                                        <MessageSquare size={16} /> New Announcement
                                    </button>
                                </div>
                                <div className="dashboard-card" style={{ backgroundColor: '#f9fafb' }}>
                                    <div className="card-body">
                                        <p style={{ color: '#6b7280', textAlign: 'center' }}>No announcements yet. Create one to notify students.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherClassesView;
