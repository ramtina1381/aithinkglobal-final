import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './ContextProvider.jsx';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '1rem' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
