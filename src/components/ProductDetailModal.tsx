/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Calendar, CheckCircle, ShieldCheck, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  quantity: number;
  onClose: () => void;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  quantity,
  onClose,
  onAdd,
  onRemove
}: ProductDetailModalProps) {
  if (!product) return null;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      <div id="product-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          id="product-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal sheets */}
        <motion.div
          id={`product-modal-content-${product.id}`}
          layoutId={`card-container-${product.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col relative z-10 text-slate-800 border border-slate-200"
        >
          {/* Header row sticky/floating */}
          <div className="absolute top-4 right-4 z-40 flex gap-2">
            <button
              id="close-product-modal-btn"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-slate-200"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div id="modal-grid" className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-start">
            {/* Visual presentation panel */}
            <div id="modal-visual-panel" className="flex flex-col items-center">
              <div className="w-full aspect-square bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-6 relative overflow-hidden">
                {discountPercent > 0 && (
                  <span id="detail-discount-badge" className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded z-10 shadow-xs uppercase">
                    {discountPercent}% SAVINGS
                  </span>
                )}
                <motion.img
                  id="detail-image"
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-64 object-contain"
                  layoutId={`card-image-${product.id}`}
                />
              </div>

              {/* Freshness banner */}
              <div id="freshness-banner" className="mt-4 flex items-center justify-center gap-2 text-xs bg-emerald-50 text-emerald-800 rounded-lg px-4 py-3 w-full border border-emerald-150">
                <ShieldCheck className="w-4 h-4 text-emerald-650" />
                <span className="font-semibold select-none">100% Quality Guaranteed or Instant Cashback</span>
              </div>
            </div>

            {/* Information panel */}
            <div id="modal-info-panel" className="flex flex-col h-full justify-between">
              <div>
                <span id="detail-category" className="text-[10px] font-extrabold text-emerald-800 tracking-wider uppercase bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded inline-block mb-3 font-mono">
                  {product.category.replace('-', ' & ')}
                </span>
                
                <h2 id="detail-title" className="text-xl font-bold font-display text-slate-900 leading-tight uppercase tracking-tight">
                  {product.name}
                </h2>

                <div id="detail-rating-row" className="flex items-center gap-4 mt-2 mb-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-850 px-2 py-0.5 rounded font-mono font-bold text-xs border border-amber-100">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="font-mono text-xs">{product.reviewsCount} reviews</span>
                  <span className="text-xs bg-slate-100 border border-slate-200 rounded px-2 py-0.5 font-mono font-medium">{product.weight}</span>
                </div>

                {/* Price block */}
                <div id="detail-prices" className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-bold text-slate-900 font-mono">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 font-mono line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                {/* Interactive description and shelf life */}
                <div className="space-y-4 text-sm text-slate-600 border-t border-slate-200 pt-4">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-[10px] uppercase tracking-wider mb-1 font-mono flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                      About this product
                    </h4>
                    <p id="detail-description" className="leading-relaxed text-slate-650 text-xs">
                      {product.description}
                    </p>
                  </div>

                  <div className="h-px bg-slate-200" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-[10px] uppercase tracking-wider mb-1 font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        Shelf Life
                      </h4>
                      <p id="detail-shelf-life" className="text-xs text-slate-600 font-mono">
                        {product.shelfLife}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-[10px] uppercase tracking-wider mb-1 font-mono flex items-center gap-1">
                        📦 Sourcing
                      </h4>
                      <p className="text-xs text-slate-600 font-mono">
                        Direct-to-Hub Farms
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to checkout segment */}
              <div id="detail-action-footer" className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">Subtotal</span>
                  <span className="text-lg font-bold text-emerald-700 font-mono">
                    ₹{quantity * product.price}
                  </span>
                </div>

                <div id="detail-stepper">
                  {quantity > 0 ? (
                    <div className="flex items-center gap-4 bg-slate-900 border border-slate-950 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xs">
                      <button
                        id="detail-decrement"
                        className="hover:scale-110 active:scale-95 transition-transform text-slate-300 hover:text-white"
                        onClick={() => onRemove(product)}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span id="detail-qty" className="w-6 text-center font-mono text-sm text-emerald-400">{quantity}</span>
                      <button
                        id="detail-increment"
                        className="hover:scale-110 active:scale-95 transition-transform text-slate-300 hover:text-white"
                        onClick={() => onAdd(product)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      id="detail-add-btn"
                      onClick={() => onAdd(product)}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider shadow-xs flex items-center gap-2 cursor-pointer border border-slate-950"
                    >
                      <ShoppingBag className="w-4 h-4 text-emerald-400" />
                      ADD TO BASKET
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits slider checklist & nutrients table */}
          <div id="benefits-and-nutrients" className="bg-slate-50 p-6 md:p-8 rounded-b-2xl border-t border-slate-200 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-extrabold text-slate-800 text-[10px] uppercase tracking-wider mb-3 font-mono">
                Key Benefits
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-800 text-[10px] uppercase tracking-wider mb-3 font-mono">
                Nutritional Facts (Per 100g)
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {product.nutrients.map((nutr, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-2 rounded-lg flex flex-col">
                    <span className="text-[10px] text-slate-400 font-mono uppercase">{nutr.label}</span>
                    <span className="text-xs font-bold text-slate-700 font-mono">{nutr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
