/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Trash2, Plus, Minus, Info, ArrowRight,
  Sparkles, ShieldCheck, CreditCard, Wallet, Smartphone, Banknote
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAdd: (product: any) => void;
  onRemove: (product: any) => void;
  onClear: () => void;
  onCheckout: (method: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onAdd,
  onRemove,
  onClear,
  onCheckout
}: CartDrawerProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('upi_gpay');
  const [slideX, setSlideX] = useState<number>(0);
  const [isSlidingCompleted, setIsSlidingCompleted] = useState<boolean>(false);
  const [specialRemarks, setSpecialRemarks] = useState<string[]>([]);

  // Input state for mock card
  const [cardNo, setCardNo] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  if (!isOpen) return null;

  const itemTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Delivery waiver threshold
  const FREE_DELIVERY_THRESHOLD = 250;
  const deliveryCharge = itemTotal >= FREE_DELIVERY_THRESHOLD ? 0 : 35;
  const packagingFee = itemTotal > 0 ? 15 : 0;
  const taxAndHandling = itemTotal > 0 ? Math.round(itemTotal * 0.05 + 8) : 0;
  const grandTotal = itemTotal + deliveryCharge + packagingFee + taxAndHandling;

  const remainingForFreeDelivery = FREE_DELIVERY_THRESHOLD - itemTotal;
  const progressPercent = Math.min((itemTotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  const toggleRemark = (remark: string) => {
    if (specialRemarks.includes(remark)) {
      setSpecialRemarks(specialRemarks.filter(r => r !== remark));
    } else {
      setSpecialRemarks([...specialRemarks, remark]);
    }
  };

  // Handle fake checkout slider touch/mouse actions
  const handleSliderDrag = (event: any, info: any) => {
    const trackWidth = 220; // safe sliding distance boundary
    const dragX = info.offset.x;
    const computedX = Math.max(0, Math.min(dragX, trackWidth));
    setSlideX(computedX);

    if (computedX >= trackWidth - 10) {
      if (!isSlidingCompleted) {
        setIsSlidingCompleted(true);
        // Trigger Checkout after a short visual delay
        setTimeout(() => {
          onCheckout(paymentMethod);
          setIsSlidingCompleted(false);
          setSlideX(0);
        }, 500);
      }
    }
  };

  const handleSliderRelease = () => {
    if (slideX < 210) {
      setSlideX(0); // bounce back
    }
  };

  return (
    <AnimatePresence>
      <div id="cart-drawer-root" className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          id="cart-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Drawer container (slides from right) */}
        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <motion.div
            id="cart-drawer-sheet"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-slate-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div id="cart-header" className="bg-white border-b border-slate-200 p-5 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-2.5">
                <h2 className="text-sm font-bold font-display uppercase tracking-wider text-slate-800">Shopping Basket</h2>
                <span className="bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} Items
                </span>
              </div>
              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    id="clear-cart-btn"
                    onClick={onClear}
                    className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1.5 rounded border border-rose-200 transition-all cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  id="close-cart-btn"
                  onClick={onClose}
                  className="p-1.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 text-slate-500 transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main scrollable layout */}
            <div id="cart-body-scroll" className="flex-grow overflow-y-auto p-4 md:p-5 space-y-5 bg-[#F8FAFC]">
              
              {/* Free delivery prompt */}
              {cartItems.length > 0 && (
                <div id="free-delivery-tracker" className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                  <div className="flex justify-between items-center text-xs font-semibold mb-2 text-slate-700">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      {remainingForFreeDelivery > 0 
                        ? `Add ₹${remainingForFreeDelivery} more for Free Delivery!` 
                        : '🎉 Congrats! Delivery fee has been waived!'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Threshold: ₹250</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                    <motion.div
                      className="bg-emerald-500 h-full rounded transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Items listing */}
              {cartItems.length === 0 ? (
                <div id="empty-cart-view" className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=200"
                    alt="Empty bag fallback"
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-contain rounded-xl filter saturate-50 opacity-40 mix-blend-multiply"
                  />
                  <h3 className="text-sm font-bold font-display uppercase tracking-wide text-slate-700">Your basket is totally empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Explore our ultra-fresh fruits, rich dairy, crisp sourdough, and instant treats delivering in exactly 10 minutes.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-display font-bold uppercase tracking-wider px-5 py-2.5 transition-all cursor-pointer border border-slate-950"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div id="cart-item-list" className="space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Items in basket</span>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product.id}
                      id={`cart-item-${item.product.id}`}
                      className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-contain bg-slate-50 border border-slate-100 rounded-lg p-1"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 font-display uppercase truncate leading-snug">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {item.product.weight} • ₹{item.product.price}
                        </span>
                      </div>

                      {/* Stepper block */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold p-1">
                          <button
                            id={`drawer-dec-${item.product.id}`}
                            onClick={() => onRemove(item.product)}
                            className="p-1 hover:bg-white rounded hover:text-slate-905 text-slate-500 transition-all cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span id={`drawer-qty-${item.product.id}`} className="w-5 text-center font-mono font-extrabold text-xs text-emerald-600">
                            {item.quantity}
                          </span>
                          <button
                            id={`drawer-inc-${item.product.id}`}
                            onClick={() => onAdd(item.product)}
                            className="p-1 hover:bg-white rounded hover:text-slate-905 text-slate-500 transition-all cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span id={`drawer-item-subtotal-${item.product.id}`} className="text-xs font-bold text-slate-800 font-mono min-w-[45px] text-right">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && (
                <>
                  {/* Delivery Instruction selectors */}
                  <div id="delivery-instructions" className="space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Delivery Instructions</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'gate', label: '🏡 Leave at gate', desc: 'No contact' },
                        { id: 'door', label: '🔔 Place on door', desc: "Don't ring" },
                        { id: 'mute', label: '🔕 Do not call', desc: 'No phone noise' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleRemark(item.id)}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            specialRemarks.includes(item.id)
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-850 font-bold'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                          }`}
                        >
                          <span className="text-xs font-bold block truncate">{item.label}</span>
                          <span className="text-[9px] text-slate-400 block font-light leading-none mt-1 font-mono">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment selection panel */}
                  <div id="checkout-payment-panel" className="space-y-3 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono border-b border-slate-100 pb-2">
                      Secure Payment Mode
                    </span>

                    <div className="space-y-2.5">
                      {[
                        { id: 'upi_gpay', type: 'UPI', label: 'Google Pay (Highly Secure, Instant ✅)', icon: Smartphone },
                        { id: 'upi_paytm', type: 'UPI', label: 'Paytm Wallet Or UPI Direct (⚡ Speed)', icon: Wallet },
                        { id: 'card', type: 'CARD', label: 'Credit / Debit Cards (Secure 3D)', icon: CreditCard },
                        { id: 'cod', type: 'COD', label: 'Cash on Delivery (Pay on doorstep)', icon: Banknote }
                      ].map((method) => {
                        const IconComponent = method.icon;
                        const isSelected = paymentMethod === method.id;
                        return (
                          <div key={method.id} className="flex flex-col">
                            <button
                              onClick={() => setPaymentMethod(method.id)}
                              className={`w-full p-2.5 flex items-center justify-between text-left rounded-lg border transition-all cursor-pointer ${
                                isSelected 
                                  ? 'border-emerald-600 bg-emerald-50/20 text-emerald-800 font-bold' 
                                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-slate-600 font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded ${isSelected ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="text-xs text-left leading-tight">
                                  <span>{method.label}</span>
                                </div>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-emerald-600' : 'border-slate-300'}`}>
                                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-emerald-650" />}
                              </div>
                            </button>

                            {/* Inner Form for Credit Card */}
                            {method.id === 'card' && isSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-slate-50 border border-t-0 border-slate-200 p-3 rounded-b-lg -mt-1 space-y-2.5 text-xs text-slate-700 z-10"
                              >
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="col-span-2">
                                    <label className="text-[9px] uppercase font-mono text-slate-400 block mb-0.5">Card Number</label>
                                    <input
                                      type="text"
                                      placeholder="4111 8820 4400 9012"
                                      value={cardNo}
                                      onChange={(e) => setCardNo(e.target.value.replace(/\D/g, '').substring(0, 16))}
                                      className="w-full bg-white border border-slate-200 px-2.5 py-1.5 rounded font-mono focus:border-slate-900 outline-none text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[9px] uppercase font-mono text-slate-400 block mb-0.5">Expiry Date</label>
                                    <input
                                      type="text"
                                      placeholder="MM/YY"
                                      value={cardExp}
                                      onChange={(e) => setCardExp(e.target.value.substring(0, 5))}
                                      className="w-full bg-white border border-slate-200 px-2.5 py-1.5 rounded font-mono focus:border-slate-900 outline-none text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[9px] uppercase font-mono text-slate-400 block mb-0.5">CVV Code</label>
                                    <input
                                      type="password"
                                      placeholder="***"
                                      value={cardCVV}
                                      onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                      className="w-full bg-white border border-slate-200 px-2.5 py-1.5 rounded font-mono focus:border-slate-900 outline-none text-xs"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bill Details Breakout */}
                  <div id="bill-details" className="bg-white border border-slate-200 p-4 rounded-xl space-y-2.5 shadow-xs font-semibold text-xs text-slate-600">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono border-b border-slate-100 pb-2">
                      Detailed Summary
                    </span>
                    <div className="flex justify-between">
                      <span>Basket subtotal</span>
                      <span className="font-mono text-slate-800">₹{itemTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        Delivery charges
                        {deliveryCharge === 0 && <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-mono font-bold px-1 rounded uppercase">Free</span>}
                      </span>
                      <span className="font-mono text-slate-800">
                        {deliveryCharge > 0 ? `₹${deliveryCharge}` : <span className="text-emerald-700 line-through">₹35</span>}
                      </span>
                    </div>
                    <div className="flex justify-between font-normal">
                      <span className="flex items-center gap-1 text-slate-400">
                        Handling & Safety box fee
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                      </span>
                      <span className="font-mono text-slate-800">₹{packagingFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Partner convenience charges</span>
                      <span className="font-mono text-slate-800">₹{taxAndHandling}</span>
                    </div>

                    <div className="border-t border-dashed border-slate-200 pt-2.5 flex justify-between text-sm font-extrabold text-slate-900">
                      <span>Total Amount to Pay</span>
                      <span className="font-mono text-emerald-800 text-base">₹{grandTotal}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer sticky panel with slide to checkout */}
            {cartItems.length > 0 && (
              <div id="cart-footer" className="bg-white border-t border-slate-200 p-4 flex flex-col items-center">
                
                {/* Visual swipe lock screen */}
                <div className="w-full flex flex-col items-center gap-3">
                  <div className="flex items-center justify-between w-full text-xs font-bold text-slate-700 px-1 font-mono uppercase tracking-wider">
                    <span>Pay: {paymentMethod.replace('_', ' ')}</span>
                    <span className="text-emerald-800 font-bold">Total: ₹{grandTotal}</span>
                  </div>

                  {/* Sliding container track */}
                  <div id="slide-pay-track" className="w-full h-14 bg-slate-50 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
                    <span className="font-bold text-xs text-slate-600 pointer-events-none select-none z-10 animate-pulse flex items-center gap-2 font-display uppercase tracking-wider">
                      {isSlidingCompleted ? 'Processing...' : 'Swipe to Place Order ⚡'}
                      <ArrowRight className="w-4 h-4 text-emerald-600" />
                    </span>

                    {/* Draggable knocker item */}
                    <motion.div
                      id="slide-shuttle"
                      drag="x"
                      dragConstraints={{ left: 0, right: 230 }}
                      dragElastic={0.05}
                      dragMomentum={false}
                      style={{ x: slideX }}
                      onDrag={handleSliderDrag}
                      onDragEnd={handleSliderRelease}
                      className="absolute left-1 top-1 bottom-1 w-16 bg-slate-900 hover:bg-slate-800 border border-slate-950 text-white rounded-lg shadow-sm flex items-center justify-center cursor-grab active:cursor-grabbing z-20 transition-colors"
                    >
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      >
                        <ArrowRight className="w-5 h-5 stroke-[3]" />
                      </motion.div>
                    </motion.div>

                    {/* Progress Fill Background overlay */}
                    <div
                      className="absolute left-0 bottom-0 top-0 bg-emerald-500/10 transition-all pointer-events-none"
                      style={{ width: `${slideX + 64}px` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-[9px] text-slate-400 font-mono uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>PCI-DSS Compliant Secure Link Gateway</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
