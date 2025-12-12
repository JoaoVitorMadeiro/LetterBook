import axios from 'axios';
import type { User } from '@/lib/types';

export const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use((config) => {
  let token = localStorage.getItem('token');
  if (!token && typeof document !== 'undefined') {
     const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
     if (match) {
       token = match[2];
     }
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email: string, password: string): Promise<{ token: string }> => {
  try {
    console.log('[API] Attempting login for:', email);
    // Backend expects 'senha', not 'password'
    const response = await api.post('/auth/login', { email, senha: password });
    console.log('[API] Login response status:', response.status);
    console.log('[API] Login response data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[API] Login Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw new Error(error.response?.data?.message || 'Invalid email or password');
  }
};

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get('/usuarios/me/profile');
    const data = response.data;
    return {
      id: data.id,
      name: data.nome,
      username: data.email.split('@')[0], // Fallback username
      email: data.email,
      avatarUrl: data.fotoUrl || 'https://placehold.co/100x100?text=User', // Fallback avatar
    };
  } catch (error: any) {
    console.error('[API] Fetch Profile Error:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message
    });
    throw new Error('Failed to fetch user profile');
  }
};

export const registerUser = async (name: string, username: string, email: string, password: string): Promise<User> => {
    try {
        const response = await api.post('/auth/register', { name, username, email, password });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
}
