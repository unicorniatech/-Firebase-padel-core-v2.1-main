import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy, Search, Filter, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PlayerProfile } from './player-profile';
import { dummyPlayers } from '@/lib/data/rankings';
import { Badge } from '@/components/ui/badge';

const categories = ['Open', 'Amateur', 'Veteranos', 'Mixto'];
const locations = ['Nacional', 'CDMX', 'Cuernavaca', 'Monterrey', 'Guadalajara'];

export function RankingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Nacional');
  const [selectedCategory, setSelectedCategory] = useState('Open');

  const handlePlayerClick = (player: any) => {
    setSelectedPlayer(player);
    setShowProfile(true);
  };

  const filteredPlayers = dummyPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'Nacional' || player.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Rankings Nacionales</h1>
            <p className="text-muted-foreground">
              Clasificación actualizada de los mejores jugadores de México
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Buscar jugador..."
              className="w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <Tabs defaultValue="open" onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category.toLowerCase()}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                {locations.map((location) => (
                  <Button
                    key={location}
                    variant={selectedLocation === location ? 'default' : 'ghost'}
                    size="sm"
                    className="text-sm"
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category.toLowerCase()}>
              <Card className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Posición</TableHead>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Club</TableHead>
                      <TableHead className="text-right">Puntos</TableHead>
                      <TableHead className="text-right">Torneos</TableHead>
                      <TableHead className="text-right">Victoria/Derrota</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlayers.map((player) => (
                      <TableRow 
                        key={player.id} 
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() => handlePlayerClick(player)}
                      >
                        <TableCell className="font-medium">
                          {player.rank === 1 && (
                            <Trophy className="h-5 w-5 text-yellow-500 inline mr-2" />
                          )}
                          #{player.rank}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src={player.avatar}
                              alt={player.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {player.location}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{player.club}</TableCell>
                        <TableCell className="text-right font-medium">
                          {player.points}
                        </TableCell>
                        <TableCell className="text-right">
                          {player.stats.tournaments}
                        </TableCell>
                        <TableCell className="text-right">
                          {player.winRate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Perfil del Jugador</DialogTitle>
          </DialogHeader>
          <PlayerProfile player={selectedPlayer} />
        </DialogContent>
      </Dialog>
    </div>
  );
}