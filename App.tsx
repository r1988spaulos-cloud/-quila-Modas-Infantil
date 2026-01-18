import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Instagram, Facebook, Heart, Filter, ChevronDown, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES, FILTERS } from './constants';
import { Product, CartItem } from './types';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { Button } from './components/Button';
import { AiAssistant } from './components/AiAssistant';
import { CheckoutModal } from './components/CheckoutModal';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Favorites State
  const [favorites, setFavorites] = useState<number[]>([]);

  // Filters State
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derived Lists
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  // Main Filter Logic
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
    // Product has array of sizes, filter matches if product has AT LEAST ONE of the selected sizes
    const matchesSize = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const matchesAge = selectedAgeRanges.length === 0 || selectedAgeRanges.includes(product.ageRange);

    return matchesCategory && matchesSearch && matchesColor && matchesSize && matchesAge;
  });

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: product.sizes[0] }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    alert("Parabéns! Seu pedido foi realizado com sucesso. Você receberá um e-mail com os detalhes.");
  };

  const toggleFilter = (item: string, currentList: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentList.includes(item)) {
      setter(prev => prev.filter(i => i !== item));
    } else {
      setter(prev => [...prev, item]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Top Banner */}
      <div className="bg-brand-600 text-white text-center text-xs py-2 font-medium tracking-wide">
        FRETE GRÁTIS PARA TODO O BRASIL EM COMPRAS ACIMA DE R$ 299,00
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center md:items-start cursor-pointer" onClick={() => {
            setSelectedCategory("Todos");
            setSearchQuery("");
            window.scrollTo({top: 0, behavior: 'smooth'});
          }}>
            <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400 font-serif tracking-tight">
              Áquila Modas
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em]">Infantil</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm font-medium transition-all hover:-translate-y-0.5 relative group ${
                  selectedCategory === cat ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-500'
                }`}
              >
                {cat.toUpperCase()}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-500 transform origin-left transition-transform duration-300 ${selectedCategory === cat ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex relative group">
               <input 
                  type="text" 
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-brand-200 focus:outline-none transition-all w-32 focus:w-48"
               />
               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            
            <div className="hidden md:block">
              <div className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors cursor-pointer group" title="Favoritos">
                <Heart className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {favorites.length}
                  </span>
                )}
              </div>
            </div>

            <button 
              className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 animate-in slide-in-from-top-2">
             <input 
                  type="text" 
                  placeholder="O que você procura?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 bg-gray-100 rounded-lg text-sm mb-4"
             />
             {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-2 rounded-lg ${
                  selectedCategory === cat ? 'bg-brand-50 text-brand-600 font-bold' : 'text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Banner Sazonais */}
      {selectedCategory === "Todos" && !searchQuery && (
        <>
          <section className="relative h-[450px] md:h-[600px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/30 to-black/30 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=2000&auto=format&fit=crop" 
              alt="Promoção de Verão"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center items-start text-white">
              <span className="bg-brand-500 text-white px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                Oferta Limitada
              </span>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none animate-in fade-in slide-in-from-bottom-6 duration-700">
                Coleção <br/>
                <span className="text-brand-300">Verão 2025</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                Looks frescos e coloridos para os dias de sol. Aproveite descontos de até 40% em peças selecionadas.
              </p>
              <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 border-none animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200" onClick={() => {
                 const element = document.getElementById('shop-area');
                 element?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Comprar Agora
              </Button>
            </div>
          </section>

          {/* Novidades & Mais Vendidos Highlights */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              
              {/* Novidades */}
              <div className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-brand-500 pl-4">Novidades</h2>
                  <a href="#shop-area" className="text-brand-600 font-medium hover:underline text-sm flex items-center">
                    Ver tudo <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {newArrivals.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart} 
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>

              {/* Mais Vendidos */}
              <div>
                 <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-amber-400 pl-4">Mais Vendidos</h2>
                  <a href="#shop-area" className="text-brand-600 font-medium hover:underline text-sm flex items-center">
                    Ver tudo <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {bestSellers.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Main Shop Area with Filters */}
      <main id="shop-area" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className={`md:w-64 flex-shrink-0 ${isMobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block'}`}>
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="text-xl font-bold">Filtros</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}><Menu className="w-6 h-6" /></button>
              </div>

              <div className="space-y-8">
                {/* Category Filter Title */}
                <div>
                   <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar Por
                   </h3>
                </div>

                {/* Age Range */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Faixa Etária</h4>
                  <div className="space-y-2">
                    {FILTERS.ageRanges.map(age => (
                      <label key={age} className="flex items-center cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${selectedAgeRanges.includes(age) ? 'bg-brand-500 border-brand-500' : 'border-gray-300 group-hover:border-brand-300'}`}>
                          {selectedAgeRanges.includes(age) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={selectedAgeRanges.includes(age)}
                          onChange={() => toggleFilter(age, selectedAgeRanges, setSelectedAgeRanges)}
                        />
                        <span className={`text-sm ${selectedAgeRanges.includes(age) ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{age}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Tamanho</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {FILTERS.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                        className={`text-sm py-1.5 rounded border transition-all ${
                          selectedSizes.includes(size) 
                            ? 'bg-brand-500 text-white border-brand-500' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Cores</h4>
                  <div className="flex flex-wrap gap-3">
                    {FILTERS.colors.map(color => (
                       <button
                        key={color}
                        onClick={() => toggleFilter(color, selectedColors, setSelectedColors)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                          selectedColors.includes(color) ? 'border-brand-500 ring-2 ring-brand-200' : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: color === 'Branco' ? '#ffffff' : color === 'Preto' ? '#000000' : color === 'Caqui' ? '#C3B091' : color === 'Bege' ? '#f5f5dc' : color === 'Rosa' ? '#ec4899' : color === 'Azul' ? '#3b82f6' : color === 'Verde' ? '#22c55e' : color === 'Vermelho' ? '#ef4444' : color }}
                        title={color}
                       >
                         {selectedColors.includes(color) && <Check className={`w-4 h-4 ${color === 'Branco' || color === 'Bege' ? 'text-gray-900' : 'text-white'}`} />}
                         {/* Border for white */}
                         {color === 'Branco' && !selectedColors.includes(color) && <div className="absolute inset-0 rounded-full border border-gray-200 pointer-events-none" />}
                       </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedColors.length > 0 || selectedSizes.length > 0 || selectedAgeRanges.length > 0) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setSelectedColors([]);
                      setSelectedSizes([]);
                      setSelectedAgeRanges([]);
                    }}
                  >
                    Limpar Filtros
                  </Button>
                )}
              </div>
              
              {isMobileFilterOpen && (
                <div className="mt-8 pt-4 border-t sticky bottom-0 bg-white pb-6">
                  <Button className="w-full" onClick={() => setIsMobileFilterOpen(false)}>Ver Resultados</Button>
                </div>
              )}
            </aside>

            {/* Product Grid Area */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === "Todos" ? "Catálogo Completo" : selectedCategory}
                  <span className="ml-3 text-sm font-normal text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                    {filteredProducts.length} produtos
                  </span>
                </h2>
                <button 
                  className="md:hidden flex items-center text-sm font-medium text-brand-600"
                  onClick={() => setIsMobileFilterOpen(true)}
                >
                  <Filter className="w-4 h-4 mr-1" /> Filtros
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-xl text-gray-400 mb-2">Ops! Nenhum produto encontrado com esses filtros.</p>
                    <p className="text-gray-500 mb-6">Tente limpar os filtros ou buscar por outro termo.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory("Todos");
                        setSelectedColors([]);
                        setSelectedSizes([]);
                        setSelectedAgeRanges([]);
                        setSearchQuery("");
                      }}
                    >
                      Limpar tudo
                    </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart} 
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <section className="container mx-auto px-4 mt-24">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Heart className="w-6 h-6 fill-current" />
                </div>
                <h3 className="text-lg font-bold mb-2">Feito com Amor</h3>
                <p className="text-gray-600 text-sm">Tecidos selecionados para garantir o máximo conforto e durabilidade.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Curadoria Exclusiva</h3>
                <p className="text-gray-600 text-sm">Peças escolhidas a dedo seguindo as últimas tendências da moda infantil.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Compra Segura</h3>
                <p className="text-gray-600 text-sm">Ambiente protegido e entrega garantida para todo o território nacional.</p>
             </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold font-serif mb-6 text-brand-400">Áquila Modas</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Vestindo sonhos e criando memórias. A melhor loja de moda infantil para o seu pequeno brilhar.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Categorias</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                {CATEGORIES.map(c => (
                  <li key={c}><button onClick={() => setSelectedCategory(c)} className="hover:text-brand-400 transition-colors">{c}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Ajuda</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Meus Pedidos</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Guia de Medidas</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Fale Conosco</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Receba novidades e ofertas exclusivas no seu e-mail.</p>
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-500 text-white"
                />
                <Button className="w-full">Inscrever-se</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} Áquila Modas Infantil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Slide-over Cart */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleStartCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={cartTotal}
        onSuccess={handleCheckoutSuccess}
      />

      {/* AI Assistant */}
      <AiAssistant />
    </div>
  );
};

export default App;