import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Grid,
  ChartTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from '@/components/ui/charts';

interface DetailedStatsProps {
  category: string;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

export function DetailedStats({ category }: DetailedStatsProps) {
  const renderContent = () => {
    switch (category) {
      case 'ranking':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Evolución del Ranking</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Ene', ranking: 50 },
                      { month: 'Feb', ranking: 48 },
                      { month: 'Mar', ranking: 45 },
                      { month: 'Abr', ranking: 42 },
                    ]}
                  >
                    <Grid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis reversed />
                    <ChartTooltip />
                    <Line
                      type="monotone"
                      dataKey="ranking"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        );

      case 'points':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Distribución de Puntos</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Torneos', value: 750 },
                        { name: 'Partidos', value: 500 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {[0, 1].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        );

      case 'matches':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Partidos por Mes</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: 'Ene', matches: 8 },
                      { month: 'Feb', matches: 6 },
                      { month: 'Mar', matches: 10 },
                      { month: 'Abr', matches: 4 },
                    ]}
                  >
                    <Grid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar 
                      dataKey="matches" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        );

      case 'victories':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Ratio de Victoria</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Ene', ratio: 65 },
                      { month: 'Feb', ratio: 70 },
                      { month: 'Mar', ratio: 75 },
                      { month: 'Abr', ratio: 72 },
                    ]}
                  >
                    <Grid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip />
                    <Line
                      type="monotone"
                      dataKey="ratio"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
}