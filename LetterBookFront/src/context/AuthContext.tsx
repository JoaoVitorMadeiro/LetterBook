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
      const token = localStorage.getItem('lb_token');
      if (token) {
        // Interceptor already handles the header, but strictly ensuring it here is fine too
        // api.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
        
        try {
            const { data: profile } = await api.get('/usuarios/me/profile');
            
            setUser({
                id: profile.id,
                name: profile.nome || profile.name,
                username: profile.username || profile.email.split('@')[0],
                email: profile.email,
                avatarUrl: profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.nome || 'User')}`
            });
        } catch (error) {
            console.error("Failed to load user profile", error);
            localStorage.removeItem('lb_token');
        }
      }
      setIsLoading(false);
    };
    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: loggedInUser } = await loginUser(email, password);
    localStorage.setItem('lb_token', token);
    setUser(loggedInUser);
    router.push('/feed'); // Redirect to feed after login
  };
  
  const register = async (name: string, username: string, email: string, password: string) => {
    await registerUser(name, username, email, password);
    // login is handled inside registerUser or immediately after
    // If registerUser returns the user but doesn't set state, we might need to handle it.
    // However, our api.ts registerUser implementation calls loginUser, so token is set.
    // We just need to update state.
    // Actually, let's just reload or let the user login manually? 
    // The previous implementation of registerUser in api.ts returns a User.
    // Let's assume auto-login.
    
    // Re-fetch or set user.
    // Since we called loginUser inside registerUser (in api.ts), the token is in localStorage.
    // We can just call the profile endpoint or reuse the returned user.
    const token = localStorage.getItem('lb_token');
    if (token) {
        const { data: profile } = await api.get('/usuarios/me/profile');
         setUser({
            id: profile.id,
            name: profile.nome || profile.name,
            username: profile.username || profile.email.split('@')[0],
            email: profile.email,
            avatarUrl: profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.nome || 'User')}`
        });
        router.push('/feed');
    }
  };

  const logout = () => {
    localStorage.removeItem('lb_token');
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
