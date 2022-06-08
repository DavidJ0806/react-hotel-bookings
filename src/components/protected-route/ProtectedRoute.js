import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * @name PrivateRoute
 * @description redirects the user to the home page if they're not logged in.
 * Otherwise, component that is passed is rendered
 * @return A route component
 */
const PrivateRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  return (isLoggedIn !== null) ? children : <Navigate to="/" />;
};

export default PrivateRoute;
