'use client';
import Communities from '@/pages/Communities';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function CommunitiesPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <Communities />
      </MainLayout>
    </AuthGuard>
  );
}
