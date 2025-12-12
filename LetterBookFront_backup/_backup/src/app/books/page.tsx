'use client';
import Books from '@/pages/Books';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function BooksPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <Books />
      </MainLayout>
    </AuthGuard>
  );
}
