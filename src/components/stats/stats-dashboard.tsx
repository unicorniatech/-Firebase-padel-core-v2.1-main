import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MatchHistory } from './match-history';
import { PerformanceMetrics } from './performance-metrics';
import { HeadToHead } from './head-to-head';
import { ProgressTracking } from './progress-tracking';
import { Trophy, TrendingUp, Users, Activity } from 'lucide-react';

interface StatsDashboardProps {
  onStatClick: (category: string) => void;
  onMatchClick: (match: any) => void;
}

const stats = [
  { label: 'Ranking', value: '#42', icon: Trophy, category: 'ranking' },
  { label: 'Puntos', value: '1250', icon: TrendingUp, category: 'points' },
  { label: 'Partidos', value: '28', icon: Activity, category: 'matches' },
  { label: 'Victorias', value: '18', icon: Users, category: 'victories' },
];

export function StatsDashboard({ onStatClick, onMatchClick }: StatsDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => onStatClick(stat.category)}
            className="cursor-pointer"
          >
            <Card className="p-4 lighting-card hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="headtohead">Head to Head</TabsTrigger>
          <TabsTrigger value="progress">Progreso</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <MatchHistory onMatchClick={onMatchClick} />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceMetrics />
        </TabsContent>

        <TabsContent value="headtohead">
          <HeadToHead />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
}