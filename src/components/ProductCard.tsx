/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: any;
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onSelect: (product: Product) => void;
}

export default function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
  onSelect
}: ProductCardProps) {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layoutId={`card-container-${product.id}`}
      className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer relative"
      onClick={() => onSelect(product)}
      whileHover={{ y: -4 }}
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <span id={`discount-badge-${product.id}`} className="absolute top-3 left-3 bg-rose-500 text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded z-10 shadow-xs uppercase">
          {discountPercent}% OFF
        </span>
      )}

      {/* Image Block */}
      <div id={`image-container-${product.id}`} className="w-full h-44 overflow-hidden bg-slate-50 border-b border-slate-100 relative flex items-center justify-center pt-2">
        <motion.img
          id={`product-img-${product.id}`}
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
          layoutId={`card-image-${product.id}`}
        />
        
        {/* Rating Bubble */}
        <div id={`rating-${product.id}`} className="absolute bottom-3 left-3 bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 flex items-center gap-1 shadow-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Data Column */}
      <div id={`data-column-${product.id}`} className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span id={`weight-${product.id}`} className="text-[10px] font-mono tracking-wider text-slate-400 block mb-1">
            {product.weight}
          </span>
          <h3 id={`name-${product.id}`} className="text-xs font-bold font-display text-slate-800 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
        </div>

        <div id={`footer-row-${product.id}`} className="flex items-center justify-between mt-4 pt-2 border-t border-slate-150">
          <div>
            <div className="flex items-baseline gap-1">
              <span id={`price-${product.id}`} className="text-sm font-bold text-slate-900 font-mono">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span id={`original-price-${product.id}`} className="text-[10px] text-slate-400 font-mono line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Stepper or Add Button */}
          <div
            id={`stepper-container-${product.id}`}
            className="z-10"
            onClick={(e) => e.stopPropagation()} // stop click from triggering modal view
          >
            {quantity > 0 ? (
              <motion.div
                id={`stepper-${product.id}`}
                className="flex items-center gap-2 bg-slate-900 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-xs border border-slate-950"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
              >
                <button
                  id={`decrement-${product.id}`}
                  className="hover:scale-110 w-4 h-4 flex items-center justify-center transition-transform text-slate-300 hover:text-white"
                  onClick={() => onRemove(product)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span id={`quantity-val-${product.id}`} className="min-w-4 text-center font-mono text-[11px] text-emerald-400">
                  {quantity}
                </span>
                <button
                  id={`increment-${product.id}`}
                  className="hover:scale-110 w-4 h-4 flex items-center justify-center transition-transform text-slate-300 hover:text-white"
                  onClick={() => onAdd(product)}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                id={`add-btn-${product.id}`}
                className="bg-slate-900 text-white hover:bg-slate-800 px-3.5 py-1.5 rounded-lg text-[10px] font-bold font-display uppercase tracking-widest border border-slate-950 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                onClick={() => onAdd(product)}
                whileTap={{ scale: 0.93 }}
              >
                <Plus className="w-3 h-3 text-emerald-400" />
                ADD
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
