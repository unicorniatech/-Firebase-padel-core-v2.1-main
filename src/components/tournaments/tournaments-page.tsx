import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  MapPin,
  Users,
  Flag,
  DollarSign,
  ChevronRight,
  Clock,
  Swords,
  Timer,
  CheckCircle2,
  ArrowLeft,
  Wind,
  User,
  Activity,
  Search,
  Filter,
} from 'lucide-react';

interface Tournament {
  id: number;
  title: string;
  date: string;
  location: string;
  prize: string;
  participants: {
    registered: number;
    total: number;
  };
  categories: string[];
  status: string;
  image: string;
  description?: string;
}

interface Match {
  id: string;
  homeTeam: {
    players: Array<{ name: string; number: number }>;
  };
  awayTeam: {
    players: Array<{ name: string; number: number }>;
  };
  date: string;
  time: string;
  tournament: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  score?: {
    home: number;
    away: number;
  };
  image: string;
  venue?: string;
  referee?: string;
  weather?: {
    condition: string;
    temperature: string;
    wind: string;
  };
  statistics?: {
    homeTeam: {
      aces: number;
      winners: number;
      errors: number;
    };
    awayTeam: {
      aces: number;
      winners: number;
      errors: number;
    };
  };
  events?: Array<{
    time: string;
    description: string;
    type: 'point' | 'break' | 'timeout' | 'other';
  }>;
}

const tournaments: Tournament[] = [
  {
    id: 1,
    title: 'Torneo Nacional Amateur',
    date: '15-20 Abril, 2024',
    location: 'Club de Padel Cuernavaca',
    prize: '$50,000 MXN',
    participants: {
      registered: 24,
      total: 32,
    },
    categories: ['Open', 'Amateur', 'Mixto'],
    status: 'Inscripciones Abiertas',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
    description: 'El torneo más importante del circuito amateur nacional.',
  },
  {
    id: 2,
    title: 'Copa Morelos 2024',
    date: '1-5 Mayo, 2024',
    location: 'Padel Center Morelos',
    prize: '$75,000 MXN',
    participants: {
      registered: 16,
      total: 24,
    },
    categories: ['Profesional', 'Amateur'],
    status: 'Próximamente',
    image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd5c?w=800&q=80',
    description: 'Torneo regional con las mejores parejas del estado.',
  },
];

const matches: Match[] = [
  {
    id: '1',
    homeTeam: {
      players: [
        { name: 'Carlos Ramírez', number: 1 },
        { name: 'Ana González', number: 2 },
      ],
    },
    awayTeam: {
      players: [
        { name: 'Miguel Torres', number: 3 },
        { name: 'Laura Hernández', number: 4 },
      ],
    },
    date: '15/04/2024',
    time: '10:00',
    tournament: 'Torneo Nacional Amateur',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
    venue: 'Cancha Central - Club de Padel Cuernavaca',
    referee: 'José Martínez',
    weather: {
      condition: 'Soleado',
      temperature: '24°C',
      wind: '5 km/h',
    },
  },
  {
    id: '2',
    homeTeam: {
      players: [
        { name: 'David López', number: 5 },
        { name: 'María Sánchez', number: 6 },
      ],
    },
    awayTeam: {
      players: [
        { name: 'Juan Pérez', number: 7 },
        { name: 'Sofia García', number: 8 },
      ],
    },
    date: '14/04/2024',
    time: '16:30',
    tournament: 'Liga Local',
    status: 'in_progress',
    score: { home: 4, away: 3 },
    image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd5c?w=800&q=80',
    venue: 'Cancha 2 - Padel Center Morelos',
    referee: 'Roberto Sánchez',
    weather: {
      condition: 'Parcialmente nublado',
      temperature: '22°C',
      wind: '8 km/h',
    },
    statistics: {
      homeTeam: {
        aces: 3,
        winners: 15,
        errors: 8,
      },
      awayTeam: {
        aces: 2,
        winners: 12,
        errors: 10,
      },
    },
    events: [
      { time: '16:45', description: 'Punto ganador - David López', type: 'point' },
      { time: '17:00', description: 'Tiempo muerto - Equipo visitante', type: 'timeout' },
      { time: '17:15', description: 'Break point convertido', type: 'break' },
    ],
  },
];

