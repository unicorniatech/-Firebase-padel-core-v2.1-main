import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/lib/notifications';
import { CampaignList } from './campaign-list';
import { AdSpotList } from './ad-spot-list';
import { AnalyticsCharts } from './analytics-charts';
import { CampaignDialog } from './campaign-dialog';
import { BidDialog, BidConfirmationDialog } from './bid-dialogs';
import type { Campaign, AdSpot } from './types';

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
    if (!newCampaign.title || !newCampaign.startDate || !newCampaign.endDate || !newCampaign.budget) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos',
        variant: 'destructive',
      });
      return;
    }

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
    if (activeBids.includes(spot.id)) {
      toast({
        title: 'Ya tienes una oferta activa',
        description: 'Espera a que termine la subasta actual',
        variant: 'destructive',
      });
      return;
    }

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

  const handleBidSubmit = () => {
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

    setShowBidDialog(false);
    setShowBidConfirmation(true);
  };

  const handleBidConfirm = () => {
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

    setShowBidConfirmation(false);
    setBidAmount('');
    setSelectedSpot(null);
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

        <TabsContent value="campaigns">
          <CampaignList campaigns={campaigns} onDelete={handleDeleteCampaign} />
        </TabsContent>

        <TabsContent value="spots">
          <AdSpotList adSpots={adSpots} onPlaceBid={handlePlaceBid} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsCharts
            impressionsData={impressionsData}
            clicksData={clicksData}
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
          />
        </TabsContent>
      </Tabs>

      <CampaignDialog
        open={showNewCampaign}
        onOpenChange={setShowNewCampaign}
        campaign={newCampaign}
        onCampaignChange={(field, value) => setNewCampaign({ ...newCampaign, [field]: value })}
        onSubmit={handleCreateCampaign}
      />

      <BidDialog
        open={showBidDialog}
        onOpenChange={setShowBidDialog}
        spot={selectedSpot}
        onSubmit={handleBidSubmit}
        bidAmount={bidAmount}
        onBidAmountChange={(value) => setBidAmount(value)}
      />

      <BidConfirmationDialog
        open={showBidConfirmation}
        onOpenChange={setShowBidConfirmation}
        spot={selectedSpot}
        bidAmount={bidAmount}
        onConfirm={handleBidConfirm}
      />
    </div>
  );
}