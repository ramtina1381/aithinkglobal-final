import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ContextProvider.jsx';

export default function RoleRedirect() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '1rem' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  // Redirect based on role
  if (role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (role === 'user') {
    return <Navigate to="/user" replace />;
  }

  // Default fallback
  return <Navigate to="/" replace />;
}
