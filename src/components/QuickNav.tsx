import React from 'react';
import { useApp } from '../context/AppContext';
import { GameCategory } from '../types';
import { 
  ArrowDownCircle, ArrowUpCircle, Flame, Heart, Gamepad2, Tv2, 
  Trophy, Swords, Diamond, Target, Globe2, Anchor, Ticket, Headphones
} from 'lucide-react';

export const QuickNav: React.FC = () => {
  const { 
    setIsDepositModalOpen, 
    setIsWithdrawModalOpen, 
    activeCategory, 
    setActiveCategory,
    setIsSideDrawerOpen
  } = useApp();

  const categories: { id: GameCategory; name: string; icon: any }[] = [
    { id: 'hot', name: 'Hot Games', icon: Flame },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'slots', name: 'Slots', icon: Gamepad2 },
    { id: 'casino', name: 'Live Casino', icon: Tv2 },
    { id: 'sports', name: 'Sports', icon: Trophy },
    { id: 'virtual', name: 'VR Virtual', icon: Globe2 },
    { id: 'esports', name: 'E-sports', icon: Swords },
    { id: 'poker', name: 'Poker', icon: Diamond },
    { id: 'fish', name: 'Fish', icon: Anchor },
    { id: 'lottery', name: 'Lottery', icon: Ticket }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 my-3">
      {/* Primary Deposit & Withdraw Action Cards - Matching Screenshot 6 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setIsDepositModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0d6b5e] to-[#043d37] border-2 border-amber-400/60 rounded-xl p-3 shadow-lg hover:brightness-110 active:scale-98 transition-all group"
          id="quick-deposit-btn"
        >
          <div className="p-2 bg-amber-400 text-slate-950 rounded-lg group-hover:scale-110 transition-transform">
            <ArrowDownCircle className="w-5 h-5 font-bold" />
          </div>
          <div className="text-left">
            <span className="block text-xs text-amber-200/80 font-medium">ইনস্ট্যান্ট জমা</span>
            <span className="block text-sm sm:text-base font-black text-amber-300">Deposit</span>
          </div>
        </button>

        <button
          onClick={() => setIsWithdrawModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#043d37] to-[#022824] border-2 border-teal-400/40 rounded-xl p-3 shadow-lg hover:brightness-110 active:scale-98 transition-all group"
          id="quick-withdraw-btn"
        >
          <div className="p-2 bg-teal-400 text-slate-950 rounded-lg group-hover:scale-110 transition-transform">
            <ArrowUpCircle className="w-5 h-5 font-bold" />
          </div>
          <div className="text-left">
            <span className="block text-xs text-emerald-200/80 font-medium">দ্রুত উত্তোলন</span>
            <span className="block text-sm sm:text-base font-black text-emerald-300">Withdraw</span>
          </div>
        </button>
      </div>

      {/* Horizontal Scroll Category Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border shrink-0 ${
                isActive
                  ? 'bg-gold-button text-slate-950 border-amber-300 shadow-md scale-105'
                  : 'bg-[#043430] text-amber-100/90 border-[#ffd700]/20 hover:bg-[#06423c] hover:text-amber-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
