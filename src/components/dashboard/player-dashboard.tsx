import { useState } from 'react';
import { StatsDashboard } from '../stats/stats-dashboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MatchDetails } from '../stats/match-details';
import { DetailedStats } from '../stats/detailed-stats';

export function PlayerDashboard() {
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const handleStatClick = (category: string) => {
    setSelectedCategory(category);
    setShowDetailedStats(true);
  };

  const handleMatchClick = (match: any) => {
    setSelectedMatch(match);
    setShowMatchDetails(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Jugador</h1>
      <StatsDashboard 
        onStatClick={handleStatClick}
        onMatchClick={handleMatchClick}
      />

      <Dialog open={showMatchDetails} onOpenChange={setShowMatchDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalles del Partido</DialogTitle>
          </DialogHeader>
          <MatchDetails match={selectedMatch} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailedStats} onOpenChange={setShowDetailedStats}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Análisis Detallado - {selectedCategory}</DialogTitle>
          </DialogHeader>
          <DetailedStats category={selectedCategory} />
        </DialogContent>
      </Dialog>
    </div>
  );
}