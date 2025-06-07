import { GiftCard } from './GiftCard';
import { Gift } from '@/hooks/useGifts';
import { Package, Heart, Loader2 } from 'lucide-react';

interface GiftListProps {
  gifts: Gift[];
  loading?: boolean;
  onToggleAvailability: (id: string) => void;
  onDeleteGift?: (id: string) => void;
  onEditGift?: (gift: Gift) => void;
}

export const GiftList = ({ gifts, loading = false, onToggleAvailability, onDeleteGift, onEditGift }: GiftListProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-16 w-16 mx-auto text-sage-600 mb-4 animate-spin" />
        <h3 className="text-xl font-semibold text-neutral-600 mb-2">
          Carregando presentes...
        </h3>
        <p className="text-neutral-500">
          Aguarde enquanto buscamos sua lista de presentes.
        </p>
      </div>
    );
  }

  const availableGifts = gifts.filter(gift => gift.is_available);
  const purchasedGifts = gifts.filter(gift => !gift.is_available);

  if (gifts.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 mx-auto text-neutral-400 mb-4" />
        <h3 className="text-xl font-semibold text-neutral-600 mb-2">
          Nenhum presente cadastrado ainda
        </h3>
        <p className="text-neutral-500">
          Adicione alguns presentes à sua lista de chá de casa nova!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Available Gifts */}
      {availableGifts.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-6 w-6 text-sage-600" />
            <h2 className="text-2xl font-bold text-neutral-800">
              Presentes Disponíveis
            </h2>
            <span className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm font-medium">
              {availableGifts.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableGifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                onToggleAvailability={onToggleAvailability}
                onDelete={onDeleteGift}
                onEdit={onEditGift}
              />
            ))}
          </div>
        </div>
      )}

      {/* Purchased Gifts */}
      {purchasedGifts.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="h-6 w-6 text-neutral-500" />
            <h2 className="text-2xl font-bold text-neutral-600">
              Presentes Já Comprados
            </h2>
            <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm font-medium">
              {purchasedGifts.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedGifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                onToggleAvailability={onToggleAvailability}
                onDelete={onDeleteGift}
                onEdit={onEditGift}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
