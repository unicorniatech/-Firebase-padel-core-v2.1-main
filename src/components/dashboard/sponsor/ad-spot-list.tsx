import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Timer, Gavel, ArrowUp, ArrowDown } from 'lucide-react';
import type { AdSpot } from './types';

interface AdSpotListProps {
  adSpots: AdSpot[];
  onPlaceBid: (spot: AdSpot) => void;
}

export function AdSpotList({ adSpots, onPlaceBid }: AdSpotListProps) {
  return (
    <div className="grid gap-4">
      {adSpots.map((spot) => (
        <Card key={spot.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{spot.spot}</h3>
                <Badge variant={spot.trending === 'up' ? 'success' : 'destructive'}>
                  {spot.trending === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {spot.currentBid} MXN
                </span>
                <span className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  {spot.timeLeft}
                </span>
                <span className="flex items-center gap-1">
                  <Gavel className="h-4 w-4" />
                  {spot.bids} ofertas
                </span>
              </div>
            </div>
            <Button onClick={() => onPlaceBid(spot)}>
              Ofertar
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}