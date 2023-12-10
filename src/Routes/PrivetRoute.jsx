import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthProvider';

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    return children; 
  } 

  return (
    <Navigate to="/auth/signin" state={{ from: location }} replace></Navigate>
  );
};

export default PrivetRoute;
