import React from 'react';
import { Game } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Play, Lock, Sparkles } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { toggleFavoriteGame, setActiveGameToPlay, setIsGameLockModalOpen, setLockedGame } = useApp();

  const handleOpenLockScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLockedGame(game);
    setIsGameLockModalOpen(true);
  };

  return (
    <div className="group relative bg-[#04332e] rounded-xl overflow-hidden border border-[#ffd700]/30 shadow-lg hover:shadow-gold-glow transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        {/* Badge tag if present */}
        {game.badge && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-md border border-amber-300/40">
            {game.badge}
          </span>
        )}

        {/* Action Buttons Right Top */}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <button
            onClick={handleOpenLockScreen}
            className="p-1.5 rounded-full bg-black/60 text-amber-300 hover:text-white hover:bg-black transition-colors border border-amber-400/30"
            title="গেম লক সিকিউরিটি (Game Lock Screen)"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavoriteGame(game.id);
            }}
            className="p-1.5 rounded-full bg-black/60 text-white hover:text-red-500 transition-colors"
          >
            <Heart
              className={`w-3.5 h-3.5 ${game.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </button>
        </div>

        {/* Provider tag at bottom right */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/30">
          {game.provider}
        </span>

        {/* Hover Play & Lock Button Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 gap-2">
          <button
            onClick={() => setActiveGameToPlay(game)}
            className="bg-gold-button font-black text-slate-950 text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>প্লে করুন (Play Now)</span>
          </button>

          <button
            onClick={handleOpenLockScreen}
            className="bg-red-950/80 border border-red-500/60 text-red-300 font-bold text-[10px] px-3 py-1 rounded-lg hover:bg-red-900 transition-colors flex items-center gap-1"
          >
            <Lock className="w-3 h-3 text-red-400" />
            <span>সিকিউরিটি লক (Lock Screen)</span>
          </button>
        </div>
      </div>

      {/* Game Details Footer */}
      <div className="p-2.5 flex flex-col justify-between flex-grow">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs sm:text-sm text-amber-200 truncate group-hover:text-amber-300">
            {game.name}
          </h4>
        </div>
        <div className="flex items-center justify-between text-[10px] text-emerald-200/70 mt-1">
          <span>সর্বনিম্ন: ৳{game.minBet}</span>
          <span className="text-amber-400 font-medium">RTP: {game.rtp}</span>
        </div>
      </div>
    </div>
  );
};
