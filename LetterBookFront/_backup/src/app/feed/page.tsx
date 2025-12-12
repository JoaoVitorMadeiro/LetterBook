'use client';
import Feed from '@/pages/Feed';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function FeedPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <Feed />
      </MainLayout>
    </AuthGuard>
  );
}
