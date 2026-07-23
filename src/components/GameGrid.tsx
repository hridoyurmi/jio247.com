import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GameCard } from './GameCard';
import { GameCategory } from '../types';
import { Flame, Sparkles, Search, X, Filter, Gamepad2, Tv2, Trophy, Globe2, Heart, Zap } from 'lucide-react';

export const GameGrid: React.FC = () => {
  const { games, activeCategory, setActiveCategory } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const categoryFilters: { id: GameCategory | 'all'; name: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'hot', name: '🔥 HOT', icon: Flame },
    { id: 'slots', name: '🎰 Slots', icon: Gamepad2 },
    { id: 'casino', name: '🎲 Live Casino', icon: Tv2 },
    { id: 'sports', name: '🏏 Sports', icon: Trophy },
    { id: 'virtual', name: '🥽 VR Virtual', icon: Globe2 },
    { id: 'favorites', name: '⭐ Favorites', icon: Heart },
  ];

  const filteredGames = games.filter(g => {
    // 1. Category Filter
    let matchesCategory = true;
    if (activeCategory === 'hot') {
      matchesCategory = g.hot || g.category === 'hot';
    } else if (activeCategory === 'favorites') {
      matchesCategory = !!g.isFavorite;
    } else {
      matchesCategory = g.category === activeCategory;
    }

    // 2. Search Query Filter
    if (!searchQuery.trim()) return matchesCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      g.name.toLowerCase().includes(query) ||
      g.provider.toLowerCase().includes(query) ||
      (g.badge && g.badge.toLowerCase().includes(query)) ||
      g.category.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'hot': return 'HOT GAMES (জনপ্রিয় গেম)';
      case 'favorites': return 'FAVORITES (প্রিয় গেমসমূহ)';
      case 'slots': return 'SLOTS GAMES (স্লট গেম)';
      case 'casino': return 'LIVE CASINO (লাইভ ক্যাসিনো)';
      case 'sports': return 'SPORTS BETTING (স্পোর্টস বেটিং)';
      case 'virtual': return 'VR VIRTUAL GAMES (ভার্চুয়াল রিয়েলিটি গেম)';
      case 'esports': return 'E-SPORTS (ই-স্পোর্টস)';
      case 'poker': return 'POKER GAMES (পোকার)';
      case 'fish': return 'FISH SHOOTING (ফিশ গেম)';
      case 'lottery': return 'LOTTERY (লটারি)';
      default: return 'GAMES';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 my-4 space-y-3">
      {/* Category Filter & Search Control Panel */}
      <div className="bg-[#021f1c] border border-[#FFD700]/30 p-3 sm:p-4 rounded-2xl shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Quick Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categoryFilters.map((cat) => {
              const isActive = activeCategory === cat.id;
              const Icon = cat.icon;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as GameCategory)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FFD700] via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_12px_rgba(255,215,0,0.4)]'
                      : 'bg-[#011412] text-gray-300 hover:text-white hover:bg-[#03302b] border border-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-300'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Field */}
          <div className="relative flex-1 max-w-xs sm:max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="গেম বা প্রোভাইডার খুঁজুন (PG, Slot, VR...)"
              className="w-full bg-[#011412] border border-[#FFD700]/40 focus:border-[#FFD700] rounded-xl pl-9 pr-8 py-1.5 text-xs font-medium text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FFD700] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Category Header */}
      <div className="flex items-center justify-between border-b border-[#ffd700]/20 pb-2 px-1">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="text-sm sm:text-base font-black text-amber-300 tracking-wide uppercase">
            {getCategoryTitle()}
          </h3>
        </div>
        <span className="text-xs text-emerald-200/80 font-bold bg-[#011a18] px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          মোট: {filteredGames.length} টি গেম
        </span>
      </div>

      {/* Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="bg-[#032b27] border border-amber-400/20 rounded-2xl p-8 text-center my-6 space-y-3">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto opacity-50" />
          <div>
            <p className="text-amber-200 font-bold text-sm">
              "{searchQuery}" এর জন্য কোনো গেম পাওয়া যায়নি।
            </p>
            <p className="text-emerald-200/70 text-xs mt-1">
              অন্য কি-ওয়ার্ড দিয়ে খুঁজুন অথবা সার্চ রিসেট করুন।
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('hot');
            }}
            className="inline-flex items-center gap-1.5 bg-[#FFD700] text-slate-950 font-black text-xs px-4 py-2 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>সকল গেম দেখুন (Reset Search)</span>
          </button>
        </div>
      )}
    </div>
  );
};

