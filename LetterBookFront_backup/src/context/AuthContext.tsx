'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api, loginUser, registerUser } from '@/services/api';
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
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // In a real app, you'd verify the token with the backend
        // and fetch user data. Here we'll mock it.
        // A better approach would be to have a /api/me endpoint
        try {
            // For now, let's just re-set a mock user if a token exists.
             setUser({
                id: '1',
                name: 'Demo User',
                username: 'demouser',
                email: 'demo@example.com',
                avatarUrl: 'https://picsum.photos/seed/user1/100/100'
            });
        } catch (error) {
            // Token might be invalid
            localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: loggedInUser } = await loginUser(email, password);
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(loggedInUser);
  };
  
  const register = async (name: string, username: string, email: string, password: string) => {
    await registerUser(name, username, email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
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
