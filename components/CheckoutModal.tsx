import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Barcode, MapPin, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { CartItem, CheckoutFormData } from '../types';
import { Button } from './Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  onSuccess: () => void;
}

const STEPS = ['Identificação & Entrega', 'Pagamento', 'Confirmação'];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  total,
  onSuccess 
}) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    cpf: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onSuccess();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((label, index) => (
        <div key={label} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            index <= step ? 'bg-brand-500 border-brand-500 text-white' : 'border-gray-300 text-gray-300'
          }`}>
            {index < step ? <CheckCircle className="w-5 h-5" /> : index + 1}
          </div>
          {index < STEPS.length - 1 && (
            <div className={`w-12 h-1 mx-2 ${index < step ? 'bg-brand-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        
        {/* Order Summary (Sidebar on desktop) */}
        <div className="bg-gray-50 p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold">Resumo</h2>
            <button onClick={onClose} className="p-2"><X className="w-6 h-6" /></button>
          </div>
          
          <h3 className="font-bold text-gray-800 mb-4 hidden md:block">Resumo do Pedido</h3>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 text-sm">
                <div className="w-16 h-16 rounded-md overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                  <p className="text-gray-500 text-xs">Tam: {item.selectedSize} | Qtd: {item.quantity}</p>
                  <p className="font-semibold text-brand-600 mt-1">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Frete</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto flex flex-col">
           <div className="hidden md:flex justify-end mb-4">
             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-500" /></button>
           </div>
           
           {renderStepIndicator()}
           
           <h2 className="text-2xl font-bold text-gray-800 mb-6">{STEPS[step]}</h2>

           <form onSubmit={handleNext} className="flex-1 flex flex-col">
             
             {/* Step 1: Shipping */}
             {step === 0 && (
               <div className="space-y-4 animate-in slide-in-from-right-10 fade-in duration-300">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                     <div className="relative">
                       <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                       <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="Maria Silva" />
                     </div>
                   </div>
                   <div className="space-y-1">
                     <label className="text-sm font-medium text-gray-700">CPF</label>
                     <input required name="cpf" value={formData.cpf} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="000.000.000-00" />
                   </div>
                 </div>

                 <div className="space-y-1">
                   <label className="text-sm font-medium text-gray-700">Email</label>
                   <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="seu@email.com" />
                 </div>

                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">CEP</label>
                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="00000-000" />
                 </div>

                 <div className="space-y-1">
                   <label className="text-sm font-medium text-gray-700">Endereço</label>
                   <div className="relative">
                     <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                     <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Rua das Flores, 123" />
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label className="text-sm font-medium text-gray-700">Cidade</label>
                     <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-sm font-medium text-gray-700">Estado</label>
                     <input required name="state" value={formData.state} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                   </div>
                 </div>
               </div>
             )}

             {/* Step 2: Payment */}
             {step === 1 && (
               <div className="space-y-6 animate-in slide-in-from-right-10 fade-in duration-300">
                 <div className="flex gap-4">
                   <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${formData.paymentMethod === 'credit_card' ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' : 'border-gray-200 hover:border-gray-300'}`}>
                     <input type="radio" name="paymentMethod" value="credit_card" checked={formData.paymentMethod === 'credit_card'} onChange={handleInputChange} className="sr-only" />
                     <div className="flex flex-col items-center gap-2">
                       <CreditCard className={`w-8 h-8 ${formData.paymentMethod === 'credit_card' ? 'text-brand-600' : 'text-gray-400'}`} />
                       <span className="font-medium text-sm">Cartão de Crédito</span>
                     </div>
                   </label>
                   <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${formData.paymentMethod === 'boleto' ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' : 'border-gray-200 hover:border-gray-300'}`}>
                     <input type="radio" name="paymentMethod" value="boleto" checked={formData.paymentMethod === 'boleto'} onChange={handleInputChange} className="sr-only" />
                     <div className="flex flex-col items-center gap-2">
                       <Barcode className={`w-8 h-8 ${formData.paymentMethod === 'boleto' ? 'text-brand-600' : 'text-gray-400'}`} />
                       <span className="font-medium text-sm">Boleto Bancário</span>
                     </div>
                   </label>
                 </div>

                 {formData.paymentMethod === 'credit_card' && (
                   <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase">Número do Cartão</label>
                        <input required={formData.paymentMethod === 'credit_card'} name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase">Nome no Cartão</label>
                        <input required={formData.paymentMethod === 'credit_card'} name="cardName" value={formData.cardName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="COMO NO CARTÃO" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-500 uppercase">Validade</label>
                          <input required={formData.paymentMethod === 'credit_card'} name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-500 uppercase">CVV</label>
                          <input required={formData.paymentMethod === 'credit_card'} name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="123" />
                        </div>
                      </div>
                   </div>
                 )}
                 {formData.paymentMethod === 'boleto' && (
                   <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100">
                     <p>O boleto será gerado após a confirmação do pedido.</p>
                     <p className="mt-2 font-medium">Vencimento em 3 dias úteis.</p>
                   </div>
                 )}
               </div>
             )}

             {/* Navigation Buttons */}
             <div className="mt-8 flex justify-between pt-4 border-t border-gray-100">
               {step > 0 ? (
                 <Button type="button" variant="outline" onClick={() => setStep(prev => prev - 1)}>
                   <ChevronLeft className="w-4 h-4 mr-2" />
                   Voltar
                 </Button>
               ) : (
                 <div /> 
               )}
               <Button type="submit" disabled={isLoading} className="min-w-[140px]">
                 {isLoading ? (
                   <span className="flex items-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> Processando...</span>
                 ) : step === STEPS.length - 1 ? (
                   <>Confirmar Pedido <CheckCircle className="w-4 h-4 ml-2" /></>
                 ) : (
                   <>Próximo <ChevronRight className="w-4 h-4 ml-2" /></>
                 )}
               </Button>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
};