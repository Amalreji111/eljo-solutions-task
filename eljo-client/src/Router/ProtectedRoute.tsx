import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from '../enums/enum';

interface ProtectedRouteProps {
  children: ReactNode;
  IsAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, IsAuthenticated }) => {
  console.log(IsAuthenticated)
  if (!IsAuthenticated) {
    return <Navigate to={Path.LOGIN} replace/>;
  }

  return <>{children}</>;
};
