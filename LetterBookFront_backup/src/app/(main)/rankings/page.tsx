import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Medal } from 'lucide-react';

const rankings = [
  { rank: 1, user: { name: 'Ana Beatriz', avatarUrl: 'https://picsum.photos/seed/user-ana/40/40' }, points: 15800, booksRead: 125 },
  { rank: 2, user: { name: 'Bruno Costa', avatarUrl: 'https://picsum.photos/seed/user-bruno/40/40' }, points: 14250, booksRead: 110 },
  { rank: 3, user: { name: 'Carla Dias', avatarUrl: 'https://picsum.photos/seed/user-carla/40/40' }, points: 13500, booksRead: 108 },
  { rank: 4, user: { name: 'Daniel Alves', avatarUrl: 'https://picsum.photos/seed/user-daniel/40/40' }, points: 11000, booksRead: 95 },
  { rank: 5, user: { name: 'Eduarda Lima', avatarUrl: 'https://picsum.photos/seed/user-eduarda/40/40' }, points: 9800, booksRead: 88 },
  { rank: 6, user: { name: 'Felipe Souza', avatarUrl: 'https://picsum.photos/seed/user-felipe/40/40' }, points: 9500, booksRead: 85 },
  { rank: 7, user: { name: 'Gabriela Mota', avatarUrl: 'https://picsum.photos/seed/user-gabriela/40/40' }, points: 9200, booksRead: 82 },
];

export default function RankingsPage() {

    const getMedal = (rank: number) => {
        if(rank === 1) return <Medal className="w-6 h-6 text-yellow-400" />
        if(rank === 2) return <Medal className="w-6 h-6 text-slate-400" />
        if(rank === 3) return <Medal className="w-6 h-6 text-orange-400" />
        return <span className="text-muted-foreground font-bold w-6 text-center">{rank}</span>;
    }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Rankings</h1>
        <p className="text-muted-foreground">Veja os maiores leitores da plataforma.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead className="text-right">Livros Lidos</TableHead>
                <TableHead className="text-right">Pontos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map(item => (
                <TableRow key={item.rank}>
                  <TableCell className="font-medium">
                      <div className="flex items-center justify-center h-full">
                        {getMedal(item.rank)}
                      </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={item.user.avatarUrl} />
                        <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{item.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.booksRead}</TableCell>
                  <TableCell className="text-right font-bold text-primary">{item.points.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
