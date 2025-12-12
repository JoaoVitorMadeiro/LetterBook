'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Ensure we are on client side
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('lb_token');
    const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];

    if (!token && pathname && !publicPaths.includes(pathname)) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router, pathname]);

  if (!authorized) {
    // You might want to render a loading state here
    return null;
  }

  return <>{children}</>;
}
