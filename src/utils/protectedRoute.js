import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const loginToken = Cookies.get('login');

  console.log('Login token: ', loginToken);
  if (!loginToken) {
    return <Navigate to="/check-phone" replace />;
  }

  // try {
  //   const decoded = jwtDecode(loginToken);

  //   if (requiredRole && !requiredRole.includes(decoded.role)) {
  //     return <Navigate to="/unauthorized" replace />;
  //   }

  //   return children;
  // } catch (error) {
  //   return <Navigate to="/login" replace />;
  // }
};

export default ProtectedRoute;
