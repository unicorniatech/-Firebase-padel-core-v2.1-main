import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PlayerMatchesProps {
  matches: Array<{
    id: number;
    tournament: string;
    result: string;
    opponent: string;
    date: string;
    status: string;
  }>;
}

export function PlayerMatches({ matches }: PlayerMatchesProps) {
  return (
    <Card className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Torneo</TableHead>
            <TableHead>Oponente</TableHead>
            <TableHead>Resultado</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id}>
              <TableCell>{match.date}</TableCell>
              <TableCell>{match.tournament}</TableCell>
              <TableCell>{match.opponent}</TableCell>
              <TableCell>{match.result}</TableCell>
              <TableCell>
                <Badge variant={match.status === 'victoria' ? 'success' : 'destructive'}>
                  {match.status === 'victoria' ? 'Victoria' : 'Derrota'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}