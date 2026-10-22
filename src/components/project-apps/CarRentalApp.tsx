import React, { useState } from 'react';
import { ThemeMode } from '../../types/portfolio';
import { Car, Calendar, ShieldCheck, Zap, Check, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  theme: ThemeMode;
}

interface Vehicle {
  id: string;
  name: string;
  category: 'Electric' | 'Luxury Sedan' | 'Sports Exotic' | 'SUV';
  dailyRate: number;
  seats: number;
  specs: string;
  transmission: string;
}

const VEHICLES: Vehicle[] = [
  { id: 'v1', name: 'Porsche Taycan 4S Electric', category: 'Electric', dailyRate: 240, seats: 4, specs: '0-60 in 3.8s · 522 HP', transmission: 'Auto' },
  { id: 'v2', name: 'Range Rover Defender 110', category: 'SUV', dailyRate: 195, seats: 7, specs: 'AWD Terrain Response · 395 HP', transmission: 'Auto' },
  { id: 'v3', name: 'Mercedes-Benz S-Class 580', category: 'Luxury Sedan', dailyRate: 260, seats: 5, specs: 'Executive Reclining · Twin-Turbo V8', transmission: 'Auto' },
  { id: 'v4', name: 'Porsche 911 Carrera GTS', category: 'Sports Exotic', dailyRate: 340, seats: 2, specs: '0-60 in 3.2s · Sport Chrono', transmission: 'PDK' }
];

export const CarRentalApp: React.FC<Props> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(VEHICLES[0]);
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [addons, setAddons] = useState({
    collisionWaiver: true,
    gps: false,
    unlimitedMileage: true
  });
  const [reservationCode, setReservationCode] = useState<string | null>(null);

  const filteredVehicles = selectedCategory === 'All'
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === selectedCategory);

  const baseRateSubtotal = selectedVehicle.dailyRate * rentalDays;
  let addonSubtotal = 0;
  if (addons.collisionWaiver) addonSubtotal += 28 * rentalDays;
  if (addons.gps) addonSubtotal += 12 * rentalDays;
  if (addons.unlimitedMileage) addonSubtotal += 19 * rentalDays;

  const tax = Number(((baseRateSubtotal + addonSubtotal) * 0.08).toFixed(2));
  const totalCost = Number((baseRateSubtotal + addonSubtotal + tax).toFixed(2));

  const handleBook = () => {
    const code = `FZ-RENT-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(code);
  };

  return (
    <div className="space-y-6">
      {/* App Header Banner */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isDark ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-[#c28b5e]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Interactive Car Rental Platform
            </h4>
            <p className="text-[11px] text-stone-400">
              Fleet booking engine built with Next.js, TypeScript, and Sanity CMS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg border border-stone-800 bg-stone-950">
          {['All', 'Electric', 'SUV', 'Luxury Sedan', 'Sports Exotic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#9c6738] text-white font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reservation Confirmation Modal Toast */}
      {reservationCode && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-white text-xs flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold">Reservation Confirmed: {reservationCode}</div>
              <div className="text-[11px] text-emerald-200">
                {selectedVehicle.name} · {rentalDays} Days · ${totalCost} USD Total
              </div>
            </div>
          </div>
          <button
            onClick={() => setReservationCode(null)}
            className="text-xs underline text-emerald-300 hover:text-white cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Vehicle Grid & Booking Quote Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Vehicle Selection Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Select Vehicle ({filteredVehicles.length} Available)</span>
            <span>Current: {selectedVehicle.name}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredVehicles.map((vehicle) => {
              const isSelected = selectedVehicle.id === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#9c6738]/20 border-[#c28b5e] shadow-md shadow-[#9c6738]/20'
                      : isDark
                      ? 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#c28b5e] mb-1">
                      <span>{vehicle.category}</span>
                      <span>{vehicle.transmission}</span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-stone-100">
                      {vehicle.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-1">{vehicle.specs}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-white">${vehicle.dailyRate}</span>
                      <span className="text-[10px] text-stone-400"> /day</span>
                    </div>

                    <span className={`px-2 py-0.5 text-[10px] rounded font-semibold ${
                      isSelected ? 'bg-[#c28b5e] text-stone-950' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {isSelected ? 'Selected' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Calculator & Booking Voucher */}
        <div className={`lg:col-span-5 p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Reservation Parameters
            </h4>

            {/* Rental Duration Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-stone-400">Rental Duration:</span>
                <span className="font-mono text-[#dfb692] font-bold">{rentalDays} Days</span>
              </div>
              <input
                type="range"
                min={1}
                max={14}
                value={rentalDays}
                onChange={(e) => setRentalDays(Number(e.target.value))}
                className="w-full accent-[#c28b5e] cursor-pointer"
              />
            </div>

            {/* Add-ons Checklist */}
            <div className="space-y-2 text-xs">
              <label className="text-stone-400 block text-[11px] font-mono uppercase">Add-On Packages</label>
              
              <label className="flex items-center justify-between p-2 rounded-lg border border-stone-800 bg-stone-950 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addons.collisionWaiver}
                    onChange={(e) => setAddons({ ...addons, collisionWaiver: e.target.checked })}
                    className="accent-[#c28b5e]"
                  />
                  <span>Collision Damage Waiver (Zero Deductible)</span>
                </div>
                <span className="font-mono text-[#c28b5e]">+$28/d</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg border border-stone-800 bg-stone-950 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addons.unlimitedMileage}
                    onChange={(e) => setAddons({ ...addons, unlimitedMileage: e.target.checked })}
                    className="accent-[#c28b5e]"
                  />
                  <span>Unlimited Range / Supercharging</span>
                </div>
                <span className="font-mono text-[#c28b5e]">+$19/d</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg border border-stone-800 bg-stone-950 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addons.gps}
                    onChange={(e) => setAddons({ ...addons, gps: e.target.checked })}
                    className="accent-[#c28b5e]"
                  />
                  <span>Pre-Programmed Satellite Navigation</span>
                </div>
                <span className="font-mono text-[#c28b5e]">+$12/d</span>
              </label>
            </div>

            {/* Price Breakdown */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
              isDark ? 'bg-stone-950 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex justify-between text-stone-400">
                <span>Vehicle Base ({rentalDays}d × ${selectedVehicle.dailyRate}):</span>
                <span className="font-mono">${baseRateSubtotal}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Selected Add-ons:</span>
                <span className="font-mono">${addonSubtotal}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>State & Municipal Tax (8%):</span>
                <span className="font-mono">${tax}</span>
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-white text-sm">
                <span>Total Reservation Quote:</span>
                <span className="font-mono text-[#dfb692]">${totalCost} USD</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-3 px-4 rounded-xl bg-[#9c6738] hover:bg-[#85542b] text-white text-xs font-bold transition-all shadow-md shadow-[#9c6738]/25 border border-[#c28b5e]/40 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Confirm Booking & Generate Voucher</span>
            <ArrowRight className="w-4 h-4 text-[#dfb692]" />
          </button>
        </div>

      </div>
    </div>
  );
};
