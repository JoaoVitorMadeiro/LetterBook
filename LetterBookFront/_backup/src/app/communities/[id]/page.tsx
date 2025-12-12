'use client';
import CommunityDetail from '@/components/CommunityDetail';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function CommunityDetailPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <CommunityDetail />
      </MainLayout>
    </AuthGuard>
  );
}
