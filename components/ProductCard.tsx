import React from 'react';
import { ShoppingBag, Star, TrendingUp, Heart } from 'lucide-react';
import { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  isFavorite,
  onToggleFavorite
}) => {
  return (
    <div className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border flex flex-col h-full ${isFavorite ? 'border-brand-200 ring-1 ring-brand-100' : 'border-gray-100'}`}>
      <div className="relative overflow-hidden aspect-[3/4]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-all shadow-sm z-10 group/heart"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-300 ${
              isFavorite 
                ? 'fill-red-500 text-red-500 scale-110' 
                : 'text-gray-400 group-hover/heart:text-red-400'
            }`} 
          />
        </button>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
            <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">
                Novo
            </span>
            )}
            {product.isBestSeller && (
            <span className="bg-amber-400 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Mais Vendido
            </span>
            )}
        </div>
        
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
          <Button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-white text-brand-600 hover:bg-brand-50 border-none shadow-lg"
            size="sm"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Adicionar à Sacola
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{product.category}</p>
          <div className="flex items-center text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-brand-600">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <div className="flex gap-1 overflow-x-auto max-w-[50%] no-scrollbar">
             {product.sizes.slice(0, 3).map(size => (
               <span key={size} className="text-xs border border-gray-200 rounded px-1.5 py-0.5 text-gray-500 whitespace-nowrap">
                 {size}
               </span>
             ))}
             {product.sizes.length > 3 && <span className="text-xs text-gray-400">+</span>}
          </div>
        </div>
      </div>
    </div>
  );
};