import { useState } from 'react';
import { AddGiftForm } from '@/components/AddGiftForm';
import { GiftList } from '@/components/GiftList';
import { useGifts } from '@/hooks/useGifts';
import { Button } from '@/components/ui/button';
import { Home, Gift, Users, Plus, RefreshCw, Heart, Sparkles } from 'lucide-react';
import { DecorativeLeaves } from '@/components/DecorativeLeaves';

const Index = () => {
  const { gifts, loading, submitting, addGift, toggleGiftAvailability, deleteGift, refetch } = useGifts();
  const [showAddForm, setShowAddForm] = useState(false);

  const availableCount = gifts.filter(gift => gift.is_available).length;
  const purchasedCount = gifts.filter(gift => !gift.is_available).length;

  const handleAddGift = async (giftData: any) => {
    await addGift(giftData);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <DecorativeLeaves />
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Home className="h-10 w-10 text-sage-600" />
              <h1 className="text-5xl font-bold text-neutral-800">
                Chá de Casa Nova
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-sage-600" />
              <h2 className="text-2xl font-medium text-sage-700">
                Geovana e Guilherme
              </h2>
              <Sparkles className="h-5 w-5 text-sage-600" />
            </div>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Ajude-nos a montar nosso novo lar com muito amor e carinho! 💚
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-sage-100">
                <Gift className="h-5 w-5 text-sage-600" />
                <span className="text-sage-700 font-medium">
                  {availableCount} disponíveis
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-sage-100">
                <Users className="h-5 w-5 text-sage-600" />
                <span className="text-sage-700 font-medium">
                  {purchasedCount} comprados
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                variant="default"
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                {showAddForm ? 'Fechar Formulário' : 'Adicionar Presente'}
              </Button>
              
              <Button
                onClick={refetch}
                variant="outline"
                size="lg"
                className="border-sage-200 hover:bg-sage-50"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative">
        <DecorativeLeaves />
        {/* Add Gift Form */}
        {showAddForm && (
          <div className="mb-12 animate-fade-in">
            <AddGiftForm
              onAddGift={handleAddGift}
              submitting={submitting}
            />
          </div>
        )}

        {/* Gift List */}
        <div className="animate-fade-in">
          <GiftList
            gifts={gifts}
            loading={loading}
            onToggleAvailability={toggleGiftAvailability}
            onDeleteGift={deleteGift}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-sage-100 relative">
        <DecorativeLeaves />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-sage-600" />
            <span className="text-neutral-600 font-medium">
              Obrigado por fazer parte deste momento especial!
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            Com amor, Geovana e Guilherme 💚
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
