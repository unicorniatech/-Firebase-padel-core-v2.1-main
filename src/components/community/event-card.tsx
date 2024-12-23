import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import type { Event } from '@/lib/data/community';

interface EventCardProps {
  event: Event;
  onAction: (event: Event) => void;
  onViewDetails: (event: Event) => void;
}

export function EventCard({ event, onAction, onViewDetails }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <Badge>{event.category}</Badge>
              <Badge variant="outline">{event.status}</Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.participants.registered}/{event.participants.total} participantes
              </span>
              {event.price && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  ${event.price} MXN
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => onViewDetails(event)}>
              Ver Detalles
            </Button>
            <Button 
              onClick={() => onAction(event)}
              disabled={event.status === 'Completo'}
            >
              {event.category === 'Torneo' ? 'Inscribirse' : 
               event.category === 'Clínica' ? 'Registrarse' : 'Unirse'}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}