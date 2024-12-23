import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface PlayerAchievementsProps {
  achievements: string[];
}

export function PlayerAchievements({ achievements }: PlayerAchievementsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-primary" />
            <span>{achievement}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}