'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api, loginUser, registerUser, fetchCurrentUser } from '@/services/api';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromToken = async () => {
      let token = localStorage.getItem('token');
      
      // Sync from cookie if localStorage is empty but cookie exists
      if (!token) {
        const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
        if (match) {
          token = match[2];
          localStorage.setItem('token', token);
        }
      }

      console.log('[AuthProvider] Loading user from token. Token exists:', !!token);
      if (token) {
        try {
            const userProfile = await fetchCurrentUser();
            console.log('[AuthProvider] User loaded successfully:', userProfile);
            setUser(userProfile);
        } catch (error) {
            console.error("[AuthProvider] Failed to load user", error);
            localStorage.removeItem('token');
            document.cookie = 'auth_token=; path=/; max-age=0'; // Clear cookie
        }
      } else {
         console.log('[AuthProvider] No token found');
      }
      setIsLoading(false);
    };
    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('token', token);
      // Set cookie for Middleware (7 days expiration)
      document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      
      const userProfile = await fetchCurrentUser();
      setUser(userProfile);
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await registerUser(name, username, email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    document.cookie = 'auth_token=; path=/; max-age=0'; // Clear cookie
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
