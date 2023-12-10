import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      console.log('isAuthenticated', isAuthenticated);
      if (!isAuthenticated) navigate('/login');
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}
