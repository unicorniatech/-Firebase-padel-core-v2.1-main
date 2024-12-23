import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: {
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    budget: string;
  };
  onCampaignChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

export function CampaignDialog({
  open,
  onOpenChange,
  campaign,
  onCampaignChange,
  onSubmit,
}: CampaignDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Campaña</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Título de la Campaña</Label>
            <Input
              value={campaign.title}
              onChange={(e) => onCampaignChange('title', e.target.value)}
              placeholder="Ej: Campaña de Verano 2024"
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <select
              className="w-full p-2 border rounded-md"
              value={campaign.type}
              onChange={(e) => onCampaignChange('type', e.target.value)}
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
                value={campaign.startDate}
                onChange={(e) => onCampaignChange('startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha de Fin</Label>
              <Input
                type="date"
                value={campaign.endDate}
                onChange={(e) => onCampaignChange('endDate', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Presupuesto (MXN)</Label>
            <Input
              type="number"
              value={campaign.budget}
              onChange={(e) => onCampaignChange('budget', e.target.value)}
              placeholder="5000"
            />
          </div>
          <Button onClick={onSubmit} className="w-full">
            Crear Campaña
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}