import React from 'react';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin panel. You have full access to manage the website.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Content Management</h3>
          <p>Manage homepage content, services, and company information.</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>User Management</h3>
          <p>View and manage user accounts and permissions.</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Job Postings</h3>
          <p>Create, edit, and manage career opportunities.</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Contact Messages</h3>
          <p>View and respond to contact form submissions.</p>
        </div>
      </div>
    </div>
  );
}
