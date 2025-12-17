'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

function CommunityCard({ community }: { community: Community }) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold font-headline">{community.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 h-10 overflow-hidden">{community.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Users className="w-4 h-4" />
            <span>{community.memberCount.toLocaleString()} membros</span>
          </div>
          <Button size="sm" asChild>
            <Link href={`/community/${community.id}`}>Entrar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchCommunities() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearchTerm) params.append('nome', debouncedSearchTerm);
        
        const response = await api.get(`/comunidades?${params.toString()}`);
        const data = response.data.content || [];
        
        const mappedCommunities: Community[] = data.map((item: any) => ({
          id: item.id,
          name: item.nome,
          description: item.descricao,
          memberCount: item.totalMembros || 0,
        }));

        setCommunities(mappedCommunities);
        setError(null);
      } catch (err) {
        console.error('Error fetching communities:', err);
        setError('Falha ao carregar comunidades.');
      } finally {
        setLoading(false);
      }
    }

    fetchCommunities();
  }, [debouncedSearchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Comunidades</h1>
          <p className="text-muted-foreground">Encontre seu grupo de leitores.</p>
        </div>
        <div className="flex gap-2">
           <div className="relative flex-grow">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input 
                placeholder="Buscar comunidades..." 
                className="pl-10 w-full sm:w-64" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
             <Plus className="h-5 w-5" />
             <span className="hidden sm:inline ml-2">Criar</span>
           </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Carregando comunidades...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">Falha ao carregar comunidades.</div>
      ) : communities.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">Nenhuma comunidade encontrada.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
}
