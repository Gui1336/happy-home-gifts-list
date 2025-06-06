
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, ImageIcon, Loader2 } from 'lucide-react';
import { Gift } from '@/hooks/useGifts';

interface AddGiftFormProps {
  onAddGift: (gift: Omit<Gift, 'id' | 'created_at' | 'updated_at' | 'is_available'>) => Promise<any>;
  submitting?: boolean;
}

export const AddGiftForm = ({ onAddGift, submitting = false }: AddGiftFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    purchase_url: '',
    price: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome do presente é obrigatório';
    }
    
    if (!formData.image_url.trim()) {
      newErrors.image_url = 'URL da imagem é obrigatória';
    } else if (!isValidUrl(formData.image_url)) {
      newErrors.image_url = 'URL da imagem deve ser válida';
    }
    
    if (!formData.purchase_url.trim()) {
      newErrors.purchase_url = 'Link para compra é obrigatório';
    } else if (!isValidUrl(formData.purchase_url)) {
      newErrors.purchase_url = 'Link para compra deve ser válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onAddGift(formData);
      setFormData({
        name: '',
        description: '',
        image_url: '',
        purchase_url: '',
        price: '',
      });
      setErrors({});
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto card-shadow border-sage-200 bg-white">
      <CardHeader className="bg-gradient-to-r from-sage-50 to-sage-100 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-sage-800">
          <PlusCircle className="h-6 w-6" />
          Adicionar Novo Presente
        </CardTitle>
        <CardDescription className="text-sage-600">
          Adicione um presente à sua lista de chá de casa nova
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-700 font-medium">
                Nome do Presente *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Jogo de panelas"
                required
                className={`border-neutral-300 focus:border-sage-500 focus:ring-sage-500 bg-white ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-neutral-700 font-medium">
                Preço (opcional)
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Ex: R$ 150,00"
                className="border-neutral-300 focus:border-sage-500 focus:ring-sage-500 bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-neutral-700 font-medium">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva o presente..."
              rows={3}
              className="border-neutral-300 focus:border-sage-500 focus:ring-sage-500 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url" className="text-neutral-700 font-medium flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              URL da Imagem *
            </Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              required
              className={`border-neutral-300 focus:border-sage-500 focus:ring-sage-500 bg-white ${
                errors.image_url ? 'border-red-500' : ''
              }`}
            />
            {errors.image_url && (
              <p className="text-red-500 text-sm">{errors.image_url}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchase_url" className="text-neutral-700 font-medium">
              Link para Compra *
            </Label>
            <Input
              id="purchase_url"
              type="url"
              value={formData.purchase_url}
              onChange={(e) => handleInputChange('purchase_url', e.target.value)}
              placeholder="https://loja.com/produto"
              required
              className={`border-neutral-300 focus:border-sage-500 focus:ring-sage-500 bg-white ${
                errors.purchase_url ? 'border-red-500' : ''
              }`}
            />
            {errors.purchase_url && (
              <p className="text-red-500 text-sm">{errors.purchase_url}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adicionando...
              </>
            ) : (
              'Adicionar Presente'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
