"use client";

import React, { ReactNode } from "react";
import { LocalstorageKeys, UserRole } from "../enums/enum";

interface WithRoleProps {
  roles: UserRole | UserRole[];
  children: ReactNode;
}

/**
 * Generates a higher-order component (HOC) that wraps the provided component and adds role-based authorization logic.
 *
 * @param {React.ComponentType<P>} WrappedComponent - The component to be wrapped.
 * @template P - The props type of the wrapped component.
 * @returns {React.FC<WithRoleProps & P>} A higher-order component that wraps the provided component and adds role-based authorization logic.
 */
const withRole = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<WithRoleProps & P> => {
  const WithRole: React.FC<WithRoleProps & P> = ({
    roles,
    children,
    ...props
  }) => {

    const userRole = localStorage.getItem(LocalstorageKeys.ROLE)
    

    
    if (!userRole || !roles) {
      return null;
    }

    const roleCopy: UserRole[] = Array.isArray(roles) ? [...roles] : [roles];

    // Render the wrapped component if the roles check passes, otherwise render null
    return roleCopy.includes(userRole as unknown as UserRole) ? (
      <WrappedComponent {...(props as P)}>{children}</WrappedComponent>
    ) : null;
  };

  return WithRole;
};

export const Can = withRole(({ children }: WithRoleProps) => <>{children}</>);

export default withRole;
