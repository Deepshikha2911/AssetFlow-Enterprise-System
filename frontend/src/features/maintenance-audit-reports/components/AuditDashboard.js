import React, { useState, useEffect } from 'react';
import MaintenanceTable from './MaintenanceTable';
import { fetchMaintenanceRequests } from '../api/reportApi';

const AuditDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch maintenance requests when component mounts
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMaintenanceRequests();
                setRequests(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.error || err.message || 'Failed to load data');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="audit-dashboard" style={{ padding: '24px', fontFamily: '"Inter", "Segoe UI", sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Maintenance Audit Reports</h2>
                    <span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Manage and track all asset maintenance requests.</span>
                </div>
                
                <button 
                    style={{
                        padding: '10px 20px', 
                        backgroundColor: '#1976d2', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(25, 118, 210, 0.3)',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
                    onClick={() => alert("Create request modal to be implemented")}
                >
                    + New Request
                </button>
            </div>
            
            <MaintenanceTable 
                requests={requests} 
                isLoading={isLoading} 
                error={error} 
            />
        </div>
    );
};

export default AuditDashboard;
