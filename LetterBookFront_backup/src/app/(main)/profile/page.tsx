'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BookCard from '@/components/book-card';
import { mockBooks } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/4 flex flex-col items-center gap-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
          <div className="w-full md:w-3/4">
            <Skeleton className="h-8 w-1/3 mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="aspect-[2/3] w-full" />
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userBooks = mockBooks.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <aside className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold font-headline">{user?.name}</h2>
              <p className="text-muted-foreground">@{user?.username}</p>

              <Separator className="my-6" />
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <p className="text-2xl font-bold">{userBooks.length}</p>
                  <p className="text-sm text-muted-foreground">Books Read</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
              <Button onClick={logout} className="w-full mt-6">
                Logout
              </Button>
            </CardContent>
          </Card>
        </aside>

        <section className="w-full md:w-3/4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Recently Read</CardTitle>
            </CardHeader>
            <CardContent>
              {userBooks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {userBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No books read yet.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
