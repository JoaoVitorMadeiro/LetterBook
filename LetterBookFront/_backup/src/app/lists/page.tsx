'use client';
import ListsPage from '@/pages/ListsPage';
import MainLayout from '@/layout/MainLayout';
import AuthGuard from '@/components/AuthGuard';

export default function ListsPageWrapper() {
  return (
    <AuthGuard>
      <MainLayout>
        <ListsPage />
      </MainLayout>
    </AuthGuard>
  );
}
