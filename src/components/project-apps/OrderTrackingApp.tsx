import React, { useState } from 'react';
import { ThemeMode } from '../../types/portfolio';
import { ShoppingBag, ArrowRight, CheckCircle2, Package, Truck, Clock, RefreshCw, FileText, Download } from 'lucide-react';

interface Props {
  theme: ThemeMode;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: 'PRD-101', name: 'Ergonomic Desk & Monitor Arm', category: 'Hardware', price: 280, stock: 12 },
  { id: 'PRD-102', name: 'NVIDIA RTX AI Compute Rig', category: 'Deep Learning', price: 1450, stock: 4 },
  { id: 'PRD-103', name: 'Mechanical Low-Profile Keyboard', category: 'Accessories', price: 125, stock: 20 },
  { id: 'PRD-104', name: 'Noise-Cancelling Studio Headset', category: 'Audio', price: 195, stock: 15 }
];

const STAGES = [
  { stage: 1, title: 'Order Placed', desc: 'Payment verified & order ID created' },
  { stage: 2, title: 'Picked & Packed', desc: 'Items scanned & packed in warehouse' },
  { stage: 3, title: 'Logistics Hub', desc: 'Dispatched to central transit depot' },
  { stage: 4, title: 'Out for Delivery', desc: 'Courier on final route to destination' },
  { stage: 5, title: 'Delivered', desc: 'Delivery signed & recorded in ledger' }
];

