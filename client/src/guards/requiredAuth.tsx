import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface RequiredAuthProps {
  adminOnly?: boolean;
}

export const RequiredAuth: React.FC<RequiredAuthProps> = ({ adminOnly = false }) => {
  const { currentUser } = useAuth();

  const location = useLocation();

  // user is not logged in, redirect to login page
  if (!currentUser) {
    // we use replace so when we go back we go to the page where
    // we made the request to unamortized page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // user is logged in, but is not an admin
  if (adminOnly && !currentUser.isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
    // return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // user is logged in and is an admin going to any page
  // user is logged in and is not an admin going to not admin page

  return <Outlet />;
};
