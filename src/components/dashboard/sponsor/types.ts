export interface Campaign {
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

export interface AdSpot {
  id: string;
  spot: string;
  currentBid: number;
  bidder: string;
  timeLeft: string;
  bids: number;
  trending: 'up' | 'down';
  minIncrement: number;
}

export interface BidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spot: AdSpot | null;
  onSubmit: (amount: string) => void;
  bidAmount: string;
  onBidAmountChange: (amount: string) => void;
}

export interface BidConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spot: AdSpot | null;
  bidAmount: string;
  onConfirm: () => void;
}