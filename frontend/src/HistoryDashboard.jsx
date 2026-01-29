import React from 'react';

const HistoryDashboard = ({ history, loading, onDelete }) => {
  // Guard clauses to handle loading or empty states
  if (loading) return <p style={{ color: "#ffffff" }}>Updating history...</p>;
  if (!history || history.length === 0) return <p style={{ color: "#ffffff" }}>No match history found yet.</p>;

  return (
    <div style={{ marginTop: '50px', textAlign: 'left' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', color: "#ffffff" }}>
        Recent Analyses
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', color: "#ffffff" }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#ffffff' }}>
              <th style={{ padding: '12px', border: '1px solid #444' }}>Date</th>
              <th style={{ padding: '12px', border: '1px solid #444' }}>Resume File</th>
              <th style={{ padding: '12px', border: '1px solid #444' }}>Match Score</th>
              <th style={{ padding: '12px', border: '1px solid #444' }}>Action</th>
            </tr>
          </thead>
          {/* This is the tbody section where the data rows are generated */}
          <tbody>
            {history.map((record) => (
              <tr key={record.id} style={{ textAlign: 'center', backgroundColor: '#222' }}>
                <td style={{ padding: '12px', border: '1px solid #444', color: "#ffffff" }}>
                  {new Date(record.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px', border: '1px solid #444', color: "#ffffff" }}>
                  {record.fileName}
                </td>
                <td style={{ padding: '12px', border: '1px solid #444' }}>
                   <span style={{ 
                     fontWeight: 'bold', 
                     color: record.matchPercentage > 70 ? '#4ade80' : '#fb923c' 
                   }}>
                     {record.matchPercentage}%
                   </span>
                </td>
                <td style={{ padding: '12px', border: '1px solid #444' }}>
                  <button 
                    onClick={() => onDelete(record.id)} 
                    style={{ 
                      backgroundColor: '#ff4d4d', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      padding: '8px 12px',
                      fontWeight: 'bold'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryDashboard;