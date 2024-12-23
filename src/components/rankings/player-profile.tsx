import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, Calendar, TrendingUp } from 'lucide-react';
import { PlayerStats } from './player-stats';
import { PlayerMatches } from './player-matches';
import { PlayerAchievements } from './player-achievements';

interface PlayerProfileProps {
  player: {
    name: string;
    avatar: string;
    location: string;
    club: string;
    rank: number;
    points: number;
    stats: {
      wins: number;
      losses: number;
      tournaments: number;
      titles: number;
    };
    recentMatches: Array<{
      id: number;
      tournament: string;
      result: string;
      opponent: string;
      date: string;
      status: string;
    }>;
    achievements: string[];
  };
}

export function PlayerProfile({ player }: PlayerProfileProps) {
  if (!player) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <img
          src={player.avatar}
          alt={player.name}
          className="w-24 h-24 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <Badge variant="secondary">Rank #{player.rank}</Badge>
          </div>
          <p className="text-muted-foreground">{player.club}</p>
          <p className="text-muted-foreground">{player.location}</p>
        </div>
        <Button>
          <Star className="h-4 w-4 mr-2" />
          Seguir
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Títulos</p>
              <p className="text-2xl font-bold">{player.stats.titles}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Torneos</p>
              <p className="text-2xl font-bold">{player.stats.tournaments}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Puntos</p>
              <p className="text-2xl font-bold">{player.points}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Victoria</p>
              <p className="text-2xl font-bold">
                {Math.round((player.stats.wins / (player.stats.wins + player.stats.losses)) * 100)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="stats">
        <TabsList>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          <TabsTrigger value="matches">Partidos</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <PlayerStats stats={player.stats} />
        </TabsContent>

        <TabsContent value="matches">
          <PlayerMatches matches={player.recentMatches} />
        </TabsContent>

        <TabsContent value="achievements">
          <PlayerAchievements achievements={player.achievements} />
        </TabsContent>
      </Tabs>
    </div>
  );
}