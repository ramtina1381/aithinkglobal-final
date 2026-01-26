import React from 'react';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div style={{ backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #eee', backgroundColor: '#1976d2', color: 'white' }}>
        <strong>User Portal</strong>
        <span style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>Welcome to your personal dashboard</span>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
