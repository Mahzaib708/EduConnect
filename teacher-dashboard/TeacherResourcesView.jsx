import React from 'react';
import { FileText, Upload, Download, Folder } from 'lucide-react';
import { teachingResources } from './mockData';
import './TeacherDashboardOverview.css';

const TeacherResourcesView = () => {
    return (
        <div className="teacher-dashboard-overview">
            <div className="overview-header">
                <div>
                    <h1 className="page-title">Teaching Resources</h1>
                    <p className="page-subtitle">Upload and manage your teaching materials</p>
                </div>
                <button className="btn-primary">
                    <Upload size={16} /> Upload Resource
                </button>
            </div>

            {/* Upload Section */}
            <div className="dashboard-card" style={{ marginBottom: '24px' }}>
                <div className="card-body">
                    <div style={{
                        border: '2px dashed #e5e7eb',
                        borderRadius: '8px',
                        padding: '48px 24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}>
                        <Upload size={48} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Upload Teaching Materials</h3>
                        <p style={{ color: '#6b7280', marginBottom: '16px' }}>Click to browse or drag and drop files here</p>
                        <p style={{ fontSize: '12px', color: '#9ca3af' }}>Supported formats: PDF, PPT, DOC, XLS (Max 25MB)</p>
                    </div>
                </div>
            </div>

            {/* Resources List */}
            <div className="dashboard-card">
                <div className="card-header">
                    <h2 className="card-title">My Resources</h2>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-secondary" style={{ fontSize: '14px' }}>
                            <Folder size={14} /> Create Folder
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gap: '12px' }}>
                        {teachingResources.map((resource) => (
                            <div
                                key={resource.id}
                                style={{
                                    padding: '16px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '8px',
                                    backgroundColor: resource.type === 'presentation' ? '#dbeafe' : resource.type === 'document' ? '#fef3c7' : '#d1fae5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FileText size={24} color={resource.type === 'presentation' ? '#3b82f6' : resource.type === 'document' ? '#f59e0b' : '#10b981'} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                                        {resource.title}
                                    </h4>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6b7280' }}>
                                        <span>{resource.class}</span>
                                        <span>•</span>
                                        <span>{resource.size}</span>
                                        <span>•</span>
                                        <span>{resource.downloads} downloads</span>
                                        <span>•</span>
                                        <span>Uploaded {resource.uploadDate}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn-secondary" style={{ fontSize: '13px', padding: '6px 12px' }}>
                                        <Download size={14} /> Download
                                    </button>
                                    <button className="btn-secondary" style={{ fontSize: '13px', padding: '6px 12px' }}>
                                        Share
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State for folders */}
                    <div style={{ marginTop: '32px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Folders</h3>
                        <div style={{
                            padding: '32px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <Folder size={48} color="#9ca3af" style={{ margin: '0 auto 12px' }} />
                            <p style={{ color: '#6b7280' }}>No folders created yet. Organize your resources into folders.</p>
                            <button className="btn-primary" style={{ marginTop: '16px' }}>
                                <Folder size={16} /> Create Your First Folder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherResourcesView;
