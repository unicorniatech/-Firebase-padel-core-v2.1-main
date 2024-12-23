import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BidDialogProps, BidConfirmationDialogProps } from './types';

export function BidDialog({
  open,
  onOpenChange,
  spot,
  onSubmit,
  bidAmount,
  onBidAmountChange,
}: BidDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Realizar Oferta</DialogTitle>
          <DialogDescription>
            Ingresa tu oferta para {spot?.spot}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Oferta Actual</Label>
            <p className="text-sm text-muted-foreground">
              ${spot?.currentBid} MXN
            </p>
          </div>
          <div className="space-y-2">
            <Label>Incremento Mínimo</Label>
            <p className="text-sm text-muted-foreground">
              ${spot?.minIncrement} MXN
            </p>
          </div>
          <div className="space-y-2">
            <Label>Tu Oferta (MXN)</Label>
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => onBidAmountChange(e.target.value)}
              placeholder={`Mínimo ${spot?.currentBid + (spot?.minIncrement || 0)}`}
            />
          </div>
          <Button onClick={() => onSubmit(bidAmount)} className="w-full">
            Revisar Oferta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function BidConfirmationDialog({
  open,
  onOpenChange,
  spot,
  bidAmount,
  onConfirm,
}: BidConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Oferta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Espacio:</span>
                <span className="font-medium">{spot?.spot}</span>
              </div>
              <div className="flex justify-between">
                <span>Oferta Actual:</span>
                <span className="font-medium">${spot?.currentBid} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Tu Oferta:</span>
                <span className="font-medium">${bidAmount} MXN</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={onConfirm}>
              Confirmar Oferta
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}