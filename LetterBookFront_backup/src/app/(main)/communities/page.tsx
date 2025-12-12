import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Search, Plus } from 'lucide-react';
import Link from 'next/link';

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

const mockCommunities: Community[] = [
  { id: '1', name: 'Amantes de Ficção Científica', description: 'Um grupo para discutir tudo sobre sci-fi, de clássicos a lançamentos.', memberCount: 1254 },
  { id: '2', 'name': 'Clube do Livro de Fantasia', description: 'Dragões, magia e aventuras épicas. Se você ama fantasia, este é o seu lugar.', memberCount: 879 },
  { id: '3', name: 'Leitores de Não-Ficção', description: 'Expandindo horizontes com biografias, história e ciência.', memberCount: 632 },
  { id: '4', name: 'Terror e Suspense', description: 'Para quem gosta de sentir um arrepio na espinha.', memberCount: 451 },
];

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
             <Input placeholder="Buscar comunidades..." className="pl-10 w-full sm:w-64" />
           </div>
           <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
             <Plus className="h-5 w-5" />
             <span className="hidden sm:inline ml-2">Criar</span>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCommunities.map(community => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}
