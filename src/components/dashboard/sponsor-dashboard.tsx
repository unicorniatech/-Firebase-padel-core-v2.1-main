import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  Image as ImageIcon,
  Play,
  PlusCircle,
  Calendar,
  DollarSign,
  Eye,
  Target,
  Trash2,
  TrendingUp,
  Bell,
  Gavel,
  Timer,
  Users,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useNotifications } from '@/lib/notifications';

// Analytics Data
const impressionsData = [
  { date: '01/04', value: 1200 },
  { date: '02/04', value: 1800 },
  { date: '03/04', value: 1600 },
  { date: '04/04', value: 2200 },
  { date: '05/04', value: 2400 },
  { date: '06/04', value: 2100 },
  { date: '07/04', value: 2800 },
];

const clicksData = [
  { category: 'Feed Ads', value: 450 },
  { category: 'Live Stream', value: 300 },
  { category: 'Banner Ads', value: 200 },
  { category: 'Tournament Ads', value: 350 },
];

const COLORS = ['#00A859', '#0066CC', '#FFB800', '#FF4444'];

interface Campaign {
  id: string;
  title: string;
  type: 'banner' | 'video' | 'post';
  status: 'active' | 'scheduled' | 'ended';
  startDate: string;
  endDate: string;
  budget: number;
  impressions: number;
  clicks: number;
}

interface AdSpot {
  id: string;
  spot: string;
  currentBid: number;
  bidder: string;
  timeLeft: string;
  bids: number;
  trending: 'up' | 'down';
  minIncrement: number;
}

const initialCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Torneo de Verano',
    type: 'banner',
    status: 'active',
    startDate: '2024-04-15',
    endDate: '2024-05-15',
    budget: 5000,
    impressions: 12500,
    clicks: 450,
  },
  {
    id: '2',
    title: 'Promoción Equipamiento',
    type: 'video',
    status: 'scheduled',
    startDate: '2024-05-01',
    endDate: '2024-05-30',
    budget: 8000,
    impressions: 0,
    clicks: 0,
  },
];

const initialAdSpots: AdSpot[] = [
  {
    id: '1',
    spot: 'Tournament Live Stream',
    currentBid: 2500,
    bidder: 'Sports Co.',
    timeLeft: '2h 15m',
    bids: 8,
    trending: 'up',
    minIncrement: 100,
  },
  {
    id: '2',
    spot: 'Homepage Banner',
    currentBid: 1800,
    bidder: 'Equipment Pro',
    timeLeft: '45m',
    bids: 12,
    trending: 'down',
    minIncrement: 50,
  },
  {
    id: '3',
    spot: 'Social Feed Integration',
    currentBid: 1200,
    bidder: 'Active Wear',
    timeLeft: '4h 30m',
    bids: 5,
    trending: 'up',
    minIncrement: 50,
  },
];

