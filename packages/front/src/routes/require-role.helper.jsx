import { Navigate } from 'react-router-dom';
import { useUserType } from '@/containers/user/index.js';

export const RequireRole = ({ roles = [], children }) => {
  const userType = useUserType();

  if (!roles.includes(userType)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
