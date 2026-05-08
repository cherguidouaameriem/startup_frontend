import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexDirection: 'column', gap: '1rem',
        fontFamily: 'var(--font-body)', color: 'var(--text-muted)'
      }}>
        <div className="spinner" />
        <span style={{ fontSize: '0.9rem' }}>Chargement...</span>
      </div>
    );
  }

  return children;
}