export function SponsorDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<AdSpot | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidConfirmation, setShowBidConfirmation] = useState(false);
  const [activeBids, setActiveBids] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [adSpots] = useState<AdSpot[]>(initialAdSpots);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    type: 'banner',
    startDate: '',
    endDate: '',
    budget: '',
  });

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast({
      title: 'Campaña Eliminada',
      description: 'La campaña ha sido eliminada exitosamente.',
    });
  };

  const handleCreateCampaign = () => {
    const campaign: Campaign = {
      id: Math.random().toString(),
      title: newCampaign.title,
      type: newCampaign.type as 'banner' | 'video' | 'post',
      status: 'scheduled',
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      budget: Number(newCampaign.budget),
      impressions: 0,
      clicks: 0,
    };

    setCampaigns([...campaigns, campaign]);
    setShowNewCampaign(false);
    setNewCampaign({
      title: '',
      type: 'banner',
      startDate: '',
      endDate: '',
      budget: '',
    });

    toast({
      title: 'Campaña Creada',
      description: 'La campaña ha sido creada exitosamente.',
    });
  };

  const handlePlaceBid = (spot: AdSpot) => {
    setSelectedSpot(spot);
    setShowBidDialog(true);
  };

  const validateBid = (amount: number) => {
    if (!selectedSpot) return 'Error al seleccionar espacio';
    if (amount <= selectedSpot.currentBid) {
      return 'La oferta debe ser mayor que la oferta actual';
    }
    if (amount < selectedSpot.currentBid + selectedSpot.minIncrement) {
      return `El incremento mínimo es de $${selectedSpot.minIncrement}`;
    }
    return null;
  };

  const submitBid = () => {
    const amount = Number(bidAmount);
    const error = validateBid(amount);
    
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      return;
    }

    setShowBidConfirmation(true);
  };

  const confirmBid = () => {
    if (!selectedSpot) return;
    
    setActiveBids([...activeBids, selectedSpot.id]);
    
    toast({
      title: 'Oferta Realizada',
      description: `Has ofertado $${bidAmount} por ${selectedSpot.spot}`,
    });

    addNotification({
      title: 'Oferta Confirmada',
      message: `Tu oferta de $${bidAmount} por ${selectedSpot.spot} ha sido registrada`,
      type: 'success',
    });

    setShowBidDialog(false);
    setShowBidConfirmation(false);
    setBidAmount('');
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Panel de Patrocinador</h1>
          <p className="text-muted-foreground">{user?.companyName}</p>
        </div>
        <Button onClick={() => setShowNewCampaign(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nueva Campaña
        </Button>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="spots">Espacios Publicitarios</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{campaign.title}</h3>
                        <Badge variant={campaign.status === 'active' ? 'success' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {campaign.startDate} - {campaign.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {campaign.budget} MXN
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.impressions}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.clicks}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCampaign(campaign.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="spots" className="space-y-4">
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
                  <Button onClick={() => handlePlaceBid(spot)}>
                    Ofertar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
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
                      onClick={() => setSelectedTimeframe(timeframe)}
                    >
                      {timeframe === 'week' ? 'Semana' : timeframe === 'month' ? 'Mes' : 'Año'}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impressionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
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
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">Rendimiento por Tipo</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={clicksData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showNewCampaign} onOpenChange={setShowNewCampaign}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Campaña</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título de la Campaña</Label>
              <Input
                value={newCampaign.title}
                onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                placeholder="Ej: Campaña de Verano 2024"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={newCampaign.type}
                onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}
              >
                <option value="banner">Banner</option>
                <option value="video">Video</option>
                <option value="post">Post</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha de Inicio</Label>
                <Input
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Fin</Label>
                <Input
                  type="date"
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Presupuesto (MXN)</Label>
              <Input
                type="number"
                value={newCampaign.budget}
                onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                placeholder="5000"
              />
            </div>
            <Button onClick={handleCreateCampaign} className="w-full">
              Crear Campaña
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Realizar Oferta</DialogTitle>
            <DialogDescription>
              Ingresa tu oferta para {selectedSpot?.spot}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Oferta Actual</Label>
              <p className="text-sm text-muted-foreground">
                ${selectedSpot?.currentBid} MXN
              </p>
            </div>
            <div className="space-y-2">
              <Label>Incremento Mínimo</Label>
              <p className="text-sm text-muted-foreground">
                ${selectedSpot?.minIncrement} MXN
              </p>
            </div>
            <div className="space-y-2">
              <Label>Tu Oferta (MXN)</Label>
              <Input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Mínimo ${selectedSpot?.currentBid + (selectedSpot?.minIncrement || 0)}`}
              />
            </div>
            <Button onClick={submitBid} className="w-full">
              Revisar Oferta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBidConfirmation} onOpenChange={setShowBidConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Oferta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Espacio:</span>
                  <span className="font-medium">{selectedSpot?.spot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Oferta Actual:</span>
                  <span className="font-medium">${selectedSpot?.currentBid} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span>Tu Oferta:</span>
                  <span className="font-medium">${bidAmount} MXN</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBidConfirmation(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmBid}>
                Confirmar Oferta
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}