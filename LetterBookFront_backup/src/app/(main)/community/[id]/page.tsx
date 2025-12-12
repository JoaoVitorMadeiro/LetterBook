import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Medal, UserPlus, Users } from 'lucide-react';

const mockCommunity = {
  id: '1',
  name: 'Amantes de Ficção Científica',
  description: 'Um grupo para discutir tudo sobre sci-fi, de clássicos a lançamentos. Organizamos leituras mensais e debates acalorados sobre paradoxos temporais.',
  memberCount: 1254,
  members: [
    { id: '1', name: 'Ana', avatarUrl: 'https://picsum.photos/seed/user-ana/40/40', points: 1580 },
    { id: '2', name: 'Bruno', avatarUrl: 'https://picsum.photos/seed/user-bruno/40/40', points: 1420 },
    { id: '3', name: 'Carla', avatarUrl: 'https://picsum.photos/seed/user-carla/40/40', points: 1350 },
    { id: '4', name: 'Daniel', avatarUrl: 'https://picsum.photos/seed/user-daniel/40/40', points: 1100 },
    { id: '5', name: 'Eduarda', avatarUrl: 'https://picsum.photos/seed/user-eduarda/40/40', points: 980 },
  ]
};

export default function CommunityDetailsPage({ params }: { params: { id: string } }) {
  // Fetch community data by params.id
  const community = mockCommunity;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline">{community.name}</h1>
        <div className="flex items-center text-muted-foreground mt-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{community.memberCount.toLocaleString()} membros</span>
          </div>
          <Button variant="default">
            <UserPlus className="mr-2 h-4 w-4" />
            Entrar na Comunidade
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Descrição</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{community.description}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Membros</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {community.members.map(member => (
                        <div key={member.id} className="flex flex-col items-center text-center gap-2">
                             <Avatar className="h-16 w-16">
                                <AvatarImage src={member.avatarUrl} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <p className="text-sm font-medium">{member.name}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Medal className="text-primary" />
                        Ranking da Comunidade
                    </CardTitle>
                     <CardDescription>
                       Top 5 membros mais ativos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                       {community.members.map((member, index) => (
                           <li key={member.id} className="flex items-center gap-4">
                               <div className="font-bold text-lg w-6 text-center">{index + 1}</div>
                               <Avatar>
                                   <AvatarImage src={member.avatarUrl} />
                                   <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                               </Avatar>
                               <div>
                                   <p className="font-semibold">{member.name}</p>
                                   <p className="text-sm text-muted-foreground">{member.points.toLocaleString()} pontos</p>
                               </div>
                           </li>
                       ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
