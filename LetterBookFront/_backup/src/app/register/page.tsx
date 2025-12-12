'use client';
import Register from '@/pages/Register';
import AuthGuard from '@/components/AuthGuard';

export default function RegisterPage() {
  return (
    <AuthGuard>
      <Register />
    </AuthGuard>
  );
}
