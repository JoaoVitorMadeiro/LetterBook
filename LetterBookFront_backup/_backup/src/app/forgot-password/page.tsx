'use client';
import ForgotPassword from '@/pages/ForgotPassword';
import AuthGuard from '@/components/AuthGuard';

export default function ForgotPasswordPage() {
  return (
    <AuthGuard>
      <ForgotPassword />
    </AuthGuard>
  );
}