function MatchCard({ match, onClick }: { match: Match; onClick: () => void }) {
  const getStatusBadge = () => {
    switch (match.status) {
      case 'upcoming':
        return <Badge className="bg-blue-500"><Timer className="h-3 w-3 mr-1" />Próximo</Badge>;
      case 'in_progress':
        return <Badge className="bg-green-500"><Swords className="h-3 w-3 mr-1" />En Progreso</Badge>;
      case 'completed':
        return <Badge className="bg-primary"><CheckCircle2 className="h-3 w-3 mr-1" />Completado</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="w-full cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={match.image}
            alt={`${match.tournament}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-white">
              <h3 className="text-lg font-semibold">{match.tournament}</h3>
              {getStatusBadge()}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Home Team */}
            <div className="space-y-2">
              {match.homeTeam.players.map((player) => (
                <div key={player.number} className="text-sm">
                  <span className="font-semibold">#{player.number}</span> {player.name}
                </div>
              ))}
            </div>

            {/* Score/Time */}
            <div className="text-center">
              {match.status === 'completed' || match.status === 'in_progress' ? (
                <div className="text-2xl font-bold">
                  {match.score?.home} - {match.score?.away}
                </div>
              ) : (
                <div className="text-lg">{match.time}</div>
              )}
              <div className="text-sm text-muted-foreground">{match.date}</div>
            </div>

            {/* Away Team */}
            <div className="space-y-2">
              {match.awayTeam.players.map((player) => (
                <div key={player.number} className="text-sm text-right">
                  {player.name} <span className="font-semibold">#{player.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function MatchDetails({ match, onBack }: { match: Match; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Button>

      <Card className="overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={match.image}
            alt={match.tournament}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-2">{match.tournament}</h1>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                {match.venue}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Score and Teams */}
          <div className="grid grid-cols-3 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Equipo Local</h3>
              {match.homeTeam.players.map((player) => (
                <div key={player.number} className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>
                    <span className="font-semibold">#{player.number}</span> {player.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {match.score ? (
                  `${match.score.home} - ${match.score.away}`
                ) : (
                  match.time
                )}
              </div>
              <div className="text-sm text-muted-foreground">{match.date}</div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-right">Equipo Visitante</h3>
              {match.awayTeam.players.map((player) => (
                <div key={player.number} className="flex items-center justify-end gap-2">
                  <span>
                    {player.name} <span className="font-semibold">#{player.number}</span>
                  </span>
                  <User className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>

          {/* Match Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Flag className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Árbitro</h3>
              </div>
              <p>{match.referee}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Wind className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Condiciones</h3>
              </div>
              <div className="space-y-2">
                <p>{match.weather?.condition}</p>
                <p>{match.weather?.temperature}</p>
                <p>Viento: {match.weather?.wind}</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Estadísticas</h3>
              </div>
              {match.statistics && (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-right">{match.statistics.homeTeam.aces}</div>
                    <div className="text-center font-medium">Aces</div>
                    <div>{match.statistics.awayTeam.aces}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-right">{match.statistics.homeTeam.winners}</div>
                    <div className="text-center font-medium">Winners</div>
                    <div>{match.statistics.awayTeam.winners}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-right">{match.statistics.homeTeam.errors}</div>
                    <div className="text-center font-medium">Errores</div>
                    <div>{match.statistics.awayTeam.errors}</div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Match Events */}
          {match.events && match.events.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Eventos del Partido</h3>
              <div className="space-y-2">
                {match.events.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50"
                  >
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{event.time}</span>
                    <span>{event.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export function TournamentsPage() {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMatches = matches
    .filter((match) => !selectedTournament || match.tournament === selectedTournament.title)
    .filter((match) => statusFilter === 'all' || match.status === statusFilter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (selectedMatch) {
    return <MatchDetails match={selectedMatch} onBack={() => setSelectedMatch(null)} />;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {selectedTournament ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" onClick={() => setSelectedTournament(null)} className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a Torneos
                </Button>
                <h1 className="text-3xl font-bold">{selectedTournament.title}</h1>
                <p className="text-muted-foreground">{selectedTournament.description}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="upcoming">Próximos</SelectItem>
                    <SelectItem value="in_progress">En Progreso</SelectItem>
                    <SelectItem value="completed">Completados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                placeholder="Buscar partidos..."
                className="max-w-xs"
                icon={Search}
              />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <AnimatePresence>
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onClick={() => setSelectedMatch(match)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">Torneos</h1>
                <p className="text-muted-foreground">
                  Explora los torneos activos y próximos
                </p>
              </div>
              <Input
                placeholder="Buscar torneos..."
                className="max-w-xs"
                icon={Search}
              />
            </div>

            <div className="grid gap-8">
              {tournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedTournament(tournament)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="relative h-full min-h-[200px] md:col-span-1">
                        <img
                          src={tournament.image}
                          alt={tournament.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-primary text-white">
                            {tournament.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6 md:col-span-2 space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{tournament.title}</h2>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {tournament.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {tournament.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {tournament.prize}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {tournament.categories.map((category) => (
                            <Badge key={category} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-primary" />
                              <span className="font-medium">
                                {tournament.participants.registered}/{tournament.participants.total} Inscritos
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{
                                  width: `${(tournament.participants.registered / tournament.participants.total) * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          <Button>
                            Ver Partidos
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}