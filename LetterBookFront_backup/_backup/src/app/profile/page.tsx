'use client';
import Profile from '@/pages/Profile';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <MainLayout>
        <Profile />
      </MainLayout>
    </AuthGuard>
  );
}
