import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

const COLORS = ['#00A859', '#0066CC', '#FFB800', '#FF4444'];

interface AnalyticsChartsProps {
  impressionsData: Array<{ date: string; value: number }>;
  clicksData: Array<{ category: string; value: number }>;
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export function AnalyticsCharts({
  impressionsData,
  clicksData,
  selectedTimeframe,
  onTimeframeChange,
}: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Impresiones</h3>
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                size="sm"
                onClick={() => onTimeframeChange(timeframe)}
              >
                {timeframe === 'week' ? 'Semana' : timeframe === 'month' ? 'Mes' : 'Año'}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={impressionsData}>
              <Grid strokeDasharray="3 3" />
              <XAxis dataKey="date" padding={{ left: 0, right: 0 }} />
              <YAxis padding={{ top: 20, bottom: 20 }} />
              <ChartTooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Distribución de Clics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clicksData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {clicksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Rendimiento por Tipo</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clicksData}>
                <Grid strokeDasharray="3 3" />
                <XAxis dataKey="category" padding={{ left: 0, right: 0 }} />
                <YAxis padding={{ top: 20, bottom: 20 }} />
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
      </div>
    </div>
  );
}