import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, Flame, UserPlus, Heart, Gift, Gamepad2, Award, Tv2, 
  RotateCcw, Trophy, Crown, Swords, Target, Diamond, Globe, Anchor, 
  Download, Ticket, Headphones 
} from 'lucide-react';

export const SideDrawer: React.FC = () => {
  const { 
    isSideDrawerOpen, 
    setIsSideDrawerOpen, 
    setActiveCategory, 
    setActivePlayerTab, 
    setIsDepositModalOpen,
    setIsWithdrawModalOpen
  } = useApp();

  if (!isSideDrawerOpen) return null;

  const menuItems = [
    { name: 'Hot Games', icon: Flame, action: () => { setActiveCategory('hot'); setActivePlayerTab('home'); } },
    { name: 'Invite friends', icon: UserPlus, action: () => { setActivePlayerTab('invite'); } },
    { name: 'Favorites', icon: Heart, action: () => { setActiveCategory('favorites'); setActivePlayerTab('home'); } },
    { name: 'Promotion', icon: Gift, action: () => { setActivePlayerTab('promotion'); } },
    { name: 'Slots', icon: Gamepad2, action: () => { setActiveCategory('slots'); setActivePlayerTab('home'); } },
    { name: 'Reward Center', icon: Award, action: () => { setActivePlayerTab('reward'); } },
    { name: 'Live Casino', icon: Tv2, action: () => { setActiveCategory('casino'); setActivePlayerTab('home'); } },
    { name: 'Manual rebate', icon: RotateCcw, action: () => { setActivePlayerTab('member'); } },
    { name: 'Sports', icon: Trophy, action: () => { setActiveCategory('sports'); setActivePlayerTab('home'); } },
    { name: 'VIP', icon: Crown, action: () => { setActivePlayerTab('member'); } },
    { name: 'E-sports', icon: Swords, action: () => { setActiveCategory('esports'); setActivePlayerTab('home'); } },
    { name: 'Mission', icon: Target, action: () => { setActivePlayerTab('reward'); } },
    { name: 'Poker', icon: Diamond, action: () => { setActiveCategory('poker'); setActivePlayerTab('home'); } },
    { name: 'Language', icon: Globe, action: () => { alert('বাংলা / English Language Selected'); } },
    { name: 'Fish', icon: Anchor, action: () => { setActiveCategory('fish'); setActivePlayerTab('home'); } },
    { name: 'APP Download', icon: Download, action: () => { alert('Jio247 Android App APK Download started!'); } },
    { name: 'Lottery', icon: Ticket, action: () => { setActiveCategory('lottery'); setActivePlayerTab('home'); } },
    { name: 'Customer Service', icon: Headphones, action: () => { alert('Live Chat 24/7 Agent connected!'); } }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSideDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-80 max-w-[85vw] bg-[#022320] border-r border-[#ffd700]/30 h-full overflow-y-auto p-4 z-10 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#ffd700]/20 mb-4">
            <h3 className="text-xl font-black text-gold-shine">
              JIO247.COM
            </h3>
            <button
              onClick={() => setIsSideDrawerOpen(false)}
              className="p-1 rounded-full bg-[#053b36] text-amber-300 hover:bg-red-900/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Deposit & Withdraw Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => { setIsDepositModalOpen(true); setIsSideDrawerOpen(false); }}
              className="bg-gold-button font-bold text-slate-950 text-xs py-2 rounded-lg text-center"
            >
              Deposit
            </button>
            <button
              onClick={() => { setIsWithdrawModalOpen(true); setIsSideDrawerOpen(false); }}
              className="bg-[#053b36] border border-amber-400/40 text-amber-300 font-bold text-xs py-2 rounded-lg text-center"
            >
              Withdraw
            </button>
          </div>

          {/* Menu Items Matrix - Matching Screenshot 4 */}
          <div className="grid grid-cols-2 gap-2.5">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setIsSideDrawerOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#04332e] border border-[#ffd700]/20 hover:border-amber-400 hover:bg-[#074c44] transition-all group"
                >
                  <Icon className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform mb-1.5" />
                  <span className="text-xs text-amber-100 font-bold text-center leading-tight">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#ffd700]/20 text-center text-emerald-200/60 text-xs">
          <span>Jio247 Verified Official Gaming Site</span>
        </div>
      </div>
    </div>
  );
};
