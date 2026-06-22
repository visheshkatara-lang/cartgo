/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag, Search, Sparkles, MapPin, ChevronDown, Rocket,
  RefreshCw, CheckCircle, Smartphone, Flame, Gift
} from 'lucide-react';

import { Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES, PROMO_SLIDES } from './data';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import OrderTrackingPanel from './components/OrderTrackingPanel';

export default function App() {
  // Navigation & Catalogs
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Cart, selection, and transaction states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [placedOrderSummary, setPlacedOrderSummary] = useState<{
    items: CartItem[];
    paymentMethod: string;
    grandTotal: number;
  } | null>(null);

  // Address picking states
  const [activeAddress, setActiveAddress] = useState<string>('Koramangala 4th Block, Bengaluru, KA');
  const [addressPickerOpen, setAddressPickerOpen] = useState<boolean>(false);
  const mockAddresses = [
    'Koramangala 4th Block, Bengaluru, KA',
    'Sector 62, Noida, NCR (Delhi Region)',
    'Colaba Sea Face Point, Mumbai, MH',
    '7th Avenue Plaza Heights, NY 10011'
  ];

  // Auto changing promo slides index
  const [currentPromoIdx, setCurrentPromoIdx] = useState<number>(0);
  useEffect(() => {
    const promoTimer = setInterval(() => {
      setCurrentPromoIdx((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 6000);
    return () => clearInterval(promoTimer);
  }, []);

  // Sync state from localStorage (on startup)
  useEffect(() => {
    const savedCart = localStorage.getItem('quickcart_saved_items');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed reviving cart items count', err);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('quickcart_saved_items', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product: Product) => {
    const existingIdx = cartItems.findIndex(i => i.product.id === product.id);
    if (existingIdx > -1) {
      const copy = [...cartItems];
      copy[existingIdx].quantity += 1;
      saveCartToStorage(copy);
    } else {
      saveCartToStorage([...cartItems, { product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product: Product) => {
    const existingIdx = cartItems.findIndex(i => i.product.id === product.id);
    if (existingIdx > -1) {
      const copy = [...cartItems];
      if (copy[existingIdx].quantity > 1) {
        copy[existingIdx].quantity -= 1;
        saveCartToStorage(copy);
      } else {
        copy.splice(existingIdx, 1);
        saveCartToStorage(copy);
      }
    }
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const handleCheckoutCompleted = (method: string) => {
    const sub = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const delivery = sub >= 250 ? 0 : 35;
    const packaging = 15;
    const tax = Math.round(sub * 0.05 + 8);
    const grand = sub + delivery + packaging + tax;

    setPlacedOrderSummary({
      items: cartItems,
      paymentMethod: method,
      grandTotal: grand
    });
    setCartOpen(false);
    setIsOrderPlaced(true);
    // Flush local state basket on success
    localStorage.removeItem('quickcart_saved_items');
  };

  const resetAllWorkflowToNewOrder = () => {
    setCartItems([]);
    setIsOrderPlaced(false);
    setPlacedOrderSummary(null);
  };

  // Filter products based on search parameters and selected categories
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      query === '' ||
      prod.name.toLowerCase().includes(query) ||
      prod.description.toLowerCase().includes(query) ||
      prod.category.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  const cartTotalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div id="quickcart-ambient" className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 antialiased overflow-x-hidden selection:bg-emerald-600 selection:text-white pb-16 md:pb-0">
      
      {/* Dynamic top banner slider */}
      {!isOrderPlaced && (
        <div id="top-ticker" className="bg-slate-950 border-b border-slate-800 text-slate-200 text-[11px] py-2.5 px-4 flex items-center justify-center gap-1.5 font-medium font-mono uppercase tracking-wider min-h-8 text-center">
          <Rocket className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
          <span>⚡ 10-Minute Delivery Node active. Free delivery above ₹250!</span>
        </div>
      )}

      {/* Main Header / Navigation */}
      <header id="main-header" className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-6 cursor-pointer shrink-0" onClick={resetAllWorkflowToNewOrder}>
            <div className="text-2xl font-black text-emerald-600 tracking-tighter font-display flex items-baseline gap-0.5">
              <span>QUICKCART</span>
              <span className="text-emerald-500 font-extrabold text-3xl animate-pulse">.</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
            <div className="hidden md:flex flex-col">
              <span className="text-[9px] font-black font-mono text-slate-400 uppercase tracking-widest leading-none">Delivering To</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-semibold text-slate-800 underline underline-offset-4 decoration-emerald-500 truncate max-w-[200px]">{activeAddress.split(',')[0]}</span>
              </div>
            </div>
          </div>

          {/* Real-time Location Indicator Address picker */}
          {!isOrderPlaced && (
            <div
              id="location-picker-pill"
              onClick={() => setAddressPickerOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer transition-all max-w-sm truncate"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div className="text-left text-xs text-slate-600 min-w-0">
                <p className="font-extrabold text-[9px] text-slate-400 uppercase tracking-widest leading-none mb-0.5">Change Node Address</p>
                <p className="font-semibold text-xs truncate max-w-[220px]">{activeAddress}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          )}

          {/* Cart triggers */}
          <div className="flex items-center gap-3">
            {!isOrderPlaced && (
              <button
                id="cart-trigger-btn"
                onClick={() => setCartOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg flex items-center gap-2.5 font-display font-bold text-xs uppercase tracking-wider border border-slate-950 transition-all active:scale-95 cursor-pointer relative shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Basket</span>
                {cartTotalQuantity > 0 ? (
                  <motion.span
                    id="cart-badge-count"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="bg-emerald-500 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded border border-emerald-600"
                  >
                    {cartTotalQuantity}
                  </motion.span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-mono">Empty</span>
                )}
              </button>
            )}

            {isOrderPlaced && (
              <button
                id="back-shopping-btn"
                onClick={resetAllWorkflowToNewOrder}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border border-slate-300"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                <span>Shop Again</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* RENDER VIEW CONTROLLER: Tracking screen OR Shopping catalog */}
      <main id="outer-main">
        {isOrderPlaced && placedOrderSummary ? (
          <motion.div
            id="tracking-view-container"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-6"
          >
            {/* Visual Header Announcement on Order Success */}
            <div className="max-w-6xl mx-auto px-4 text-center py-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 mb-4"
              >
                <CheckCircle className="w-10 h-10 stroke-[2.5]" />
              </motion.div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Order Placed Successfully! ⚡</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Payment verified securely. Vikram is arriving with fresh groceries via eco-friendly electric vehicles.
              </p>
            </div>

            {/* Live interactive Delivery tracking Panel */}
            <OrderTrackingPanel
              cartItems={placedOrderSummary.items}
              grandTotal={placedOrderSummary.grandTotal}
              paymentMethod={placedOrderSummary.paymentMethod}
              onNewOrder={resetAllWorkflowToNewOrder}
            />
          </motion.div>
        ) : (
          <div id="shopping-catalog-screen" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8">
            
            {/* Location selector for mobile views */}
            <div
              id="mobile-address-strip"
              onClick={() => setAddressPickerOpen(true)}
              className="md:hidden flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 truncate">{activeAddress}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>

            {/* Immersive slide campaigns promo carousels */}
            <div id="promo-carousels-track" className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPromoIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white ${PROMO_SLIDES[currentPromoIdx].bgClass}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono uppercase bg-slate-950/75 font-extrabold tracking-widest px-2.5 py-1 rounded border border-white/20">
                      ⚡ Campaign Special
                    </span>
                    <span className="text-xs font-black font-mono bg-emerald-500 text-white px-3 py-1 rounded shadow-sm border border-emerald-400">
                      {PROMO_SLIDES[currentPromoIdx].badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-black font-display tracking-tight uppercase">
                      {PROMO_SLIDES[currentPromoIdx].title}
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-white/95">
                      {PROMO_SLIDES[currentPromoIdx].subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Selector pager wheels */}
              <div className="absolute right-6 bottom-4 flex items-center gap-1.5 z-10 bg-slate-950/30 p-1.5 rounded-lg backdrop-blur-xs">
                {PROMO_SLIDES.map((slide, i) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentPromoIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      currentPromoIdx === i ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Powerful Fuzzy Search bar panel */}
            <div id="fuzzy-search-panel" className="relative max-w-2xl mx-auto w-full z-10">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 stroke-[2]" />
              </div>
              <input
                id="catalog-search-bar"
                type="text"
                placeholder='Search over "Sharbati Atta", "Malai Paneer", "Alphonso Mangoes", "Toor Dal", "Desi Ghee"...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full placeholder-slate-400 text-slate-800 bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm rounded-xl pl-12 pr-16 py-3.5 outline-none shadow-xs"
              />
              {searchQuery && (
                <button
                  id="reset-search-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded transition-all cursor-pointer border border-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Categories bar row */}
            <div id="categories-filter-bar" className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Browse Grocery Cabinets</span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      id={`category-pill-${cat.id}`}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                      }}
                      className={`px-4.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider font-display whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-950 shadow-sm'
                          : 'bg-white text-slate-600 hover:text-slate-800 hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Products Grid section */}
            <div id="products-catalogue-area" className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
                <h2 className="text-base font-bold font-display tracking-tight text-slate-800 uppercase">
                  {selectedCategory === 'all' ? 'All Live Catalog Items' : CATEGORIES.find(c => c.id === selectedCategory)?.name.split(' ').slice(1).join(' ')}
                </h2>
                <span className="text-xs text-slate-400 font-mono font-medium">
                  Showing {filteredProducts.length} items
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div id="zero-result-fallback" className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center shadow-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 shadow-inner rounded-xl text-slate-400 mb-4">
                    <Search className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-700 uppercase tracking-wide">No matching groceries spotted</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed mt-1">
                    Try searching for another keyword or check corresponding categories. Sourced fresh items get re-cataloged every hour!
                  </p>
                  <button
                    id="reset-filter-btn"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-display font-bold uppercase tracking-wider px-4 py-2.5 shadow-xs transition-colors cursor-pointer border border-slate-950"
                  >
                    Clear Filter Locks
                  </button>
                </div>
              ) : (
                <div id="grid-masonry" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {filteredProducts.map((prod) => {
                    const cartItem = cartItems.find((ci) => ci.product.id === prod.id);
                    const qty = cartItem ? cartItem.quantity : 0;
                    return (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        quantity={qty}
                        onAdd={handleAddToCart}
                        onRemove={handleRemoveFromCart}
                        onSelect={(p) => setSelectedProduct(p)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Sticky Mobile Footer Cart Stripe */}
      {cartItems.length > 0 && !isOrderPlaced && (
        <motion.div
          id="mobile-cart-stripe"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="md:hidden fixed bottom-4 inset-x-4 h-14 bg-emerald-800 text-white px-4 rounded-2xl flex items-center justify-between shadow-2xl z-40"
        >
          <div className="flex items-center gap-2">
            <div className="bg-emerald-900 px-2.5 py-1 rounded-lg text-xs font-bold font-mono">
              {cartTotalQuantity} Items
            </div>
            <span className="text-sm font-extrabold font-mono">₹{cartTotalPrice}</span>
          </div>

          <button
            id="mobile-view-basket-btn"
            onClick={() => setCartOpen(true)}
            className="text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Basket</span>
            <span>➡️</span>
          </button>
        </motion.div>
      )}

      {/* Address Picker modal drawer */}
      <AnimatePresence>
        {addressPickerOpen && (
          <div id="address-picker-root" className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddressPickerOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            {/* Model box */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-white rounded-[32px] w-full max-w-sm p-6 relative shadow-2xl border border-slate-100 z-10 text-slate-800"
            >
              <h3 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                Select Delivery Node address
              </h3>

              <div className="space-y-2.5">
                {mockAddresses.map((addr) => {
                  const isCurrent = activeAddress === addr;
                  return (
                    <button
                      key={addr}
                      onClick={() => {
                        setActiveAddress(addr);
                        setAddressPickerOpen(false);
                      }}
                      className={`w-full p-3 text-left text-xs rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-emerald-600 bg-emerald-50/20 text-emerald-800 font-bold'
                          : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span>{addr}</span>
                    </button>
                  );
                })}
              </div>

              <button
                id="close-address-picker-btn"
                onClick={() => setAddressPickerOpen(false)}
                className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold font-sans text-center text-xs cursor-pointer border border-slate-200 transition-colors"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Information Detail Modal Sheet */}
      <ProductDetailModal
        product={selectedProduct}
        quantity={selectedProduct ? (cartItems.find(i => i.product.id === selectedProduct.id)?.quantity || 0) : 0}
        onClose={() => setSelectedProduct(null)}
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
      />

      {/* Cart Slider drawer sheet */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        onCheckout={handleCheckoutCompleted}
      />
    </div>
  );
}
