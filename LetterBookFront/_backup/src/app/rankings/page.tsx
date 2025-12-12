'use client';
import Rankings from '@/pages/Rankings';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function RankingsPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <Rankings />
      </MainLayout>
    </AuthGuard>
  );
}
