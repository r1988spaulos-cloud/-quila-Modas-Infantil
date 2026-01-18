import React, { useMemo } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [items]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2 text-brand-600" />
              Sua Sacola
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({items.reduce((acc, item) => acc + item.quantity, 0)} itens)
              </span>
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Sua sacola está vazia</h3>
                <p className="text-gray-500 max-w-xs">Parece que você ainda não adicionou nenhum look incrível para os pequenos.</p>
                <Button onClick={onClose} variant="outline" className="mt-4">
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Tamanho: {item.selectedSize}</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-gray-50 text-gray-600 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-gray-50 text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-brand-600">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <Button onClick={onCheckout} className="w-full py-6 text-lg shadow-lg shadow-brand-200">
                Finalizar Compra
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};