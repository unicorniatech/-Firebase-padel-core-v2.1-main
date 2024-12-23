import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Star, DollarSign } from 'lucide-react';
import type { Club } from '@/lib/data/community';

interface ClubCardProps {
  club: Club;
  onBook: (club: Club) => void;
  onJoin: (club: Club) => void;
}

export function ClubCard({ club, onBook, onJoin }: ClubCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
              <p className="text-muted-foreground">{club.location}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{club.rating}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                {club.courts} canchas
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {club.members} miembros
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                ${club.prices.hourly}/hora
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onBook(club)}
              >
                Reservar
              </Button>
              <Button 
                className="flex-1"
                onClick={() => onJoin(club)}
              >
                Unirse
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}