export const OrderTrackingApp: React.FC<Props> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [cart, setCart] = useState<Record<string, number>>({
    'PRD-101': 1,
    'PRD-103': 1
  });

  const [orderState, setOrderState] = useState<{
    orderId: string;
    stage: number;
    placedAt: string;
    customer: { name: string; city: string };
  } | null>({
    orderId: 'ORD-PK-2026-8941',
    stage: 2,
    placedAt: '2026-10-22 14:30 PKT',
    customer: { name: 'Dr. Tariq Mahmood', city: 'Karachi, Pakistan' }
  });

  const [notification, setNotification] = useState<string | null>(null);

  const calculateSubtotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = SAMPLE_PRODUCTS.find((prod) => prod.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = Number((subtotal * 0.15).toFixed(2));
  const shipping = subtotal > 0 ? 15.0 : 0;
  const grandTotal = Number((subtotal + tax + shipping).toFixed(2));

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleCreateOrder = () => {
    if (subtotal === 0) return;
    const newId = `ORD-PK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderState({
      orderId: newId,
      stage: 1,
      placedAt: new Date().toLocaleTimeString() + ' PKT',
      customer: { name: 'Fatima Portfolio Evaluator', city: 'Karachi, PK' }
    });
    setNotification(`New Order ${newId} initialized in Python OOP memory!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdvanceStage = () => {
    if (!orderState) return;
    setOrderState((prev) => {
      if (!prev) return null;
      const nextStage = prev.stage < 5 ? prev.stage + 1 : 1;
      return { ...prev, stage: nextStage };
    });
  };

  const generateJSON = () => {
    if (!orderState) return '{}';
    const items = Object.entries(cart).map(([id, qty]) => {
      const prod = SAMPLE_PRODUCTS.find((p) => p.id === id);
      return {
        product_id: id,
        product_name: prod?.name,
        qty,
        unit_price: prod?.price,
        total: (prod?.price || 0) * qty
      };
    });

    return JSON.stringify(
      {
        order_id: orderState.orderId,
        timestamp: orderState.placedAt,
        status_stage: orderState.stage,
        status_label: STAGES[orderState.stage - 1]?.title,
        customer: orderState.customer,
        financials: {
          subtotal,
          sales_tax_15pct: tax,
          freight_shipping: shipping,
          grand_total_usd: grandTotal
        },
        items,
        thread_safe_disk_persisted: true
      },
      null,
      2
    );
  };

  const handleDownloadJSON = () => {
    const jsonStr = generateJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${orderState?.orderId || 'order'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* App Header Banner */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isDark ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#c28b5e]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Interactive E-Commerce & Order Pipeline
            </h4>
            <p className="text-[11px] text-stone-400">
              Python OOP state machine simulation with live serialized JSON persistence
            </p>
          </div>
        </div>

        {orderState && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-stone-400">Active Order:</span>
            <span className="text-[#dfb692] font-bold">{orderState.orderId}</span>
          </div>
        )}
      </div>

      {notification && (
        <div className="p-3 rounded-lg bg-[#9c6738]/20 border border-[#c28b5e]/40 text-[#dfb692] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid: Catalogue & Cart vs Real-Time Tracking & JSON */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Product Selection & Cart */}
        <div className={`lg:col-span-6 p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              1. Store Inventory Catalogue
            </h4>
            <span className="text-[11px] font-mono text-stone-400">4 SKUs in Stock</span>
          </div>

          <div className="space-y-2.5">
            {SAMPLE_PRODUCTS.map((prod) => {
              const qty = cart[prod.id] || 0;
              return (
                <div
                  key={prod.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                    isDark ? 'bg-stone-950 border-stone-800/80' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-stone-200">{prod.name}</div>
                    <div className="text-[11px] text-[#c28b5e] font-mono">
                      ${prod.price} USD · {prod.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {qty > 0 ? (
                      <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-700 rounded-lg p-1">
                        <button
                          onClick={() => handleUpdateQty(prod.id, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-stone-800 text-stone-300 cursor-pointer font-bold"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-white text-xs">{qty}</span>
                        <button
                          onClick={() => handleUpdateQty(prod.id, 1)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-stone-800 text-stone-300 cursor-pointer font-bold"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(prod.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-white transition-colors cursor-pointer border border-stone-700"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Financial Summary */}
          <div className={`p-4 rounded-xl border space-y-2 text-xs ${
            isDark ? 'bg-stone-950/70 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex justify-between text-stone-400">
              <span>Items Subtotal:</span>
              <span className="font-mono text-stone-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Sales Tax (15%):</span>
              <span className="font-mono text-stone-200">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Courier Flat Freight:</span>
              <span className="font-mono text-stone-200">${shipping.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-sm text-white">
              <span>Grand Total:</span>
              <span className="font-mono text-[#dfb692]">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCreateOrder}
            disabled={subtotal === 0}
            className="w-full py-3 px-4 rounded-xl bg-[#9c6738] hover:bg-[#85542b] text-white text-xs font-bold transition-all shadow-md shadow-[#9c6738]/25 border border-[#c28b5e]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
          >
            <Package className="w-4 h-4 text-[#dfb692]" />
            <span>Generate & Place Order (OOP Model)</span>
          </button>
        </div>

        {/* Right: Milestone Stepper & JSON Serializer */}
        <div className={`lg:col-span-6 p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                2. Live Order State Pipeline
              </h4>

              {orderState && (
                <button
                  onClick={handleAdvanceStage}
                  className="px-2.5 py-1 text-xs rounded-lg bg-stone-800 hover:bg-stone-700 text-[#dfb692] border border-stone-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Stepper Timeline */}
            {orderState ? (
              <div className="space-y-2 mb-4">
                {STAGES.map((s) => {
                  const isCurrent = orderState.stage === s.stage;
                  const isDone = orderState.stage > s.stage;

                  return (
                    <div
                      key={s.stage}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 text-xs transition-all ${
                        isCurrent
                          ? 'bg-[#9c6738]/20 border-[#c28b5e] text-white font-semibold'
                          : isDone
                          ? 'bg-stone-950/80 border-emerald-500/40 text-stone-300'
                          : 'bg-stone-950/30 border-stone-800/60 text-stone-500'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isCurrent
                          ? 'bg-[#c28b5e] text-stone-950'
                          : isDone
                          ? 'bg-emerald-500 text-stone-950'
                          : 'bg-stone-800 text-stone-400'
                      }`}>
                        {isDone ? '✓' : s.stage}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{s.title}</span>
                          {isCurrent && (
                            <span className="text-[10px] text-[#dfb692] uppercase font-mono">Current Stage</span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-400 font-normal">{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-stone-500">
                Place an order to initialize the tracking state machine.
              </div>
            )}
          </div>

          {/* JSON File Inspector */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono text-stone-400">
              <span className="text-[#c28b5e] font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                orders.json (Serialized OOP Record)
              </span>

              <button
                onClick={handleDownloadJSON}
                className="text-[11px] text-[#dfb692] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Export JSON</span>
              </button>
            </div>

            <pre className={`p-3 rounded-xl border text-[11px] font-mono max-h-48 overflow-y-auto leading-tight selection:bg-[#c28b5e]/30 ${
              isDark ? 'bg-stone-950 border-stone-800 text-stone-300' : 'bg-stone-100 border-stone-300 text-stone-800'
            }`}>
              {generateJSON()}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
