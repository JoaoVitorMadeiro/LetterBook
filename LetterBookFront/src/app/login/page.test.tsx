import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import LoginPage from './page';

// Mock dependencies
const mockLogin = vi.fn();
const mockPush = vi.fn();
const mockToast = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
  }),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock UI components that might cause issues in jsdom if complex
// Note: We are using shallow rendering concepts by mocking modules if needed, 
// but strictly speaking standard rendering is fine for UI components usually.

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByText('Login to LetterBook')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getByRole('button', { name: /login/i })).toBeDefined();
  });

  it('validates invalid email', async () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address.')).toBeDefined();
    });
  });

  it('calls login on valid submission', async () => {
    mockLogin.mockResolvedValueOnce({}); // Successful login

    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});
