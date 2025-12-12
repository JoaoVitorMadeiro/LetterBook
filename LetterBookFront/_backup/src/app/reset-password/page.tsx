'use client';
import ResetPassword from '@/pages/ResetPassword';
import AuthGuard from '@/components/AuthGuard';

export default function ResetPasswordPage() {
  return (
    <AuthGuard>
      <ResetPassword />
    </AuthGuard>
  );
}
