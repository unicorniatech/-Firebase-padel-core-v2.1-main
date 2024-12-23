import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Grid,
  ChartTooltip,
  ResponsiveContainer,
} from '@/components/ui/charts';

interface PlayerStatsProps {
  stats: {
    wins: number;
    losses: number;
    tournaments: number;
    titles: number;
  };
}

export function PlayerStats({ stats }: PlayerStatsProps) {
  const data = [
    { name: 'Victorias', value: stats.wins },
    { name: 'Derrotas', value: stats.losses },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Rendimiento</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Grid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}