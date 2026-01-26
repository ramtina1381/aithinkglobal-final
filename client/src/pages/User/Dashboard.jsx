import React from 'react';

export default function UserDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Dashboard</h2>
      <p>Welcome to your personal portal. Here you can access all user features.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
          <h3>Browse Services</h3>
          <p>Explore our AI solutions and consulting services.</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
          <h3>Contact Support</h3>
          <p>Get in touch with our team for assistance.</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
          <h3>Career Opportunities</h3>
          <p>View available positions and apply for jobs.</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
          <h3>My Profile</h3>
          <p>Manage your account settings and preferences.</p>
        </div>
      </div>
    </div>
  );
}
