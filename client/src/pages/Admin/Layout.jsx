import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #eee', backgroundColor: '#dc3545', color: 'white' }}>
        <strong>Admin Panel</strong>
        <span style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>You have administrative privileges</span>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
