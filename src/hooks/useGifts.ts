import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Gift {
  id: string;
  name: string;
  description: string;
  image_url: string;
  purchase_url: string;
  price: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const useGifts = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Carregar presentes do Supabase
  const fetchGifts = async () => {
    try {
      setLoading(true);
      console.log('Iniciando busca de presentes...');
      
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro na busca de presentes:', error);
        throw error;
      }

      console.log('Presentes encontrados:', data?.length || 0);
      setGifts(data || []);
    } catch (error) {
      console.error('Erro ao carregar presentes:', error);
      toast({
        title: "Erro ao carregar presentes",
        description: "Não foi possível carregar a lista de presentes. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const addGift = async (giftData: Omit<Gift, 'id' | 'created_at' | 'updated_at' | 'is_available'>) => {
    try {
      setSubmitting(true);
      
      const { data, error } = await supabase
        .from('gifts')
        .insert([{
          name: giftData.name,
          description: giftData.description,
          image_url: giftData.image_url,
          purchase_url: giftData.purchase_url,
          price: giftData.price,
        }])
        .select()
        .single();

      if (error) throw error;

      setGifts(prev => [data, ...prev]);
      
      toast({
        title: "Presente adicionado!",
        description: `${giftData.name} foi adicionado à lista com sucesso.`,
      });

      return data;
    } catch (error) {
      console.error('Erro ao adicionar presente:', error);
      toast({
        title: "Erro ao adicionar presente",
        description: "Não foi possível adicionar o presente. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const toggleGiftAvailability = async (id: string) => {
    try {
      const gift = gifts.find(g => g.id === id);
      if (!gift) return;

      const { data, error } = await supabase
        .from('gifts')
        .update({ is_available: !gift.is_available })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setGifts(prev =>
        prev.map(g => g.id === id ? data : g)
      );

      toast({
        title: data.is_available ? "Presente marcado como disponível" : "Presente marcado como comprado",
        description: `${gift.name} foi ${data.is_available ? 'disponibilizado' : 'marcado como comprado'}.`,
      });
    } catch (error) {
      console.error('Erro ao atualizar presente:', error);
      toast({
        title: "Erro ao atualizar presente",
        description: "Não foi possível atualizar o status do presente. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const deleteGift = async (id: string) => {
    try {
      setSubmitting(true);
      const gift = gifts.find(g => g.id === id);
      if (!gift) {
        console.error('Presente não encontrado no estado local');
        return;
      }

      console.log('Iniciando exclusão do presente:', id);

      // Tenta excluir o presente
      const { error: deleteError } = await supabase
        .from('gifts')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Erro ao excluir presente:', deleteError);
        throw deleteError;
      }

      console.log('Presente excluído com sucesso');

      // Atualiza o estado local
      setGifts(prev => prev.filter(g => g.id !== id));

      // Recarrega a lista para garantir sincronização
      console.log('Recarregando lista de presentes...');
      await fetchGifts();
      
      console.log('Lista recarregada com sucesso');
      
      toast({
        title: "Presente removido",
        description: `${gift.name} foi removido da lista.`,
      });
    } catch (error) {
      console.error('Erro ao remover presente:', error);
      toast({
        title: "Erro ao remover presente",
        description: "Não foi possível remover o presente. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updateGift = async (id: string, giftData: Partial<Omit<Gift, 'id' | 'created_at' | 'updated_at' | 'is_available'>>) => {
    try {
      setSubmitting(true);
      const gift = gifts.find(g => g.id === id);
      if (!gift) return;

      const { data, error } = await supabase
        .from('gifts')
        .update({
          ...giftData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setGifts(prev =>
        prev.map(g => g.id === id ? { ...g, ...data } : g)
      );
      
      toast({
        title: "Presente atualizado!",
        description: `${gift.name} foi atualizado com sucesso.`,
      });

      return data;
    } catch (error) {
      console.error('Erro ao atualizar presente:', error);
      toast({
        title: "Erro ao atualizar presente",
        description: "Não foi possível atualizar o presente. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    gifts,
    loading,
    submitting,
    addGift,
    toggleGiftAvailability,
    deleteGift,
    updateGift,
    refetch: fetchGifts,
  };
};
