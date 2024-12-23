import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { SignInDialog } from '../auth/sign-in-dialog';
import {
  Users,
  Calendar,
  MapPin,
  Search,
  Filter,
  Trophy,
  Clock,
  ChevronRight,
  DollarSign,
  Star,
} from 'lucide-react';
import { useEvents, useClubs } from '@/lib/data/community';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { EventCard } from './event-card';
import { ClubCard } from './club-card';

export function CommunityPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { events, joinEvent, registerForClass, joinLeague } = useEvents();
  const { clubs, bookCourt, joinClub } = useClubs();
  const [showSignIn, setShowSignIn] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEventAction = (event: Event) => {
    if (!user) {
      setShowSignIn(true);
      return;
    }

    let success = false;
    let actionMessage = '';

    switch (event.category) {
      case 'Torneo':
        success = joinEvent(event.id);
        actionMessage = 'Te has inscrito al torneo';
        break;
      case 'Clínica':
        success = registerForClass(event.id);
        actionMessage = 'Te has registrado en la clínica';
        break;
      case 'Liga':
        success = joinLeague(event.id);
        actionMessage = 'Te has unido a la liga';
        break;
    }

    if (success) {
      toast({
        title: 'Registro Exitoso',
        description: `${actionMessage} "${event.title}"`,
      });
    }
  };

  const handleClubAction = (club: Club, action: 'book' | 'join') => {
    if (!user) {
      setShowSignIn(true);
      return;
    }

    let success = false;
    if (action === 'book') {
      success = bookCourt(club.id, new Date().toISOString(), '10:00');
      if (success) {
        toast({
          title: 'Reserva Exitosa',
          description: `Has reservado una cancha en ${club.name}`,
        });
      }
    } else {
      success = joinClub(club.id);
      if (success) {
        toast({
          title: 'Membresía Activada',
          description: `Te has unido a ${club.name}`,
        });
      }
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Comunidad Padel Core</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Únete a eventos, encuentra jugadores de tu nivel y forma parte de la
            comunidad más grande de padel en México.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Buscar eventos, clubes..."
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

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Próximos Eventos</h2>
          <div className="grid gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onAction={handleEventAction}
                onViewDetails={(event) => {
                  setSelectedEvent(event);
                  setShowEventDetails(true);
                }}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold pt-8">Clubes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onBook={(club) => handleClubAction(club, 'book')}
                onJoin={(club) => handleClubAction(club, 'join')}
              />
            ))}
          </div>
        </div>
      </div>

      <SignInDialog open={showSignIn} onOpenChange={setShowSignIn} />

      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha y Hora</label>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent?.date} - {selectedEvent?.time}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ubicación</label>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent?.location}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organizador</label>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent?.organizer}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Precio</label>
                <p className="text-sm text-muted-foreground">
                  ${selectedEvent?.price} MXN
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Participantes</label>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2"
                  style={{
                    width: selectedEvent 
                      ? `${(selectedEvent.participants.registered / selectedEvent.participants.total) * 100}%`
                      : '0%'
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedEvent?.participants.registered}/{selectedEvent?.participants.total} registrados
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDetails(false)}>
              Cerrar
            </Button>
            <Button 
              onClick={() => {
                if (selectedEvent) handleEventAction(selectedEvent);
                setShowEventDetails(false);
              }}
              disabled={selectedEvent?.status === 'Completo'}
            >
              {selectedEvent?.category === 'Torneo' ? 'Inscribirse' : 
               selectedEvent?.category === 'Clínica' ? 'Registrarse' : 'Unirse'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}