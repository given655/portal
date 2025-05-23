import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import React from 'react';

interface PrivateRouteProps {
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("isAuthenticated",isAuthenticated)

  if (isLoading) {
    return <div>Loading security verification...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
