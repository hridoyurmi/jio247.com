import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, RefreshCw, ArrowRightLeft, Sparkles, ShieldCheck, Lock, UserCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    currentView, 
    setCurrentView, 
    setIsDepositModalOpen, 
    setIsSideDrawerOpen,
    setIsAvatarModalOpen,
    setIsGameLockModalOpen,
    setLockedGame,
    games
  } = useApp();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleOpenLockScreen = () => {
    if (games.length > 0) {
      setLockedGame(games[0]);
    }
    setIsGameLockModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-2xl">
      {/* Top Banner Bar with View Switcher, Lock Screen & Motto */}
      <div className="bg-[#050505] px-3 py-1 flex justify-between items-center text-xs border-b border-white/5 gap-2">
        <div className="flex items-center gap-1.5 text-[#FFD700] font-bold text-[10px] sm:text-[11px] truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-pulse shrink-0" />
          <span className="truncate">Jio247.com — Asia's Most Trusted Royal Gaming & 24/7 Live Sports Odds Portal</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenLockScreen}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 hover:text-white font-black hover:scale-105 transition-all text-[10px]"
            title="গেম স্ক্রিন লক করুন (Real Game Lock Screen)"
          >
            <Lock className="w-3 h-3 text-red-400" />
            <span className="hidden sm:inline">স্ক্রিন লক (Lock Screen)</span>
          </button>

          <button
            onClick={() => setCurrentView(currentView === 'player' ? 'admin' : 'player')}
            className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#9f7928] text-slate-950 font-black hover:scale-105 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.4)] text-[10px] sm:text-[11px]"
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span>{currentView === 'player' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'প্লেয়ার ভিউ'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 py-2.5 flex items-center justify-between gap-2">
        {/* Left Side: Drawer Hamburger Menu & Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSideDrawerOpen(true)}
            className="p-2 rounded-xl bg-[#0f0f0f] border border-[#D4AF37]/30 text-[#FFD700] hover:border-[#FFD700] active:scale-95 transition-all shadow-md"
            title="Menu Drawer"
            id="header-menu-toggle-btn"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo 3D Metallic Gold Styling */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('player')}>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gold-shine drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] flex items-center gap-1 italic">
              <span>JIO247.COM</span>
            </h1>
          </div>
        </div>

        {/* Right Side: User Info & Quick Action */}
        <div className="flex items-center gap-2.5">
          {/* User Profile Avatar Chip */}
          <div 
            onClick={() => setIsAvatarModalOpen(true)}
            className="flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#1a1a1a] border border-[#D4AF37]/40 hover:border-[#FFD700] rounded-full py-1 px-3 shadow-inner cursor-pointer transition-all"
            title="অ্যাভাটার পরিবর্তন করুন (Change Avatar)"
          >
            <div className="relative flex items-center justify-center">
              <span className="text-xl sm:text-2xl">{currentUser.avatar || '🐯'}</span>
              <span className="absolute -bottom-1 -right-1 bg-[#FFD700] text-slate-950 text-[8px] font-black px-1 rounded-full border border-black">
                VIP{currentUser.vipLevel}
              </span>
            </div>

            {/* Balance Display */}
            <div className="flex flex-col text-right pr-1">
              <span className="text-[9px] text-[#00BFFF] uppercase font-bold tracking-wider leading-none">ব্যালেন্স</span>
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm font-black text-[#FFD700] font-mono">
                  ৳ {currentUser.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefresh();
                  }}
                  className={`text-[#00BFFF] hover:text-white transition-transform ${isRefreshing ? 'animate-spin' : ''}`}
                  title="Refresh Balance"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Deposit Quick Button */}
          <button
            onClick={() => setIsDepositModalOpen(true)}
            className="hidden sm:flex items-center gap-1 bg-gold-button font-black text-slate-950 text-xs px-3.5 py-2 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md"
            id="header-deposit-btn"
          >
            <span>ডিপোজিট</span>
          </button>
        </div>
      </div>
    </header>
  );
};
