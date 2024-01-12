import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const ProtectedRoute = ({ children }) => {
 const user = useSelector((state) => state.userState.user);
 const isAuthenticated = Boolean(user);
 const location = useLocation();


 if (!isAuthenticated) {
   return <Navigate to="/login" state={{ from: location }} replace />;
 }


 return children;
};