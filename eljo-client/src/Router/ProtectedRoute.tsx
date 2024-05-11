import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from '.';

interface ProtectedRouteProps {
  children: ReactNode;
  IsAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, IsAuthenticated }) => {

  if (!IsAuthenticated) {
    return <Navigate to={Path.LOGIN} replace/>;
  }

  return <>{children}</>;
};
