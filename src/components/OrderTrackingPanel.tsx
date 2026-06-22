/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone, MessageSquare, Star, Play, Pause, FastForward, RotateCcw,
  Bike, CheckCircle2, ShoppingBag, MapPin, Navigation, Send, X,
  BadgeAlert, Clock, Check
} from 'lucide-react';
import { OrderStage, DeliveryRider, CartItem } from '../types';
import { MOCK_RIDER } from '../data';


interface OrderTrackingPanelProps {
  cartItems: CartItem[];
  grandTotal: number;
  paymentMethod: string;
  onNewOrder: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'rider';
  text: string;
  timestamp: string;
}

export default function OrderTrackingPanel({
  cartItems,
  grandTotal,
  paymentMethod,
  onNewOrder
}: OrderTrackingPanelProps) {
  const [currentStage, setCurrentStage] = useState<OrderStage>('confirmed');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { id: '1', sender: 'rider', text: 'Hi! I am Vikram, your delivery partner. I am heading to the store to collect your fresh cart items! ⚡', timestamp: 'Just now' }
  ]);
  const [riderIsTyping, setRiderIsTyping] = useState<boolean>(false);
  
  // Custom Interactive Landmarking & HUD Layers
  const [selectedLandmark, setSelectedLandmark] = useState<any>(null);
  const [showTelemetryHUD, setShowTelemetryHUD] = useState<boolean>(true);
  const [showScenicPath, setShowScenicPath] = useState<boolean>(true);
  const [showForests, setShowForests] = useState<boolean>(true);

  const LANDMARKS = [
    { id: 'hub', name: 'FreshGrocer Hub', x: 100, y: 260, emoji: '🏪', desc: 'Siddharth Vihar fulfillment Center. Fresh fruits & sourdough stacked in cold lockers here.' },
    { id: 'lake', name: 'Blue Lake Reservoir', x: 210, y: 70, emoji: '💧', desc: 'Indiranagar Urban Cooling Lake Reservoir. A lush path with dense tree canopies.' },
    { id: 'junction', name: 'Munchies Junction', x: 260, y: 180, emoji: '🚦', desc: 'Crossroad telemetry node. System green wave priority is activated for our E-Scooter fleet.' },
    { id: 'park', name: 'Organic Orchard Park', x: 340, y: 220, emoji: '🌳', desc: 'Hyperlocal urban organic farm nursery. Source of fresh organic coriander and mint leaves.' },
    { id: 'home', name: 'Your Address', x: 400, y: 100, emoji: '🏡', desc: 'Your cozy doorstep where the parcel will be carefully placed. Ready for rapid contact-free handover.' }
  ];

  const timerRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Total simulation runs for 60 units of virtual time
  const TOTAL_SIMULATION_SECONDS = 60;

  // Real GPS coordinates in Bengaluru, India (Express instant delivery feel)
  const realPathPoints = [
    { lat: 12.9716, lng: 77.6412 }, // Store Hub (Indiranagar)
    { lat: 12.9695, lng: 77.6425 }, // Secondary Hub Node route point
    { lat: 12.9670, lng: 77.6445 }, // Main Boulevard Junction
    { lat: 12.9645, lng: 77.6465 }, // Community Lake bend
    { lat: 12.9616, lng: 77.6482 }  // Customer Residence
  ];

  // Helper to interpolate LatLng along the real multi-segmented route
  const getScooterLatLng = (progress: number) => {
    if (progress <= 0) return realPathPoints[0];
    if (progress >= 1) return realPathPoints[realPathPoints.length - 1];

    const totalSegments = realPathPoints.length - 1;
    const segmentWeight = 1 / totalSegments;
    const activeSegmentIndex = Math.min(
      Math.floor(progress / segmentWeight),
      totalSegments - 1
    );

    const segmentProgress = (progress - activeSegmentIndex * segmentWeight) / segmentWeight;
    const startPt = realPathPoints[activeSegmentIndex];
    const endPt = realPathPoints[activeSegmentIndex + 1];

    return {
      lat: startPt.lat + (endPt.lat - startPt.lat) * segmentProgress,
      lng: startPt.lng + (endPt.lng - startPt.lng) * segmentProgress
    };
  };

  // Stages coordinates on the virtual SVG route
  // The route is a list of points from Store (100, 260) to Home (400, 100)
  // Store is at (100, 260), through streets, to Home at (400, 100)
  const pathPoints = [
    { x: 100, y: 260 }, // Store
    { x: 100, y: 180 }, // Turn 1
    { x: 260, y: 180 }, // Main crossroad
    { x: 260, y: 100 }, // Turn 2
    { x: 400, y: 100 }  // Home
  ];

  // Helper to interpolate position along the multi-segmented path
  const getScooterCoordinates = (progress: number) => {
    // progress is 0 to 1
    if (progress <= 0) return pathPoints[0];
    if (progress >= 1) return pathPoints[pathPoints.length - 1];

    const totalSegments = pathPoints.length - 1;
    const segmentWeight = 1 / totalSegments;
    const activeSegmentIndex = Math.min(
      Math.floor(progress / segmentWeight),
      totalSegments - 1
    );

    const segmentProgress = (progress - activeSegmentIndex * segmentWeight) / segmentWeight;
    const startPt = pathPoints[activeSegmentIndex];
    const endPt = pathPoints[activeSegmentIndex + 1];

    return {
      x: startPt.x + (endPt.x - startPt.x) * segmentProgress,
      y: startPt.y + (endPt.y - startPt.y) * segmentProgress
    };
  };

  // Run the transit timer
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_SIMULATION_SECONDS) {
          clearInterval(timerRef.current);
          setCurrentStage('delivered');
          return TOTAL_SIMULATION_SECONDS;
        }

        // Determine current stages based on time ticks:
        // Confirmed: 0-8
        // Packing: 8-20
        // Out for delivery: 20-45 (Scooter starts riding)
        // Arriving: 45-56 (Scooter very close to home)
        // Delivered: 56+
        if (next < 8) {
          setCurrentStage('confirmed');
        } else if (next < 20) {
          setCurrentStage('packing');
        } else if (next < 45) {
          setCurrentStage('out_for_delivery');
        } else if (next < 56) {
          setCurrentStage('arriving');
        } else {
          setCurrentStage('delivered');
        }

        return next;
      });
    }, 1000 / speedMultiplier);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, speedMultiplier]);

  // Handle auto responding rider chat based on transit phase
  useEffect(() => {
    if (secondsElapsed === 9) {
      appendRiderMessage("I have arrived at the packaging hub! They are putting your fruits & whole sourdough in a sealed bio-degradable safety bag. 🛍️");
    } else if (secondsElapsed === 21) {
      appendRiderMessage("Package collected! Strapping it into my thermal container. Sourced fresh, leaving on my electric scooter now! 🛵🚀");
    } else if (secondsElapsed === 46) {
      appendRiderMessage("Almost there! I just crossed the main boulevard near the community lake reservoir. Be with you in 1 minute! 🏡");
    } else if (secondsElapsed === 57) {
      appendRiderMessage("I have arrived at your doorstep! Placed items securely. Have a wonderful day ahead! Please rate me in the application! ⭐⭐⭐⭐⭐");
    }
  }, [secondsElapsed]);

  // Scroll to chat bottom whenever history updates
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, riderIsTyping]);

  const appendRiderMessage = (text: string) => {
    setRiderIsTyping(true);
    setTimeout(() => {
      setRiderIsTyping(false);
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'rider',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setChatMessage('');

    // Generate immediate context-aware responses from Vicky
    setTimeout(() => {
      setRiderIsTyping(true);
      setTimeout(() => {
        setRiderIsTyping(false);
        let reply = "Got it! I am fully on track to deliver your order instantly. ⚡";
        
        const normalizedInput = userMsg.text.toLowerCase();
        if (normalizedInput.includes('hello') || normalizedInput.includes('hi')) {
          reply = "Hello! Sourcing complete packages safely. Ready to hand over to you real soon!";
        } else if (normalizedInput.includes('gate') || normalizedInput.includes('door') || normalizedInput.includes('reach')) {
          reply = "Understood. I will strictly leave the package as per your delivery remarks. No worries!";
        } else if (normalizedInput.includes('fast') || normalizedInput.includes('hurry') || normalizedInput.includes('quick')) {
          reply = "On it! Speeding through the neighborhood routes with extreme safety precautions. ⚡🏍️";
        } else if (normalizedInput.includes('change') || normalizedInput.includes('add')) {
          reply = "Sorry, since the parcel is already billed and packed, we cannot alter items, but I will make sure the handoff is perfect!";
        }

        setChatHistory((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'rider',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1200);
    }, 500);
  };

  // Calculate dynamic scooter placement
  // The scooter starts traveling between seconds 20 to 56
  // (Range: 36 seconds of travel)
  const travelProgress = Math.max(0, Math.min((secondsElapsed - 20) / 36, 1));
  const scooterPos = getScooterCoordinates(travelProgress);
  const liveScooterLatLng = getScooterLatLng(travelProgress);

  // Time remaining calculator
  const timeRemainingSeconds = Math.max(0, Math.round(((TOTAL_SIMULATION_SECONDS - secondsElapsed) / TOTAL_SIMULATION_SECONDS) * 10));

  const steps = [
    { id: 'confirmed', label: 'Order Confirmed', time: '0-8s', desc: 'System matched & approved', activeClass: 'text-emerald-700 bg-emerald-50' },
    { id: 'packing', label: 'Safety Packing', time: '8-20s', desc: 'Disinfected packaging in progress', activeClass: 'text-indigo-700 bg-indigo-50' },
    { id: 'out_for_delivery', label: 'Transit Riding', time: '20-45s', desc: 'Scooter traveling street nodes', activeClass: 'text-amber-700 bg-amber-50' },
    { id: 'arriving', label: 'Arriving Instant', time: '45-56s', desc: 'Rider reaching apartment bounds', activeClass: 'text-rose-700 bg-rose-50' },
    { id: 'delivered', label: 'Delivered Fresh', time: '56+s', desc: 'Handled over safely', activeClass: 'text-emerald-700 bg-emerald-50' }
  ];

  return (
    <div id="tracking-panel-container" className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 grid lg:grid-cols-12 gap-8 items-start">
      
      <div id="tracking-map-column" className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5 relative overflow-hidden">
        
        {/* Map Header Status Bubbles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span>Real-time Radar Transit Map</span>
              </h3>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none mt-1">Hyperlocal Node Mesh Grid v4.1</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              ~{timeRemainingSeconds} <span className="text-[10px] font-bold font-mono">Mins Away</span>
            </span>
            <p className="text-[9px] uppercase font-mono text-slate-400 leading-none mt-1">Instant Estimated Delivery Time</p>
          </div>
        </div>

        {/* Dynamic Vector Neighborhood Map drawing (Highly animated custom GIS map!) */}
        <div id="radar-mesh-canvas" className="w-full aspect-[4/3] bg-[#0c1322] border border-slate-800 rounded-xl relative overflow-hidden shadow-inner font-mono select-none">
          {/* Subtle grid pattern background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 350">
            <defs>
              <pattern id="gridPatternDark" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
              </pattern>
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="neonGlowStrong">
                <feGaussianBlur stdDeviation="8" result="blur1" />
                <feGaussianBlur stdDeviation="3" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPatternDark)" />
          </svg>

          {/* SATELLITE HUD / TELEMETRY OVERLAY */}
          {showTelemetryHUD && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 left-4 bg-slate-950/90 hover:bg-slate-950 px-3 py-2.5 rounded-lg text-[9px] font-mono text-slate-300 pointer-events-auto border border-slate-800 space-y-1 shadow-lg z-10 max-w-44 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-bold text-white tracking-wider uppercase text-[10px]">RADAR GIS v4</span>
                </div>
                <span className="text-[8px] text-slate-500">IND-BLR</span>
              </div>
              <p className="flex justify-between gap-2 text-slate-400">
                <span>LAT:</span> 
                <span className="text-emerald-400 font-bold">{liveScooterLatLng.lat.toFixed(6)}° N</span>
              </p>
              <p className="flex justify-between gap-2 text-slate-400">
                <span>LON:</span> 
                <span className="text-emerald-400 font-bold">{liveScooterLatLng.lng.toFixed(6)}° E</span>
              </p>
              <p className="flex justify-between gap-2 text-slate-400">
                <span>SPEED:</span> 
                <span className="text-slate-200">
                  {secondsElapsed < 8 ? '0 km/h (HUB)' : secondsElapsed < 20 ? '0 km/h (PACK)' : secondsElapsed >= 56 ? '0 km/h (HOME)' : `${Math.round(41 + Math.sin(secondsElapsed) * 4)} km/h`}
                </span>
              </p>
              <p className="flex justify-between gap-2 text-slate-400">
                <span>RIDER:</span> 
                <span className="text-slate-200 font-semibold">{MOCK_RIDER.name.split(' ')[0]}</span>
              </p>
              <p className="flex justify-between gap-2 text-slate-400">
                <span>VEHICLE:</span> 
                <span className="text-slate-300">E-Scooter ⚡</span>
              </p>
            </motion.div>
          )}

          {/* DYNAMIC LANDMARK INSPECTION WINDOW */}
          <AnimatePresence>
            {selectedLandmark ? (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-4 left-4 right-4 bg-slate-950/95 border border-slate-800 p-3.5 rounded-xl text-slate-200 text-xs font-sans z-10 shadow-2xl flex items-center justify-between gap-4 pointer-events-auto"
              >
                <div className="flex gap-3 items-center">
                  <span className="text-2xl bg-slate-900 border border-slate-800 p-2 rounded-xl leading-none">{selectedLandmark.emoji}</span>
                  <div>
                    <h4 className="font-bold font-display text-slate-100 flex items-center gap-1.5 uppercase text-xs tracking-wider">
                      <span>{selectedLandmark.name}</span>
                      <span className="text-[9px] font-mono font-normal text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-1.5 py-0.2 rounded uppercase">Info Node</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal mt-0.5 max-w-sm sm:max-w-md">{selectedLandmark.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-all font-mono text-[10px] cursor-pointer"
                >
                  DISMISS
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 left-4 text-[9px] text-slate-500 bg-slate-950/45 border border-slate-900/50 px-2.5 py-1.5 relative pointer-events-none rounded-md"
              >
                💡 TIP: Click any landmark on the vector grid to inspect.
              </motion.div>
            )}
          </AnimatePresence>

          {/* HUD LAYER CONTROL PANEL TOGGLES */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 pointer-events-auto">
            <button
              onClick={() => setShowTelemetryHUD(!showTelemetryHUD)}
              className={`p-1.5 rounded bg-slate-950/90 border text-[9px] font-mono tracking-wider transition-all hover:bg-slate-900 flex items-center gap-1.5 ${showTelemetryHUD ? 'border-emerald-500/80 text-emerald-400 font-bold' : 'border-slate-800 text-slate-400'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${showTelemetryHUD ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
              HUD DATA
            </button>
            <button
              onClick={() => setShowScenicPath(!showScenicPath)}
              className={`p-1.5 rounded bg-slate-950/90 border text-[9px] font-mono tracking-wider transition-all hover:bg-slate-900 flex items-center gap-1.5 ${showScenicPath ? 'border-indigo-500/80 text-indigo-400 font-bold' : 'border-slate-800 text-slate-400'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${showScenicPath ? 'bg-indigo-400' : 'bg-slate-600'}`}></span>
              ECO TRAILS
            </button>
            <button
              onClick={() => setShowForests(!showForests)}
              className={`p-1.5 rounded bg-slate-950/90 border text-[9px] font-mono tracking-wider transition-all hover:bg-slate-900 flex items-center gap-1.5 ${showForests ? 'border-emerald-500/80 text-emerald-400 font-bold' : 'border-slate-800 text-slate-400'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${showForests ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
              FOREST ZONES
            </button>
          </div>

          {/* MAP CANVAS (SVG SCENE) */}
          <svg className="w-full h-full" viewBox="0 0 500 350">
            {/* Visual ambient details - Forest/Parks */}
            {showForests && (
              <>
                {/* Organic Farm South West Block */}
                <motion.rect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  x="40" y="210" width="120" height="90" rx="12"
                  fill="#059669"
                  className="transition-all"
                />
                <text x="50" y="225" fill="#34d399" fontSize="7" fontWeight="bold" opacity="0.6">ECO_GREENHOUSE_1</text>
                
                {/* Sarjapur Green Belt (top right) */}
                <motion.rect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  x="300" y="160" width="150" height="130" rx="16"
                  fill="#10b981"
                  className="transition-all"
                />
                <text x="310" y="175" fill="#34d399" fontSize="7" fontWeight="bold" opacity="0.5">SARJAPUR_ECO_RESERVE</text>

                {/* Blue Reservoir Lake Pond */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  d="M 180 60 Q 210 50, 240 70 T 260 100 T 210 110 Z"
                  fill="#38bdf8"
                />
                <text x="195" y="85" fill="#7dd3fc" fontSize="7" fontWeight="bold" opacity="0.7">BLUEVILLE_RESERVOIR</text>
              </>
            )}

            {/* Scenic Bicycle Lane Overlay */}
            {showScenicPath && (
              <g opacity="0.7">
                {/* Faint green dashed glow representing Zero Emissions bike trails */}
                <path
                  d="M 100 260 C 130 260, 150 200, 100 180 S 140 120, 260 100 S 330 60, 400 100"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="4,6"
                  opacity="0.55"
                />
                <path
                  d="M 260 180 Q 290 230, 350 220"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="4,6"
                  opacity="0.55"
                />
              </g>
            )}

            {/* HIGHWAY/STREET INFRASTRUCTURE SYSTEM */}
            {/* The underlying black/dark block grids represent building clusters */}
            <g opacity="0.3">
              <rect x="130" y="30" width="40" height="40" rx="4" fill="#1e293b" />
              <rect x="290" y="40" width="60" height="40" rx="4" fill="#1e293b" />
              <rect x="30" y="110" width="50" height="55" rx="4" fill="#1e293b" />
              <rect x="150" y="110" width="80" height="40" rx="4" fill="#1e293b" />
              <rect x="120" y="210" width="60" height="30" rx="4" fill="#1e293b" />
            </g>

            {/* Street Line backings (wide gray roadbeds that look majestic) */}
            <g opacity="0.85">
              {/* Vertical Street 1 */}
              <line x1="100" y1="40" x2="100" y2="310" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
              <line x1="100" y1="40" x2="100" y2="310" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
              
              {/* Horizontal Crossroad 1 */}
              <line x1="40" y1="180" x2="420" y2="180" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
              <line x1="40" y1="180" x2="420" y2="180" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />

              {/* Vertical Street 2 */}
              <line x1="260" y1="40" x2="260" y2="310" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
              <line x1="260" y1="40" x2="260" y2="310" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />

              {/* Horizontal Crossroad 2 */}
              <line x1="80" y1="100" x2="460" y2="100" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
              <line x1="80" y1="100" x2="460" y2="100" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />

              {/* Lane labels for high simulation accuracy */}
              <text x="106" y="295" fill="rgba(148, 163, 184, 0.45)" fontSize="6" fontWeight="bold" letterSpacing="0.1em" transform="rotate(90 106 295)">KORAMANGALA LANE</text>
              <text x="266" y="270" fill="rgba(148, 163, 184, 0.45)" fontSize="6" fontWeight="bold" letterSpacing="0.1em" transform="rotate(90 266 270)">HAL BROAD BLVD</text>
              <text x="310" y="94" fill="rgba(148, 163, 184, 0.45)" fontSize="6" fontWeight="bold" letterSpacing="0.1em">MUNCHIES AVOCADO HIGHWAY</text>
            </g>

            {/* PLANNED COURIER ROUTE SEGMENTS */}
            <g>
              {/* Overall Static Planned Delivery Route Path in soft dotted amber/gray */}
              <path
                d="M 100 260 L 100 180 L 260 180 L 260 100 L 400 100"
                fill="none"
                stroke="#334155"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 100 260 L 100 180 L 260 180 L 260 100 L 400 100"
                fill="none"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4,6"
              />
            </g>

            {/* DYNAMIC COMPLETED TRANSIT PATH TRAIL */}
            {secondsElapsed >= 20 && (
              <g>
                {/* Dynamically drawing the glowing emerald completed line based on progress segment */}
                <path
                  d={(() => {
                    if (travelProgress <= 0) return "M 100 260";
                    if (travelProgress >= 1) return "M 100 260 L 100 180 L 260 180 L 260 100 L 400 100";
                    
                    // Build path coordinate string up to scooter position
                    let ds = "M 100 260";
                    if (travelProgress > 0.25) ds += " L 100 180";
                    if (travelProgress > 0.55) ds += " L 260 180";
                    if (travelProgress > 0.75) ds += " L 260 100";
                    ds += ` L ${scooterPos.x} ${scooterPos.y}`;
                    return ds;
                  })()}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#neonGlow)"
                  className="transition-all"
                />
              </g>
            )}

            {/* LANDMARKS INTERACTIVE HIT NODES */}
            <g>
              {LANDMARKS.map((lm) => {
                const isSelected = selectedLandmark?.id === lm.id;
                return (
                  <g
                    key={lm.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedLandmark(lm)}
                  >
                    {/* Hover circular bubble */}
                    <circle
                      cx={lm.x}
                      cy={lm.y}
                      r={isSelected ? "18" : "14"}
                      fill="rgba(15, 23, 42, 0.85)"
                      stroke={isSelected ? "#10b981" : "#1e293b"}
                      strokeWidth={isSelected ? "2" : "1"}
                      className="transition-all duration-300 group-hover:stroke-emerald-500 group-hover:scale-110"
                    />
                    
                    {/* Pulsing visual core indicators for key locations */}
                    {lm.id === 'hub' && (
                      <circle cx={lm.x} cy={lm.y} r="22" fill="none" stroke="#10b981" strokeWidth="1" className="opacity-40 animate-ping" />
                    )}
                    {lm.id === 'home' && (
                      <circle cx={lm.x} cy={lm.y} r="22" fill="none" stroke="#f43f5e" strokeWidth="1" className="opacity-45 animate-ping" />
                    )}

                    {/* Emoji center representation */}
                    <text
                      x={lm.x}
                      y={lm.y + 4}
                      textAnchor="middle"
                      fontSize="10"
                      className="pointer-events-none select-none"
                    >
                      {lm.emoji}
                    </text>

                    {/* Faint label caption text block */}
                    <text
                      x={lm.x}
                      y={lm.y - 18}
                      textAnchor="middle"
                      fill={isSelected ? "#10b981" : "#e2e8f0"}
                      fontSize="7"
                      fontWeight="bold"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none fill-slate-300"
                    >
                      {lm.name.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* CUSTOM HUB & HOME DECORATIVE BANNER MARKERS */}
            {/* Sourced Food Box Badge above store hub */}
            <motion.g
              initial={{ y: 2 }}
              animate={{ y: -2 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.8 }}
              className="pointer-events-none"
            >
              <rect x="68" y="210" width="64" height="15" rx="3" fill="#1e293b" stroke="#059669" strokeWidth="1" opacity="0.9" />
              <text x="100" y="220" textAnchor="middle" fill="#34d399" fontSize="6.5" fontWeight="bold">IND_STORE_HUB</text>
            </motion.g>

            {/* Hand-off location badge above sweet home */}
            <motion.g
              initial={{ y: -2 }}
              animate={{ y: 2 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.1 }}
              className="pointer-events-none"
            >
              <rect x="368" y="55" width="64" height="15" rx="3" fill="#1e293b" stroke="#e11d48" strokeWidth="1" opacity="0.9" />
              <text x="400" y="65" textAnchor="middle" fill="#fda4af" fontSize="6.5" fontWeight="bold">YOUR_ADDRESS</text>
            </motion.g>

            {/* RIDER VIKRAM VEHICLE INTERACTIVE OBJECT */}
            {secondsElapsed >= 20 && secondsElapsed < 56 && (
              <motion.g
                id="rider-moving-group"
                style={{
                  transformOrigin: `${scooterPos.x}px ${scooterPos.y}px`
                }}
                animate={{
                  x: scooterPos.x,
                  y: scooterPos.y,
                  rotate: (secondsElapsed < 28) ? -90 : (secondsElapsed < 40) ? 0 : (secondsElapsed < 48) ? -90 : 0
                }}
                transition={{ type: "spring", stiffness: 100, damping: 14 }}
              >
                {/* Concentric radar waves projecting around the rider */}
                <circle
                  cx={0}
                  cy={0}
                  r="24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  className="animate-[ping_2.2s_infinite] opacity-40"
                />
                <circle
                  cx={0}
                  cy={0}
                  r="12"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="1"
                  className="animate-pulse opacity-55"
                />

                {/* Scooter visual avatar marker */}
                <g className="cursor-pointer">
                  {/* Outer container shell */}
                  <rect
                    x={-12}
                    y={-12}
                    width="24"
                    height="24"
                    rx="6"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="shadow-xl"
                  />
                  
                  {/* Delivery Bike Mini Vector Drawing inside */}
                  <g transform="translate(-10, -10) scale(0.8)">
                    <Bike className="w-5 h-5 text-white stroke-[2.5]" />
                  </g>
                </g>

                {/* Overhead visual Courier Tag Name tooltip */}
                <g transform="translate(0, -20)" className="pointer-events-none">
                  <rect x="-24" y="-7" width="48" height="13" rx="3" fill="#10b981" stroke="#ffffff" strokeWidth="0.7" />
                  <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold">VIKRAM (LN04)</text>
                </g>
              </motion.g>
            )}
          </svg>

          {/* DYNAMIC WATERMARK & COMPASS COORDINATE ACCENTS */}
          <div className="absolute bottom-4 right-4 text-right pointer-events-none space-y-0.5">
            <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
              {secondsElapsed < 20 ? '🛰️ Sourcing Cargo' : secondsElapsed >= 56 ? '🏁 Transit Complete' : '🏍️ Active Node Transit'}
            </span>
            <p className="text-[9px] font-mono font-bold text-slate-400">BEARING: {secondsElapsed < 28 ? '000° NORTH' : '090° EAST'}</p>
          </div>
        </div>

        {/* Dynamic Simulation Controls (Speed dials!) */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold font-display uppercase tracking-wider text-slate-800">SIMULATION ENGINE</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Control live clock multipliers for state verification</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Pause/Play */}
            <button
              id="pause-resume-btn"
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 bg-white border border-slate-200 hover:border-slate-300 rounded font-mono hover:bg-slate-100 text-slate-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            >
              {isPaused ? <Play className="w-3 h-3 fill-slate-700" /> : <Pause className="w-3 h-3 fill-slate-700" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            {/* Speeds */}
            <button
              id="speed-multiplier-btn"
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 5 : prev === 5 ? 10 : 1))}
              className="p-2 bg-white border border-slate-200 hover:border-slate-300 rounded font-mono hover:bg-slate-100 text-slate-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider min-w-16 justify-center"
            >
              <FastForward className="w-3 h-3" />
              <span>{speedMultiplier}x</span>
            </button>

            {/* Reset */}
            <button
              id="restart-sim-btn"
              onClick={() => {
                setSecondsElapsed(0);
                setCurrentStage('confirmed');
                setIsPaused(false);
              }}
              className="p-2 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100/50 text-rose-800 font-mono transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              title="Restart delivery simulation"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Dynamic Activity/Transit Ticker message */}
        <div className="bg-slate-900 border border-slate-950 p-4 rounded-lg flex items-start gap-3">
          <div className="p-1.5 rounded bg-slate-800 text-slate-300 mt-0.5 border border-slate-700">
            <Clock className="w-3.5 h-3.5 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">AUTOMATED TELEMETRY TRANSIT FEED</span>
            <p id="ticker-msg" className="text-xs font-mono text-emerald-400">
              {secondsElapsed < 4 ? '>>> SYSTEM AUTOMATICALLY CONFIRMING PAYMENT TOKEN CONTRACT...' :
               secondsElapsed < 8 ? '>>> MERCHANT HUB ACCEPTED FRESH CARGO PICKUP SHEET...' :
               secondsElapsed < 14 ? '>>> CONTAINER HUB ROUTING SECURED BIO-DEGRADABLE COLD CHAMBERS...' :
               secondsElapsed < 20 ? '>>> SEALING THERMAL STORAGE CONTAINER VESSEL...' :
               secondsElapsed < 26 ? '>>> COURIER RIDER VIKRAM ACCEPTED PARCEL NAVIGATION MAP...' :
               secondsElapsed < 35 ? '>>> COURIER SCOOTER PASSED HIGH SPEED ROAD NODE CHECKPOINT...' :
               secondsElapsed < 45 ? '>>> SCOOTER CROSSING BOULEVARD INTERSECTION CROSSROADS...' :
               secondsElapsed < 56 ? '>>> ENTERED PROPERTY PREMISES BOUNDARY. ARRIVING IMMINENT...' :
               '>>> PARCEL PLACED AT THE RECIPIENTS DOORSTEP. DELIVERED OPTIMALLY!'}
            </p>
          </div>
        </div>
      </div>

      {/* Checklist Status Tracker & Immersive chat - 5cols */}
      <div id="tracking-checklist-column" className="lg:col-span-12 lg:col-span-5 space-y-6">
        
        {/* Rider profile widget card */}
        <div id="rider-card" className="bg-slate-900 border border-slate-800 text-white rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono text-emerald-400 font-bold tracking-widest bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded uppercase font-bold">
              Assigned Courier Node
            </span>
            <span className="text-[9px] bg-slate-850 text-slate-300 font-mono px-2 py-0.5 rounded uppercase">⚡ Electric fleet</span>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={MOCK_RIDER.avatar}
              alt={MOCK_RIDER.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 object-cover rounded border border-slate-700 shadow-md"
            />
            <div className="flex-grow">
              <h4 className="text-xs font-bold font-display uppercase tracking-wide text-slate-100">{MOCK_RIDER.name}</h4>
              <p className="text-[10px] text-slate-400 font-mono leading-none mt-0.5">{MOCK_RIDER.vehicleNumber}</p>
              
              <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                <div className="flex items-center text-amber-400 font-bold bg-slate-950/60 border border-slate-800 px-1.5 py-0.5 rounded text-[9px] font-mono">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 mr-1" />
                  <span>{MOCK_RIDER.rating}</span>
                </div>
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">(9,420+ Runs completed)</span>
              </div>
            </div>
          </div>

          {/* Contact segment buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-800">
            <button
              onClick={() => alert(`Simulating phone call directly to Vikram Rathore: ${MOCK_RIDER.phone}`)}
              className="flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-slate-705 rounded border border-slate-705 text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer text-slate-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Voice Call</span>
            </button>

            <button
              id="open-chat-btn"
              onClick={() => setChatOpen(true)}
              className="flex items-center justify-center gap-1.5 py-2 bg-emerald-700 hover:bg-emerald-600 rounded border border-emerald-850 text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer text-white"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Msg</span>
            </button>
          </div>
        </div>

        {/* Main interactive Delivery Stage panel */}
        <div id="stages-panel" className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2.5">
            Real-time Delivery Milestones
          </h4>

          <div className="space-y-4 relative">
            {/* Visual connector line trail */}
            <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-slate-150" />

            {steps.map((stg) => {
              const isPastStage = (stageToCheck: OrderStage, activeStage: OrderStage): boolean => {
                const order: OrderStage[] = ['confirmed', 'packing', 'out_for_delivery', 'arriving', 'delivered'];
                return order.indexOf(stageToCheck) <= order.indexOf(activeStage);
              };

              const isCompleted = isPastStage(stg.id as OrderStage, currentStage) && currentStage !== stg.id;
              const isCurrent = currentStage === stg.id;

              return (
                <div key={stg.id} className="flex items-start gap-3.5">
                  {/* Circle element badge indicator */}
                  <div className="relative shrink-0 z-10 mt-0.5">
                    {isCompleted ? (
                      <div className="w-6.5 h-6.5 rounded-full bg-slate-900 text-white flex items-center justify-center border border-slate-900 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-6.5 h-6.5 rounded-full bg-emerald-50 border border-emerald-600 text-emerald-800 flex items-center justify-center animate-pulse shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-6.5 h-6.5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* Checklist Data details */}
                  <div className="flex-grow leading-tight min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold uppercase tracking-wider font-display ${isCurrent ? 'text-emerald-800' : isCompleted ? 'text-slate-500 font-semibold' : 'text-slate-400 font-medium'}`}>
                        {stg.label}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 shrink-0">{stg.time}</span>
                    </div>
                    <p className={`text-[10px] font-medium leading-relaxed mt-1 ${isCurrent ? 'text-slate-700' : isCompleted ? 'text-slate-400' : 'text-slate-300'}`}>
                      {stg.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order billing summary overview */}
        <div id="bill-receipt-panel" className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs text-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h4 className="text-xs font-bold font-display uppercase tracking-wider text-slate-800">Parcel Bill Receipt</h4>
            <span className="font-mono text-[9px] bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded">
              #{Math.round(100000 + Math.random() * 900000)}
            </span>
          </div>

          <div className="space-y-2 text-slate-600 max-h-24 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center font-mono text-[10px] pb-1 border-b border-slate-50 last:border-0 last:pb-0">
                <span className="truncate max-w-[180px] text-slate-700 uppercase">{item.product.name} x {item.quantity}</span>
                <span className="text-slate-900 font-bold shrink-0">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-slate-200 pt-2.5 space-y-2 text-slate-600">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-405 font-medium leading-none">Paid Mode: <span className="font-display uppercase font-bold text-slate-800">{paymentMethod.replace('_', ' ')}</span></span>
              <span className="text-emerald-800 font-extrabold text-xs">Total: ₹{grandTotal}</span>
            </div>
          </div>

          <button
            onClick={onNewOrder}
            className="w-full bg-slate-900 border border-slate-950 hover:bg-slate-800 py-2.5 rounded text-white font-bold font-display text-[10px] uppercase tracking-wider cursor-pointer text-center shadow-xs transition-colors"
          >
            🛒 Order Something Else
          </button>
        </div>
      </div>

      {/* Floating immersive Rider Chat overlay */}
      <AnimatePresence>
        {chatOpen && (
          <div id="rider-chat-backdrop" className="fixed inset-0 z-55 flex items-end sm:items-center justify-center p-4">
            {/* Backdrop element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            {/* Chat screen content */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-sm h-[480px] flex flex-col justify-between relative shadow-2xl overflow-hidden border border-slate-200 z-10 text-slate-800"
            >
              {/* Chat Header */}
              <div className="bg-slate-900 border-b border-slate-950 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={MOCK_RIDER.avatar}
                    alt={MOCK_RIDER.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 object-cover rounded border border-emerald-500"
                  />
                  <div>
                    <h5 className="text-xs font-bold font-display uppercase tracking-wide">{MOCK_RIDER.name}</h5>
                    <p className="text-[9px] text-emerald-400 font-mono animate-pulse uppercase tracking-wider">🛵 Riding Electric Fleet</p>
                  </div>
                </div>
                <button
                  id="close-chat-widget-btn"
                  onClick={() => setChatOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages flow container */}
              <div id="chat-messages-scroll" className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3">
                {chatHistory.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded px-3.5 py-2 text-xs ${
                          isUser
                             ? 'bg-slate-900 text-white rounded-tr-none shadow-xs'
                             : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="text-[8px] text-slate-400 font-mono mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Loading feedback typing indicator */}
                {riderIsTyping && (
                  <div className="flex flex-col items-start">
                    <div className="bg-white border border-slate-200 rounded rounded-tl-none px-3.5 py-2 shadow-2xs">
                      <div className="flex gap-1 items-center">
                        <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" />
                        <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                    <span className="text-[8px] text-slate-400 font-mono mt-1">Vikram is typing...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Message Typing Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Type a transit message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-grow bg-slate-50 focus:bg-white border border-slate-200 focus:border-slate-400 px-3 py-2 rounded text-xs outline-none transition-all"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded transition-all cursor-pointer shadow-xs shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


