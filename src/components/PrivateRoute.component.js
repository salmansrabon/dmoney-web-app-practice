import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Example logic to check if the user is authenticated (replace this with your authentication logic)
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Change this logic based on your authentication implementation
  };

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
