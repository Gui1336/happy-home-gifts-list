import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Check, Package, Trash2 } from 'lucide-react';
import { Gift } from '@/hooks/useGifts';

interface GiftCardProps {
  gift: Gift;
  onToggleAvailability: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const GiftCard = ({ gift, onToggleAvailability, onDelete }: GiftCardProps) => {
  const handlePurchaseClick = () => {
    window.open(gift.purchase_url, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:card-shadow-hover animate-fade-in ${
      gift.is_available 
        ? 'border-sage-200 bg-white hover:border-sage-300' 
        : 'border-neutral-300 bg-neutral-50 opacity-75'
    }`}>
      <div className="relative">
        <img
          src={gift.image_url}
          alt={gift.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant={gift.is_available ? "default" : "secondary"}
            className={`${
              gift.is_available
                ? 'bg-sage-600 hover:bg-sage-700 text-white'
                : 'bg-neutral-600 text-white'
            } font-medium`}
          >
            {gift.is_available ? (
              <>
                <Package className="h-3 w-3 mr-1" />
                Disponível
              </>
            ) : (
              <>
                <Check className="h-3 w-3 mr-1" />
                Comprado
              </>
            )}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-neutral-800 leading-tight">
              {gift.name}
            </h3>
            {gift.price && (
              <p className="text-sage-600 font-medium text-lg mt-1">
                {gift.price}
              </p>
            )}
            <p className="text-neutral-500 text-xs mt-1">
              Adicionado em {formatDate(gift.created_at)}
            </p>
          </div>
          
          {gift.description && (
            <p className="text-neutral-600 text-sm leading-relaxed">
              {gift.description}
            </p>
          )}
          
          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={handlePurchaseClick}
              disabled={!gift.is_available}
              className={`w-full ${
                gift.is_available
                  ? 'bg-sage-600 hover:bg-sage-700 text-white'
                  : 'bg-neutral-400 text-neutral-600 cursor-not-allowed'
              } font-medium transition-colors duration-200`}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {gift.is_available ? 'Comprar' : 'Indisponível'}
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={() => onToggleAvailability(gift.id)}
                variant="default"
                className="flex-1 text-xs"
              >
                {gift.is_available ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Marcar Comprado
                  </>
                ) : (
                  <>
                    <Package className="h-3 w-3 mr-1" />
                    Marcar Disponível
                  </>
                )}
              </Button>

              {onDelete && (
                <Button
                  onClick={() => onDelete(gift.id)}
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
