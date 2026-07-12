import React from 'react';

const MaintenanceTable = ({ requests, isLoading, error }) => {
    if (isLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading maintenance requests...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error: {error}</div>;
    if (!requests || requests.length === 0) return <div style={{ padding: '20px', textAlign: 'center' }}>No maintenance requests found.</div>;

    // Helper function for priority badge colors
    const getPriorityStyle = (priority) => {
        const styles = {
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '0.85em'
        };
        
        switch(priority) {
            case 'Critical':
                return { ...styles, backgroundColor: '#ffebee', color: '#c62828' };
            case 'High':
                return { ...styles, backgroundColor: '#fff3e0', color: '#ef6c00' };
            case 'Medium':
                return { ...styles, backgroundColor: '#e3f2fd', color: '#1565c0' };
            case 'Low':
                return { ...styles, backgroundColor: '#e8f5e9', color: '#2e7d32' };
            default:
                return { ...styles, backgroundColor: '#f5f5f5', color: '#424242' };
        }
    };

    return (
        <div className="table-container" style={{ overflowX: 'auto', marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'white' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '12px 15px', color: '#495057' }}>ID</th>
                        <th style={{ padding: '12px 15px', color: '#495057' }}>Asset ID</th>
                        <th style={{ padding: '12px 15px', color: '#495057' }}>Requested By</th>
                        <th style={{ padding: '12px 15px', color: '#495057' }}>Issue Description</th>
                        <th style={{ padding: '12px 15px', color: '#495057' }}>Priority</th>
                        <th style={{ padding: '12px 15px', color: '#495057' }}>Status</th>
                        <th style={{ padding: '12px 15px', color: '#495057' }}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req.request_id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px 15px' }}>#{req.request_id}</td>
                            <td style={{ padding: '12px 15px' }}>{req.asset_id}</td>
                            <td style={{ padding: '12px 15px' }}>{req.requested_by}</td>
                            <td style={{ padding: '12px 15px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {req.issue_description}
                            </td>
                            <td style={{ padding: '12px 15px' }}>
                                <span style={getPriorityStyle(req.priority_level)}>
                                    {req.priority_level}
                                </span>
                            </td>
                            <td style={{ padding: '12px 15px' }}>
                                <span style={{ 
                                    padding: '4px 8px', 
                                    borderRadius: '12px', 
                                    backgroundColor: req.status === 'Resolved' ? '#e8f5e9' : '#f5f5f5',
                                    border: '1px solid #ddd',
                                    fontSize: '0.85em'
                                }}>
                                    {req.status}
                                </span>
                            </td>
                            <td style={{ padding: '12px 15px' }}>{new Date(req.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaintenanceTable;
