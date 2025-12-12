import axios from 'axios';
import type { User } from '@/lib/types';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lb_token');
  // Don't send token for auth endpoints to avoid 403 if token is invalid/expired
  if (token && !config.url?.includes('/auth/login') && !config.url?.includes('/auth/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  const { data } = await api.post('/auth/login', { email, senha: password });
  
  // Assuming the login response returns the token. 
  // If it doesn't return the full user, we might need to fetch it separately.
  // Based on typical JWT flows, we get a token.
  const token = data.token || data.accessToken; 
  
  // Set token immediately for subsequent requests
  localStorage.setItem('lb_token', token);
  
  // Fetch user profile
  const userProfileResponse = await api.get('/usuarios/me/profile');
  const profile = userProfileResponse.data;

  // Map backend profile to User type
  const user: User = {
    id: profile.id,
    name: profile.nome || profile.name,
    username: profile.username || email.split('@')[0], // Fallback if no username
    email: profile.email,
    avatarUrl: profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.nome || 'User')}`
  };

  return { token, user };
};

export const registerUser = async (name: string, username: string, email: string, password: string): Promise<User> => {
    await api.post('/auth/register', { nome: name, email, senha: password });
    
    // Auto login after register or just return the user data mock?
    // The previous code returned a User. 
    // We'll perform a login to get the token and user data.
    const { user } = await loginUser(email, password);
    return user;
}
