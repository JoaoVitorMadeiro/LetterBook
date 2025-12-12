'use client';
import BookDetail from '@/components/BookDetail';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function BookDetailPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <BookDetail />
      </MainLayout>
    </AuthGuard>
  );
}
