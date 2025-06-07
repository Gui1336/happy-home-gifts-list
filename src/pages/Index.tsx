import { useState } from 'react';
import { AddGiftForm } from '@/components/AddGiftForm';
import { EditGiftForm } from '@/components/EditGiftForm';
import { GiftList } from '@/components/GiftList';
import { useGifts } from '@/hooks/useGifts';
import { Button } from '@/components/ui/button';
import { Home, Gift, Users, Plus, RefreshCw, Heart, Sparkles } from 'lucide-react';
import { DecorativeLeaves } from '@/components/DecorativeLeaves';
import { Gift as GiftType } from '@/hooks/useGifts';

const Index = () => {
  const { gifts, loading, submitting, addGift, toggleGiftAvailability, deleteGift, updateGift, refetch } = useGifts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGift, setEditingGift] = useState<GiftType | null>(null);

  const availableCount = gifts.filter(gift => gift.is_available).length;
  const purchasedCount = gifts.filter(gift => !gift.is_available).length;

  const handleAddGift = async (giftData: any) => {
    await addGift(giftData);
    setShowAddForm(false);
  };

  const handleEditGift = (gift: GiftType) => {
    setShowAddForm(false);
    setEditingGift(gift);
  };

  const handleUpdateGift = async (id: string, giftData: any) => {
    try {
      await updateGift(id, giftData);
      setEditingGift(null);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleCancelEdit = () => {
    setEditingGift(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-sage-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-sage-600" />
              <h1 className="text-3xl font-bold text-neutral-800">
                Lista de Presentes
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-sage-600" />
                <span className="text-neutral-600">
                  {gifts.length} presentes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-sage-600" />
                <span className="text-neutral-600">
                  {availableCount} disponíveis
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-sage-600" />
                <span className="text-neutral-600">
                  {purchasedCount} comprados
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  setEditingGift(null);
                  setShowAddForm(!showAddForm);
                }}
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

        {/* Edit Gift Form */}
        {editingGift && (
          <div className="mb-12 animate-fade-in">
            <EditGiftForm
              gift={editingGift}
              onUpdateGift={handleUpdateGift}
              onCancel={handleCancelEdit}
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
            onEditGift={handleEditGift}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-sage-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sage-600" />
              <p className="text-neutral-600">
                Feito com carinho para o nosso chá de casa nova
              </p>
            </div>
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Lista de Presentes. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
