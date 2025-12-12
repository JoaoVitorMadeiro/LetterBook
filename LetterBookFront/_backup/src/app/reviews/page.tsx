'use client';
import Reviews from '@/pages/Reviews';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function ReviewsPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <Reviews />
      </MainLayout>
    </AuthGuard>
  );
}
