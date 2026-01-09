import React, { useState } from 'react';
import { MessageSquare, Send, Bell, Users, Search } from 'lucide-react';
import { messages, announcements } from './mockData';
import './TeacherDashboardOverview.css';

const TeacherCommunicationView = () => {
    const [activeTab, setActiveTab] = useState('messages');
    const [messageText, setMessageText] = useState('');

    return (
        <div className="teacher-dashboard-overview">
            <div className="overview-header">
                <div>
                    <h1 className="page-title">Communication</h1>
                    <p className="page-subtitle">Messages, announcements, and notifications</p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                {['messages', 'announcements', 'notifications'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '12px 24px',
                            fontSize: '14px',
                            fontWeight: '500',
                            border: 'none',
                            borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
                            backgroundColor: 'transparent',
                            color: activeTab === tab ? '#3b82f6' : '#6b7280',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'messages' && (
                <div className="dashboard-grid">
                    {/* Messages List */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Recent Messages</h2>
                            <div style={{ position: 'relative', width: '200px' }}>
                                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    style={{
                                        width: '100%',
                                        padding: '8px 8px 8px 36px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '6px',
                                        fontSize: '13px'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card-body" style={{ padding: 0 }}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        padding: '16px',
                                        borderBottom: '1px solid #f3f4f6',
                                        cursor: 'pointer',
                                        backgroundColor: msg.unread ? '#eff6ff' : 'white'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <h4 style={{ fontWeight: '600', fontSize: '14px' }}>{msg.from}</h4>
                                        <span style={{ fontSize: '12px', color: '#6b7280' }}>{msg.date}</span>
                                    </div>
                                    <p style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>{msg.subject}</p>
                                    <p style={{ fontSize: '13px', color: '#6b7280' }}>{msg.preview}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compose */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">New Message</h2>
                        </div>
                        <div className="card-body">
                            <form style={{ display: 'grid', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>To</label>
                                    <select style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                                        <option>Select Recipient</option>
                                        <option>All Parents</option>
                                        <option>Class 10-A Parents</option>
                                        <option>Individual Parent</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Message subject"
                                        style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Message</label>
                                    <textarea
                                        rows="6"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Type your message here..."
                                        style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', resize: 'vertical' }}
                                    ></textarea>
                                </div>
                                <button type="button" className="btn-primary" onClick={() => { alert('Message sent!'); setMessageText(''); }}>
                                    <Send size={16} /> Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'announcements' && (
                <div>
                    <button className="btn-primary" style={{ marginBottom: '20px' }}>
                        <Users size={16} /> New Announcement
                    </button>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">School Announcements</h2>
                        </div>
                        <div className="card-body">
                            <div style={{ display: 'grid', gap: '16px' }}>
                                {announcements.map((ann) => (
                                    <div
                                        key={ann.id}
                                        style={{
                                            padding: '16px',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            borderLeft: `4px solid ${ann.priority === 'high' ? '#ef4444' : ann.priority === 'medium' ? '#f59e0b' : '#3b82f6'}`
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <h4 style={{ fontWeight: '600', fontSize: '16px' }}>{ann.title}</h4>
                                            <span style={{ fontSize: '12px', color: '#6b7280' }}>{ann.date}</span>
                                        </div>
                                        <p style={{ color: '#4b5563', fontSize: '14px' }}>{ann.content}</p>
                                        <div style={{ marginTop: '8px' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: '500',
                                                textTransform: 'uppercase',
                                                backgroundColor: ann.priority === 'high' ? '#fee2e2' : ann.priority === 'medium' ? '#fef3c7' : '#dbeafe',
                                                color: ann.priority === 'high' ? '#991b1b' : ann.priority === 'medium' ? '#92400e' : '#1e40af'
                                            }}>
                                                {ann.priority} Priority
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'notifications' && (
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Notification History</h2>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {[
                                { text: 'Parent replied to your message about Sara\'s progress', time: '2 hours ago', type: 'message' },
                                { text: 'Homework submission deadline approaching for Math 10-A', time: '5 hours ago', type: 'homework' },
                                { text: 'New announcement from Principal Office', time: '1 day ago', type: 'announcement' },
                                { text: 'Exam results published for Physics 11-B', time: '2 days ago', type: 'exam' }
                            ].map((notif, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '12px',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'start',
                                        gap: '12px'
                                    }}
                                >
                                    <Bell size={16} color="#6b7280" style={{ marginTop: '2px' }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '14px', color: '#1f2937', marginBottom: '4px' }}>{notif.text}</p>
                                        <p style={{ fontSize: '12px', color: '#9ca3af' }}>{notif.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCommunicationView;
