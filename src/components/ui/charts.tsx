import {
  LineChart as RechartsLineChart,
  Line,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

const defaultAxisProps = {
  tick: { fill: 'currentColor' },
  axisLine: { stroke: 'currentColor' },
};

const defaultGridProps = {
  stroke: 'currentColor',
  opacity: 0.1,
};

const defaultTooltipProps = {
  contentStyle: {
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 'var(--radius)',
  },
  labelStyle: { color: 'hsl(var(--foreground))' },
};

export function XAxis(props: any) {
  return <RechartsXAxis {...defaultAxisProps} {...props} />;
}

export function YAxis(props: any) {
  return <RechartsYAxis {...defaultAxisProps} {...props} />;
}

export function Grid(props: any) {
  return <CartesianGrid {...defaultGridProps} {...props} />;
}

export function ChartTooltip(props: any) {
  return <Tooltip {...defaultTooltipProps} {...props} />;
}

export function LineChart(props: any) {
  return <RechartsLineChart {...props} />;
}

export function BarChart(props: any) {
  return <RechartsBarChart {...props} />;
}

export function PieChart(props: any) {
  return <RechartsPieChart {...props} />;
}

export { Line, Bar, Pie, Cell, ResponsiveContainer };