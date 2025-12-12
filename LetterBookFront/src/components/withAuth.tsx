'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import React from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      console.log(`[withAuth] Checking auth for ${getDisplayName(WrappedComponent)}: isLoading=${isLoading}, isAuthenticated=${isAuthenticated}`);
      if (!isLoading && !isAuthenticated) {
        console.log(`[withAuth] Redirecting to /login from ${getDisplayName(WrappedComponent)}`);
        router.replace('/login');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
      // You can render a loading spinner or a blank page while checking auth
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return ComponentWithAuth;
};

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;